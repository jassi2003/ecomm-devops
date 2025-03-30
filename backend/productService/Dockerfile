# Use official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy only the files inside the `user` service (not the whole `backend/user` folder)
COPY . .

# Expose port (Change this based on your service)
EXPOSE 3002

# Start the application
CMD ["node", "server.js"]


#to run the docker container=> docker run --name user-service -p 3001:3001 user-service
#if port is already is in use=> netstat -ano | findstr :3001,taskkill /PID 12345 /F



