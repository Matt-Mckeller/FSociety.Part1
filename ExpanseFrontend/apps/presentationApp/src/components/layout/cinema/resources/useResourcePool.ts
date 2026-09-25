'use client'

import { useState, useCallback, useMemo } from 'react'
import type { ResourceId, ResourceValue, ResourceCategory } from './resourceTypes'
import { DEFAULT_RESOURCE_VALUES, getResourcesForCategory } from './resourceTypes'

interface UseResourcePoolOptions {
  /** Initial resource values */
  initialValues?: Partial<Record<ResourceId, number>>
  /** Animation duration for value changes */
  animationDuration?: number
}

interface UseResourcePoolReturn {
  /** All resource values */
  values: Record<ResourceId, number>
  /** Get value for a specific resource */
  getValue: (id: ResourceId) => number
  /** Set value for a specific resource */
  setValue: (id: ResourceId, value: number) => void
  /** Set multiple values at once */
  setValues: (updates: Partial<Record<ResourceId, number>>) => void
  /** Get all values for a category */
  getCategoryValues: (category: ResourceCategory) => ResourceValue[]
  /** Get aggregate value for a category (average) */
  getCategoryAggregate: (category: ResourceCategory) => number
  /** Reset all to defaults */
  resetToDefaults: () => void
}

/**
 * Hook for managing resource pool values
 */
export function useResourcePool(options: UseResourcePoolOptions = {}): UseResourcePoolReturn {
  const { initialValues } = options

  const [values, setValuesState] = useState<Record<ResourceId, number>>(() => ({
    ...DEFAULT_RESOURCE_VALUES,
    ...initialValues,
  }))

  const getValue = useCallback((id: ResourceId): number => {
    return values[id] ?? 0
  }, [values])

  const setValue = useCallback((id: ResourceId, value: number) => {
    setValuesState(prev => ({
      ...prev,
      [id]: Math.max(0, Math.min(100, value)),
    }))
  }, [])

  const setValues = useCallback((updates: Partial<Record<ResourceId, number>>) => {
    setValuesState(prev => {
      const next = { ...prev }
      for (const [id, value] of Object.entries(updates)) {
        if (value !== undefined) {
          next[id as ResourceId] = Math.max(0, Math.min(100, value))
        }
      }
      return next
    })
  }, [])

  const getCategoryValues = useCallback((category: ResourceCategory): ResourceValue[] => {
    const resourceIds = getResourcesForCategory(category)
    return resourceIds.map(id => ({
      id,
      value: values[id] ?? 0,
    }))
  }, [values])

  const getCategoryAggregate = useCallback((category: ResourceCategory): number => {
    const resourceIds = getResourcesForCategory(category)
    const total = resourceIds.reduce((sum, id) => sum + (values[id] ?? 0), 0)
    return Math.round(total / resourceIds.length)
  }, [values])

  const resetToDefaults = useCallback(() => {
    setValuesState({ ...DEFAULT_RESOURCE_VALUES })
  }, [])

  return {
    values,
    getValue,
    setValue,
    setValues,
    getCategoryValues,
    getCategoryAggregate,
    resetToDefaults,
  }
}

/**
 * Hook for managing expansion state of resource categories
 */
export function useResourceExpansion() {
  const [expandedCategory, setExpandedCategory] = useState<ResourceCategory | null>(null)

  const toggleCategory = useCallback((category: ResourceCategory) => {
    setExpandedCategory(prev => prev === category ? null : category)
  }, [])

  const closeAll = useCallback(() => {
    setExpandedCategory(null)
  }, [])

  const isExpanded = useCallback((category: ResourceCategory): boolean => {
    return expandedCategory === category
  }, [expandedCategory])

  return {
    expandedCategory,
    toggleCategory,
    closeAll,
    isExpanded,
  }
}

/**
 * Hook for hover/active state management
 */
export function useResourceInteraction() {
  const [hoveredResource, setHoveredResource] = useState<ResourceId | null>(null)
  const [activeResource, setActiveResource] = useState<ResourceId | null>(null)

  const handleMouseEnter = useCallback((id: ResourceId) => {
    setHoveredResource(id)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredResource(null)
  }, [])

  const handleClick = useCallback((id: ResourceId) => {
    setActiveResource(prev => prev === id ? null : id)
  }, [])

  const isHovered = useCallback((id: ResourceId): boolean => {
    return hoveredResource === id
  }, [hoveredResource])

  const isActive = useCallback((id: ResourceId): boolean => {
    return activeResource === id
  }, [activeResource])

  const isSaturated = useCallback((id: ResourceId): boolean => {
    return hoveredResource === id || activeResource === id
  }, [hoveredResource, activeResource])

  return {
    hoveredResource,
    activeResource,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    isHovered,
    isActive,
    isSaturated,
  }
}

export default useResourcePool
