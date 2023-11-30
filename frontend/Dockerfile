FROM node:lts-slim

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install react-scripts

COPY . .

EXPOSE 3000

CMD [ "npm" ,"start" ]