/**
 * Expanse EDU Presentation Assets Index
 * Media files extracted from PowerPoint presentations
 */

// Static Images (PNG/JPG) - located in slides/
export const slideImages = {
  image1: new URL("./slides/image1.png", import.meta.url).href,
  image3: new URL("./slides/image3.jpg", import.meta.url).href,
  image4: new URL("./slides/image4.png", import.meta.url).href,
  image6: new URL("./slides/image6.png", import.meta.url).href,
  image7: new URL("./slides/image7.png", import.meta.url).href,
  image8: new URL("./slides/image8.png", import.meta.url).href,
  image9: new URL("./slides/image9.png", import.meta.url).href,
  image10: new URL("./slides/image10.png", import.meta.url).href,
  image14: new URL("./slides/image14.png", import.meta.url).href,
  image15: new URL("./slides/image15.png", import.meta.url).href,
  image16: new URL("./slides/image16.png", import.meta.url).href,
  image17: new URL("./slides/image17.png", import.meta.url).href,
  image18: new URL("./slides/image18.png", import.meta.url).href,
  image19: new URL("./slides/image19.png", import.meta.url).href,
  image20: new URL("./slides/image20.png", import.meta.url).href,
  image22: new URL("./slides/image22.png", import.meta.url).href,
  image23: new URL("./slides/image23.png", import.meta.url).href,
  image25: new URL("./slides/image25.png", import.meta.url).href,
  image26: new URL("./slides/image26.png", import.meta.url).href,
  image27: new URL("./slides/image27.png", import.meta.url).href,
  image29: new URL("./slides/image29.png", import.meta.url).href,
  image34: new URL("./slides/image34.png", import.meta.url).href,
  image35: new URL("./slides/image35.png", import.meta.url).href,
  image37: new URL("./slides/image37.png", import.meta.url).href,
  image38: new URL("./slides/image38.png", import.meta.url).href,
  image39: new URL("./slides/image39.png", import.meta.url).href,
  image41: new URL("./slides/image41.png", import.meta.url).href,
  image42: new URL("./slides/image42.png", import.meta.url).href,
  image45: new URL("./slides/image45.jpg", import.meta.url).href,
  image46: new URL("./slides/image46.png", import.meta.url).href,
  image48: new URL("./slides/image48.png", import.meta.url).href,
  image49: new URL("./slides/image49.png", import.meta.url).href,
  image52: new URL("./slides/image52.png", import.meta.url).href,
  image53: new URL("./slides/image53.png", import.meta.url).href,
  image56: new URL("./slides/image56.jpg", import.meta.url).href,
  image57: new URL("./slides/image57.png", import.meta.url).href,
  image58: new URL("./slides/image58.png", import.meta.url).href,
  image59: new URL("./slides/image59.png", import.meta.url).href,
  image60: new URL("./slides/image60.png", import.meta.url).href,
  image63: new URL("./slides/image63.png", import.meta.url).href,
  image64: new URL("./slides/image64.png", import.meta.url).href,
  image66: new URL("./slides/image66.png", import.meta.url).href,
  image68: new URL("./slides/image68.png", import.meta.url).href,
  image69: new URL("./slides/image69.png", import.meta.url).href,
  image70: new URL("./slides/image70.png", import.meta.url).href,
  image72: new URL("./slides/image72.png", import.meta.url).href,
  image73: new URL("./slides/image73.png", import.meta.url).href,
  image76: new URL("./slides/image76.png", import.meta.url).href,
  image78: new URL("./slides/image78.jpg", import.meta.url).href,
  image79: new URL("./slides/image79.png", import.meta.url).href,
  image81: new URL("./slides/image81.png", import.meta.url).href,
  image84: new URL("./slides/image84.png", import.meta.url).href,
  image91: new URL("./slides/image91.jpg", import.meta.url).href,
  image93: new URL("./slides/image93.png", import.meta.url).href,
  image95: new URL("./slides/image95.png", import.meta.url).href,
  image101: new URL("./slides/image101.png", import.meta.url).href,
} as const

// Animated GIFs - located in animations/
export const animatedImages = {
  image12: new URL("./animations/image12.gif", import.meta.url).href,
  image13: new URL("./animations/image13.gif", import.meta.url).href,
  image36: new URL("./animations/image36.gif", import.meta.url).href,
  image43: new URL("./animations/image43.gif", import.meta.url).href,
  image47: new URL("./animations/image47.gif", import.meta.url).href,
  image55: new URL("./animations/image55.gif", import.meta.url).href,
  image62: new URL("./animations/image62.gif", import.meta.url).href,
  image65: new URL("./animations/image65.gif", import.meta.url).href,
  image74: new URL("./animations/image74.gif", import.meta.url).href,
  image75: new URL("./animations/image75.gif", import.meta.url).href,
  image77: new URL("./animations/image77.gif", import.meta.url).href,
  image80: new URL("./animations/image80.gif", import.meta.url).href,
  image83: new URL("./animations/image83.gif", import.meta.url).href,
  image94: new URL("./animations/image94.gif", import.meta.url).href,
  image97: new URL("./animations/image97.gif", import.meta.url).href,
  image98: new URL("./animations/image98.gif", import.meta.url).href,
  // Large GIFs (20MB+)
  image102: new URL("./animations/image102.gif", import.meta.url).href,
  image103: new URL("./animations/image103.gif", import.meta.url).href,
  image104: new URL("./animations/image104.gif", import.meta.url).href,
  image105: new URL("./animations/image105.gif", import.meta.url).href,
} as const

// Combined export
export const presentationAssets = {
  ...slideImages,
  ...animatedImages,
} as const

// Asset metadata for future use
export interface AssetMetadata {
  id: string
  type: "png" | "jpg" | "gif"
  size?: string
  description?: string
  usedInSlides?: number[]
}

// Placeholder for asset mapping (to be populated as slides are linked to assets)
export const assetMetadata: Record<string, AssetMetadata> = {
  // Will be populated as we map images to slides
}
