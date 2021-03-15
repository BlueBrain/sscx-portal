FROM node:alpine

ENV PORT 8000

RUN mkdir -p /usr/app
WORKDIR /usr/app

RUN mkdir /.cache && chmod -R 777 /.cache
RUN mkdir /.yarn && chmod -R 777 /.yarn

# Installing dependencies
COPY package*.json /usr/app/
COPY yarn.lock /usr/app/
RUN yarn install

# Copying source files
COPY . /usr/app

# Building app
RUN yarn run build && chmod -R 777 .next/cache

EXPOSE 8000

# Running the app
CMD "yarn" "run" "start" "-p" "8000"
