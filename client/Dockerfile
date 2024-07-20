FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm install -g serve
RUN npm run build