/**
 * 4up Logo - SVG Renderer
 *
 * Pure SVG string generator with clean, semantic element naming.
 * No framework dependencies - works in Node.js or browser.
 *
 * SVG Structure:
 * <svg>
 *   <title>
 *   <desc>
 *   <defs>
 *     <mask id="logo-center-mask">
 *   </defs>
 *   <g id="logo-circles">
 *     <circle id="circle-middle" />
 *     <circle id="circle-primary" />
 *   </g>
 *   <g id="logo-waves">
 *     <g id="waves-bottom-left">
 *       <path id="wave-bl-1" />
 *       ...
 *     </g>
 *     <g id="waves-top-right">
 *       <path id="wave-tr-1" />
 *       ...
 *     </g>
 *   </g>
 * </svg>
 */

import type { LogoConfig, ViewBox } from './types';
import { calculateGeometry, getWaveOpacity } from './calculations';
import { mergeConfig } from './defaults';

// ============================================
// SVG Element Generators
// ============================================

/**
 * Generate the center hole mask definition.
 */
function renderMaskDef(
  viewBox: ViewBox,
  cx: number,
  cy: number,
  holeRadius: number,
  connectorLines: { left: { start: { x: number; y: number }; end: { x: number; y: number } }; right: { start: { x: number; y: number }; end: { x: number; y: number } } } | null,
  config: LogoConfig
): string {
  if (!config.showCenterHole) return '';

  let mask = `
    <mask id="logo-center-mask">
      <rect x="${viewBox.x}" y="${viewBox.y}" width="${viewBox.width}" height="${viewBox.height}" fill="white"/>
      <circle cx="${cx}" cy="${cy}" r="${holeRadius}" fill="black"/>`;

  if (connectorLines && holeRadius > 0) {
    mask += `
      <line 
        x1="${connectorLines.left.start.x}" y1="${connectorLines.left.start.y}" 
        x2="${connectorLines.left.end.x}" y2="${connectorLines.left.end.y}" 
        stroke="black" stroke-width="${config.connectorLineWidth}"
      />
      <line 
        x1="${connectorLines.right.start.x}" y1="${connectorLines.right.start.y}" 
        x2="${connectorLines.right.end.x}" y2="${connectorLines.right.end.y}" 
        stroke="black" stroke-width="${config.connectorLineWidth}"
      />`;
  }

  mask += `
    </mask>`;

  return mask;
}

/**
 * Generate SVG path for a shape at given position and size.
 */
function renderShape(
  center: { x: number; y: number },
  radius: number,
  shape: 'circle' | 'square' | 'triangle',
  id: string,
  fill: string,
  opacity: number
): string {
  switch (shape) {
    case 'square': {
      // Square inscribed in the same bounding box as circle
      const size = radius * 2;
      const x = center.x - radius;
      const y = center.y - radius;
      return `
    <rect 
      id="${id}"
      x="${x}" 
      y="${y}" 
      width="${size}" 
      height="${size}" 
      fill="${fill}" 
      fill-opacity="${opacity}"
    />`;
    }
    case 'triangle': {
      // Equilateral triangle pointing up, centered
      const height = radius * 2;
      const halfBase = radius * 1.1547; // For equilateral: base = height * 2/√3
      const top = { x: center.x, y: center.y - radius };
      const bottomLeft = { x: center.x - halfBase, y: center.y + radius };
      const bottomRight = { x: center.x + halfBase, y: center.y + radius };
      return `
    <polygon 
      id="${id}"
      points="${top.x},${top.y} ${bottomLeft.x},${bottomLeft.y} ${bottomRight.x},${bottomRight.y}" 
      fill="${fill}" 
      fill-opacity="${opacity}"
    />`;
    }
    case 'circle':
    default:
      return `
    <circle 
      id="${id}"
      cx="${center.x}" 
      cy="${center.y}" 
      r="${radius}" 
      fill="${fill}" 
      fill-opacity="${opacity}"
    />`;
  }
}

/**
 * Generate the shapes group.
 *
 * Shapes are rendered in reverse order (largest first, smallest on top)
 * to create the stacked/layered visual effect.
 */
function renderShapes(
  geometry: ReturnType<typeof calculateGeometry>,
  config: LogoConfig
): string {
  const { circles, opacities } = geometry;
  const startIndex = config.showBaseCircle ? 0 : 1;
  const shapeNames = ['base', 'middle', 'primary'];

  let svg = `
  <g id="logo-shapes"${config.showCenterHole ? ' mask="url(#logo-center-mask)"' : ''}>`;

  // Render in reverse order (primary first, then middle, then base)
  for (let i = circles.length - 1; i >= startIndex; i--) {
    const circle = circles[i];
    svg += renderShape(
      circle.center,
      circle.radius,
      config.shape,
      `shape-${shapeNames[i]}`,
      config.fillColor,
      opacities[i]
    );
  }

  svg += `
  </g>`;

  return svg;
}

/**
 * Generate the waves group.
 */
function renderWaves(
  geometry: ReturnType<typeof calculateGeometry>,
  config: LogoConfig
): string {
  if (!config.showWaves) return '';

  const { waves } = geometry;
  const { waveColor, waveStrokeWidth } = config;

  let svg = `
  <g id="logo-waves">
    <g id="waves-bottom-left">`;

  waves.bottomLeft.forEach((path, index) => {
    const opacity = getWaveOpacity(index, config);
    svg += `
      <path 
        id="wave-bl-${index + 1}"
        d="${path}" 
        fill="none" 
        stroke="${waveColor}" 
        stroke-width="${waveStrokeWidth}" 
        stroke-opacity="${opacity.toFixed(3)}"
        stroke-linecap="round"
      />`;
  });

  svg += `
    </g>
    <g id="waves-top-right">`;

  waves.topRight.forEach((path, index) => {
    const opacity = getWaveOpacity(index, config);
    svg += `
      <path 
        id="wave-tr-${index + 1}"
        d="${path}" 
        fill="none" 
        stroke="${waveColor}" 
        stroke-width="${waveStrokeWidth}" 
        stroke-opacity="${opacity.toFixed(3)}"
        stroke-linecap="round"
      />`;
  });

  svg += `
    </g>
  </g>`;

  return svg;
}

// ============================================
// Main Renderer
// ============================================

export interface RenderOptions {
  /** Width attribute for SVG element */
  width?: number | string;
  /** Height attribute for SVG element */
  height?: number | string;
  /** Accessible title */
  title?: string;
  /** Accessible description */
  desc?: string;
  /** Additional attributes for the SVG element */
  attributes?: Record<string, string>;
}

/**
 * Render the complete logo as an SVG string.
 *
 * @param configOverrides - Partial config to override defaults
 * @param options - Render options (size, title, etc.)
 * @returns Complete SVG markup string
 */
export function renderLogoSvg(
  configOverrides?: Partial<LogoConfig>,
  options: RenderOptions = {}
): string {
  const config = mergeConfig(configOverrides);
  const geometry = calculateGeometry(config);
  const { viewBox, primaryCircle, holeRadius, connectorLines } = geometry;

  const {
    width = 300,
    height = 300,
    title = '4up Logo',
    desc = 'Two overlapping circles representing growth and momentum',
    attributes = {},
  } = options;

  // Build additional attributes string
  const attrString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  // Assemble SVG
  let svg = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}"
  width="${width}" 
  height="${height}"
  role="img"
  aria-labelledby="logo-title logo-desc"
  ${attrString}
>
  <title id="logo-title">${title}</title>
  <desc id="logo-desc">${desc}</desc>
  <defs>${renderMaskDef(viewBox, primaryCircle.center.x, primaryCircle.center.y, holeRadius, connectorLines, config)}
  </defs>`;

  svg += renderShapes(geometry, config);
  svg += renderWaves(geometry, config);

  svg += `
</svg>`;

  return svg;
}

/**
 * Render logo SVG optimized for export (minimal whitespace).
 */
export function renderLogoSvgMinified(
  configOverrides?: Partial<LogoConfig>,
  options: RenderOptions = {}
): string {
  return renderLogoSvg(configOverrides, options)
    .replace(/\n\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
