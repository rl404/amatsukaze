FROM node:24-alpine AS base

# Stage 1: Install all dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Stage 1.5: Install production dependecies
FROM base AS deps2
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4173
ENV HOSTNAME="0.0.0.0"
RUN mkdir build
RUN chown node:node build
COPY --from=deps2 --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/build ./build
USER node
EXPOSE 4173
CMD ["node", "build"]