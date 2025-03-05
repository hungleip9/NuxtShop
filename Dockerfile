# Dockerfile
FROM node:20.15.1-alpine

# Tạo thư mục làm việc
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# Cài đặt các gói cần thiết cho Alpine Linux
RUN apk update && apk upgrade && apk add --no-cache
RUN apk add git

# Thiết lập bộ nhớ tối đa cho Node.js
ENV NODE_OPTIONS="--max-old-space-size=8096"

# Copy package.json và package-lock.json trước để tối ưu cache layer Docker
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build dự án
RUN npm run build

# Expose cổng 3000
EXPOSE 3000

# Thiết lập biến môi trường
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Chạy ứng dụng
CMD [ "npm", "run", "preview" ]
