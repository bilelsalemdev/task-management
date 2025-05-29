FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --legacy-peer-deps

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3002

CMD ["node", "dist/main"] 