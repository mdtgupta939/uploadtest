FROM node:14-alpine

ENV NODE_ENV production

ENV PORT 80

WORKDIR /app

ADD . /app

RUN npm install

VOLUME /app

ENTRYPOINT node .
