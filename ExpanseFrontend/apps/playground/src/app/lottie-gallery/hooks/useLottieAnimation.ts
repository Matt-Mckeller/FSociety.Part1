/**
 * Lottie Animation Hook
 * Manages loading, theming, and control of individual Lottie animations
 */

import { useRef, useEffect, useState } from "react"
import type { AnimationItem } from "lottie-web"
import type { Animation } from "../utils/animationRegistry"
import { loadAnimationData } from "../utils/animationLoader"

export interface UseLottieAnimationOptions {
  animation: Animation
  themeColor: string
  skipLayers?: string[]
  autoplay?: boolean
  loop?: boolean
}

export interface AnimationInfo {
  duration: number
  fps: number
  layers: number
}

export function useLottieAnimation({
  animation,
  themeColor,
  skipLayers = [],
  autoplay = true,
  loop = true,
}: UseLottieAnimationOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<AnimationItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [animationInfo, setAnimationInfo] = useState<AnimationInfo | null>(null)

  useEffect(() => {
    console.log("[useLottieAnimation] useEffect started for:", animation.name)
    if (!containerRef.current) {
      console.log("[useLottieAnimation] No container ref for:", animation.name)
      return
    }

    let isMounted = true
    let currentInstance: AnimationItem | null = null
    const container = containerRef.current
    let loadTimeout: NodeJS.Timeout | null = null
    console.log(
      "[useLottieAnimation] Container captured for:",
      animation.name,
      container ? "exists" : "null",
    )

    const loadAnimation = async () => {
      console.log("[useLottieAnimation] Loading animation:", animation.name)
      setIsLoading(true)
      setError(null)

      // Add delay to wait out React StrictMode's intentional unmount
      await new Promise((resolve) => {
        loadTimeout = setTimeout(resolve, 100)
      })

      // Check if still mounted after delay (StrictMode unmount will have passed)
      if (!isMounted || !containerRef.current) {
        console.log(
          "[useLottieAnimation] Aborted after stability check (likely StrictMode):",
          animation.name,
        )
        return
      }

      try {
        // Dynamically import lottie-web (client-side only)
        const Lottie = (await import("lottie-web")).default
        console.log(
          "[useLottieAnimation] Lottie-web imported for:",
          animation.name,
        )

        // Load animation data from API
        const animationData = await loadAnimationData(animation)
        console.log(
          "[useLottieAnimation] Animation data loaded for:",
          animation.name,
        )

        // Check again after async operations complete
        if (!isMounted || !container || !containerRef.current) {
          console.log(
            "[useLottieAnimation] Aborted (unmounted) for:",
            animation.name,
            {
              isMounted,
              hasContainer: !!container,
              hasContainerRef: !!containerRef.current,
              containerInDOM: container
                ? document.body.contains(container)
                : false,
            },
          )
          return
        }

        // Load Lottie animation
        console.log(
          "[useLottieAnimation] Creating lottie instance for:",
          animation.name,
        )
        const instance = Lottie.loadAnimation({
          container: container as Element,
          renderer: "svg",
          loop,
          autoplay,
          animationData: animationData,
        })
        console.log(
          "[useLottieAnimation] Lottie instance created for:",
          animation.name,
        )

        if (!isMounted) {
          // Component unmounted during load, clean up immediately
          console.log(
            "[useLottieAnimation] Component unmounted during load, destroying:",
            animation.name,
          )
          try {
            instance.destroy()
          } catch (e) {
            console.error(
              "[useLottieAnimation] ❌ Error destroying after unmount:",
              animation.name,
              e,
            )
          }
          return
        }

        currentInstance = instance
        instanceRef.current = instance
        console.log("[useLottieAnimation] Instance stored for:", animation.name)

        // Set animation info
        const duration = animationData.op / animationData.fr
        setAnimationInfo({
          duration: parseFloat(duration.toFixed(2)),
          fps: animationData.fr,
          layers: animationData.layers?.length || 0,
        })
        console.log(
          "[useLottieAnimation] Animation info set for:",
          animation.name,
        )

        setIsLoading(false)
        console.log(
          "[useLottieAnimation] ✅ Load complete for:",
          animation.name,
        )
      } catch (err) {
        console.error(
          "[useLottieAnimation] ❌ Load error for:",
          animation.name,
          err,
        )
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load")
          setIsLoading(false)
        }
      }
    }

    loadAnimation()

    // Cleanup function
    return () => {
      console.log("[useLottieAnimation] Cleanup started for:", animation.name)
      isMounted = false

      // Clear any pending timeout
      if (loadTimeout) {
        clearTimeout(loadTimeout)
        loadTimeout = null
      }

      // Destroy current instance
      if (currentInstance) {
        try {
          console.log(
            "[useLottieAnimation] Stopping animation:",
            animation.name,
          )
          // Stop animation first to prevent DOM operations during destroy
          currentInstance.stop()

          // Only destroy if container is still in document
          // This prevents "Failed to execute 'removeChild'" errors
          const isInDOM = container && document.body.contains(container)
          console.log(
            "[useLottieAnimation] Container in DOM?",
            isInDOM,
            "for:",
            animation.name,
          )

          if (isInDOM) {
            console.log(
              "[useLottieAnimation] Destroying lottie instance:",
              animation.name,
            )
            try {
              // Additional safety: check if destroy method exists
              if (typeof currentInstance.destroy === "function") {
                currentInstance.destroy()
                console.log(
                  "[useLottieAnimation] Destroyed successfully:",
                  animation.name,
                )
              } else {
                console.warn(
                  "[useLottieAnimation] No destroy method for:",
                  animation.name,
                )
              }
            } catch (destroyError) {
              // Catch specifically the destroy call error
              console.error(
                "[useLottieAnimation] ❌ Destroy call failed for:",
                animation.name,
              )
              console.error("[useLottieAnimation] Error details:", {
                name:
                  destroyError instanceof Error ? destroyError.name : "Unknown",
                message:
                  destroyError instanceof Error
                    ? destroyError.message
                    : String(destroyError),
                stack:
                  destroyError instanceof Error
                    ? destroyError.stack
                    : undefined,
              })
              throw destroyError // Re-throw to be caught by outer catch
            }
          } else {
            console.log(
              "[useLottieAnimation] Skipping destroy (container detached):",
              animation.name,
            )
            // Container already removed from DOM, just clear reference
            // lottie-web will fail if we try to destroy when parent is detached
            currentInstance = null
          }
        } catch (e) {
          // Log full error details
          console.error(
            "[useLottieAnimation] ❌ Cleanup error for:",
            animation.name,
          )
          console.error(
            "[useLottieAnimation] Error type:",
            e instanceof Error ? e.constructor.name : typeof e,
          )
          console.error(
            "[useLottieAnimation] Error message:",
            e instanceof Error ? e.message : String(e),
          )
          console.error("[useLottieAnimation] Full error:", e)
          if (e instanceof Error && e.stack) {
            console.error("[useLottieAnimation] Stack trace:", e.stack)
          }
        }
        currentInstance = null
      }

      // Also clean up ref
      if (instanceRef.current) {
        try {
          console.log(
            "[useLottieAnimation] Cleaning up instanceRef for:",
            animation.name,
          )
          instanceRef.current.stop()
          if (container && document.body.contains(container)) {
            instanceRef.current.destroy()
          }
        } catch (e) {
          console.error(
            "[useLottieAnimation] ❌ Ref cleanup error for:",
            animation.name,
            e,
          )
        }
        instanceRef.current = null
      }

      // Clear container if it still exists in DOM
      if (container && document.body.contains(container)) {
        try {
          console.log(
            "[useLottieAnimation] Clearing container HTML for:",
            animation.name,
          )
          container.innerHTML = ""
        } catch (e) {
          console.error(
            "[useLottieAnimation] ❌ Container clear error for:",
            animation.name,
            e,
          )
        }
      }

      console.log("[useLottieAnimation] Cleanup completed for:", animation.name)
    }
  }, [animation.path, themeColor, autoplay, loop]) // Dependencies that trigger re-mount

  // Log when dependencies change
  useEffect(() => {
    console.log("[useLottieAnimation] Dependencies changed:", {
      name: animation.name,
      path: animation.path,
      themeColor,
      autoplay,
      loop,
    })
  }, [animation.path, themeColor, autoplay, loop, animation.name])

  // Control functions
  const play = () => instanceRef.current?.play()
  const pause = () => instanceRef.current?.pause()
  const stop = () => instanceRef.current?.stop()
  const reload = () => {
    if (instanceRef.current) {
      instanceRef.current.goToAndPlay(0)
    }
  }

  return {
    containerRef,
    isLoading,
    error,
    animationInfo,
    controls: {
      play,
      pause,
      stop,
      reload,
    },
  }
}
