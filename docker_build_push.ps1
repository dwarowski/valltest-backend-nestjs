# Powershell
# Цвета для вывода (PowerShell не поддерживает ANSI escape codes так же, как Bash)
$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"

function Check-Success {
    param (
        [string]$Message
    )

    if ($LastExitCode -ne 0) {
        Write-Host -ForegroundColor $Red "Error: $Message"
        exit 1
    }
}

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

Write-Host -ForegroundColor $Yellow "Searching dockerfile"
if (-not (Test-Path -Path "dockerfile" -PathType Leaf)) {
    Write-Host -ForegroundColor $Red "Error: dockerfile not found. Create and configure it manually."
    exit 1
}

Write-Host -ForegroundColor $Yellow "Building docker image with tag: $IMAGE_TAG..."
docker build -t $IMAGE_TAG ./ | Write-Host # Добавлено | Write-Host для отображения вывода
Check-Success "Couldn't build dockerfile. Check logs"
Write-Host -ForegroundColor $Green "Image builded successfully"

Write-Host -ForegroundColor $Yellow "Pushing docker image to hub..."
docker push $IMAGE_TAG | Write-Host # Добавлено | Write-Host для отображения вывода
Check-Success "Couldn't push image. Check logs"
Write-Host -ForegroundColor $Green "Image pushed to hub successfully with tag: $IMAGE_TAG"
