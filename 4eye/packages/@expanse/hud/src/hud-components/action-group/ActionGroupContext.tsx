"use client";
/**
 * ActionGroup Context
 *
 * Provides selection state to child ActionButton components.
 */

import { createContext } from "react"
import type { ActionGroupContextValue } from "./types"

/**
 * Context for ActionGroup selection state
 *
 * Child ActionButton components use this context to:
 * - Determine if they are active/selected
 * - Handle selection changes
 * - Apply indicator styling
 */
export const ActionGroupContext = createContext<ActionGroupContextValue | null>(null)

ActionGroupContext.displayName = "ActionGroupContext"
