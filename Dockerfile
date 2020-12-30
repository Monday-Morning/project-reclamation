FROM node:alpine

WORKDIR /app

RUN npm -g install pm2

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
