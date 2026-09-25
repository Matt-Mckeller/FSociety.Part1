"use client"

import { type ReactNode } from "react"
import { Box } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigation } from "@/context"
import { getPositionKey } from "@/types/grid"

// =============================================================================
// Types
// =============================================================================

interface PageTransitionProps {
  children: ReactNode
}

// =============================================================================
// Animation Variants
// =============================================================================

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1.05,
  },
}

const pageTransition = {
  duration: 0.25,
  ease: [0.4, 0, 0.2, 1] as const,
}

// =============================================================================
// Component
// =============================================================================

export function PageTransition({ children }: PageTransitionProps) {
  const { currentPosition } = useNavigation()
  const pageKey = getPositionKey(currentPosition)

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}

export default PageTransition
