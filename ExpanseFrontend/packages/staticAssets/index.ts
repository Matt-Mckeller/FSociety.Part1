/**
 * Static asset path constants for the expanse.staticAssets package.
 *
 * These paths are configured to work with Storybook's staticDirs configuration.
 * For production apps (Next.js), you may need to adjust the base path depending
 * on how assets are served (e.g., from /public directory or a CDN).
 *
 * @example
 * ```tsx
 * import { STATIC_ASSETS } from 'expanse.staticAssets';
 *
 * <img src={STATIC_ASSETS.images.profilePhoto1} alt="Profile" />
 * ```
 */
export const STATIC_ASSETS = {
  images: {
    profileSubtleLines: "/assets/images/Profile50_50_subtle_lines.png",
    profileDarkerLines: "/assets/images/Profile50_50_darker_lines.png",
  },
  vectors: {
    logoBlack: "/assets/vectors/logoBlack.svg",
  },
  favicon: {
    ico: "/assets/favicon/favicon.ico",
    favicon16: "/assets/favicon/favicon-16x16.png",
    favicon32: "/assets/favicon/favicon-32x32.png",
    appleTouchIcon: "/assets/favicon/apple-touch-icon.png",
    androidChrome192: "/assets/favicon/android-chrome-192x192.png",
    androidChrome512: "/assets/favicon/android-chrome-512x512.png",
    mstile150: "/assets/favicon/mstile-150x150.png",
    safariPinnedTab: "/assets/favicon/safari-pinned-tab.svg",
    siteWebmanifest: "/assets/favicon/site.webmanifest",
    browserconfig: "/assets/favicon/browserconfig.xml",
  },
  openGraph: {
    simple: "/assets/openGraph/ogImageSimple.jpg",
  },
} as const

/**
 * Type representing all available static asset paths.
 */
export type StaticAssets = typeof STATIC_ASSETS

/**
 * Helper to get the base path for static assets.
 * Override this in your app's configuration if assets are served from a different location.
 */
export const STATIC_ASSETS_BASE = "/assets"

/**
 * Expanse EDU Presentation Assets
 */
export * from "./expanseEdu/presentation"
