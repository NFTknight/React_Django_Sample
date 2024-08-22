FROM node:18-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install --force
COPY . ./
RUN npm run build

# release step
FROM nginx:1.21.5-alpine as release
COPY --from=build /app/build /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]