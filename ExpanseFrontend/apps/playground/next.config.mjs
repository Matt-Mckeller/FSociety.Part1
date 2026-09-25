/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for deployment
  output: "standalone",

  // Transpile local packages
  transpilePackages: ["expanse.dynamicAssets", "expanse.ui"],

  images: { unoptimized: true },

  // Allow builds with warnings (remove these after fixing)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
