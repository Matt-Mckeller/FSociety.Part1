"use client";
import React from "react"
import type { FabClusterContextValue } from "./types"

export const FabClusterContext = React.createContext<FabClusterContextValue | null>(null)

export function useFabCluster(): FabClusterContextValue {
  const ctx = React.useContext(FabClusterContext)
  if (!ctx) throw new Error("useFabCluster must be used inside FabCluster")
  return ctx
}
