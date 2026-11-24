#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js no está instalado o no está en el PATH." >&2
  exit 1
fi

exec node "$SCRIPT_DIR/start.js"
