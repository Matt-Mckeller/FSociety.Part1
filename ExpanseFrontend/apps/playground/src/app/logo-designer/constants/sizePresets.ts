/**
 * Size Presets for Logo Multi-Size Preview
 * 
 * Defines standard sizes for different use cases:
 * - Favicons (browser tab icons)
 * - App Icons (mobile/desktop apps)
 * - Web (navigation, cards, heroes)
 * - Print (large format)
 */

export interface SizePreset {
  name: string
  size: number
  category: 'favicon' | 'icon' | 'web' | 'print'
  description?: string
}

export const SIZE_PRESETS: SizePreset[] = [
  // Favicons
  { name: 'Favicon', size: 16, category: 'favicon', description: 'Browser tab icon' },
  { name: 'Favicon 2x', size: 32, category: 'favicon', description: 'Retina browser tab' },
  
  // App Icons
  { name: 'App Small', size: 48, category: 'icon', description: 'Small app icon' },
  { name: 'App Medium', size: 64, category: 'icon', description: 'Desktop app icon' },
  { name: 'App Large', size: 128, category: 'icon', description: 'App store icon' },
  
  // Web Usage
  { name: 'Nav', size: 40, category: 'web', description: 'Navigation header' },
  { name: 'Avatar', size: 80, category: 'web', description: 'Profile cards' },
  { name: 'Card', size: 120, category: 'web', description: 'Card thumbnails' },
  { name: 'Hero', size: 200, category: 'web', description: 'Hero sections' },
  
  // Print/Large
  { name: 'Standard', size: 300, category: 'print', description: 'Standard web' },
  { name: 'Large', size: 400, category: 'print', description: 'Large display' },
]

export const CATEGORY_LABELS: Record<SizePreset['category'], string> = {
  favicon: 'Browser',
  icon: 'App Icons',
  web: 'Web',
  print: 'Large',
}

export const CATEGORY_ORDER: SizePreset['category'][] = ['favicon', 'icon', 'web', 'print']

/**
 * Group presets by category
 */
export function groupPresetsByCategory(presets: SizePreset[]): Record<string, SizePreset[]> {
  return presets.reduce((acc, preset) => {
    if (!acc[preset.category]) {
      acc[preset.category] = []
    }
    acc[preset.category].push(preset)
    return acc
  }, {} as Record<string, SizePreset[]>)
}
