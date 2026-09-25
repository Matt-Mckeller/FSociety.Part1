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
        /*
          This app has pre-existing type and lint errors. They are tolerated
          only for the embed build so the site can serve the app unmodified;
          a normal `next build` still reports them.
        */
        typescript: { ignoreBuildErrors: true },
        eslint: { ignoreDuringBuilds: true },
      }
    : {}),
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
