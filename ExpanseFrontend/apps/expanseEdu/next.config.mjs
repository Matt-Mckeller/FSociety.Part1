/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
    Set only when this app is built for embedding in the yen site, which serves
    it as static files under a sub-path. Unset — every normal build — nothing
    below applies and the app builds exactly as it did before.
  */
  ...(process.env.YEN_MOUNT_PATH
    ? {
        output: "export",
        basePath: process.env.YEN_MOUNT_PATH,
        assetPrefix: process.env.YEN_MOUNT_PATH,
      }
    : {}),
  // Do static export, needs to be removed if needing server side functionality which
  // I'm not using at the moment
  output: "standalone",

  // Necessary for building
  transpilePackages: [
    // "expanse.ui/*",
    // "expanse.ui/auth",
    // "expanse.ui/points",
    // "expanse.ui/contact",
    "expanse.dynamicAssets",
  ],
  images: { unoptimized: true },

  // todo remove these and fix errors
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

export default nextConfig
