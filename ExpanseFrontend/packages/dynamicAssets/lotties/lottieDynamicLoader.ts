/**
 * Dynamic Lottie Loader
 * 
 * Provides a way to load lottie-web dynamically on the client side only,
 * avoiding "document is not defined" errors during Next.js SSR.
 * 
 * Usage in components:
 * ```tsx
 * import { getLottie } from "../../lottieDynamicLoader"
 * 
 * useLayoutEffect(() => {
 *   getLottie().then((lottie) => {
 *     if (lottie) {
 *       animationInstance.current = lottie.loadAnimation({...})
 *     }
 *   })
 * }, [])
 * ```
 */

import type { LottiePlayer } from "lottie-web"

let lottieInstance: LottiePlayer | null = null
let lottiePromise: Promise<LottiePlayer | null> | null = null

/**
 * Gets the lottie-web instance, loading it dynamically if needed.
 * Safe to call on the server (returns null on server).
 */
export async function getLottie(): Promise<LottiePlayer | null> {
  // Already loaded
  if (lottieInstance) {
    return lottieInstance
  }

  // Currently loading
  if (lottiePromise) {
    return lottiePromise
  }

  // Only load on client
  if (typeof window === "undefined") {
    // Return null on server
    return null
  }

  // Load lottie-web dynamically
  lottiePromise = import("lottie-web").then((module) => {
    lottieInstance = module.default
    return lottieInstance
  })

  return lottiePromise
}

/**
 * Synchronously get lottie if already loaded (for use in effects after initial load)
 */
export function getLottieSync(): LottiePlayer | null {
  return lottieInstance
}

export default getLottie
