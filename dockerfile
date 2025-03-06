
# Используем базовый образ Node.js
FROM node:22-alpine AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --registry=https://registry.npmmirror.com 
# Копируем исходный код приложения
COPY . .

# Собираем NestJS приложение для production
RUN npm run build

# --- Второй этап: Запуск приложения ---
FROM node:22-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только собранные файлы из этапа сборки
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Объявляем порт, который будет прослушиваться контейнером
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "dist/main"]
