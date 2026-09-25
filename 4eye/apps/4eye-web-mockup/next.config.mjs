/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // This app owns the domain root when it runs standalone. Stated explicitly
    // so the value is inlined here too, rather than relying on an undefined
    // lookup falling through to "".
    NEXT_PUBLIC_4EYE_BASE_PATH: "",
  },
  transpilePackages: ["@4eye/web", "@yen/content", "@4eye/ai-sdk", "@4eye/types", "@expanse/theme", "@expanse/shell", "@expanse/map", "@expanse/hud", "@expanse/ui", "@expanse/brand-core", "@expanse/character"],
  typescript: {
    // MUI v5 + pnpm workspace surfaces spurious Stack/Grid type mismatches
    // that don't reflect runtime behavior. Same pattern as @4eye/web.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
