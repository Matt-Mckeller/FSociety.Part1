import React, { Suspense } from "react"
import { TileSkeleton } from "./TileSkeleton"

/**
 * Props for TileContent wrapper
 */
export interface TileContentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Wrapper for tile page content with Suspense boundary
 */
export function TileContent({ children, fallback }: TileContentProps) {
  return (
    <Suspense fallback={fallback ?? <TileSkeleton />}>
      {children}
    </Suspense>
  )
}
