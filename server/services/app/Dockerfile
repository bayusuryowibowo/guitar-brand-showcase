FROM node:latest

WORKDIR /services/app

ENV PORT=4002

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY . .

CMD ["npm", "run", "start"]