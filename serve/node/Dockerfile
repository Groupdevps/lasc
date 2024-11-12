FROM node:16

WORKDIR /usr/src/app/node

COPY package*.json ./

RUN npm install
COPY . .


EXPOSE 4000

CMD ["npm", "run", "dev"]