# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm i

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your application runs on
EXPOSE 8000

# Start the Node.js application
CMD ["npm", "start"]
