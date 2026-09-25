# ==============================================
# 4eye Mobile Dockerfile (Expo React Native)
# ==============================================
# This Dockerfile is primarily for CI/CD builds
# For local development, use Expo CLI directly
# ==============================================

# ----------------------------------------------
# Build Stage (for EAS Build / CI)
# ----------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies needed for native builds
RUN apk add --no-cache git python3 make g++

# Copy package files for dependency resolution
COPY package.json package-lock.json* ./

# App package.json
COPY apps/labs/4eye-mobile/package.json ./apps/labs/4eye-mobile/

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
RUN npm ci

# Copy source files
COPY tsconfig.base.json ./
COPY apps/labs/4eye-mobile/ ./apps/labs/4eye-mobile/
COPY packages/ ./packages/

# Build TypeScript packages if needed
RUN npm run build --workspace=packages/@4eye/types --if-present
RUN npm run build --workspace=packages/@4eye/core --if-present

# The mobile app itself doesn't have a traditional build step here
# EAS Build handles the actual native compilation
# This stage is for preparing the JS bundle and dependencies

# ----------------------------------------------
# CI/Test Stage
# ----------------------------------------------
FROM node:22-alpine AS test
WORKDIR /app

COPY --from=build /app ./

# Run lint and type checks
RUN npm run lint --workspace=apps/labs/4eye-mobile --if-present
RUN npm run typecheck --workspace=apps/labs/4eye-mobile --if-present

# Run tests
RUN npm run test --workspace=apps/labs/4eye-mobile --if-present

# ----------------------------------------------
# Export Stage (for extracting built assets)
# ----------------------------------------------
FROM scratch AS export

# Copy the prepared app for use in subsequent CI steps
COPY --from=build /app/apps/labs/4eye-mobile ./app
COPY --from=build /app/packages ./packages
COPY --from=build /app/node_modules ./node_modules
