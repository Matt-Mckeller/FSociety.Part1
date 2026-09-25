'use client'

import { ReactNode } from 'react'

/**
 * Resource category modes
 */
export type ResourceCategory = 'core' | 'emotional' | 'cognitive'

/**
 * Core resources (energy/health/attention)
 */
export type CoreResource = 'energy' | 'health' | 'attention'

/**
 * Emotional resources
 */
export type EmotionalResource = 'anger' | 'happiness' | 'sadness' | 'anxiety' | 'socialEnergy'

/**
 * Cognitive resources
 */
export type CognitiveResource = 'visual' | 'kinesthetic' | 'auditory' | 'problemSolving' | 'knowledge'

/**
 * All resource identifiers
 */
export type ResourceId = CoreResource | EmotionalResource | CognitiveResource

/**
 * Shape types for resource display
 */
export type ResourceShapeType = 'diamond' | 'circle' | 'square' | 'triangle'

/**
 * Individual resource value
 */
export interface ResourceValue {
  id: ResourceId
  value: number // 0-100
  max?: number  // default 100
  label?: string
}

/**
 * Resource color configuration
 */
export interface ResourceColorConfig {
  primary: string
  secondary: string
  glow?: string
}

/**
 * Resource pool display props
 */
export interface ResourcePoolProps {
  /** Resource identifier */
  resourceId: ResourceId
  /** Current value (0-100) */
  value: number
  /** Maximum value (default 100) */
  max?: number
  /** Override color */
  color?: string
  /** Show percentage text */
  showPercentage?: boolean
  /** Is currently hovered */
  isHovered?: boolean
  /** Is currently active/selected */
  isActive?: boolean
  /** Disable desaturation effect */
  alwaysSaturated?: boolean
  /** Animation duration in ms */
  animationDuration?: number
  /** Click handler */
  onClick?: () => void
  /** Hover handlers */
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

/**
 * Resource diamond props (corner shapes)
 */
export interface ResourceDiamondProps extends ResourcePoolProps {
  /** Position in layout */
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Diamond dimensions */
  width: number
  height: number
  /** Category for this diamond (determines child resources) */
  category: ResourceCategory
  /** Is expanded to show child resources */
  isExpanded?: boolean
  /** Toggle expansion */
  onToggleExpand?: () => void
  /** All resources in this category */
  resources?: ResourceValue[]
}

/**
 * Small resource shape props (expanded items)
 */
export interface ResourceShapeProps extends ResourcePoolProps {
  /** Shape type */
  shape: ResourceShapeType
  /** Size in pixels */
  size: number
  /** Delay for staggered animation */
  animationDelay?: number
}

/**
 * Resource bar segment props
 */
export interface ResourceBarProps extends ResourcePoolProps {
  /** Fill direction */
  fillDirection: 'left-to-right' | 'right-to-left' | 'center-out' | 'edges-in'
  /** Bar dimensions */
  width: number | string
  height: number
}

/**
 * Category configuration
 */
export interface CategoryConfig {
  category: ResourceCategory
  label: string
  primaryColor: string
  resources: ResourceId[]
}

/**
 * Resource color palette
 */
export const RESOURCE_COLORS: Record<ResourceId, ResourceColorConfig> = {
  // Core (vital resources)
  energy: { primary: '#FFD700', secondary: '#FFA500', glow: '#FFD70066' },
  health: { primary: '#FF4757', secondary: '#C0392B', glow: '#FF475766' },
  attention: { primary: '#00CED1', secondary: '#008B8B', glow: '#00CED166' },

  // Emotional
  anger: { primary: '#FF6B6B', secondary: '#E74C3C', glow: '#FF6B6B66' },
  happiness: { primary: '#FFE66D', secondary: '#F4D03F', glow: '#FFE66D66' },
  sadness: { primary: '#5B9BD5', secondary: '#3498DB', glow: '#5B9BD566' },
  anxiety: { primary: '#9B59B6', secondary: '#8E44AD', glow: '#9B59B666' },
  socialEnergy: { primary: '#FF69B4', secondary: '#DB7093', glow: '#FF69B466' },

  // Cognitive
  visual: { primary: '#2ECC71', secondary: '#27AE60', glow: '#2ECC7166' },
  kinesthetic: { primary: '#F39C12', secondary: '#E67E22', glow: '#F39C1266' },
  auditory: { primary: '#8E44AD', secondary: '#9B59B6', glow: '#8E44AD66' },
  problemSolving: { primary: '#3498DB', secondary: '#2980B9', glow: '#3498DB66' },
  knowledge: { primary: '#F1C40F', secondary: '#D4AC0D', glow: '#F1C40F66' },
}

/**
 * Category configurations
 */
export const CATEGORY_CONFIGS: Record<ResourceCategory, CategoryConfig> = {
  core: {
    category: 'core',
    label: 'Core Resources',
    primaryColor: '#00CED1',
    resources: ['energy', 'health', 'attention'],
  },
  emotional: {
    category: 'emotional',
    label: 'Emotional State',
    primaryColor: '#FF69B4',
    resources: ['anger', 'happiness', 'sadness', 'anxiety', 'socialEnergy'],
  },
  cognitive: {
    category: 'cognitive',
    label: 'Cognitive Channels',
    primaryColor: '#9B59B6',
    resources: ['visual', 'kinesthetic', 'auditory', 'problemSolving', 'knowledge'],
  },
}

/**
 * Resource labels for display
 */
export const RESOURCE_LABELS: Record<ResourceId, string> = {
  energy: 'Energy',
  health: 'Health',
  attention: 'Attention',
  anger: 'Anger',
  happiness: 'Happiness',
  sadness: 'Sadness',
  anxiety: 'Anxiety',
  socialEnergy: 'Social',
  visual: 'Visual',
  kinesthetic: 'Kinesthetic',
  auditory: 'Auditory',
  problemSolving: 'Problem Solving',
  knowledge: 'Knowledge',
}

/**
 * Get color for a resource
 */
export function getResourceColor(resourceId: ResourceId): ResourceColorConfig {
  return RESOURCE_COLORS[resourceId]
}

/**
 * Get resources for a category
 */
export function getResourcesForCategory(category: ResourceCategory): ResourceId[] {
  return CATEGORY_CONFIGS[category].resources
}

/**
 * Default resource values for demo
 */
export const DEFAULT_RESOURCE_VALUES: Record<ResourceId, number> = {
  energy: 75,
  health: 90,
  attention: 60,
  anger: 20,
  happiness: 80,
  sadness: 15,
  anxiety: 35,
  socialEnergy: 55,
  visual: 70,
  kinesthetic: 45,
  auditory: 65,
  problemSolving: 85,
  knowledge: 50,
}
