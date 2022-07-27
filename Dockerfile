FROM node:16-alpine

RUN apk update

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]