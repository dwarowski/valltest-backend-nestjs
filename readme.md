
# VALLTEST Backend

Backend для платформы VALLTEST, предназначенной для создания и прохождения тестов. Преподаватели могут создавать тесты вручную или автоматически генерировать их с помощью ИИ.

## Описание

Этот репозиторий содержит бэкенд VALLTEST, разработанный на TypeScript с использованием NestJS, TypeORM и PostgreSQL. Он предоставляет API для управления тестами, пользователями, заданиями и результатами тестирования. Swagger UI интегрирован для удобной документации API.

## Технологии

*   **TypeScript:** Строго типизированный язык программирования, расширяющий JavaScript.
*   **NestJS:** Прогрессивный Node.js фреймворк для создания эффективных, надежных и масштабируемых серверных приложений.
*   **TypeORM:** ORM для TypeScript и JavaScript, поддерживающий различные базы данных.
*   **PostgreSQL:** Мощная объектно-реляционная система управления базами данных с открытым исходным кодом.
*   **Swagger:** Набор инструментов с открытым исходным кодом для проектирования, построения, документирования и использования RESTful API.
*   **Docker:** Платформа для разработки, доставки и запуска приложений в контейнерах.

## Особенности

*   **RESTful API:** Бэкенд предоставляет RESTful API для взаимодействия с фронтендом.
*   **Автоматическая генерация тестов:** Поддержка автоматической генерации тестовых заданий с использованием ИИ (в разработке).
*   **Аутентификация и авторизация:** Реализована система аутентификации и авторизации пользователей.
*   **Валидация данных:** Используются декораторы NestJS для валидации входящих данных.
*   **Swagger UI:** Встроенная документация API, доступная через Swagger UI.
*   **Docker-compose:** Предоставляется возможность развертывания приложения с использованием docker-compose.
*   **CI/CD:** Предоставляется скрипт для автоматической сборки и отправки образа в docker registry

## Требования

*   Node.js (версия 16 или выше)
*   NPM или Yarn
*   PostgreSQL (версия 12 или выше)
*   Docker (опционально, для контейнеризации)
*   Docker Hub account (опционально, для публикации docker образа)

## Установка

1.  Клонируйте репозиторий:

```bash
    git clone <your_repo_url>
    cd valltest-backend
```

2. Установите зависимости:

```bash
  npm install
  # или
  yarn install
```

3. Настройте переменные окружения:
  * Создайте файл .env в корне проекта.
  * Добавьте необходимые переменные окружения, включая:
   
```bash
SERVER=0.0.0.0
PORT=7777

DATABASE_HOST=db_host
DATABASE_PORT=db_port
DATABASE_SYNCHRONIZE=true

POSTGRES_USER=db_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=

JWT_SECRET=yourSecretKey
JWT_EXPIRES_IN=30m

CREATE_USERS=false

MAIL_HOST=your.host.host
MAIL_USER=your@gmail.com
MAIL_PASSWORD=your_password
MAIL_FROM=your@gmail.com
FRONTEND_URL=http://localhost:7777
```

▌Запуск приложения

1. Запустите приложение в режиме разработки:

  
```bash
  npm run start:dev
  # или
  yarn start:dev
```

2. Запустите приложение в production режиме:

  
```bash
  npm run start:prod
  # или
  yarn start:prod
```


3.  Swagger UI будет доступен по адресу: http://localhost:7777/api (или по адресу, указанному в вашей конфигурации).

## Доступные команды

*   npm run build: Сборка проекта.
*   npm run start: Запуск приложения в production режиме.
*   npm run start:dev: Запуск приложения в режиме разработки с автоматической перезагрузкой.
*   npm run start:debug: Запуск приложения в режиме отладки.
*   npm run test: Запуск тестов.
*   npm run lint: Запуск линтера.
*   npm run format: Форматирование кода.

## Docker

Для контейнеризации приложения используется Docker.

1.  Соберите Docker-образ:

```bash
  docker build -t valltest-backend .
```

2. Запустите контейнер:

```bash
  docker run -p 3000:3000 valltest-backend
```
3. (Рекомендуется) Используйте docker-compose для более удобного управления:

```bash
  docker-compose up -d
```

Создайте файл docker-compose.yml с нужной конфигурацией. Пример:
 
```yaml
version: "3.8"
services:
 app:
  build: .
  ports:
   - "3000:3000"
  environment:
   - DATABASE_HOST=db
   - DATABASE_PORT=5432
   - DATABASE_USERNAME=your_username
   - DATABASE_PASSWORD=your_password
   - DATABASE_NAME=valltest
   - JWT_SECRET=your_secret_key
  depends_on:
   - db

 db:
  image: postgres:14
  ports:
   - "5432:5432"
  environment:
   POSTGRES_USER: your_username
   POSTGRES_PASSWORD: your_password
   POSTGRES_DB: valltest
  volumes:
   - db_data:/var/lib/postgresql/data

volumes:
 db_data:
```

▌Сборка и отправка Docker-образа

Для автоматической сборки и отправки Docker-образа в Docker Hub можно использовать скрипты docker_build_push.sh (для Linux/macOS) или docker_build_push.ps1 (для Windows PowerShell).

Перед использованием:

*  Убедитесь, что у вас установлен Docker и настроена учетная запись Docker Hub.
*  Сделайте скрипт исполняемым (chmod +x docker_build_push.sh для .sh файла).

Использование:

1. Запустите скрипт:

```bash
  ./docker_build_push.sh
  # или
  ./docker_build_push.ps1
```

2. Скрипт запросит у вас версию приложения (APP_VERSION) и, при необходимости, учетные данные Docker Hub.

3. Скрипт выполнит следующие действия:
  *  Соберет Docker-образ с указанным тегом версии.
  *  Авторизуется в Docker Hub (при необходимости).
  *  Отправит собранный образ в Docker Hub.

▌Документация API

Документация API доступна через Swagger UI по адресу http://localhost:3000/api (или по адресу, указанному в вашей конфигурации).

▌Лицензия
Данное программное обеспечение является коммерческим продуктом и защищено авторским правом.  На использование данного программного обеспечения распространяется Лицензионное соглашение конечного пользователя (EULA), [Лицензия](LICENSE)