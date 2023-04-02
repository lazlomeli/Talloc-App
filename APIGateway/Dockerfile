# GATEWAY API DOCKERFILE

FROM node:17-alpine

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "run", "dev"]