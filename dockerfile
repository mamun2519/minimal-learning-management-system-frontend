#stage 1: build the react app
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#stage 2: serve the react app with nginx
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

#stage 2: runtime environment
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/build ./build
# Install a simple static file server
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]

#docker build -t my-react-app .
