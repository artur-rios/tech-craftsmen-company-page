#!/bin/sh
# The `build` check: the Dockerfile builds the image a deploy builds, with the build arguments the stack passes
# (yggdrasil's stacks/tech-craftsmen-company-page.yml): the site's address (www.techcraftsmen.net, at its root; the
# Dockerfile does not use the host), the environment (production, what the release pull request deploys) and the
# commit. `next build` runs inside it, the static export included. Build only, no push and no run: the point is that
# the image can still be produced.
#
# yggdrasil.yml runs it in the pinned Docker CLI image (Alpine: no bash, so this is POSIX sh) with the CI engine's
# socket, from the repository's root. By hand, with your own engine:
#   docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:/src" -w /src <image from yggdrasil.yml> sh ci/build.sh
set -eu

# The repository's root, wherever this is run from.
cd "$(dirname "$0")/.."

# The commit, as deploy.sh passes it; empty where the checkout is not a git repository git can read.
commit=$(git -c safe.directory='*' rev-parse HEAD 2>/dev/null || true)

# A tag of this run's own (the container's hostname is its id): two builds at once never share one.
tag="tech-craftsmen-company-page-check:$(hostname)"
# The image is only built to prove the Dockerfile works: remove it afterwards, whatever the outcome.
trap 'docker image rm --force "$tag" >/dev/null 2>&1 || true' EXIT

DOCKER_BUILDKIT=1 docker build --tag "$tag" \
  --build-arg PUBLIC_HOST=www.techcraftsmen.net \
  --build-arg PUBLIC_PATH= \
  --build-arg YGG_ENVIRONMENT=production \
  --build-arg GIT_COMMIT="$commit" \
  .
