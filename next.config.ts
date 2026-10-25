import type { NextConfig } from "next";

// The image builds the site for the address it is served at (the Dockerfile passes PUBLIC_PATH, empty for the
// host's root, which is where this site lives).
const publicPath = process.env.PUBLIC_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: publicPath || undefined,
  // /about is about/index.html, which the static server finds for /about/.
  trailingSlash: true,
  // The image optimizer is a server feature.
  images: { unoptimized: true },
};

export default nextConfig;
