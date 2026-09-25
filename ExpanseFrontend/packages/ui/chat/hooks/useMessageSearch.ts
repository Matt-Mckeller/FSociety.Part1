/**
 * useMessageSearch Hook
 *
 * Instant search across chat messages with smart highlighting
 */

"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import type { LearningChatMessage } from "../types"

export interface SearchMatch {
  messageId: string
  messageIndex: number
  matchStart: number
  matchEnd: number
  preview: string
}

export interface UseMessageSearchOptions {
  messages: LearningChatMessage[]
  /** Minimum characters before search starts */
  minQueryLength?: number
  /** Max preview length for each match */
  previewLength?: number
}

export interface UseMessageSearchReturn {
  /** Current search query */
  query: string
  /** Set the search query */
  setQuery: (q: string) => void
  /** Whether search is active */
  isSearching: boolean
  /** Open search */
  openSearch: () => void
  /** Close search and clear */
  closeSearch: () => void
  /** All matches found */
  matches: SearchMatch[]
  /** Current match index (0-based) */
  currentIndex: number
  /** Total number of matches */
  totalMatches: number
  /** Current match object */
  currentMatch: SearchMatch | null
  /** Go to next match */
  goToNext: () => void
  /** Go to previous match */
  goToPrevious: () => void
  /** Jump to specific match */
  goToMatch: (index: number) => void
  /** Check if a message contains matches */
  hasMatch: (messageId: string) => boolean
  /** Get highlight ranges for a message */
  getHighlightRanges: (
    messageId: string,
  ) => Array<{ start: number; end: number }>
  /** Scroll to current match */
  scrollToCurrentMatch: () => void
}

/**
 * Get a preview snippet around a match
 */
function getPreviewSnippet(
  content: string,
  matchStart: number,
  matchEnd: number,
  previewLength: number,
): string {
  const halfLength = Math.floor(previewLength / 2)
  const start = Math.max(0, matchStart - halfLength)
  const end = Math.min(content.length, matchEnd + halfLength)

  let preview = content.slice(start, end)

  if (start > 0) preview = "..." + preview
  if (end < content.length) preview = preview + "..."

  return preview
}

export const useMessageSearch = (
  options: UseMessageSearchOptions,
): UseMessageSearchReturn => {
  const { messages, minQueryLength = 1, previewLength = 80 } = options

  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Find all matches - runs instantly on query change
  const matches = useMemo<SearchMatch[]>(() => {
    if (!query || query.length < minQueryLength) return []

    const searchLower = query.toLowerCase()
    const results: SearchMatch[] = []

    messages.forEach((message, messageIndex) => {
      const contentLower = message.content.toLowerCase()
      let pos = 0
      let matchStart = contentLower.indexOf(searchLower, pos)

      // Find all occurrences in this message
      while (matchStart !== -1) {
        const matchEnd = matchStart + query.length

        results.push({
          messageId: message.id,
          messageIndex,
          matchStart,
          matchEnd,
          preview: getPreviewSnippet(
            message.content,
            matchStart,
            matchEnd,
            previewLength,
          ),
        })

        pos = matchStart + 1
        matchStart = contentLower.indexOf(searchLower, pos)
      }
    })

    return results
  }, [messages, query, minQueryLength, previewLength])

  // Reset current index when matches change
  useEffect(() => {
    if (matches.length > 0) {
      setCurrentIndex(0)
    }
  }, [matches.length, query])

  const currentMatch = matches[currentIndex] ?? null

  const openSearch = useCallback(() => {
    setIsSearching(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearching(false)
    setQuery("")
    setCurrentIndex(0)
  }, [])

  const goToNext = useCallback(() => {
    if (matches.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % matches.length)
  }, [matches.length])

  const goToPrevious = useCallback(() => {
    if (matches.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + matches.length) % matches.length)
  }, [matches.length])

  const goToMatch = useCallback(
    (index: number) => {
      if (index >= 0 && index < matches.length) {
        setCurrentIndex(index)
      }
    },
    [matches.length],
  )

  const hasMatch = useCallback(
    (messageId: string) => {
      return matches.some((m) => m.messageId === messageId)
    },
    [matches],
  )

  const getHighlightRanges = useCallback(
    (messageId: string) => {
      return matches
        .filter((m) => m.messageId === messageId)
        .map((m) => ({ start: m.matchStart, end: m.matchEnd }))
    },
    [matches],
  )

  const scrollToCurrentMatch = useCallback(() => {
    if (!currentMatch) return

    const element = document.getElementById(`message-${currentMatch.messageId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })

      // Pulse animation for visibility
      element.style.transition = "background-color 0.3s ease"
      element.style.backgroundColor = "rgba(255, 193, 7, 0.3)"
      setTimeout(() => {
        element.style.backgroundColor = ""
      }, 1500)
    }
  }, [currentMatch])

  // Auto-scroll when current match changes
  useEffect(() => {
    if (currentMatch && isSearching) {
      scrollToCurrentMatch()
    }
  }, [currentMatch, isSearching, scrollToCurrentMatch])

  return {
    query,
    setQuery,
    isSearching,
    openSearch,
    closeSearch,
    matches,
    currentIndex,
    totalMatches: matches.length,
    currentMatch,
    goToNext,
    goToPrevious,
    goToMatch,
    hasMatch,
    getHighlightRanges,
    scrollToCurrentMatch,
  }
}

export default useMessageSearch
