# ==============================================
# 4eye API Dockerfile (NestJS)
# ==============================================
# Development: docker build --target development -t 4eye-api .
# Production:  docker build --target production -t 4eye-api .
# ==============================================

# ----------------------------------------------
# Development Stage
# ----------------------------------------------
FROM node:22-alpine AS development
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@10.29.2 --activate

# Copy package files for dependency resolution
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Copy patches directory (for MUI patch)
COPY patches/ ./patches/

# App package.json
COPY apps/api/package.json ./apps/api/

# @4eye/* packages
COPY packages/@4eye/types/package.json ./packages/@4eye/types/
COPY packages/@4eye/core/package.json ./packages/@4eye/core/
COPY packages/@4eye/features/package.json ./packages/@4eye/features/
COPY packages/@4eye/ai-sdk/package.json ./packages/@4eye/ai-sdk/
COPY packages/@4eye/graphql-schema/package.json ./packages/@4eye/graphql-schema/

# @expanse/* packages
COPY packages/@expanse/auth/package.json ./packages/@expanse/auth/
COPY packages/@expanse/utils/package.json ./packages/@expanse/utils/
COPY packages/@expanse/theme/package.json ./packages/@expanse/theme/
COPY packages/@expanse/shell/package.json ./packages/@expanse/shell/
COPY packages/@expanse/ui/package.json ./packages/@expanse/ui/
COPY packages/@expanse/user/package.json ./packages/@expanse/user/
COPY packages/@expanse/analytics/package.json ./packages/@expanse/analytics/
COPY packages/@expanse/application/package.json ./packages/@expanse/application/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY tsconfig.base.json ./
COPY apps/api/ ./apps/api/
COPY packages/ ./packages/

EXPOSE 3001
CMD ["pnpm", "run", "dev", "--filter", "@4eye/api"]

# ----------------------------------------------
# Production Stage
# ----------------------------------------------
FROM node:22-alpine AS production
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@10.29.2 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Copy patches directory
COPY patches/ ./patches/

COPY apps/api/package.json ./apps/api/

# @4eye/* packages
COPY packages/@4eye/types/package.json ./packages/@4eye/types/
COPY packages/@4eye/core/package.json ./packages/@4eye/core/
COPY packages/@4eye/features/package.json ./packages/@4eye/features/
COPY packages/@4eye/ai-sdk/package.json ./packages/@4eye/ai-sdk/
COPY packages/@4eye/graphql-schema/package.json ./packages/@4eye/graphql-schema/

# @expanse/* packages
COPY packages/@expanse/auth/package.json ./packages/@expanse/auth/
COPY packages/@expanse/utils/package.json ./packages/@expanse/utils/
COPY packages/@expanse/theme/package.json ./packages/@expanse/theme/
COPY packages/@expanse/shell/package.json ./packages/@expanse/shell/
COPY packages/@expanse/ui/package.json ./packages/@expanse/ui/
COPY packages/@expanse/user/package.json ./packages/@expanse/user/
COPY packages/@expanse/analytics/package.json ./packages/@expanse/analytics/
COPY packages/@expanse/application/package.json ./packages/@expanse/application/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy source and build
COPY tsconfig.base.json ./
COPY apps/api/ ./apps/api/
COPY packages/ ./packages/

# Need all deps for build, then prune
RUN pnpm install --frozen-lockfile && \
    pnpm run build --filter @4eye/api && \
    pnpm prune --prod

EXPOSE 3001
CMD ["node", "apps/api/dist/main.js"]
