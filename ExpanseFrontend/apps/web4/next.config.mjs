/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["expanse.ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
