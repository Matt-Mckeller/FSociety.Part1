/**
 * 4up Logo - Export Utilities
 *
 * Functions for exporting the logo as SVG files or clipboard content.
 */

import type { LogoConfig } from '../core/types';
import { renderLogoSvg, renderLogoSvgMinified, RenderOptions } from '../core/renderSvg';

// ============================================
// SVG String Generation
// ============================================

/**
 * Generate SVG string for the logo.
 *
 * @param config - Partial config to override defaults
 * @param options - Render options (size, title, etc.)
 * @returns SVG markup string
 */
export function generateSvgString(
  config?: Partial<LogoConfig>,
  options?: RenderOptions
): string {
  return renderLogoSvg(config, options);
}

/**
 * Generate minified SVG string for the logo.
 *
 * @param config - Partial config to override defaults
 * @param options - Render options
 * @returns Minified SVG markup string
 */
export function generateSvgStringMinified(
  config?: Partial<LogoConfig>,
  options?: RenderOptions
): string {
  return renderLogoSvgMinified(config, options);
}

// ============================================
// Browser Export Functions
// ============================================

/**
 * Download logo as an SVG file (browser only).
 *
 * @param filename - Name for the downloaded file
 * @param config - Partial config to override defaults
 * @param options - Render options
 */
export function downloadSvg(
  filename: string = '4up-logo.svg',
  config?: Partial<LogoConfig>,
  options?: RenderOptions
): void {
  if (typeof window === 'undefined') {
    throw new Error('downloadSvg is only available in browser environment');
  }

  const svgString = renderLogoSvg(config, options);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Copy SVG markup to clipboard (browser only).
 *
 * @param config - Partial config to override defaults
 * @param options - Render options
 * @returns Promise that resolves when copy is complete
 */
export async function copySvgToClipboard(
  config?: Partial<LogoConfig>,
  options?: RenderOptions
): Promise<void> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    throw new Error('copySvgToClipboard requires clipboard API support');
  }

  const svgString = renderLogoSvg(config, options);
  await navigator.clipboard.writeText(svgString);
}

/**
 * Copy minified SVG markup to clipboard (browser only).
 *
 * @param config - Partial config to override defaults
 * @param options - Render options
 * @returns Promise that resolves when copy is complete
 */
export async function copySvgToClipboardMinified(
  config?: Partial<LogoConfig>,
  options?: RenderOptions
): Promise<void> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    throw new Error('copySvgToClipboardMinified requires clipboard API support');
  }

  const svgString = renderLogoSvgMinified(config, options);
  await navigator.clipboard.writeText(svgString);
}

// ============================================
// Data URL Generation
// ============================================

/**
 * Generate a data URL for the logo SVG.
 *
 * Useful for embedding in CSS or img src.
 *
 * @param config - Partial config to override defaults
 * @param options - Render options
 * @returns Data URL string
 */
export function generateDataUrl(
  config?: Partial<LogoConfig>,
  options?: RenderOptions
): string {
  const svgString = renderLogoSvgMinified(config, options);
  const encoded = encodeURIComponent(svgString);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Generate a base64 data URL for the logo SVG.
 *
 * @param config - Partial config to override defaults
 * @param options - Render options
 * @returns Base64 data URL string
 */
export function generateBase64DataUrl(
  config?: Partial<LogoConfig>,
  options?: RenderOptions
): string {
  if (typeof btoa === 'undefined') {
    throw new Error('generateBase64DataUrl requires btoa function');
  }

  const svgString = renderLogoSvgMinified(config, options);
  const base64 = btoa(svgString);
  return `data:image/svg+xml;base64,${base64}`;
}
