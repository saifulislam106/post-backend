# Base image
FROM node:20-alpine

# Working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Prisma generate
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/main.js"]
