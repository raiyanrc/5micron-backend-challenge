# Using the official latest Node.js image as a base image
FROM node:18.18.1

# Setting the working directory in the container
WORKDIR /server

# Copying package.json and package-lock.json to the container
COPY ./package*.json ./

# Installing app dependencies
RUN npm cache clean --force
RUN npm install

# Copying the application code to the container
COPY . .

# Expose the port that your Node.js app is running on
EXPOSE 3000

