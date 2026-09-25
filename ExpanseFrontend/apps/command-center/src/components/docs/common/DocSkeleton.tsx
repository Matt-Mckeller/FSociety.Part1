/**
 * DocSkeleton - Loading skeleton for documentation sections
 * Used as fallback during lazy loading
 */
import { Box, Skeleton, Grid } from '@mui/material'

export interface DocSkeletonProps {
  /** Skeleton variant */
  variant?: 'section' | 'cards' | 'list' | 'table'
  /** Number of items to show */
  count?: number
}

/**
 * Loading skeleton for lazy-loaded documentation sections
 * 
 * @example
 * ```tsx
 * <Suspense fallback={<DocSkeleton variant="cards" count={6} />}>
 *   <LazySection />
 * </Suspense>
 * ```
 */
export function DocSkeleton({ 
  variant = 'section',
  count = 3,
}: DocSkeletonProps) {
  if (variant === 'cards') {
    return (
      <Box>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={500} height={24} sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {Array.from({ length: count }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton 
                variant="rounded" 
                height={180} 
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  if (variant === 'list') {
    return (
      <Box>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={500} height={24} sx={{ mb: 3 }} />
        {Array.from({ length: count }).map((_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="60%" height={20} />
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  if (variant === 'table') {
    return (
      <Box>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={500} height={24} sx={{ mb: 3 }} />
        <Skeleton 
          variant="rounded" 
          height={300} 
          sx={{ borderRadius: 2 }}
        />
      </Box>
    )
  }

  // Default section skeleton
  return (
    <Box>
      {/* Title */}
      <Skeleton variant="text" width={300} height={40} sx={{ mb: 1 }} />
      {/* Description */}
      <Skeleton variant="text" width="70%" height={24} sx={{ mb: 3 }} />
      
      {/* Content blocks */}
      <Skeleton 
        variant="rounded" 
        height={120} 
        sx={{ mb: 2, borderRadius: 2 }}
      />
      <Skeleton 
        variant="rounded" 
        height={200} 
        sx={{ mb: 2, borderRadius: 2 }}
      />
      <Skeleton 
        variant="rounded" 
        height={150} 
        sx={{ borderRadius: 2 }}
      />
    </Box>
  )
}

export default DocSkeleton
