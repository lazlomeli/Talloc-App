# NODEJS BACKEND DOCKERFILE

FROM node:17-alpine

WORKDIR /NodeBackend

COPY package.json .

RUN npm install

COPY ./app .

EXPOSE 3000

CMD ["npm", "run", "dev"]