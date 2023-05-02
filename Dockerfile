FROM node:12-alpine
ARG PORT=3000
EXPOSE $PORT

RUN mkdir -p /usr/src/app
COPY ./ /usr/src/app
WORKDIR /usr/src/app
RUN yarn install

CMD yarn start
