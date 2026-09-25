/**
 * Font configuration for 4eye-web using next/font/local.
 *
 * FONT DUPLICATION NOTE:
 * The fonts in ./fonts/ are copies of @expanse/theme/src/font/.
 * This duplication is required because next/font/local cannot resolve
 * paths outside the app directory in monorepo setups. The tradeoff is
 * worth it for Next.js font optimization (zero layout shift, preloading).
 *
 * Source of truth: @expanse/theme/src/font/
 * If fonts are updated, copy them here:
 *   cp packages/@expanse/theme/src/font/*.ttf apps/4eye-web/app/fonts/
 */
import localFont from 'next/font/local';

/**
 * Xpens font family - primary brand font.
 *
 * Usage in layout.tsx:
 * ```tsx
 * import { xpens } from './fonts';
 *
 * <html className={xpens.variable}>
 *   <body style={{ fontFamily: 'var(--font-xpens)' }}>
 * ```
 */
export const xpens = localFont({
  src: [
    // Regular (400)
    {
      path: './fonts/Xpens-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Xpens-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // Medium (500)
    {
      path: './fonts/Xpens-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Xpens-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    // Semi Bold (600)
    {
      path: './fonts/Xpens-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Xpens-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    // Bold (700)
    {
      path: './fonts/Xpens-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Xpens-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-xpens',
  display: 'swap',
  preload: true,
});

/**
 * CSS variable name for use in stylesheets.
 */
export const xpensFontVariable = 'var(--font-xpens)';
