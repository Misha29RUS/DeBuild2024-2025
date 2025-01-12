FROM node:20 as build-stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build --prod

FROM nginx:alpine

#COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html

EXPOSE 80