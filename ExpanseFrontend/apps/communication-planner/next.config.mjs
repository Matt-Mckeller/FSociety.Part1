import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const yenEmbed = Boolean(process.env.YEN_MOUNT_PATH)

/** @type {import('next').NextConfig} */
const yenMount = yenEmbed
  ? {
      output: "export",
      basePath: process.env.YEN_MOUNT_PATH,
      assetPrefix: process.env.YEN_MOUNT_PATH,
      trailingSlash: true,
    }
  : {
      output: "standalone",
    }

const nextConfig = {
  /*
    YEN_MOUNT_PATH is set only when this app is built for embedding in the yen
    site, which serves it as static files under a sub-path. Unset — every
    normal build — standalone output, same as before.

    `output` must live in this branch, not after it: a later `output:
    "standalone"` would overwrite `output: "export"` and the embed build would
    produce no `out/` directory, so the app could not start on yen.
  */
  ...yenMount,
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    /*
      The yen embed must not ship the local working session. Point every
      `@/data/session` import at the public demo file for that build only.
    */
    if (yenEmbed) {
      const demo = path.join(here, "src/data/session.public.ts")
      config.resolve.alias["@/data/session"] = demo
      config.resolve.alias[path.join(here, "src/data/session.ts")] = demo
    }
    return config
  },
}

export default nextConfig
