#!/bin/sh
# The `lint` check: the dependencies from package-lock.json (npm ci), then `npm run lint`, ESLint with
# eslint.config.mjs (Next.js's core-web-vitals and TypeScript rules).
#
# yggdrasil.yml runs it in the pinned Node image of the Dockerfile's build stage (Alpine: POSIX sh) from the
# repository's root. By hand:
#   docker run --rm -v "$PWD:/src" -w /src <image from yggdrasil.yml> sh ci/lint.sh
set -eu

# The repository's root, wherever this is run from.
cd "$(dirname "$0")/.."

export NEXT_TELEMETRY_DISABLED=1 NPM_CONFIG_UPDATE_NOTIFIER=false
npm ci --no-audit --no-fund
npm run lint
