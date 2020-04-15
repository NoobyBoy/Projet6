# base image
FROM node:lts-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY ./src ./src
RUN npm install
RUN npm install @vue/cli@4.3.1 -g
RUN vue add vuetify

# start app
CMD ["npm", "run", "serve"]