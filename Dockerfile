FROM node:16.14.0

WORKDIR /app

COPY package*.json /app/

RUN npm install -g @nestjs/cli

RUN npm install

COPY . . 

EXPOSE 3000
 
CMD ["npm", "run", "start"];