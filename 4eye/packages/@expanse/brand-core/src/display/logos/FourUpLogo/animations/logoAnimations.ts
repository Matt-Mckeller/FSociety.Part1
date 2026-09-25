/**
 * 4up Logo - GSAP Animations
 *
 * Clean, reusable animation presets for the logo.
 * Requires GSAP to be installed: npm install gsap
 *
 * Usage:
 *   import { bounceEntrance, pulseGlow } from '@expanse/brand-core';
 *   bounceEntrance('#my-logo');
 */

import { gsap } from 'gsap';

// ============================================
// Types
// ============================================

export interface AnimationOptions {
  /** Duration in seconds */
  duration?: number;
  /** Easing function */
  ease?: string;
  /** Delay before animation starts */
  delay?: number;
  /** Number of times to repeat (-1 for infinite) */
  repeat?: number;
  /** Yo-yo back and forth */
  yoyo?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export type LogoSelector = string | Element;

// ============================================
// Helper Functions
// ============================================

/**
 * Get element(s) from selector, scoped to a container if provided.
 */
function getElements(container: LogoSelector, selector: string): Element[] {
  const root = typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) return [];
  return Array.from(root.querySelectorAll(selector));
}

/**
 * Get the SVG root element.
 */
function getSvgRoot(selector: LogoSelector): SVGSVGElement | null {
  if (typeof selector === 'string') {
    const el = document.querySelector(selector);
    return el?.tagName === 'svg' ? (el as SVGSVGElement) : el?.querySelector('svg') ?? null;
  }
  return selector.tagName === 'svg' ? (selector as SVGSVGElement) : selector.querySelector('svg');
}

// ============================================
// Entrance Animations
// ============================================

/**
 * Bounce entrance - circles bounce in from below.
 *
 * The small circle leads, primary follows with slight delay.
 */
export function bounceEntrance(
  container: LogoSelector,
  options: AnimationOptions = {}
): gsap.core.Timeline {
  const { duration = 0.8, ease = 'bounce.out', delay = 0, onComplete } = options;

  const svg = getSvgRoot(container);
  if (!svg) return gsap.timeline();

  const circleMiddle = svg.querySelector('#shape-middle');
  const circlePrimary = svg.querySelector('#shape-primary');
  const waves = svg.querySelector('#logo-waves');

  const tl = gsap.timeline({ delay, onComplete });

  // Set initial state
  gsap.set([circleMiddle, circlePrimary], { y: 50, opacity: 0 });
  gsap.set(waves, { opacity: 0 });

  // Animate circles bouncing in
  tl.to(circleMiddle, { y: 0, opacity: 1, duration, ease }, 0)
    .to(circlePrimary, { y: 0, opacity: 1, duration, ease }, 0.1)
    .to(waves, { opacity: 1, duration: 0.4, ease: 'power2.out' }, duration * 0.6);

  return tl;
}

/**
 * Scale entrance - logo scales up from center.
 */
export function scaleEntrance(
  container: LogoSelector,
  options: AnimationOptions = {}
): gsap.core.Timeline {
  const { duration = 0.6, ease = 'back.out(1.7)', delay = 0, onComplete } = options;

  const svg = getSvgRoot(container);
  if (!svg) return gsap.timeline();

  const circles = svg.querySelector('#logo-shapes');
  const waves = svg.querySelector('#logo-waves');

  const tl = gsap.timeline({ delay, onComplete });

  gsap.set(circles, { scale: 0, transformOrigin: 'center center' });
  gsap.set(waves, { opacity: 0, scale: 0.5, transformOrigin: 'center center' });

  tl.to(circles, { scale: 1, duration, ease }, 0)
    .to(waves, { opacity: 1, scale: 1, duration: duration * 0.8, ease }, duration * 0.3);

  return tl;
}

/**
 * Fade entrance - simple fade in with subtle upward movement.
 */
export function fadeEntrance(
  container: LogoSelector,
  options: AnimationOptions = {}
): gsap.core.Timeline {
  const { duration = 0.5, ease = 'power2.out', delay = 0, onComplete } = options;

  const svg = getSvgRoot(container);
  if (!svg) return gsap.timeline();

  const tl = gsap.timeline({ delay, onComplete });

  gsap.set(svg, { opacity: 0, y: 20 });
  tl.to(svg, { opacity: 1, y: 0, duration, ease });

  return tl;
}

// ============================================
// Idle / Loop Animations
// ============================================

/**
 * Bounce idle - small circle bounces like a ball.
 *
 * Creates the effect of the logo bouncing up and down,
 * with the small (middle) circle driving the motion.
 */
export function bounceIdle(
  container: LogoSelector,
  options: AnimationOptions = {}
): gsap.core.Timeline {
  const { duration = 0.5, ease = 'power1.inOut', repeat = -1, yoyo = true } = options;

  const svg = getSvgRoot(container);
  if (!svg) return gsap.timeline();

  const circleMiddle = svg.querySelector('#shape-middle');
  const circlePrimary = svg.querySelector('#shape-primary');
  const waves = svg.querySelector('#logo-waves');

  const tl = gsap.timeline({ repeat, yoyo });

  // Small circle bounces more
  tl.to(circleMiddle, { y: -8, duration, ease }, 0)
    // Primary circle follows with dampened movement
    .to(circlePrimary, { y: -4, duration, ease }, 0.05)
    // Waves move with primary
    .to(waves, { y: -4, duration, ease }, 0.05);

  return tl;
}

