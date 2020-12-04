FROM node:12.4.0-alpine as nodejs_debug

WORKDIR /work/

COPY ./package.json /work/package.json
RUN npm install
RUN npm install -g nodemon

COPY ./src/ /work/src/

# ENTRYPOINT [ "nodemon","--inspect=0.0.0.0","./src/server.js" ]
# ENTRYPOINT [ "nodemon","--config","nodemon.json","--inspect=0.0.0.0","./src/server.ts" ]
ENTRYPOINT [ "nodemon","--inspect=0.0.0.0","./src/server.ts" ]

# FROM node:12.4.0-alpine as nodejs_prod

# WORKDIR /work/
# COPY ./package.json /work/package.json
# RUN npm install

# COPY ./src/ /work/

# CMD node .