FROM node:9.11.1-alpine

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

CMD ["yarn", "serve"]
