# Stage 1: Build the Next.js app
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Run the app
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from the build stage
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json

# Expose Next.js default port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