/**
 * Pulse glow - subtle pulsing opacity effect.
 */
export function pulseGlow(
  container: LogoSelector,
  options: AnimationOptions = {}
): gsap.core.Timeline {
  const { duration = 1.5, ease = 'sine.inOut', repeat = -1, yoyo = true } = options;

  const svg = getSvgRoot(container);
  if (!svg) return gsap.timeline();

  const circleMiddle = svg.querySelector('#shape-middle');

  const tl = gsap.timeline({ repeat, yoyo });

  // Pulse the smaller circle's opacity
  tl.to(circleMiddle, {
    fillOpacity: 0.8,
    duration,
    ease,
  });

  return tl;
}

/**
 * Wave pulse - waves expand and contract rhythmically.
 */
export function wavePulse(
  container: LogoSelector,
  options: AnimationOptions = {}
): gsap.core.Timeline {
  const { duration = 2, ease = 'sine.inOut', repeat = -1, yoyo = true } = options;

  const svg = getSvgRoot(container);
  if (!svg) return gsap.timeline();

  const waves = svg.querySelector('#logo-waves');

  const tl = gsap.timeline({ repeat, yoyo });

  gsap.set(waves, { transformOrigin: 'center center' });
  tl.to(waves, { scale: 1.1, duration, ease });

  return tl;
}

/**
 * Breathing - subtle scale breathing effect on entire logo.
 */
export function breathing(
  container: LogoSelector,
  options: AnimationOptions = {}
): gsap.core.Timeline {
  const { duration = 3, ease = 'sine.inOut', repeat = -1, yoyo = true } = options;

  const svg = getSvgRoot(container);
  if (!svg) return gsap.timeline();

  const tl = gsap.timeline({ repeat, yoyo });

  gsap.set(svg, { transformOrigin: 'center center' });
  tl.to(svg, { scale: 1.03, duration, ease });

  return tl;
}

// ============================================
// Interactive Animations
// ============================================

/**
 * Hover lift - logo lifts slightly on hover.
 */
export function hoverLift(
  container: LogoSelector,
  options: AnimationOptions = {}
): { enter: () => void; leave: () => void } {
  const { duration = 0.3, ease = 'power2.out' } = options;

  const svg = getSvgRoot(container);
  if (!svg) return { enter: () => {}, leave: () => {} };

  return {
    enter: () => {
      gsap.to(svg, { y: -5, scale: 1.05, duration, ease });
    },
    leave: () => {
      gsap.to(svg, { y: 0, scale: 1, duration, ease });
    },
  };
}

/**
 * Click pop - quick pop effect on click.
 */
export function clickPop(
  container: LogoSelector,
  options: AnimationOptions = {}
): () => gsap.core.Timeline {
  const { duration = 0.15, ease = 'power2.out' } = options;

  const svg = getSvgRoot(container);
  if (!svg) return () => gsap.timeline();

  return () => {
    const tl = gsap.timeline();
    gsap.set(svg, { transformOrigin: 'center center' });
    tl.to(svg, { scale: 0.95, duration, ease })
      .to(svg, { scale: 1, duration, ease: 'back.out(3)' });
    return tl;
  };
}

// ============================================
// Combination Animations
// ============================================

/**
 * Full entrance sequence - entrance + idle loop.
 */
export function fullEntranceWithIdle(
  container: LogoSelector,
  entranceOptions: AnimationOptions = {},
  idleOptions: AnimationOptions = {}
): gsap.core.Timeline {
  const tl = gsap.timeline();

  tl.add(bounceEntrance(container, entranceOptions))
    .add(bounceIdle(container, idleOptions), '+=0.5');

  return tl;
}

// ============================================
// Animation Presets (for quick use)
// ============================================

export const presets = {
  /** Quick bounce in */
  quickBounce: (container: LogoSelector) => bounceEntrance(container, { duration: 0.5 }),

  /** Slow elegant entrance */
  elegantEntrance: (container: LogoSelector) => scaleEntrance(container, { duration: 1, ease: 'power3.out' }),

  /** Subtle continuous bounce */
  subtleBounce: (container: LogoSelector) => bounceIdle(container, { duration: 0.8 }),

  /** Energetic bounce */
  energeticBounce: (container: LogoSelector) =>
    bounceIdle(container, { duration: 0.3, ease: 'power2.inOut' }),

  /** Calm breathing */
  calmBreathing: (container: LogoSelector) => breathing(container, { duration: 4 }),
};

// ============================================
// Cleanup
// ============================================

/**
 * Kill all animations on a logo element.
 */
export function killAnimations(container: LogoSelector): void {
  const svg = getSvgRoot(container);
  if (!svg) return;

  gsap.killTweensOf(svg);
  gsap.killTweensOf(svg.querySelectorAll('*'));
}

/**
 * Reset logo to initial state.
 */
export function resetLogo(container: LogoSelector): void {
  killAnimations(container);

  const svg = getSvgRoot(container);
  if (!svg) return;

  gsap.set(svg, { clearProps: 'all' });
  gsap.set(svg.querySelectorAll('*'), { clearProps: 'all' });
}
