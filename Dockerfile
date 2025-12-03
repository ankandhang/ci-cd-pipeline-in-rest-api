# Use Node.js
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (Fixes: missing package.json)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project (src, tests, etc.)
COPY . .

# Expose API port
EXPOSE 3000

# Start your API
CMD ["node", "src/server.js"]
