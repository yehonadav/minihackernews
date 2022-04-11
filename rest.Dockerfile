FROM node:16.13

RUN mkdir -p /rest/src/app
WORKDIR /rest/src/app

COPY package.json /rest/src/app/

COPY . /rest/src/app

RUN npm install yarn

CMD [ "yarn", "run", "dev" ]

EXPOSE 3000
