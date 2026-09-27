# docker/yen.Dockerfile — Cloud Run image for apps/yen
# Build from repo root:
#   docker build -f docker/yen.Dockerfile -t yen .

FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.29.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY patches/ ./patches/
COPY tsconfig.base.json ./

COPY apps/yen/package.json ./apps/yen/
COPY apps/4eye-web-mockup/package.json ./apps/4eye-web-mockup/
COPY packages/@4eye/ai-sdk/package.json ./packages/@4eye/ai-sdk/
COPY packages/@4eye/features/package.json ./packages/@4eye/features/
COPY packages/@4eye/icons/package.json ./packages/@4eye/icons/
COPY packages/@4eye/types/package.json ./packages/@4eye/types/
COPY packages/@yen/content/package.json ./packages/@yen/content/
COPY packages/@expanse/brand-core/package.json ./packages/@expanse/brand-core/
COPY packages/@expanse/character/package.json ./packages/@expanse/character/
COPY packages/@expanse/hud/package.json ./packages/@expanse/hud/
COPY packages/@expanse/lens/package.json ./packages/@expanse/lens/
COPY packages/@expanse/scoring/package.json ./packages/@expanse/scoring/
COPY packages/@expanse/shell/package.json ./packages/@expanse/shell/
COPY packages/@expanse/theme/package.json ./packages/@expanse/theme/
COPY packages/@expanse/ui/package.json ./packages/@expanse/ui/
COPY packages/@expanse/map/package.json ./packages/@expanse/map/
COPY packages/@expanse/i18n/package.json ./packages/@expanse/i18n/
COPY packages/@expanse/storybook-config/package.json ./packages/@expanse/storybook-config/

RUN pnpm install --filter yen... --frozen-lockfile

FROM node:22-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.29.2 --activate

COPY --from=deps /app ./

COPY apps/yen/ ./apps/yen/
COPY apps/4eye-web-mockup/ ./apps/4eye-web-mockup/
COPY packages/@4eye/ai-sdk/ ./packages/@4eye/ai-sdk/
COPY packages/@4eye/features/ ./packages/@4eye/features/
COPY packages/@4eye/icons/ ./packages/@4eye/icons/
COPY packages/@4eye/types/ ./packages/@4eye/types/
COPY packages/@yen/content/ ./packages/@yen/content/
COPY packages/@expanse/brand-core/ ./packages/@expanse/brand-core/
COPY packages/@expanse/character/ ./packages/@expanse/character/
COPY packages/@expanse/hud/ ./packages/@expanse/hud/
COPY packages/@expanse/lens/ ./packages/@expanse/lens/
COPY packages/@expanse/scoring/ ./packages/@expanse/scoring/
COPY packages/@expanse/shell/ ./packages/@expanse/shell/
COPY packages/@expanse/theme/ ./packages/@expanse/theme/
COPY packages/@expanse/ui/ ./packages/@expanse/ui/
COPY packages/@expanse/map/ ./packages/@expanse/map/
COPY packages/@expanse/i18n/ ./packages/@expanse/i18n/
COPY packages/@expanse/storybook-config/ ./packages/@expanse/storybook-config/

ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_DOCS_INDEX=1
ENV SKIP_PHOTO_MANIFEST=1
ENV SKIP_BUNDLE_BUDGET=1
ARG NEXT_PUBLIC_SITE_URL=https://www.expanseservices.com
ARG NEXT_PUBLIC_MEDIA_BASE=https://storage.googleapis.com/expanse-public-assets/yen
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_MEDIA_BASE=$NEXT_PUBLIC_MEDIA_BASE

RUN pnpm --filter yen build

FROM node:22-bookworm-slim AS production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/apps/yen/.next/standalone ./
COPY --from=builder /app/apps/yen/.next/static ./apps/yen/.next/static
COPY --from=builder /app/apps/yen/public ./apps/yen/public

EXPOSE 8080
CMD ["node", "apps/yen/server.js"]
