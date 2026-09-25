/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: [
    '@four-eye/types',
    '@four-eye/utils',
    '@four-eye/graphql-schema',
    '@expanse/character',
  ],
};

export default nextConfig;
