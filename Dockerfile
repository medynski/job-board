FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY ./dist/apps .

RUN npm install

COPY . .

EXPOSE 3000

CMD node ./dist/apps/server-api/main.js