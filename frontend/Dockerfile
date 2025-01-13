# Stage 1: Сборка приложения
FROM node:lts AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Запуск статического сервера
FROM node:lts
WORKDIR /app
RUN yarn global add serve
COPY --from=builder /app/dist ./
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
