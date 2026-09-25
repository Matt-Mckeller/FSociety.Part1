#!/usr/bin/env bash
# Build yen (Cloud Build) and/or deploy to Cloud Run.
#
# From repo root:
#   pnpm deploy:yen          # build image + deploy
#   pnpm deploy:yen:build    # Cloud Build only
#   pnpm deploy:yen:release  # deploy existing :latest image only
#   pnpm deploy:yen:media    # rsync apps/yen/public/media → GCS
#
# Requires: gcloud auth, apps/yen/.env with SITE_ACCESS_USER + SITE_ACCESS_PASSWORD
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROJECT="${GCP_PROJECT:-expanse-site-v3}"
REGION="${GCP_REGION:-us-central1}"
SERVICE="${YEN_SERVICE:-yen}"
IMAGE="${YEN_IMAGE:-us-central1-docker.pkg.dev/${PROJECT}/yen/yen:latest}"
ENV_FILE="${ENV_FILE:-apps/yen/.env}"
MEDIA_BUCKET="${YEN_MEDIA_BUCKET:-gs://expanse-public-assets/yen/media}"
MODE="${1:-all}"

usage() {
  cat <<'EOF'
Build yen (Cloud Build) and/or deploy to Cloud Run.

  pnpm deploy:yen          # build image + deploy
  pnpm deploy:yen:build    # Cloud Build only
  pnpm deploy:yen:release  # deploy existing :latest image only
  pnpm deploy:yen:media    # rsync apps/yen/public/media → GCS

Requires: gcloud auth, apps/yen/.env with SITE_ACCESS_USER + SITE_ACCESS_PASSWORD
EOF
  exit "${1:-0}"
}

load_env() {
  if [[ ! -f "$ENV_FILE" ]]; then
    echo "missing $ENV_FILE (need SITE_ACCESS_USER / SITE_ACCESS_PASSWORD)" >&2
    exit 1
fi
  # shellcheck disable=SC1090
  set -a
  eval "$(grep -E '^(SITE_ACCESS_USER|SITE_ACCESS_PASSWORD|NEXT_PUBLIC_SITE_URL|NEXT_PUBLIC_MEDIA_BASE)=' "$ENV_FILE" | sed 's/\r$//')"
  set +a
  : "${SITE_ACCESS_USER:?set SITE_ACCESS_USER in $ENV_FILE}"
  : "${SITE_ACCESS_PASSWORD:?set SITE_ACCESS_PASSWORD in $ENV_FILE}"
}

build_image() {
  echo "→ Cloud Build → $IMAGE"
  gcloud builds submit \
    --project="$PROJECT" \
    --config=docker/cloudbuild.yen.yaml \
    --ignore-file=docker/yen.dockerignore \
    .
}

deploy_service() {
  load_env
  local site_url media_base
  site_url="${NEXT_PUBLIC_SITE_URL:-https://www.expanseservices.com}"
  media_base="${NEXT_PUBLIC_MEDIA_BASE:-https://storage.googleapis.com/expanse-public-assets/yen}"

  echo "→ Cloud Run deploy $SERVICE ($REGION)"
  gcloud run deploy "$SERVICE" \
    --project="$PROJECT" \
    --region="$REGION" \
    --image="$IMAGE" \
    --platform=managed \
    --allow-unauthenticated \
    --port=8080 \
    --memory=1Gi \
    --cpu=1 \
    --min-instances=0 \
    --max-instances=3 \
    --set-env-vars="SITE_ACCESS_USER=${SITE_ACCESS_USER},SITE_ACCESS_PASSWORD=${SITE_ACCESS_PASSWORD},NEXT_PUBLIC_SITE_URL=${site_url},NEXT_PUBLIC_MEDIA_BASE=${media_base}" \
    --quiet

  local url
  url="$(gcloud run services describe "$SERVICE" --project="$PROJECT" --region="$REGION" --format='value(status.url)')"
  echo "✓ $url"
}

sync_media() {
  local src="apps/yen/public/media"
  if [[ ! -d "$src" ]]; then
    echo "missing $src" >&2
    exit 1
  fi
  echo "→ gcloud storage rsync $src → $MEDIA_BUCKET"
  gcloud storage rsync --recursive "$src" "$MEDIA_BUCKET"
  echo "✓ media synced"
}

case "$MODE" in
  -h|--help|help) usage 0 ;;
  all|deploy)
    build_image
    deploy_service
    ;;
  build) build_image ;;
  release|run) deploy_service ;;
  media) sync_media ;;
  *)
    echo "unknown mode: $MODE" >&2
    usage 1
    ;;
esac
