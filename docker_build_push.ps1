# Powershell
# Цвета для вывода (PowerShell не поддерживает ANSI escape codes так же, как Bash)
$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"


function Wait-Success {
    param (
        [string]$Message
    )

    if ($LastExitCode -ne 0) {
        Write-Host -ForegroundColor $Red "Error: $Message"
        exit 1
    }
}

function Request-Docker {
    Write-Host -ForegroundColor $Yellow "Logging into Docker Hub..."
    $DOCKER_USERNAME = Read-Host "Enter username"
    $DOCKER_PASSWORD = Read-Host -AsSecureString "Enter password"

    # Convert the secure string to plain text for the docker login command
    $plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($DOCKER_PASSWORD))

    docker login -u $DOCKER_USERNAME -p $plainPassword
    Wait-Success "Docker login failed. Please check your credentials."
    Write-Host -ForegroundColor $Green "Successfully logged into Docker Hub."

    # Securely clear the password from memory after use
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($DOCKER_PASSWORD))
}

$ElapsedTime = Measure-Command {
    ### [ Stage 1/3 Initialize ]
    # Запрашиваем APP_VERSION у пользователя
    Write-Host "Enter the APP_VERSION: " -NoNewLine
    $APP_VERSION = Read-Host

    # Проверяем, что APP_VERSION введено
    if (-not $APP_VERSION) {
        Write-Host -ForegroundColor $Red "Error: APP_VERSION is required."
        exit 1
    }

    # Формируем тег образа
    $IMAGE_TAG = "dwaru/valltest-backend-app:$APP_VERSION"

    # Ищем файл докера
    Write-Host -ForegroundColor $Yellow "Searching dockerfile"
    if (-not (Test-Path -Path "dockerfile" -PathType Leaf)) {
        Write-Host -ForegroundColor $Red "Error: dockerfile not found. Create and configure it manually."
        exit 1
    }
    Write-Host -ForegroundColor $Green "dockerfile found"


    ### [ Stage 2/3 Buliding docker container]
    # Собираем контейнер
    Write-Host -ForegroundColor $Yellow "Building docker image with tag: $IMAGE_TAG..."
    docker build -t $IMAGE_TAG ./ | Write-Host # Добавлено | Write-Host для отображения вывода
    Wait-Success "Couldn't build dockerfile. Check logs"
    Write-Host -ForegroundColor $Green "Image builded successfully"


    ### [ Stage 3/3 Pushing docker container]
    # Пушим контейнер
    Write-Host -ForegroundColor $Yellow "Pushing docker image to hub..."
    docker push $IMAGE_TAG | Write-Host
    if ($LASTEXITCODE -ne 0) {
        # Проверяем код возврата docker push
        Write-Host -ForegroundColor $Red "Couldn't push image.  Attempting login..."
        Request-Docker # Вызываем Request-Docker, если не удалось запушить образ
        docker push $IMAGE_TAG | Write-Host # Повторяем попытку push
        Wait-Success "Couldn't push image after login. Check logs"
    }
    else {
        Wait-Success "Couldn't push image. Check logs" 
    }
    Write-Host -ForegroundColor $Green "Image pushed to hub successfully with tag: $IMAGE_TAG"
}

Write-Host "Time elapsed: $($ElapsedTime.TotalSeconds) seconds"