FROM node:16.14-alpine3.15 AS base 

WORKDIR /app

RUN npm i -g pnpm && pnpm i -g typescript ts-node

RUN apk add --no-cache tini=0.19.0-r0

ENTRYPOINT ["/sbin/tini","-s" ,"--"]

FROM base AS dependencies-ts

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile 


FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

FROM base AS builder
COPY --from=dependencies-ts /app/node_modules ./node_modules

COPY --from=dependencies-ts /app/package.json ./

COPY ./src ./src

COPY ./tsconfig.json ./tsconfig.json

RUN pnpm build

FROM base AS production
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

COPY --chown=node:node --from=builder /app/dist ./dist

ENV PORT=9000

EXPOSE 9000

USER node

CMD ["node","dist/src/index.js"]
