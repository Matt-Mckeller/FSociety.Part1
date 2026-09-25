"use client"
import { useState } from "react"
import type { LoadingSpinnerProps } from "../../../types"

/**
 * Creates loading state for LayoutProvider
 * Tracks multiple loading processes via process ID queue
 */
export function useLoadingState(): LoadingSpinnerProps {
  const [currentLoadingProcessIDs, setCurrentLoadingProcessIDs] = useState<string[]>([])

  const addLoadingProcessID = (processName: string) => {
    setCurrentLoadingProcessIDs((prev) => [...prev, processName])
  }

  const removeLoadingProcessID = (processName: string) => {
    setCurrentLoadingProcessIDs((prev) => {
      const foundIndex = prev.findIndex((p) => p === processName)
      if (foundIndex > -1) {
        return [...prev.slice(0, foundIndex), ...prev.slice(foundIndex + 1)]
      }
      return prev
    })
  }

  return {
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,
    loading: currentLoadingProcessIDs.length > 0,
  }
}
