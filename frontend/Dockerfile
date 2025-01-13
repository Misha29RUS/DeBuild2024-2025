## Stage 1: Сборка приложения
#FROM node:lts AS builder
#WORKDIR /app
#COPY package.json yarn.lock ./
#RUN yarn install
#COPY . .
#RUN yarn build
#
## Stage 2: Запуск статического сервера
#FROM node:lts
#WORKDIR /app
#RUN yarn global add serve
#COPY --from=builder /app/dist ./
#EXPOSE 3000
#CMD ["serve", "-s", ".", "-l", "3000"]
#
## Используем официальный Node.js образ для сборки
#FROM node:18 AS build
#
## Устанавливаем рабочую директорию
#WORKDIR /app
#
## Копируем package.json и устанавливаем зависимости
#COPY package.json package-lock.json ./
#RUN yarn install
#
## Копируем исходный код и собираем проект
#COPY . .
#RUN yarn build
#
## Используем Nginx для сервировки собранного проекта
#FROM nginx:stable-alpine
#
## Копируем собранные файлы фронтенда в папку Nginx
#COPY --from=build /app/dist /usr/share/nginx/html
#
## Копируем кастомный Nginx конфиг, если нужно
#COPY nginx.conf /etc/nginx/nginx.conf
#
## Указываем порт, который будет слушать Nginx
#EXPOSE 80
#
## Стартуем Nginx
#CMD ["nginx", "-g", "daemon off;"]


# Используем официальный Node.js образ для сборки
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./
RUN yarn install

# Копируем исходный код и собираем проект
COPY . ./
RUN yarn build

# Используем Nginx для сервировки собранного проекта
FROM nginx:stable-alpine

# Копируем собранные файлы фронтенда в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный Nginx конфиг, если нужно
COPY nginx.conf /etc/nginx/nginx.conf

# Указываем порт, который будет слушать Nginx
EXPOSE 80

# Стартуем Nginx
CMD ["nginx", "-g", "daemon off;"]

