FROM node:12.4.0-alpine as web_debug

WORKDIR /app/

COPY ./package.json /app/package.json
RUN npm install
RUN npm install react-scripts -g --silent

COPY ./src/ /app/src/
COPY ./public/ /app/public/

ENTRYPOINT [ "npm","run","dev"]

EXPOSE 3000

FROM node:12.4.0-alpine as web_prod

WORKDIR /app/
COPY ./package.json /app/package.json
RUN yarn install
COPY ./src/ /app/
COPY ./public/ /public/

CMD node .

EXPOSE 3000