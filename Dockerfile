FROM node:14-alpine
WORKDIR /server

COPY ["server/package.json", "server/yarn.lock", "./"]

RUN yarn install --frozen-lockfile --prod

COPY ["server", "./"]

EXPOSE 5000

CMD ["node", "app.js"]
