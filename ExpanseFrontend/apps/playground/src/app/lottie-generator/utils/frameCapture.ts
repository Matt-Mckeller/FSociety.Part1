/**
 * Capture frames from Lottie animation for AI visual analysis
 */
import lottie, { AnimationItem } from "lottie-web"
import type { LottieAnimation } from "../types"

export interface CapturedFrame {
  dataUrl: string
  frameNumber: number
  timestamp: number
  description: string
}

/**
 * Capture key frames from a Lottie animation
 */
export async function captureAnimationFrames(
  animation: LottieAnimation,
  frameCount: number = 5,
): Promise<CapturedFrame[]> {
  return new Promise((resolve, reject) => {
    // Create temporary container
    const container = document.createElement("div")
    container.style.width = `${animation.w}px`
    container.style.height = `${animation.h}px`
    container.style.position = "absolute"
    container.style.left = "-9999px"
    document.body.appendChild(container)

    try {
      // Load animation
      const anim: AnimationItem = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: animation,
      })

      const totalFrames = anim.totalFrames
      const frames: CapturedFrame[] = []

      // Calculate frame positions to capture
      const framePositions = calculateFramePositions(totalFrames, frameCount)

      let currentIndex = 0

      const captureNextFrame = () => {
        if (currentIndex >= framePositions.length) {
          // Cleanup
          anim.destroy()
          document.body.removeChild(container)
          resolve(frames)
          return
        }

        const frameNum = framePositions[currentIndex]
        anim.goToAndStop(frameNum, true)

        // Wait for render
        setTimeout(async () => {
          const svg = container.querySelector("svg")
          if (svg) {
            const dataUrl = await svgToDataUrl(svg)
            frames.push({
              dataUrl,
              frameNumber: frameNum,
              timestamp: frameNum / animation.fr,
              description: getFrameDescription(frameNum, totalFrames),
            })
          }

          currentIndex++
          captureNextFrame()
        }, 100)
      }

      captureNextFrame()
    } catch (error) {
      document.body.removeChild(container)
      reject(error)
    }
  })
}

/**
 * Calculate which frames to capture
 */
function calculateFramePositions(totalFrames: number, count: number): number[] {
  if (count === 1) return [Math.floor(totalFrames / 2)]

  const positions: number[] = []
  const step = totalFrames / (count - 1)

  for (let i = 0; i < count; i++) {
    positions.push(Math.floor(i * step))
  }

  return positions
}

/**
 * Convert SVG to PNG Data URL
 */
function svgToDataUrl(svg: SVGSVGElement): Promise<string> {
  return new Promise((resolve) => {
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svg)

    // Convert SVG to PNG for better AI compatibility
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      // Fallback to SVG if canvas not available
      const encodedSvg = encodeURIComponent(svgString)
      resolve(`data:image/svg+xml,${encodedSvg}`)
      return
    }

    const img = new Image()
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      canvas.width = img.width || 512
      canvas.height = img.height || 512
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      // Convert to PNG data URL
      const pngDataUrl = canvas.toDataURL("image/png")
      resolve(pngDataUrl)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      // Fallback to SVG
      const encodedSvg = encodeURIComponent(svgString)
      resolve(`data:image/svg+xml,${encodedSvg}`)
    }

    img.src = url
  })
}

/**
 * Get description for frame position
 */
function getFrameDescription(frameNum: number, totalFrames: number): string {
  const position = frameNum / totalFrames

  if (position < 0.1) return "Opening frame"
  if (position < 0.3) return "Early animation"
  if (position < 0.5) return "Mid-point"
  if (position < 0.7) return "Later animation"
  if (position < 0.9) return "Near end"
  return "Final frame"
}

/**
 * Capture single frame at specific time
 */
export async function captureSingleFrame(
  animation: LottieAnimation,
  frameNumber?: number,
): Promise<CapturedFrame> {
  const frames = await captureAnimationFrames(animation, 1)
  return frames[0]
}
