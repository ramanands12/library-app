# Use Node LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY . .

# Expose port
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
