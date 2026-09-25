/**
 * useDocsNavigation Hook
 * Manages documentation navigation state and URL synchronization
 */
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SectionId, NavItem } from '../types'
import { docsNavigation } from '../../../data/docs'

interface UseDocsNavigationReturn {
  /** Currently active section */
  activeSection: SectionId
  /** Set the active section (also updates URL) */
  setActiveSection: (id: SectionId) => void
  /** List of expanded navigation items */
  expandedNav: string[]
  /** Toggle a navigation item's expanded state */
  toggleNav: (id: string) => void
  /** Expand a specific nav item */
  expandNav: (id: string) => void
  /** Find the parent nav item for a given section */
  findParentNav: (sectionId: string) => string | null
}

/**
 * Hook for managing docs navigation state with URL sync
 * 
 * @example
 * ```tsx
 * const { activeSection, setActiveSection, expandedNav, toggleNav } = useDocsNavigation()
 * ```
 */
export function useDocsNavigation(): UseDocsNavigationReturn {
  const [searchParams, setSearchParams] = useSearchParams()
  const sectionFromUrl = searchParams.get('section') as SectionId | null
  
  const [activeSection, setActiveSectionState] = useState<SectionId>(
    sectionFromUrl || 'highlights'
  )
  const [expandedNav, setExpandedNav] = useState<string[]>(['business'])

  /**
   * Find the parent navigation item for a given section ID
   */
  const findParentNav = useCallback((sectionId: string): string | null => {
    for (const item of docsNavigation as NavItem[]) {
      if (item.children?.some((child: NavItem) => child.id === sectionId)) {
        return item.id
      }
    }
    return null
  }, [])

  /**
   * Auto-expand parent nav when deep-linking via URL
   */
  useEffect(() => {
    if (sectionFromUrl) {
      const parent = findParentNav(sectionFromUrl)
      if (parent && !expandedNav.includes(parent)) {
        setExpandedNav(prev => [...prev, parent])
      }
    }
  }, []) // Only on mount

  /**
   * Set active section and sync URL
   */
  const setActiveSection = useCallback((id: SectionId) => {
    setActiveSectionState(id)
    
    // Update URL - clear param if going to default section
    if (id !== 'highlights') {
      setSearchParams({ section: id }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [setSearchParams])

  /**
   * Toggle a navigation item's expanded state
   */
  const toggleNav = useCallback((id: string) => {
    setExpandedNav(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }, [])

  /**
   * Expand a specific nav item (without toggling)
   */
  const expandNav = useCallback((id: string) => {
    setExpandedNav(prev =>
      prev.includes(id) ? prev : [...prev, id]
    )
  }, [])

  return {
    activeSection,
    setActiveSection,
    expandedNav,
    toggleNav,
    expandNav,
    findParentNav,
  }
}

export default useDocsNavigation
