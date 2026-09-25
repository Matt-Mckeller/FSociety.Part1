'use client'

import { LayoutShowcase } from '@/components/layout/showcase'

/**
 * Layouts Page - Interactive showcase of all layout variations
 * 
 * Features:
 * - Tabbed interface for Pyramid, Diamond, Cinema, and Classic layouts
 * - Interactive controls for Diamond and Cinema layout customization
 * - Mode toggle for simplified views
 * - Shadow direction controls, lozenge aspect ratio, FAB visibility
 */
export default function LayoutsPage() {
  return (
    <LayoutShowcase 
      defaultLayout="cinema"
      showControls={true}
    />
  )
}
