# node version
FROM node:6.9.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source inside the docker image
COPY . /usr/src/app

# Map port to docker daemon
EXPOSE 8080

# Command to run app
CMD ["npm", "start"]
