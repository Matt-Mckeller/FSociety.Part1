import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /*
    Set only when this app is built for embedding in the yen site, which serves
    it as static files under a sub-path. Unset — every normal build — nothing
    below applies and the app builds exactly as it did before.
  */
  ...(process.env.YEN_MOUNT_PATH
    ? {
        output: 'export',
        basePath: process.env.YEN_MOUNT_PATH,
        assetPrefix: process.env.YEN_MOUNT_PATH,
      }
    : {}),
};

export default nextConfig;
