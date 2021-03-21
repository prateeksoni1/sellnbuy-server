FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 8000

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh