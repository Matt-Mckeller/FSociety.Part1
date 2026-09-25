/**
 * Logo Config Utilities
 * Convert LogoConfig to component props and generate code
 */

import { LogoConfig, DEFAULT_CONFIG } from "../types"
import { ExpanseLogoV3Props, RING_EXTENT_PRESETS } from "expanse.dynamicAssets/logo"

/**
 * Convert LogoConfig to ExpanseLogoV3Props
 */
export function configToProps(config: LogoConfig): ExpanseLogoV3Props {
  const props: ExpanseLogoV3Props = {}

  // Ring extent - use preset or custom values
  if (config.extentMode === 'preset') {
    props.ringExtent = config.ringExtent
  } else {
    props.orbitalRx = config.customRx
    props.orbitalRy = config.circular ? config.customRx : config.customRy
  }

  // Rotation
  props.orbitalRotation = config.orbitalRotation

  // Mirrored rings (default is now true, so only set when false)
  if (!config.mirroredRings) {
    props.mirroredRings = false
  }

  // Show primary rings (default is now false, so only set when true)
  if (config.showPrimaryRings) {
    props.showPrimaryRings = true
  }

  // Ring spacing
  if (config.ringSpacing === 'fixed') {
    props.ringSpacing = 'fixed'
    props.fixedGap1 = config.fixedGap1
    props.fixedGap2 = config.fixedGap2
  }

  // Circular
  if (config.circular) {
    props.circular = true
  }

  // Stroke width
  if (config.ringStrokeWidth !== 4) {
    props.ringStrokeWidth = config.ringStrokeWidth
  }

  // Ring opacity
  if (config.opacityMode === 'custom') {
    // Use individual ring opacities
    props.innerRingOpacity = config.customOpacities.inner
    props.middleRingOpacity = config.customOpacities.middle
    props.outerRingOpacity = config.customOpacities.outer
  } else {
    // Use 1:2:3 scaling with base opacity
    if (config.baseOpacity !== 1) {
      props.orbitalOpacity = config.baseOpacity
    }
  }

  // Back ring opacity (for rings behind sphere)
  if (config.backRingOpacity !== 0.28) {
    props.backRingOpacity = config.backRingOpacity
  }

  // Arc opacity (decorative arcs)
  if (config.arcOpacity !== 0.21) {
    props.arcOpacity = config.arcOpacity
  }

  // Logo elements
  props.showMoon = config.showMoon
  props.showArcSegments = config.showArcSegments

  // Moon controls
  if (config.moonSizePercent !== 33) {
    props.moonSizePercent = config.moonSizePercent
  }
  if (config.moonOffsetX !== 0) {
    props.moonOffsetX = config.moonOffsetX
  }
  if (config.moonOffsetY !== 0) {
    props.moonOffsetY = config.moonOffsetY
  }

  // Colors
  if (config.mainFill !== '#ffffff') {
    props.fill = config.mainFill
  }
  if (!config.useMainColorForRings && config.ringColor !== '#ffffff') {
    props.orbitalFill = config.ringColor
  }

  // Lighting
  if (config.lightDirection !== 45) {
    props.lightDirection = config.lightDirection
  }
  if (config.highlightIntensity !== 0.15) {
    props.highlightIntensity = config.highlightIntensity
  }

  // Eye mode
  props.eyeMode = config.eyeMode
  if (config.eyeMode) {
    props.pupilDirection = config.pupilDirection
    if (config.pupilOffset !== 0.12) {
      props.pupilOffset = config.pupilOffset
    }
    if (config.pupilSize !== 0.28) {
      props.pupilSize = config.pupilSize
    }
    if (config.pupilContrast !== 0.71) {
      props.pupilContrast = config.pupilContrast
    }
    if (config.pupilColor && config.pupilColor !== '#1a1a1a') {
      props.pupilColor = config.pupilColor
    }
    if (config.pupilInnerColor && config.pupilInnerColor !== '#f5f5f5') {
      props.pupilInnerColor = config.pupilInnerColor
    }
    if (config.pupilInnerSize !== 0.60) {
      props.pupilInnerSize = config.pupilInnerSize
    }
  }

  // Arc segment colors
  if (config.arc1Color) {
    props.arc1Color = config.arc1Color
  }
  if (config.arc2Color) {
    props.arc2Color = config.arc2Color
  }
  if (config.arc3Color) {
    props.arc3Color = config.arc3Color
  }

  return props
}

/**
 * Generate JSX code string for the component with props
 */
export function configToCode(config: LogoConfig): string {
  const props: string[] = []
  const componentName = config.use3D ? 'ExpanseLogoV3_3D' : 'ExpanseLogoV3'

  // Ring extent
  if (config.extentMode === 'preset') {
    if (config.ringExtent !== 'compact') {
      props.push(`ringExtent="${config.ringExtent}"`)
    }
  } else {
    props.push(`orbitalRx={${config.customRx}}`)
    if (config.circular) {
      props.push(`orbitalRy={${config.customRx}}`)
    } else {
      props.push(`orbitalRy={${config.customRy}}`)
    }
  }

  // Rotation (if not default)
  if (config.orbitalRotation !== -33) {
    props.push(`orbitalRotation={${config.orbitalRotation}}`)
  }

  // Mirrored rings (default is now true, so only set when false)
  if (!config.mirroredRings) {
    props.push('mirroredRings={false}')
  }

  // Show primary rings (default is now false, so only set when true)
  if (config.showPrimaryRings) {
    props.push('showPrimaryRings')
  }

  // Ring spacing
  if (config.ringSpacing === 'fixed') {
    props.push('ringSpacing="fixed"')
    props.push(`fixedGap1={${config.fixedGap1}}`)
    props.push(`fixedGap2={${config.fixedGap2}}`)
  }

  // Circular
  if (config.circular) {
    props.push('circular')
  }

  // Stroke width
  if (config.ringStrokeWidth !== 4) {
    props.push(`ringStrokeWidth={${config.ringStrokeWidth}}`)
  }

  // Ring opacity
  if (config.opacityMode === 'custom') {
    // Use individual ring opacities
    props.push(`innerRingOpacity={${config.customOpacities.inner}}`)
    props.push(`middleRingOpacity={${config.customOpacities.middle}}`)
    props.push(`outerRingOpacity={${config.customOpacities.outer}}`)
  } else {
    // Use 1:2:3 scaling with base opacity
    if (config.baseOpacity !== 1) {
      props.push(`orbitalOpacity={${config.baseOpacity}}`)
    }
  }

  // Back ring opacity (for rings behind sphere)
  if (config.backRingOpacity !== 0.28) {
    props.push(`backRingOpacity={${config.backRingOpacity}}`)
  }

  // Arc opacity (decorative arcs)
  if (config.arcOpacity !== 0.21) {
    props.push(`arcOpacity={${config.arcOpacity}}`)
  }

  // Elements
  if (!config.showMoon) {
    props.push('showMoon={false}')
  }
  if (!config.showArcSegments) {
    props.push('showArcSegments={false}')
  }

  // Moon controls
  if (config.moonSizePercent !== 33) {
    props.push(`moonSizePercent={${config.moonSizePercent}}`)
  }
  if (config.moonOffsetX !== 0) {
    props.push(`moonOffsetX={${config.moonOffsetX}}`)
  }
  if (config.moonOffsetY !== 0) {
    props.push(`moonOffsetY={${config.moonOffsetY}}`)
  }

  // Colors
  if (config.mainFill !== '#ffffff') {
    props.push(`fill="${config.mainFill}"`)
  }
  if (!config.useMainColorForRings && config.ringColor !== '#ffffff') {
    props.push(`orbitalFill="${config.ringColor}"`)
  }

  // Lighting
  if (config.lightDirection !== 45) {
    props.push(`lightDirection={${config.lightDirection}}`)
  }
  if (config.highlightIntensity !== 0.15) {
    props.push(`highlightIntensity={${config.highlightIntensity}}`)
  }

  // Eye mode
  if (!config.eyeMode) {
    props.push('eyeMode={false}')
  } else {
    // Only include pupil props if eye mode is on and values differ from defaults
    if (config.pupilDirection !== 240) {
      props.push(`pupilDirection={${config.pupilDirection}}`)
    }
    if (config.pupilOffset !== 0.12) {
      props.push(`pupilOffset={${config.pupilOffset}}`)
    }
    if (config.pupilSize !== 0.28) {
      props.push(`pupilSize={${config.pupilSize}}`)
    }
    if (config.pupilContrast !== 0.71) {
      props.push(`pupilContrast={${config.pupilContrast}}`)
    }
    if (config.pupilColor && config.pupilColor !== '#1a1a1a') {
      props.push(`pupilColor="${config.pupilColor}"`)
    }
    if (config.pupilInnerColor && config.pupilInnerColor !== '#f5f5f5') {
      props.push(`pupilInnerColor="${config.pupilInnerColor}"`)
    }
    if (config.pupilInnerSize !== 0.60) {
      props.push(`pupilInnerSize={${config.pupilInnerSize}}`)
    }
  }

  // Arc segment colors
  if (config.arc1Color) {
    props.push(`arc1Color="${config.arc1Color}"`)
  }
  if (config.arc2Color) {
    props.push(`arc2Color="${config.arc2Color}"`)
  }
  if (config.arc3Color) {
    props.push(`arc3Color="${config.arc3Color}"`)
  }

  // Format output
  if (props.length === 0) {
    return `<${componentName} />`
  }

  if (props.length <= 2) {
    return `<${componentName} ${props.join(' ')} />`
  }

  return `<${componentName}\n  ${props.join('\n  ')}\n/>`
}

/**
 * Generate import statement
 */
export function getImportStatement(config: LogoConfig): string {
  const componentName = config.use3D ? 'ExpanseLogoV3_3D' : 'ExpanseLogoV3'
  return `import { ${componentName} } from "expanse.dynamicAssets/logo"`
}

/**
 * Get full code snippet with import
 */
export function getFullCodeSnippet(config: LogoConfig): string {
  return `${getImportStatement(config)}\n\n${configToCode(config)}`
}

/**
 * Extract SVG from DOM element
 */
export function extractSVG(containerId: string): string | null {
  const container = document.getElementById(containerId)
  if (!container) return null
  
  const svg = container.querySelector('svg')
  if (!svg) return null
  
  // Clone and clean up
  const clone = svg.cloneNode(true) as SVGElement
  clone.removeAttribute('class')
  
  return clone.outerHTML
}

/**
 * Download SVG as file
 */
export function downloadSVG(svgContent: string, filename: string = 'expanse-logo.svg') {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}
