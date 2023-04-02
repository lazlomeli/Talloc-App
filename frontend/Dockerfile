# REACT APP DOCKERFILE

FROM node:17-alpine

WORKDIR /ReactFrontend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]