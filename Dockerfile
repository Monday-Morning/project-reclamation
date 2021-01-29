FROM node:alpine

WORKDIR /app

COPY server ./

RUN npm -g install pm2

RUN npm install

EXPOSE 3000

CMD ["npm", "start:prod"]
