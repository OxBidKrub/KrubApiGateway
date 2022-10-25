FROM node:alpine3.15

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
