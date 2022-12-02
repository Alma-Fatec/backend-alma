FROM node:16-alpine

WORKDIR /home/app

COPY package.json /home/app/
COPY ./package-lock.json .

RUN npm install

COPY . /home/app

# RUN npx prisma generate

# RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "dev"]
