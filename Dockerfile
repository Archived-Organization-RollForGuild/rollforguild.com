FROM node:alpine

RUN apk --no-cache add yarn

WORKDIR /app
