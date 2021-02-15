FROM node:alpine

ENV PORT 8000

RUN mkdir -p /usr/app
WORKDIR /usr/app

# Installing dependencies
COPY package*.json /usr/app/
COPY yarn.lock /usr/app/
RUN yarn install

RUN mkdir -p /.cache/yarn
RUN chmod -R 777 /.cache/yarn
RUN chmod -R 777 /usr/local

# Copying source files
COPY . /usr/app

RUN chmod -R 777 /usr/app/public

# Building app
RUN yarn run build
EXPOSE 8000

# Running the app
CMD "yarn" "run" "start" "-p" "8000"
