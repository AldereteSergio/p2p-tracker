# Use an official Node.js runtime as a parent image
FROM node:18.18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./src/operations /app/operations
COPY ./src/main.js /app/main.js
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json


# Install any needed packages specified in package.json
RUN npm install

# Define environment variable
ENV NODE_ENV=production

# Run the app when the container launches
CMD ["npm", "start"]
