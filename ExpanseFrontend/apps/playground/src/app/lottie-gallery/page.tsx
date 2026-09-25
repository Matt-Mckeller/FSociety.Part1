/**
 * Lottie Gallery - Main Page
 * Next.js App Router page for browsing Lottie animations
 * Now dynamically loads ALL lotties from the packages/dynamicAssets/lotties directory
 */

"use client"

import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material"
import { useGalleryState } from "./hooks/useGalleryState"
import { GalleryHeader } from "./components/GalleryHeader"
import { StatsBar } from "./components/StatsBar"
import { AnimationGrid } from "./components/AnimationGrid"

export default function LottieGalleryPage() {
  console.log("🟢 [LottieGalleryPage] === RENDERING ===")

  const {
    state,
    filteredAnimations,
    categories,
    updateFilter,
    updateSort,
    togglePending,
    updateThemeColor,
    isLoading,
    error,
    totalCount,
  } = useGalleryState()

  console.log("🟢 [LottieGalleryPage] State:", {
    isLoading,
    error,
    totalCount,
    filteredCount: filteredAnimations.length,
  })

  console.log(
    "🟢 [LottieGalleryPage] Will render:",
    !isLoading && !error ? "GRID" : isLoading ? "LOADING" : "ERROR",
  )

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <GalleryHeader
          filter={state.currentFilter}
          sort={state.currentSort}
          showPending={state.showPending}
          themeColor={state.currentThemeColor}
          categories={categories}
          onFilterChange={updateFilter}
          onSortChange={updateSort}
          onTogglePending={togglePending}
          onThemeColorChange={updateThemeColor}
        />

        {/* Loading State */}
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              gap: 2,
            }}
          >
            <CircularProgress size={60} sx={{ color: "white" }} />
            <Typography variant="h6" color="white">
              Loading {totalCount > 0 ? totalCount : ""} animations...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            <StatsBar
              filteredCount={filteredAnimations.length}
              showPending={state.showPending}
              totalCount={totalCount}
            />

            <AnimationGrid
              animations={filteredAnimations}
              themeColor={state.currentThemeColor}
            />
          </>
        )}
      </Container>
    </Box>
  )
}
