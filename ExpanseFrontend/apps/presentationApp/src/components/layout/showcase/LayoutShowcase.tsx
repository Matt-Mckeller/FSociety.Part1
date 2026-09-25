'use client'

import { useState, ReactNode, useMemo } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { PyramidLayout } from '../pyramid/PyramidLayout'
import { DiamondLayout, LayoutControls } from '../diamond'
import { CinemaLayout, CinemaControls, ResourceLayout } from '../cinema'
import type { DiamondLayoutMode, DiamondCornerPosition, SpacingConfig, VisibilityConfig } from '../diamond/types'
import type { 
  CinemaLayoutMode, 
  CinemaCornerPosition, 
  CinemaSpacingConfig, 
  CinemaVisibilityConfig,
  DiamondConfig,
  DiamondColorConfig,
  ShadowConfig,
  BarColorConfig,
} from '../cinema/types'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ height: '100%', width: '100%' }}
    >
      {value === index && children}
    </Box>
  )
}

type LayoutType = 'pyramid' | 'diamond' | 'cinema' | 'resources' | 'classic'

interface LayoutShowcaseProps {
  defaultLayout?: LayoutType
  showControls?: boolean
  children?: ReactNode
}

/**
 * LayoutShowcase - Tabbed container for comparing layout variations
 * 
 * Features:
 * - Tabs for Pyramid, Diamond, Cinema, and Classic layouts
 * - Interactive controls panel (for Diamond and Cinema layouts)
 * - Shared content across layouts
 */
