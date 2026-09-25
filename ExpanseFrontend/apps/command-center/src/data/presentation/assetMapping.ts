/**
 * Slide to Asset Mapping
 * Maps slide numbers to their associated media assets from the PowerPoint
 */

// Base paths for presentation assets
export const PRESENTATION_ASSETS_BASE = "/assets/expanseEdu/presentation"

export const SLIDE_IMAGES_PATH = `${PRESENTATION_ASSETS_BASE}/slides`
export const SLIDE_ANIMATIONS_PATH = `${PRESENTATION_ASSETS_BASE}/animations`

// Mapping of slide numbers to their associated image filenames
// Extracted from PowerPoint slide relationship files (.rels)
export const slideToAssetsMap: Record<number, string[]> = {
  1: ["image4.png", "image3.jpg", "image15.png"],
  2: ["image10.png"],
  3: ["image8.png"],
  5: ["image10.png"],
  6: ["image10.png", "image1.png"],
  8: ["image1.png"],
  9: ["image1.png"],
  10: ["image1.png"],
  11: ["image1.png"],
  13: ["image1.png"],
  14: ["image1.png"],
  15: ["image1.png"],
  17: ["image1.png"],
  18: ["image6.png"],
  19: ["image9.png"],
  20: ["image27.png"],
  21: ["image12.gif"],
  22: ["image13.gif"],
  23: ["image34.png"],
  24: ["image14.png"],
  25: ["image1.png"],
  27: ["image29.png"],
  28: ["image7.png", "image23.png"],
  29: ["image7.png", "image23.png", "image29.png"],
  30: ["image1.png", "image18.png"],
  32: ["image1.png", "image18.png"],
  33: ["image17.png", "image26.png", "image20.png", "image22.png"],
  34: ["image1.png"],
  35: ["image19.png"],
  39: ["image25.png"],
  40: ["image16.png"],
  52: ["image1.png"],
  56: ["image1.png", "image18.png"],
  57: [
    "image18.png",
    "image41.png",
    "image20.png",
    "image42.png",
    "image35.png",
    "image26.png",
    "image62.gif",
    "image46.png",
    "image47.gif",
    "image36.gif",
    "image17.png",
    "image48.png",
    "image4.png",
    "image45.jpg",
    "image19.png",
    "image39.png",
    "image38.png",
    "image37.png",
  ],
  58: ["image1.png"],
  62: [
    "image43.gif",
    "image52.png",
    "image57.png",
    "image60.png",
    "image53.png",
  ],
  63: ["image58.png", "image49.png", "image59.png", "image53.png"],
  64: ["image55.gif"],
  65: ["image13.gif", "image19.png"],
  66: ["image103.gif"],
  67: ["image13.gif", "image19.png"],
  68: ["image56.jpg", "image64.png"],
  69: ["image104.gif"],
  70: ["image104.gif"],
  71: ["image104.gif"],
  72: ["image17.png", "image39.png", "image55.gif"],
  73: [
    "image17.png",
    "image63.png",
    "image76.png",
    "image66.png",
    "image72.png",
  ],
  74: ["image17.png", "image39.png", "image19.png"],
  75: ["image1.png"],
  76: ["image95.png"],
  77: ["image68.png", "image69.png"],
  78: ["image65.gif", "image75.gif", "image37.png"],
  79: ["image68.png", "image69.png"],
  80: ["image77.gif", "image102.gif"],
  81: ["image13.gif", "image19.png"],
  82: ["image12.gif", "image74.gif"],
  83: [
    "image70.png",
    "image73.png",
    "image45.jpg",
    "image56.jpg",
    "image78.jpg",
  ],
  84: ["image37.png", "image83.gif"],
  85: ["image37.png", "image83.gif"],
  87: ["image79.png"],
  88: ["image79.png"],
  89: ["image81.png"],
  91: ["image1.png", "image84.png"],
  93: ["image94.gif", "image80.gif", "image98.gif"],
  94: ["image97.gif", "image105.gif"],
  99: ["image91.jpg"],
  101: ["image70.png", "image73.png", "image81.png"],
  103: ["image84.png"],
  107: [
    "image48.png",
    "image93.png",
    "image39.png",
    "image38.png",
    "image17.png",
    "image46.png",
    "image37.png",
    "image26.png",
    "image62.gif",
    "image19.png",
    "image41.png",
    "image20.png",
    "image42.png",
    "image35.png",
    "image102.gif",
    "image47.gif",
    "image36.gif",
    "image3.jpg",
    "image4.png",
  ],
  108: [
    "image48.png",
    "image93.png",
    "image39.png",
    "image38.png",
    "image17.png",
    "image46.png",
    "image37.png",
    "image26.png",
    "image62.gif",
    "image19.png",
    "image41.png",
    "image20.png",
    "image42.png",
    "image35.png",
    "image102.gif",
    "image47.gif",
    "image36.gif",
    "image3.jpg",
    "image4.png",
  ],
  109: [
    "image3.jpg",
    "image4.png",
    "image15.png",
    "image101.png",
    "image102.gif",
    "image20.png",
    "image41.png",
    "image26.png",
    "image62.gif",
  ],
  110: [
    "image48.png",
    "image93.png",
    "image38.png",
    "image46.png",
    "image37.png",
    "image26.png",
    "image62.gif",
    "image19.png",
    "image41.png",
    "image20.png",
    "image42.png",
    "image35.png",
    "image102.gif",
    "image47.gif",
    "image36.gif",
    "image3.jpg",
    "image4.png",
  ],
}

// Helper function to get asset URL
export function getAssetUrl(filename: string): string {
  if (filename.endsWith(".gif")) {
    return `${SLIDE_ANIMATIONS_PATH}/${filename}`
  }
  return `${SLIDE_IMAGES_PATH}/${filename}`
}

// Helper function to get all assets for a slide
export function getSlideAssets(slideNumber: number): string[] {
  const assets = slideToAssetsMap[slideNumber] || []
  return assets.map(getAssetUrl)
}

// Helper to check if asset is an animation
export function isAnimation(filename: string): boolean {
  return filename.endsWith(".gif")
}

// Get primary image for a slide (first non-placeholder image)
export function getPrimaryImage(slideNumber: number): string | null {
  const assets = slideToAssetsMap[slideNumber] || []
  // Skip image1.png as it's often just a placeholder/logo
  const primary = assets.find((a) => a !== "image1.png" && !a.endsWith(".gif"))
  if (primary) return getAssetUrl(primary)
  // Fall back to first asset
  const fallback = assets[0]
  return fallback ? getAssetUrl(fallback) : null
}

// Get animations for a slide
export function getSlideAnimations(slideNumber: number): string[] {
  const assets = slideToAssetsMap[slideNumber] || []
  return assets.filter(isAnimation).map(getAssetUrl)
}

// Asset metadata for categorization
export const assetCategories = {
  logos: ["image1.png", "image4.png"],
  screenshots: ["image10.png", "image27.png", "image34.png", "image29.png"],
  charts: ["image16.png", "image25.png", "image19.png"],
  icons: ["image17.png", "image37.png", "image38.png", "image39.png"],
  photos: [
    "image3.jpg",
    "image45.jpg",
    "image56.jpg",
    "image78.jpg",
    "image91.jpg",
  ],
  diagrams: ["image6.png", "image7.png", "image8.png", "image9.png"],
}
