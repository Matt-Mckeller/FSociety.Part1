"use client"

import { useState, useEffect, useCallback } from "react"

export interface UseSlideNavigationOptions {
  totalSlides: number
  onSlideChange?: (index: number) => void
  enableKeyboard?: boolean
  enableSwipe?: boolean
  loop?: boolean
}

export interface UseSlideNavigationReturn {
  currentSlide: number
  goToSlide: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
  isFirstSlide: boolean
  isLastSlide: boolean
  progress: number // 0-100
}

export function useSlideNavigation({
  totalSlides,
  onSlideChange,
  enableKeyboard = true,
  loop = false,
}: UseSlideNavigationOptions): UseSlideNavigationReturn {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = useCallback(
    (index: number) => {
      let newIndex = index
      if (loop) {
        newIndex = ((index % totalSlides) + totalSlides) % totalSlides
      } else {
        newIndex = Math.max(0, Math.min(index, totalSlides - 1))
      }
      setCurrentSlide(newIndex)
      onSlideChange?.(newIndex)
    },
    [totalSlides, loop, onSlideChange]
  )

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1 || loop) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, totalSlides, loop, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0 || loop) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, loop, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return undefined

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if focus is on an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (e.key) {
        case "ArrowRight":
        case " ": // Space
        case "PageDown":
          e.preventDefault()
          nextSlide()
          break
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault()
          prevSlide()
          break
        case "Home":
          e.preventDefault()
          goToSlide(0)
          break
        case "End":
          e.preventDefault()
          goToSlide(totalSlides - 1)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [enableKeyboard, nextSlide, prevSlide, goToSlide, totalSlides])

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    isFirstSlide: currentSlide === 0,
    isLastSlide: currentSlide === totalSlides - 1,
    progress: totalSlides > 1 ? ((currentSlide + 1) / totalSlides) * 100 : 100,
  }
}
