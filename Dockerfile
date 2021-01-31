FROM node:alpine

WORKDIR /app

COPY server/package.json .

RUN npm -g install pm2

RUN npm install --only=production

COPY server .

EXPOSE 3000

CMD ["npm", "start:prod"]
