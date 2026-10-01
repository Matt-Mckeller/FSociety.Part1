#!/usr/bin/env bash
# Build and run Yen behind a remotely-managed Cloudflare Tunnel.
# Run on the Linux Docker host from any directory inside the repository.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${YEN_HOME_ENV_FILE:-$ROOT/.env.yen-home}"
COMPOSE_FILE="$ROOT/docker-compose.yen-tunnel.yml"
MODE="${1:-deploy}"

usage() {
  cat <<'EOF'
Usage: bash docker/deploy-yen-tunnel.sh [validate|start|deploy]

  validate  Validate host secrets, release settings, and Compose configuration.
    start     Start the already-built stack without building or pulling images.
  deploy    Validate, build Yen, pull cloudflared, and start the stack.

Requires macOS with Docker Desktop, or Linux with Docker Engine; both need
Docker Compose v2, Python 3.9+, and a configured .env.yen-home file.
See docker/yen-home-hosting.md.
EOF
}

if [[ "$MODE" == "-h" || "$MODE" == "--help" || "$MODE" == "help" ]]; then
  usage
  exit 0
fi
if [[ "$MODE" != "validate" && "$MODE" != "start" && "$MODE" != "deploy" ]]; then
  usage >&2
  exit 2
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE. Copy docker/yen-home.env.example and configure it." >&2
  exit 1
fi
if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
  echo "Docker Engine and the Docker Compose v2 plugin are required." >&2
  exit 1
fi
if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required for local secret and release validation." >&2
  exit 1
fi

python3 - "$ROOT" "$ENV_FILE" <<'PY'
from pathlib import Path
from stat import S_IMODE
import re
import sys
from urllib.parse import urlsplit

if sys.version_info < (3, 9):
    raise SystemExit("Python 3.9 or newer is required.")

root = Path(sys.argv[1]).resolve()
env_path = Path(sys.argv[2]).resolve()
if not env_path.is_file():
    raise SystemExit(f"Environment file not found: {env_path}")
if S_IMODE(env_path.stat().st_mode) & 0o077:
    raise SystemExit(f"Restrict {env_path} to owner access (chmod 600).")

values = {}
for number, raw in enumerate(env_path.read_text().splitlines(), 1):
    line = raw.strip()
    if not line or line.startswith("#"):
        continue
    key, separator, value = line.partition("=")
    if not separator or not re.fullmatch(r"[A-Z][A-Z0-9_]*", key.strip()):
        raise SystemExit(f"Invalid .env line {number}; use plain KEY=value entries.")
    values[key.strip()] = value.strip()

required = ("YEN_SITE_URL", "YEN_IMAGE_TAG", "CLOUDFLARED_IMAGE", "CLOUDFLARE_TUNNEL_TOKEN_FILE", "YEN_ACCESS_MODE")
missing = [key for key in required if not values.get(key)]
if missing:
    raise SystemExit("Set required values in .env.yen-home: " + ", ".join(missing))

site = urlsplit(values["YEN_SITE_URL"])
if site.scheme != "https" or not site.hostname or site.username or site.password or site.query or site.fragment or site.path not in ("", "/"):
    raise SystemExit("YEN_SITE_URL must be an HTTPS origin only, with no credentials, path, query, or fragment.")
hostname = site.hostname.lower().rstrip(".")
if hostname.startswith("replace-with-") or hostname.endswith((".example", ".example.com", ".example.net", ".example.org", ".invalid")):
    raise SystemExit("Replace the example YEN_SITE_URL with the approved real hostname.")

image_tag = values["YEN_IMAGE_TAG"]
if not re.fullmatch(r"[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}", image_tag) or image_tag.lower() in ("latest", "local"):
    raise SystemExit("YEN_IMAGE_TAG must be a unique, non-placeholder release tag (not latest/local).")

image = values["CLOUDFLARED_IMAGE"]
base_ref = image.split("@", 1)[0]
repository = base_ref.rsplit(":", 1)[0]
if repository.removeprefix("docker.io/") != "cloudflare/cloudflared":
    raise SystemExit("CLOUDFLARED_IMAGE must reference the official cloudflare/cloudflared image.")
if ":" not in base_ref.rsplit("/", 1)[-1]:
    raise SystemExit("CLOUDFLARED_IMAGE must pin an explicit release tag (optionally plus @sha256 digest).")
version = base_ref.rsplit(":", 1)[1]
match = re.fullmatch(r"v?(\d{4})\.(\d{1,2})\.(\d+)", version)
if not match or tuple(map(int, match.groups())) < (2025, 4, 0):
    raise SystemExit("CLOUDFLARED_IMAGE must use a cloudflared calendar release tag >= 2025.4.0 (required for --token-file).")

mode = values["YEN_ACCESS_MODE"]
user = values.get("SITE_ACCESS_USER", "")
password = values.get("SITE_ACCESS_PASSWORD", "")
if mode == "preview":
    access_confirmed = values.get("CLOUDFLARE_ACCESS_CONFIRMED") == "YES"
    access_risk_confirmed = values.get("YEN_PREVIEW_WITHOUT_ACCESS_CONFIRMED") == "YES"
    if access_confirmed == access_risk_confirmed:
        raise SystemExit("Preview requires exactly one choice: configure Cloudflare Access and set CLOUDFLARE_ACCESS_CONFIRMED=YES, or explicitly accept the weaker Basic-Auth-only boundary with YEN_PREVIEW_WITHOUT_ACCESS_CONFIRMED=YES.")
    if not user or len(password) < 16 or "REPLACE" in password.upper() or "CHANGE_ME" in password.upper():
        raise SystemExit("Preview mode requires a Yen Basic Auth user and unique password of at least 16 characters.")
    if access_risk_confirmed:
        print("WARNING: Preview is protected only by Yen Basic Auth; excluded static assets and robots.txt are not covered by Cloudflare Access.")
elif mode == "public":
    if values.get("YEN_PUBLIC_RELEASE_CONFIRMED") != "YES":
        raise SystemExit("Public deployment requires completed release/privacy review and YEN_PUBLIC_RELEASE_CONFIRMED=YES.")
    if user or password:
        raise SystemExit("For public mode, clear SITE_ACCESS_USER and SITE_ACCESS_PASSWORD so the site is not accidentally gated.")
else:
    raise SystemExit("YEN_ACCESS_MODE must be exactly 'preview' or 'public'.")

token_path = Path(values["CLOUDFLARE_TUNNEL_TOKEN_FILE"])
if not token_path.is_absolute():
    token_path = root / token_path
token_path = token_path.resolve()
if not token_path.is_file() or not token_path.read_bytes().strip():
    raise SystemExit(f"Tunnel token file is missing or empty: {token_path}")
if S_IMODE(token_path.stat().st_mode) & 0o077:
    raise SystemExit(f"Restrict {token_path} to owner access (chmod 600).")
if token_path.is_relative_to(root) and not token_path.is_relative_to(root / ".secrets"):
    raise SystemExit("Keep an in-repository tunnel token only under the gitignored .secrets/ directory.")

print("Yen Tunnel settings and secret-file permissions validated.")
PY

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" config --quiet
if [[ "$MODE" == "validate" ]]; then
  echo "Compose configuration is valid. No containers were started."
  exit 0
fi

if [[ "$MODE" == "deploy" ]]; then
    docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" build --pull yen
    docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" pull cloudflared
fi
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up --detach --no-build --wait --wait-timeout 180
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps
printf '\nYen is running. Confirm the named tunnel is Healthy in Cloudflare and test %s externally.\n' "$(sed -n 's/^YEN_SITE_URL=//p' "$ENV_FILE" | tail -n 1)"
