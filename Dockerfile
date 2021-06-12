FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install pm2 -g

RUN npm install && npm run build

COPY .env ./build

EXPOSE 3333

CMD [  "pm2-runtime", "start", "ecosystem.config.js" ]
