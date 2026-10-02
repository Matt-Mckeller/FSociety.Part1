FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
ENV NEXT_TELEMETRY_DISABLED=1
ENV SYMBOL_GRID_STANDALONE_EXPORT=1
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache apache2-utils \
    && rm -f /etc/nginx/conf.d/default.conf \
    && cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    add_header Cache-Control "private, no-store" always;

    include /run/symbol-grid-auth.conf;

    location = /healthz {
        auth_basic off;
        access_log off;
        return 200 "ok\n";
    }

    location /_next/static/ {
        try_files $uri =404;
    }

    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
EOF
RUN cat > /docker-entrypoint.d/20-symbol-grid-auth.sh <<'EOF'
#!/bin/sh
set -eu
export TMPDIR=/run

if [ -n "${SITE_ACCESS_USER:-}" ] && [ -n "${SITE_ACCESS_PASSWORD:-}" ]; then
    htpasswd -B -b -c /run/symbol-grid.htpasswd "$SITE_ACCESS_USER" "$SITE_ACCESS_PASSWORD" >/dev/null
    chown nginx:nginx /run/symbol-grid.htpasswd
    chmod 640 /run/symbol-grid.htpasswd
    printf '%s\n' \
        'auth_basic "Symbol Grid preview";' \
        'auth_basic_user_file /run/symbol-grid.htpasswd;' \
        > /run/symbol-grid-auth.conf
elif [ -n "${SITE_ACCESS_USER:-}" ] || [ -n "${SITE_ACCESS_PASSWORD:-}" ]; then
    echo "Both Symbol Grid Basic Auth credentials must be set, or both must be empty." >&2
    exit 1
else
    : > /run/symbol-grid-auth.conf
fi
EOF
RUN chmod 755 /docker-entrypoint.d/20-symbol-grid-auth.sh

COPY --from=builder /app/out/ /usr/share/nginx/html/
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
    CMD wget --quiet --spider http://127.0.0.1:8080/healthz || exit 1