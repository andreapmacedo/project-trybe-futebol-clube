FROM node:16.14-alpine
WORKDIR /app-backend
# COPY . .
# RUN npm install
# CMD ["npm", "start"]


COPY package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "dev"]