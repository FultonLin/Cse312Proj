FROM node:13.12.0-alpine
RUN mkdir /reactfrontend
WORKDIR /reactfrontend
COPY package.json /reactfrontend/package.json
RUN npm install
CMD [ "npm","start" ]