#!/usr/bin/env bash
# LaunchAgent entry point: wait for Docker Desktop, then start the existing stack.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This startup helper is for macOS only." >&2
  exit 2
fi

if [[ ! -f "$ROOT/.env.yen-home" ]]; then
  echo "Missing $ROOT/.env.yen-home; configure the hosting runbook before enabling autostart." >&2
  exit 1
fi

# Launch Docker Desktop if the user has it installed; its engine can still take
# time to become ready, so the bounded readiness loop below remains necessary.
open -a Docker >/dev/null 2>&1 || true

# LaunchAgent can run before Docker Desktop's engine is ready. Bound the wait
# so LaunchAgent logs a useful failure instead of retrying forever.
for attempt in {1..60}; do
  if docker info >/dev/null 2>&1; then
    exec /bin/bash "$ROOT/docker/deploy-yen-tunnel.sh" start
  fi
  /bin/sleep 10
done

echo "Docker Desktop engine did not become ready within 10 minutes." >&2
exit 1
