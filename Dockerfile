FROM node:carbon

WORKDIR /usr/src/app

COPY package.json ./

COPY dist/ ./dist
COPY node_modules/ ./node_modules
COPY views/ ./views
COPY public/ ./public
COPY server/ ./server

EXPOSE 8080

CMD ["npm", "run", "start"]