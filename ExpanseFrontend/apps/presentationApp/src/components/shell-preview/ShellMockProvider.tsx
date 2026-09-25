'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react'

// ============================================================================
// Types
// ============================================================================

export interface MockUser {
  name: string
  level: number
  xp: number
  maxXp: number
  coins: number
  avatarUrl?: string
}

export interface PanelState {
  navigation: boolean
  quest: boolean
  chat: boolean
  notes: boolean
  inventory: boolean
}

export interface ShellMockContextValue {
  // User state
  user: MockUser
  setUser: (user: MockUser) => void
  
  // Theme
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  
  // Panel states
  panels: PanelState
  togglePanel: (panel: keyof PanelState) => void
  
  // Content
  currentSlide: number
  totalSlides: number
  setCurrentSlide: (slide: number) => void
  
  // Presentation
  presentationTitle: string
  sections: Array<{ id: string; title: string; progress: number }>
}

// ============================================================================
// Default Values
// ============================================================================

export const defaultMockUser: MockUser = {
  name: 'Demo User',
  level: 12,
  xp: 450,
  maxXp: 1000,
  coins: 1500,
}

export const defaultPanelState: PanelState = {
  navigation: true,
  quest: false,
  chat: false,
  notes: false,
  inventory: false,
}

export const defaultSections = [
  { id: 'intro', title: 'Introduction', progress: 100 },
  { id: 'core', title: 'Core Concepts', progress: 75 },
  { id: 'advanced', title: 'Advanced Topics', progress: 30 },
  { id: 'practice', title: 'Practice', progress: 0 },
]

// ============================================================================
// Context
// ============================================================================

const ShellMockContext = createContext<ShellMockContextValue | null>(null)

export function useShellMock() {
  const context = useContext(ShellMockContext)
  if (!context) {
    throw new Error('useShellMock must be used within a ShellMockProvider')
  }
  return context
}

// ============================================================================
// Provider
// ============================================================================

interface ShellMockProviderProps {
  children: ReactNode
  initialUser?: Partial<MockUser>
  initialTheme?: 'light' | 'dark'
  initialPanels?: Partial<PanelState>
}

export function ShellMockProvider({
  children,
  initialUser,
  initialTheme = 'light',
  initialPanels,
}: ShellMockProviderProps) {
  const [user, setUser] = useState<MockUser>({ ...defaultMockUser, ...initialUser })
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme)
  const [panels, setPanels] = useState<PanelState>({ ...defaultPanelState, ...initialPanels })
  const [currentSlide, setCurrentSlide] = useState(1)

  const togglePanel = (panel: keyof PanelState) => {
    setPanels(prev => ({ ...prev, [panel]: !prev[panel] }))
  }

  const value: ShellMockContextValue = {
    user,
    setUser,
    theme,
    setTheme,
    panels,
    togglePanel,
    currentSlide,
    totalSlides: 24,
    setCurrentSlide,
    presentationTitle: 'Sample Presentation',
    sections: defaultSections,
  }

  return (
    <ShellMockContext.Provider value={value}>
      {children}
    </ShellMockContext.Provider>
  )
}
