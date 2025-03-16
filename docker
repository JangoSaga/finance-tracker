# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vite React app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Set the PORT environment variable
ENV PORT=8080

# Expose the port Cloud Run will use
EXPOSE 8080

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "8080"]