export function LayoutShowcase({
  defaultLayout = 'pyramid',
  showControls = true,
  children,
}: LayoutShowcaseProps) {
  const layoutIndex = { pyramid: 0, diamond: 1, cinema: 2, resources: 3, classic: 4 }
  const [activeTab, setActiveTab] = useState(layoutIndex[defaultLayout])

  // Diamond layout state
  const [diamondMode, setDiamondMode] = useState<DiamondLayoutMode>('full')
  const [diamondSpacing, setDiamondSpacing] = useState<SpacingConfig>({
    barGap: 0,
    contentPadding: 0,
    diamondInset: 8,
  })
  const [diamondCorners, setDiamondCorners] = useState<DiamondCornerPosition[]>([
    'top-left',
    'top-right',
    'bottom-left',
  ])
  const [diamondVisibility, setDiamondVisibility] = useState<VisibilityConfig>({
    topBar1: true,
    topBar2: true,
    bottomBar1: true,
    bottomBar2: true,
    corners: true,
  })

  // Cinema layout state
  const [cinemaMode, setCinemaMode] = useState<CinemaLayoutMode>('full')
  const [cinemaDiamond, setCinemaDiamond] = useState<DiamondConfig>({
    width: 120,
    height: 60,
  })
  const [cinemaDiamondColors, setCinemaDiamondColors] = useState<DiamondColorConfig>({
    enabled: true,
  })
  const [cinemaShadows, setCinemaShadows] = useState<ShadowConfig>({
    enabled: true,
    direction: 'inward',
    intensity: 'medium',
    blur: 12,
    spread: 0,
    offset: 4,
  })
  const [cinemaBarColors, setCinemaBarColors] = useState<BarColorConfig>({
    mode: 'theme',
  })
  const [cinemaSpacing, setCinemaSpacing] = useState<CinemaSpacingConfig>({
    barGap: 0,
    contentPadding: 0,
    diamondInset: 8,
  })
  const [cinemaCorners, setCinemaCorners] = useState<CinemaCornerPosition[]>([
    'top-left',
    'top-right',
    'bottom-left',
  ])
  const [cinemaVisibility, setCinemaVisibility] = useState<CinemaVisibilityConfig>({
    topPrimary: true,
    topSecondary: true,
    bottomPrimary: true,
    bottomSecondary: true,
    corners: true,
    fab: true,
  })

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const isDiamondLayout = activeTab === 1
  const isCinemaLayout = activeTab === 2

  // Default content if none provided
  const defaultContent = useMemo(() => (
    <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Layout Preview
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is the main content area. The content will be displayed in the center
        with the layout decorations around it.
      </Typography>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Your content goes here
        </Typography>
      </Box>
    </Box>
  ), [])

  const contentToRender = children || defaultContent

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Tab Header */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', zIndex: 1100 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ px: 2 }}
        >
          <Tab label="Pyramid" />
          <Tab label="Diamond" />
          <Tab label="Cinema" />
          <Tab label="Resources" />
          <Tab label="Classic" />
        </Tabs>
      </Box>

      {/* Layout Content */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Pyramid Layout */}
        <TabPanel value={activeTab} index={0}>
          <PyramidLayout
            layers={[
              { thickness: 20, borderRadius: 0 },
              { thickness: 16, borderRadius: 0 },
              { thickness: 0, borderRadius: 0 },
            ]}
            corners={{
              'top-left': { show: true },
              'top-right': { show: true },
              'bottom-left': { show: true },
              'bottom-right': { show: false },
            }}
            elevation="subtle"
            colorScheme="primary"
          >
            {contentToRender}
          </PyramidLayout>
        </TabPanel>

        {/* Diamond Layout */}
        <TabPanel value={activeTab} index={1}>
          <DiamondLayout
            mode={diamondMode}
            bars={{
              topBar1: { visible: diamondVisibility.topBar1 },
              topBar2: { visible: diamondVisibility.topBar2 },
              bottomBar1: { visible: diamondVisibility.bottomBar1 },
              bottomBar2: { visible: diamondVisibility.bottomBar2 },
            }}
            corners={{
              positions: diamondCorners,
              show: diamondVisibility.corners,
              animated: true,
            }}
            spacing={diamondSpacing}
            elevation="subtle"
            colorScheme="primary"
          >
            {contentToRender}
          </DiamondLayout>
        </TabPanel>

        {/* Cinema Layout */}
        <TabPanel value={activeTab} index={2}>
          <CinemaLayout
            mode={cinemaMode}
            diamond={cinemaDiamond}
            bars={{
              top: {
                primary: { visible: cinemaVisibility.topPrimary },
                secondary: { visible: cinemaVisibility.topSecondary },
              },
              bottom: {
                primary: { visible: cinemaVisibility.bottomPrimary },
                secondary: { visible: cinemaVisibility.bottomSecondary },
              },
            }}
            corners={{
              positions: cinemaCorners,
              show: cinemaVisibility.corners,
              animated: true,
              colors: { enabled: cinemaDiamondColors.enabled },
            }}
            shadows={cinemaShadows}
            barColors={cinemaBarColors}
            fab={{ show: cinemaVisibility.fab }}
            spacing={cinemaSpacing}
            colorScheme="primary"
          >
            {contentToRender}
          </CinemaLayout>
        </TabPanel>

        {/* Resources Layout */}
        <TabPanel value={activeTab} index={3}>
          <ResourceLayout>
            {contentToRender}
          </ResourceLayout>
        </TabPanel>

        {/* Classic Layout */}
        <TabPanel value={activeTab} index={4}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                height: 64,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                px: 3,
              }}
            >
              <Typography variant="h6" sx={{ color: 'white' }}>
                Classic Header
              </Typography>
            </Box>
            
            {/* Content */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {contentToRender}
            </Box>
            
            {/* Footer */}
            <Box
              sx={{
                height: 48,
                bgcolor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Classic Footer
              </Typography>
            </Box>
          </Box>
        </TabPanel>
      </Box>

      {/* Controls Panel (for Diamond) */}
      {showControls && isDiamondLayout && (
        <LayoutControls
          mode={diamondMode}
          onModeChange={setDiamondMode}
          spacing={diamondSpacing}
          onSpacingChange={setDiamondSpacing}
          corners={diamondCorners}
          onCornersChange={setDiamondCorners}
          visibility={diamondVisibility}
          onVisibilityChange={setDiamondVisibility}
          position="right"
        />
      )}

      {/* Controls Panel (for Cinema) */}
      {showControls && isCinemaLayout && (
        <CinemaControls
          mode={cinemaMode}
          onModeChange={setCinemaMode}
          diamond={cinemaDiamond}
          onDiamondChange={setCinemaDiamond}
          diamondColors={cinemaDiamondColors}
          onDiamondColorsChange={setCinemaDiamondColors}
          shadows={cinemaShadows}
          onShadowsChange={setCinemaShadows}
          barColors={cinemaBarColors}
          onBarColorsChange={setCinemaBarColors}
          spacing={cinemaSpacing}
          onSpacingChange={setCinemaSpacing}
          corners={cinemaCorners}
          onCornersChange={setCinemaCorners}
          visibility={cinemaVisibility}
          onVisibilityChange={setCinemaVisibility}
          position="right"
        />
      )}
    </Box>
  )
}

export default LayoutShowcase
