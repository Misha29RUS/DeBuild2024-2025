#FROM node:20 as build-stage
#
#WORKDIR /app
#
#COPY package.json yarn.lock ./
#
#RUN yarn install
#
#COPY . .
#
#RUN yarn build --prod
#
#FROM nginx:alpine
#
##COPY nginx.conf /etc/nginx/nginx.conf
#
#COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html
#
#EXPOSE 80
FROM node:lts as dependencies
WORKDIR /billing-ui
COPY package.json yarn.lock ./
RUN yarn install

FROM node:lts as builder
WORKDIR /billing-ui
COPY . .
COPY --from=dependencies /billing-ui/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /billing-ui
COPY --from=builder /billing-ui/public ./public
COPY --from=builder /billing-ui/package.json ./package.json
COPY --from=builder /billing-ui/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "dev"]