/**
 * Gallery State Management Hook
 * Manages filtering, sorting, and theme state
 * Now fetches all lotties from the API
 */

import { useState, useMemo, useEffect } from "react"
import {
  sortAnimations,
  type Animation,
  type SortBy,
} from "../utils/animationRegistry"

export interface GalleryState {
  currentFilter: string
  currentSort: SortBy
  showPending: boolean
  currentThemeColor: string
  isLoading: boolean
  error: string | null
}

// API response type
interface LottieRegistryItem {
  id: string
  name: string
  displayName: string
  path: string
  filePath: string
  directoryPath: string
  category: string
  description?: string
  tags?: string[]
}

// Convert API response to Animation type
function convertToAnimation(item: LottieRegistryItem): Animation {
  return {
    name: item.name,
    path: item.path,
    displayName: item.displayName,
    description: item.description,
    status: "original" as const,
    category: item.category,
    hasTheming: false,
    isPending: false,
    useCases: item.tags,
  }
}

export function useGalleryState() {
  const [state, setState] = useState<GalleryState>({
    currentFilter: "all",
    currentSort: "name",
    showPending: false,
    currentThemeColor: "#621890", // Purple default
    isLoading: true,
    error: null,
  })

  const [allAnimations, setAllAnimations] = useState<Animation[]>([])

  // Fetch all animations from API on mount
  useEffect(() => {
    async function fetchAnimations() {
      try {
        console.log("[Gallery] Starting fetch from /api/lotties/scan")
        setState((prev) => ({ ...prev, isLoading: true, error: null }))

        const response = await fetch("/api/lotties/scan")
        console.log("[Gallery] Response status:", response.status)

        const data = await response.json()
        console.log(
          "[Gallery] Response data:",
          data.success,
          "lotties count:",
          data.lotties?.length,
        )

        if (data.success) {
          const animations = data.lotties.map(convertToAnimation)
          console.log(
            "[Gallery] Converted animations count:",
            animations.length,
          )
          setAllAnimations(animations)
        } else {
          const errorMsg = data.error || "Failed to load animations"
          console.error("[Gallery] API returned error:", errorMsg)
          setState((prev) => ({
            ...prev,
            error: errorMsg,
          }))
        }
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Failed to fetch"
        console.error("[Gallery] Fetch error:", errorMsg, error)
        setState((prev) => ({
          ...prev,
          error: errorMsg,
        }))
      } finally {
        console.log("[Gallery] Setting isLoading to false")
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    fetchAnimations()
  }, [])

  // Get filtered and sorted animations
  const filteredAnimations = useMemo(() => {
    let filtered = allAnimations

    // Filter by category
    if (state.currentFilter !== "all") {
      filtered = filtered.filter(
        (anim) => anim.category === state.currentFilter,
      )
    }

    // Filter pending if needed
    if (!state.showPending) {
      filtered = filtered.filter((anim) => !anim.isPending)
    }

    return sortAnimations(filtered, state.currentSort)
  }, [allAnimations, state.currentFilter, state.currentSort, state.showPending])

  // Get all categories from fetched animations
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allAnimations.forEach((anim) => cats.add(anim.category))
    return Array.from(cats).sort()
  }, [allAnimations])

  // Update functions
  const updateFilter = (filter: string) => {
    setState((prev) => ({ ...prev, currentFilter: filter }))
  }

  const updateSort = (sort: SortBy) => {
    setState((prev) => ({ ...prev, currentSort: sort }))
  }

  const togglePending = () => {
    setState((prev) => ({ ...prev, showPending: !prev.showPending }))
  }

  const updateThemeColor = (color: string) => {
    setState((prev) => ({ ...prev, currentThemeColor: color }))
  }

  return {
    state,
    filteredAnimations,
    categories,
    updateFilter,
    updateSort,
    togglePending,
    updateThemeColor,
    isLoading: state.isLoading,
    error: state.error,
    totalCount: allAnimations.length,
  }
}
