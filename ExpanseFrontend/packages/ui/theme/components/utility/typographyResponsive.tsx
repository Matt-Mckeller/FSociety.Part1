"use client"
import { Typography, TypographyProps } from "@mui/material"
import React, { useLayoutEffect, useRef, useState } from "react"

interface TypographyResponsiveProps extends Omit<TypographyProps, "ref"> {
  /** Number of lines the text should fit within. Default: 1 */
  desiredLineCount?: number
  /** Minimum font size in pixels to prevent text becoming unreadable. Default: 10 */
  minFontSize?: number
  /** Enable debug logging */
  debug?: boolean
  children: React.ReactNode
}

/**
 * Checks if element content overflows its width
 */
function checkOverflowWidth(el: HTMLElement): boolean {
  const currentOverflow = el.style.overflow
  if (!currentOverflow || currentOverflow === "visible") {
    el.style.overflow = "hidden"
  }
  const isOverflowing = el.clientWidth < el.scrollWidth
  el.style.overflow = currentOverflow
  return isOverflowing
}

/**
 * Checks if element content exceeds desired line count
 */
function checkOverflowHeight(el: HTMLElement, desiredLineCount: number): boolean {
  const computedStyle = getComputedStyle(el)
  const lineHeight = parseFloat(computedStyle.lineHeight)
  
  // If lineHeight is NaN (e.g., "normal"), estimate from fontSize
  const effectiveLineHeight = isNaN(lineHeight) 
    ? parseFloat(computedStyle.fontSize) * 1.2 
    : lineHeight

  const paddingTop = parseFloat(computedStyle.paddingTop) || 0
  const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0
  const contentHeight = el.scrollHeight - paddingTop - paddingBottom

  // Allow small tolerance for rounding
  const maxAllowedHeight = desiredLineCount * effectiveLineHeight * 1.05
  
  return contentHeight > maxAllowedHeight
}

/**
 * Calculates the font size needed to fit text within constraints.
 * Uses a cloned element for measurement to avoid layout thrashing.
 */
function calculateFittedFontSize(
  element: HTMLElement,
  desiredLineCount: number,
  minFontSize: number,
  baseFontSize: number,
  debug?: boolean
): number {
  // Create hidden clone for measurement
  const clone = element.cloneNode(true) as HTMLElement
  clone.style.visibility = "hidden"
  clone.style.position = "absolute"
  clone.style.width = `${element.clientWidth}px`
  clone.style.height = "auto"
  clone.style.fontSize = `${baseFontSize}px`
  clone.style.whiteSpace = desiredLineCount === 1 ? "nowrap" : "normal"
  document.body.appendChild(clone)

  let fontSize = baseFontSize
  const step = 0.5 // px decrement per iteration
  
  // Check if already fits
  let isOverflowing = checkOverflowWidth(clone) || checkOverflowHeight(clone, desiredLineCount)
  
  // Reduce font size until it fits or hits minimum
  while (isOverflowing && fontSize > minFontSize) {
    fontSize -= step
    clone.style.fontSize = `${fontSize}px`
    isOverflowing = checkOverflowWidth(clone) || checkOverflowHeight(clone, desiredLineCount)
  }

  // Clamp to minimum
  fontSize = Math.max(fontSize, minFontSize)
  
  if (debug) {
    console.log("[TypographyResponsive]", {
      baseFontSize,
      finalFontSize: fontSize,
      containerWidth: element.clientWidth,
      desiredLineCount,
    })
  }

  document.body.removeChild(clone)
  return fontSize
}

/**
 * Typography component that automatically shrinks font size to fit text
 * within a specified number of lines in its container.
 * 
 * @example
 * // Single line that shrinks to fit
 * <TypographyResponsive variant="h1" desiredLineCount={1}>
 *   This heading will shrink to fit on one line
 * </TypographyResponsive>
 * 
 * @example
 * // Two lines maximum
 * <TypographyResponsive variant="body1" desiredLineCount={2}>
 *   This paragraph will shrink to fit within two lines
 * </TypographyResponsive>
 */
export function TypographyResponsive({
  desiredLineCount = 1,
  minFontSize = 10,
  debug = false,
  children,
  sx,
  ...props
}: TypographyResponsiveProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const baseFontSizeRef = useRef<number | null>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Single effect that handles all recalculation
  useLayoutEffect(() => {
    const container = containerRef.current
    const textElement = textRef.current
    if (!container || !textElement || typeof window === "undefined") return

    // Capture base font size once on first render
    if (baseFontSizeRef.current === null) {
      baseFontSizeRef.current = parseFloat(getComputedStyle(textElement).fontSize)
    }

    const recalculate = () => {
      if (!textElement || baseFontSizeRef.current === null) return
      
      const fittedSize = calculateFittedFontSize(
        textElement,
        desiredLineCount,
        minFontSize,
        baseFontSizeRef.current,
        debug
      )
      
      setFontSize(fittedSize)
      setIsReady(true)
    }

    // Initial calculation
    recalculate()

    // Watch for container resizes with debounce
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const resizeObserver = new ResizeObserver(() => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(recalculate, 50)
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [desiredLineCount, minFontSize, debug, children])

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        overflow: "hidden" 
      }}
    >
      <Typography
        {...props}
        ref={textRef}
        sx={{
          ...sx,
          fontSize: fontSize ? `${fontSize}px` : undefined,
          // Prevent layout shift while calculating
          visibility: isReady ? "visible" : "hidden",
        }}
      >
        {children}
      </Typography>
    </div>
  )
}

export default TypographyResponsive