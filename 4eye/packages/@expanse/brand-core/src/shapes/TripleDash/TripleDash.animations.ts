import { keyframes } from "@mui/material"
import {
  TripleDashAlign,
  TripleDashAnimationType,
  TripleDashOrientation,
} from "./TripleDash.types"

/**
 * CSS keyframes for fade-in animation
 */
export const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

/**
 * CSS keyframes for stagger-in animation (fade + slide)
 */
export const staggerInKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

/**
 * CSS keyframes for grow animation (horizontal)
 */
export const growHorizontalKeyframes = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`

/**
 * CSS keyframes for grow animation (vertical)
 */
export const growVerticalKeyframes = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`

/**
 * CSS keyframes for slide-in from start
 */
export const slideInFromStartKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

/**
 * CSS keyframes for slide-in from end
 */
export const slideInFromEndKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

/**
 * CSS keyframes for slide-in from top
 */
export const slideInFromTopKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

/**
 * CSS keyframes for slide-in from bottom
 */
export const slideInFromBottomKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

/**
 * Get transform origin based on alignment and orientation
 */
export function getTransformOrigin(
  align: TripleDashAlign,
  orientation: TripleDashOrientation,
): string {
  if (orientation === "horizontal") {
    switch (align) {
      case "start":
        return "left center"
      case "end":
        return "right center"
      case "center":
      default:
        return "center center"
    }
  }
  switch (align) {
    case "start":
      return "center top"
    case "end":
      return "center bottom"
    case "center":
    default:
      return "center center"
  }
}

/**
 * Get the appropriate keyframes for slide-in based on alignment and orientation
 */
export function getSlideInKeyframes(
  align: TripleDashAlign,
  orientation: TripleDashOrientation,
) {
  if (orientation === "horizontal") {
    return align === "start"
      ? slideInFromStartKeyframes
      : slideInFromEndKeyframes
  }
  return align === "start"
    ? slideInFromTopKeyframes
    : slideInFromBottomKeyframes
}

/**
 * Get animation styles for a specific line
 */
export function getLineAnimationStyles(
  animationType: TripleDashAnimationType,
  lineIndex: number,
  duration: number,
  staggerDelay: number,
  easing: string,
  align: TripleDashAlign,
  orientation: TripleDashOrientation,
  isAnimating: boolean,
): React.CSSProperties {
  if (animationType === "none" || !isAnimating) {
    return {}
  }

  const delay = lineIndex * staggerDelay
  const baseStyles: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationTimingFunction: easing,
    animationFillMode: "forwards",
  }

  switch (animationType) {
    case "fade-in":
      return {
        ...baseStyles,
        opacity: 0,
        animationName: `${fadeInKeyframes}`,
      }

    case "stagger-in":
      return {
        ...baseStyles,
        opacity: 0,
        animationName: `${staggerInKeyframes}`,
      }

    case "grow": {
      const growKeyframes =
        orientation === "horizontal"
          ? growHorizontalKeyframes
          : growVerticalKeyframes
      return {
        ...baseStyles,
        transformOrigin: getTransformOrigin(align, orientation),
        transform: orientation === "horizontal" ? "scaleX(0)" : "scaleY(0)",
        animationName: `${growKeyframes}`,
      }
    }

    case "slide-in":
      return {
        ...baseStyles,
        opacity: 0,
        animationName: `${getSlideInKeyframes(align, orientation)}`,
      }

    default:
      return {}
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
