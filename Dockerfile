FROM node:lts-alpine AS deps

WORKDIR /opt/app
COPY package.json yarn.lock ./
COPY node_modules ./node_modules

FROM node:lts-alpine AS builder

ENV NODE_ENV=production
ARG TARGET_ENV=production
ENV TARGET_ENV=$TARGET_ENV
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN yarn build

FROM node:lts-alpine AS runner

ARG X_TAG
WORKDIR /opt/app
ENV NODE_ENV=production
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]
