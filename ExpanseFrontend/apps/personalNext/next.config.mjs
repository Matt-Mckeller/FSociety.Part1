/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do static export, needs to be removed if needing server side functionality which
  // I'm not using at the moment
  output: "export",

  // Necessary for building
  transpilePackages: [
    "expanse.ui/*",
    "expanse.ui/auth",
    "expanse.ui/points",
    "expanse.ui/contact",
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
