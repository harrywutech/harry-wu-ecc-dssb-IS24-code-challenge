# Dockerfile for React client

# Build react client
FROM node:14.21.3

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3333

CMD ["npm","start"]