# D1 — Docker Compose Local Development

> **Last Updated:** Match this to [docker-compose.yml](../../../../docker-compose.yml) and [docker/](../../../../docker/) Dockerfiles

## Purpose

Define the Docker Compose setup for local development, providing production-parity without requiring full Kubernetes infrastructure.

## Current Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Network (4eye-network)            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐  │
│  │  4eye-db    │     │ 4eye-redis  │     │  4eye-api   │  │
│  │  Postgres   │────▶│   Redis     │────▶│   NestJS    │  │
│  │  :5432      │     │   :6379     │     │   :3001     │  │
│  └─────────────┘     └─────────────┘     └──────┬──────┘  │
│                                                  │          │
│                                           HTTP/WS│          │
│                                                  ▼          │
│                                          ┌─────────────┐   │
│                                          │  4eye-web   │   │
│                                          │   Next.js   │   │
│                                          │   :3000     │   │
│                                          └─────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Services

```yaml
# docker-compose.yml (see actual file for authoritative version)
services:
  # PostgreSQL Database
  db:
    container_name: 4eye-db
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: foureye
      POSTGRES_PASSWORD: foureye_dev
      POSTGRES_DB: foureye
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U foureye"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - 4eye-network

  # Redis (for sessions, caching, pub/sub)
  redis:
    container_name: 4eye-redis
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - 4eye-network

  # NestJS API (GraphQL + WebSocket subscriptions)
  api:
    container_name: 4eye-api
    build:
      context: .
      dockerfile: docker/api.Dockerfile
      target: development
    ports:
      - "3001:3001"
    env_file:
      - ./apps/api/.env
    environment:
      NODE_ENV: development
      API_PORT: 3001
      CORS_ORIGIN: http://localhost:3000
      DATABASE_URL: postgresql://foureye:foureye_dev@db:5432/foureye
      REDIS_URL: redis://redis:6379
    volumes:
      - ./apps/api:/app/apps/api
      - ./packages:/app/packages
      - /app/node_modules
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - 4eye-network

  # Next.js Frontend
  web:
    container_name: 4eye-web
    build:
      context: .
      dockerfile: docker/web.Dockerfile
      target: development
    ports:
      - "3000:3000"
    env_file:
      - ./apps/4eye-web/.env.local
    environment:
      NODE_ENV: development
      NEXT_PUBLIC_API_URL: http://localhost:3001/graphql
      NEXT_PUBLIC_WS_URL: ws://localhost:3001/graphql
      INTERNAL_API_URL: http://api:3001/graphql  # For SSR
    volumes:
      - ./apps/4eye-web:/app/apps/4eye-web
      - ./apps/4eye-web/lib:/app/apps/4eye-web/lib
      - ./packages:/app/packages
      - /app/node_modules
      - /app/apps/4eye-web/.next
    depends_on:
      - api
    networks:
      - 4eye-network

networks:
  4eye-network:
    driver: bridge

volumes:
  postgres_data:
```

## Dockerfiles

### docker/api.Dockerfile

```dockerfile
# ==============================================
# 4eye API Dockerfile (NestJS)
# ==============================================
# Node 22-alpine with multi-stage build
# Development: hot reload with source volumes
# Production: optimized build with npm ci --omit=dev
#
# Packages included:
# - @4eye/* (types, core, features, ai-sdk, graphql-schema)
# - @expanse/* (auth, utils, theme, layout, ui, user, analytics, application)
# ==============================================
```

### docker/web.Dockerfile

```dockerfile
# ==============================================
# 4eye Web Dockerfile (Next.js)
# ==============================================
# Node 22-alpine with multi-stage build
# Development: hot reload with source volumes
# Builder: full build for production
# Production: standalone Next.js output
#
# Packages included: same as API
# ==============================================
```

### docker/mobile.Dockerfile

```dockerfile
# ==============================================
# 4eye Mobile Dockerfile (Expo React Native)
# ==============================================
# Primarily for CI/CD builds
# Local development uses Expo CLI directly
# ==============================================
```

## Development Workflow

```bash
# Start all services
docker-compose up

# Start with rebuild (after dependency changes)
docker-compose up --build

# Full rebuild (clear cache)
docker-compose build --no-cache

# Start specific service
docker-compose up web

# View logs
docker-compose logs -f api
docker-compose logs -f web

# Run migrations
docker-compose exec api npm run db:migrate

# Open database shell
docker-compose exec db psql -U foureye -d foureye

# Access Redis CLI
docker-compose exec redis redis-cli

# Stop all services
docker-compose down

# Stop and remove volumes (reset DB)
docker-compose down -v
```

## Environment Files

### apps/api/.env (example)

```env
# ==============================================
# 4eye API Environment Configuration
# ==============================================

# Database
DATABASE_URL=postgresql://foureye:foureye_dev@localhost:5432/foureye

# Redis
REDIS_URL=redis://localhost:6379

# JWT Authentication (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=<generated-64-byte-hex>
JWT_REFRESH_SECRET=<generated-64-byte-hex>
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# CSRF Protection
CSRF_SECRET=<generated-32-byte-hex>

# AI Providers
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_AI_API_KEY=
DEEPSEEK_API_KEY=
```

### apps/4eye-web/.env.local (example)

```env
# ==============================================
# 4eye Web App - Environment Configuration
# ==============================================

# API Connection (HTTP)
NEXT_PUBLIC_API_URL=http://localhost:3001/graphql

# WebSocket Connection (GraphQL Subscriptions)
NEXT_PUBLIC_WS_URL=ws://localhost:3001/graphql

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OAuth Providers
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

# Email (SendGrid)
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=dev@expanse.local

# Feature Flags
ENABLE_LIVE_TRANSLATION=true
ENABLE_VISUAL_GENERATION=false
```

## Hot Reloading

Both services mount source code as volumes:
- Changes to `apps/api/` → NestJS auto-restarts
- Changes to `apps/4eye/` → Next.js fast refresh
- Changes to `libs/` → Both services detect and rebuild

## Dependencies

- D2 Repository Migration
- D3 Monorepo Structure

## Outputs

- [ ] docker-compose.yml created
- [ ] api.Dockerfile created
- [ ] web.Dockerfile created
- [ ] .env.development.example created
- [ ] `docker-compose up` starts all services
- [ ] Hot reloading working for both apps
- [ ] Database accessible at localhost:5432
- [ ] API accessible at localhost:3001
- [ ] Web accessible at localhost:3000
