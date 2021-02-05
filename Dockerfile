FROM node:alpine

WORKDIR /app

COPY server/package.json .

RUN npm -g install pm2

RUN npm install --only=production --force

COPY server .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

# CMD ["node", "app.js"]
