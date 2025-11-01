#stage 1: build the react app
FROM node:22-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2: serve the react app with nginx (Production stage)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#stage 2: runtime environment
# FROM node:22-alpine as runtime
# WORKDIR /app
# COPY --from=build /app ./
# # Install a simple static file server
# RUN npm install -g serve
# EXPOSE 3000
# CMD ["npm", "start"]

#docker build -t my-react-app .
