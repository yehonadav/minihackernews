FROM node:16.13

RUN mkdir -p /rest/src/app
WORKDIR /rest/src/app

COPY package.json /rest/src/app/
RUN npm install

COPY . /rest/src/app

EXPOSE 3000

CMD [ "npm", "run", "dev" ]