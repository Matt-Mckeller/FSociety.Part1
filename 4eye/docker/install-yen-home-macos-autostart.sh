#!/usr/bin/env bash
# Install or remove a per-user macOS LaunchAgent for Yen's existing stack.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="ai.4eye.yen-home"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
MODE="${1:-install}"
UID_VALUE="$(id -u)"

usage() {
  printf 'Usage: bash docker/install-yen-home-macos-autostart.sh [install|uninstall]\n'
}

if [[ "$MODE" == "-h" || "$MODE" == "--help" || "$MODE" == "help" ]]; then
  usage
  exit 0
fi

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This helper is for macOS only." >&2
  exit 2
fi
if [[ "$MODE" != "install" && "$MODE" != "uninstall" ]]; then
  usage >&2
  exit 2
fi

mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs"

if [[ "$MODE" == "uninstall" ]]; then
  launchctl bootout "gui/$UID_VALUE/$LABEL" 2>/dev/null || true
  rm -f "$PLIST"
  echo "Removed $LABEL. Running Yen containers were not stopped."
  exit 0
fi

if [[ ! -f "$ROOT/.env.yen-home" ]]; then
  echo "Missing $ROOT/.env.yen-home. Follow docker/yen-home-hosting.md first." >&2
  exit 1
fi
ROOT="$ROOT" PLIST="$PLIST" LABEL="$LABEL" python3 <<'PY'
import os
import plistlib
from pathlib import Path

root = Path(os.environ["ROOT"])
plist_path = Path(os.environ["PLIST"])
label = os.environ["LABEL"]
logs = Path.home() / "Library" / "Logs"
config = {
    "Label": label,
    "ProgramArguments": ["/bin/bash", str(root / "docker" / "start-yen-home-macos.sh")],
    "RunAtLoad": True,
    "KeepAlive": False,
    "ProcessType": "Background",
    "WorkingDirectory": str(root),
    "EnvironmentVariables": {
        "PATH": "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
    },
    "StandardOutPath": str(logs / "yen-home-launchd.log"),
    "StandardErrorPath": str(logs / "yen-home-launchd-error.log"),
}
plist_path.write_bytes(plistlib.dumps(config, fmt=plistlib.FMT_XML, sort_keys=True))
plist_path.chmod(0o600)
PY

launchctl bootout "gui/$UID_VALUE/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$UID_VALUE" "$PLIST"
launchctl kickstart "gui/$UID_VALUE/$LABEL"
printf 'Installed and started %s. Logs: %s/Library/Logs/yen-home-launchd*.log\n' "$LABEL" "$HOME"
printf 'Docker Desktop must be configured to start when you sign in.\n'
