import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for containerized deployments
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

export default withNextIntl(nextConfig)
