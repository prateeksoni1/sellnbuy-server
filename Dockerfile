FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 8000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

CMD ["/wait", "&&", "npm", "start"]