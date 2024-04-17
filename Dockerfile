# build stage
FROM node:18-bullseye AS builder
WORKDIR /usr/src/app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install -force
RUN npm install -g serve
COPY ./ .
RUN npm run build
# ARG BASE_URL=https://staging.api.zoropay.com/edfin/v1
# ENV VITE_API_URL=$BASE_URL
# RUN npm run build

# target stage
FROM nginx:latest AS target
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx-default.conf /etc/nginx/conf.d/default.conf
