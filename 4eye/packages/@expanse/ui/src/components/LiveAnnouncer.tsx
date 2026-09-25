/**
 * Live Announcer Component
 * 
 * ARIA live region for screen reader announcements
 */

"use client"

import React, { useEffect, useRef } from "react"
import { Box } from "@mui/material"

export interface LiveAnnouncerProps {
  /** Message to announce */
  message: string
  /** Announcement priority */
  priority?: "polite" | "assertive"
  /** Clear message after announcement */
  clearAfter?: number
  /** Callback when announcement is cleared */
  onClear?: () => void
}

/**
 * ARIA live region for dynamic screen reader announcements.
 * 
 * Provides accessible feedback for interactive navigation changes,
 * meeting WCAG 2.1 AA success criterion 4.1.3 (Status Messages).
 * 
 * @example
 * ```tsx
 * const [announcement, setAnnouncement] = useState("")
 * 
 * // When navigation occurs
 * setAnnouncement("Navigated to position 2, 3")
 * 
 * <LiveAnnouncer 
 *   message={announcement}
 *   priority="polite"
 *   clearAfter={1000}
 *   onClear={() => setAnnouncement("")}
 * />
 * ```
 */
export function LiveAnnouncer({
  message,
  priority = "polite",
  clearAfter = 1000,
  onClear,
}: LiveAnnouncerProps) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (message && clearAfter > 0) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set new timeout to clear message
      timeoutRef.current = setTimeout(() => {
        onClear?.()
      }, clearAfter)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [message, clearAfter, onClear])

  return (
    <Box
      role="status"
      aria-live={priority}
      aria-atomic="true"
      sx={{
        position: "absolute",
        left: "-10000px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      {message}
    </Box>
  )
}

export default LiveAnnouncer
