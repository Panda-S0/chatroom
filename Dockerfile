# Use Node.js as the base image
FROM node:19-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm i

# Copy the rest of the app files
COPY . .

# Expose ports for Metro Bundler (19000 for DevTools, 19001 for iOS, 19002 for Web)
EXPOSE 19000 19001 19002

# Start the Expo development server
CMD ["npm", "start"]
