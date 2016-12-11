FROM node:7
RUN mkdir /app
WORKDIR /app

COPY package.json ./package.json
RUN npm install --production

COPY /backend ./backend

EXPOSE 33333

CMD ["node", "./backend/apps/admin-api"]
