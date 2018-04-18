FROM node:8

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g grunt-cli
RUN npm install

COPY . .

RUN grunt handlebars

ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]
