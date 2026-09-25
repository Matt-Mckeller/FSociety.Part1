/**
 * StrategicFocusView - Main page component for Strategic Focus
 * Displays all focuses in a grid with filtering, sorting, and view options
 */
import { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  alpha,
  Card,
  CardContent,
} from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import { FocusCard } from './FocusCard'
import { FocusCardExpanded } from './FocusCardExpanded'
import { FocusDetailPage } from './FocusDetailPage'
import { GlobalSWOT } from './GlobalSWOT'
import type { StrategicFocus, Campaign, GlobalSWOT as GlobalSWOTType } from '../../types'

interface StrategicFocusViewProps {
  focuses: StrategicFocus[]
  campaigns?: Campaign[]
  globalSwot?: GlobalSWOTType
}

type ViewMode = 'simple' | 'expanded'
type SortOption = 'weight-desc' | 'weight-asc' | 'name' | 'urgency' | 'problems'
type FilterTab = 'all' | 'high' | 'medium' | 'low'

export function StrategicFocusView({ 
  focuses, 
  campaigns = [], 
  globalSwot 
}: StrategicFocusViewProps) {
  const [selectedFocusId, setSelectedFocusId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('simple')
  const [filterTab, setFilterTab] = useState<FilterTab>('all')
  const [sortBy, setSortBy] = useState<SortOption>('weight-desc')
  const [searchQuery, setSearchQuery] = useState('')

  // Get selected focus
  const selectedFocus = selectedFocusId 
    ? focuses.find(f => f.id === selectedFocusId) 
    : null

  // Filter and sort focuses
  const filteredFocuses = useMemo(() => {
    let result = [...focuses]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.description?.toLowerCase().includes(query) ||
        f.problems.some(p => p.title.toLowerCase().includes(query)) ||
        f.goals.some(g => g.title.toLowerCase().includes(query))
      )
    }

    // Weight filter
    if (filterTab !== 'all') {
      result = result.filter(f => {
        if (filterTab === 'high') return f.currentWeight >= 60
        if (filterTab === 'medium') return f.currentWeight >= 30 && f.currentWeight < 60
        if (filterTab === 'low') return f.currentWeight < 30
        return true
      })
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'weight-desc':
          return b.currentWeight - a.currentWeight
        case 'weight-asc':
          return a.currentWeight - b.currentWeight
        case 'name':
          return a.name.localeCompare(b.name)
        case 'urgency': {
          const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          return urgencyOrder[b.weightFactors.urgency] - urgencyOrder[a.weightFactors.urgency]
        }
        case 'problems':
          return b.problems.filter(p => p.isActive).length - a.problems.filter(p => p.isActive).length
        default:
          return 0
      }
    })

    return result
  }, [focuses, searchQuery, filterTab, sortBy])

  // Calculate stats
  const stats = useMemo(() => {
    const highWeight = focuses.filter(f => f.currentWeight >= 60).length
    const totalProblems = focuses.reduce((sum, f) => sum + f.problems.filter(p => p.isActive).length, 0)
    const avgWeight = focuses.length > 0 
      ? Math.round(focuses.reduce((sum, f) => sum + f.currentWeight, 0) / focuses.length)
      : 0
    return { highWeight, totalProblems, avgWeight }
  }, [focuses])

  // If a focus is selected, show detail page
  if (selectedFocus) {
    return (
      <FocusDetailPage
        focus={selectedFocus}
        campaigns={campaigns}
        globalSwot={globalSwot}
        onBack={() => setSelectedFocusId(null)}
      />
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ mb: 1 }}>
          🎯 Strategic Focus
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Dynamic priorities that guide decision-making and resource allocation
        </Typography>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: alpha('#EF4444', 0.05) }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h3" fontWeight={900} color="#EF4444">
                {stats.highWeight}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High Priority Focuses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: alpha('#F59E0B', 0.05) }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h3" fontWeight={900} color="#F59E0B">
                {stats.totalProblems}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Problems
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: alpha('#6366F1', 0.05) }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h3" fontWeight={900} color="#6366F1">
                {stats.avgWeight}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Weight
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Global SWOT Compact */}
      {globalSwot && (
        <Box sx={{ mb: 3 }}>
          <GlobalSWOT swot={globalSwot} compact />
        </Box>
      )}

      {/* Toolbar */}
      <Box 
        sx={{ 
          mb: 3, 
          p: 2, 
          bgcolor: 'background.paper', 
          borderRadius: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          {/* Search */}
          <TextField
            size="small"
            placeholder="Search focuses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />

          {/* Filter Tabs */}
          <Tabs 
            value={filterTab} 
            onChange={(_, v) => setFilterTab(v)}
            sx={{ 
              minHeight: 40,
              '& .MuiTab-root': { minHeight: 40, py: 0 },
            }}
          >
            <Tab value="all" label={`All (${focuses.length})`} />
            <Tab 
              value="high" 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EF4444' }} />
                  High
                </Box>
              } 
            />
            <Tab 
              value="medium" 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                  Medium
                </Box>
              } 
            />
            <Tab 
              value="low" 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                  Low
                </Box>
              } 
            />
          </Tabs>

          {/* Sort */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel><SortIcon fontSize="small" sx={{ mr: 0.5 }} /> Sort</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              label="Sort"
            >
              <MenuItem value="weight-desc">Weight (High → Low)</MenuItem>
              <MenuItem value="weight-asc">Weight (Low → High)</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="urgency">Urgency</MenuItem>
              <MenuItem value="problems">Problems Count</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* View Mode Toggle */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, v) => v && setViewMode(v)}
          size="small"
        >
          <ToggleButton value="simple">
            <ViewModuleIcon sx={{ mr: 0.5 }} fontSize="small" />
            Simple
          </ToggleButton>
          <ToggleButton value="expanded">
            <ViewListIcon sx={{ mr: 0.5 }} fontSize="small" />
            Expanded
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Results Count */}
      {searchQuery && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Found {filteredFocuses.length} {filteredFocuses.length === 1 ? 'focus' : 'focuses'} matching "{searchQuery}"
        </Typography>
      )}

      {/* Focus Grid */}
      {filteredFocuses.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No focuses found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchQuery ? 'Try a different search term' : 'Create your first strategic focus to get started'}
          </Typography>
        </Card>
      ) : viewMode === 'simple' ? (
        <Grid container spacing={3}>
          {filteredFocuses.map((focus) => (
            <Grid item xs={12} sm={6} lg={4} key={focus.id}>
              <FocusCard
                focus={focus}
                campaigns={campaigns.filter(c => focus.connectedCampaignIds?.includes(c.id))}
                onClick={() => setSelectedFocusId(focus.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={3}>
          {filteredFocuses.map((focus) => (
            <FocusCardExpanded
              key={focus.id}
              focus={focus}
              campaigns={campaigns.filter(c => focus.connectedCampaignIds?.includes(c.id))}
              onClick={() => setSelectedFocusId(focus.id)}
            />
          ))}
        </Stack>
      )}
    </Box>
  )
}
