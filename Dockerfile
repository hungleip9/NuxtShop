# Dockerfile
FROM node:20.15.1-alpine AS build
WORKDIR /app

RUN corepack enable
# Thiết lập bộ nhớ tối đa cho Node.js
ENV NODE_OPTIONS="--max-old-space-size=8096"

# Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
COPY package.json pnpm-lock.yaml .npmrc ./

# Install dependencies
RUN pnpm i

# Copy the entire project
COPY . ./

# Build the project
RUN pnpm run build

# Build Stage 2

FROM node:20.15.1-alpine
WORKDIR /app

# Change the port and host
ENV PORT 80
ENV HOST 0.0.0.0

EXPOSE 80

CMD ["node", "/app/server/index.mjs"]
