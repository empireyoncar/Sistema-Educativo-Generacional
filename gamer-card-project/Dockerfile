FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "exec", "vite", "--host", "0.0.0.0", "--port", "3006"]
