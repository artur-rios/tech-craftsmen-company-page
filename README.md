# Tech Craftsmen company page

The page of [Tech Craftsmen](https://www.techcraftsmen.net): a [Next.js](https://nextjs.org) site exported as static
files (`output: 'export'`).

The repository lives at <https://git.techcraftsmen.net/artur-rios/tech-craftsmen-company-page>. GitHub is a read-only
mirror of it: open issues and pull requests on the git server, not on GitHub.

```bash
git clone https://git.techcraftsmen.net/artur-rios/tech-craftsmen-company-page.git
```

## Develop

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run build      # the static site, in out/
```

## Run the image

The `Dockerfile` builds the export and serves it with [static-web-server](https://static-web-server.net/) on port 8080,
as a non-root user. `/healthz` answers `ok`.

```bash
docker build --tag tech-craftsmen-company-page .
docker run --rm -p 8080:8080 tech-craftsmen-company-page
```

The build arguments are the ones yggdrasil's deploy passes: `PUBLIC_PATH` (empty: the site lives at its host's root),
`GIT_COMMIT` and `YGG_ENVIRONMENT` (public values, they end up in the image).

## Release

The site is served by [yggdrasil](https://git.techcraftsmen.net/artur-rios/yggdrasil) at `www.techcraftsmen.net`
(`techcraftsmen.net` redirects to it). A `release/*` branch deploys the homologation environment; the release pull
request into `main` deploys production, and Jenkins merges it and tags `v*`. Feature branches are cut from and merged
into `develop`.
