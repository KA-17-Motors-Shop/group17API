FROM node:16-alpine

RUN apk update

WORKDIR /user/src/app

COPY package.json yarn.lock /user/src/app/

RUN yarn

COPY . .

RUN npx prisma generate

CMD [ "yarn", "dev" ]