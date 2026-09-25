import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Stack, TextField, MenuItem, Select, FormControl, InputLabel, ToggleButton, ToggleButtonGroup, Slider, Tooltip } from '@mui/material';
import {
  Videocam as CameraIcon,
  VideocamOff as NoCameraIcon,
  Warning as ImportantIcon,
  Gavel as CriminalIcon,
  TrendingUp as BusinessIcon,
  AccountBalance as GovernmentIcon,
  AllInclusive as AllIcon,
} from '@mui/icons-material';
import { getEventsSortedByDate, getLocationById, getPeopleByEventId } from '../utils/dataService';

type SortOrder = 'date-asc' | 'date-desc' | 'importance';
type PerspectiveFilter = 'all' | 'criminal' | 'business' | 'government';

// Helper to get importance color
const getImportanceColor = (rating: number) => {
  if (rating >= 10) return '#d32f2f';
  if (rating >= 8) return '#f57c00';
  if (rating >= 6) return '#fbc02d';
  return '#9e9e9e';
};

export default function Timeline() {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('date-desc');
  const [filterTag, setFilterTag] = useState('');
  const [perspectiveFilter, setPerspectiveFilter] = useState<PerspectiveFilter>('all');
  const [minImportance, setMinImportance] = useState<number>(8);

  // Calculate importance distribution for histogram
  const allEvents = getEventsSortedByDate();
  const importanceDistribution = useMemo(() => {
    const dist: Record<number, number> = {};
    for (let i = 0; i <= 10; i++) dist[i] = 0;
    allEvents.forEach(e => {
      const rating = e.importanceRating || 0;
      dist[rating] = (dist[rating] || 0) + 1;
    });
    return dist;
  }, [allEvents]);

  let sortedEvents = getEventsSortedByDate();
  
  // Apply importance filter first
  sortedEvents = sortedEvents.filter(e => (e.importanceRating || 0) >= minImportance);

  // Apply sorting - keep unknown dates at end regardless of sort direction
  if (sortOrder === 'date-desc') {
    const withDate = sortedEvents.filter(e => e.date);
    const withoutDate = sortedEvents.filter(e => !e.date);
    sortedEvents = [...withDate.reverse(), ...withoutDate];
  } else if (sortOrder === 'importance') {
    const withDate = sortedEvents.filter(e => e.date);
    const withoutDate = sortedEvents.filter(e => !e.date);
    sortedEvents = [...withDate, ...withoutDate].sort((a, b) => {
      // Keep unknown dates at end
      if (!a.date && b.date) return 1;
      if (a.date && !b.date) return -1;
      return (b.importanceRating || 0) - (a.importanceRating || 0);
    });
  }
  // date-asc already has unknown dates at end from getEventsSortedByDate()

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    sortedEvents = sortedEvents.filter(e => 
      e.title.toLowerCase().includes(searchLower) ||
      e.description.toLowerCase().includes(searchLower) ||
      e.summary?.toLowerCase().includes(searchLower)
    );
  }

  // Apply tag filter
  if (filterTag) {
    sortedEvents = sortedEvents.filter(e => e.tags?.includes(filterTag));
  }

  // Apply perspective filter
  if (perspectiveFilter !== 'all') {
    sortedEvents = sortedEvents.filter(e => 
      e.perspectives?.some(p => p.type === perspectiveFilter)
    );
  }

  // Get all unique tags
  const allTags = Array.from(new Set(getEventsSortedByDate().flatMap(e => e.tags || [])));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Timeline ({sortedEvents.length} of {allEvents.length} events)
      </Typography>

      {/* Importance Filter with Histogram */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Filter by Minimum Importance
        </Typography>
        
        {/* Histogram */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 60, gap: 0.5, mb: 1 }}>
          {[...Array(11)].map((_, i) => {
            const count = importanceDistribution[i] || 0;
            const maxCount = Math.max(...Object.values(importanceDistribution));
            const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
            const isActive = i >= minImportance;
            const barColor = i >= 10 ? '#d32f2f' : i >= 8 ? '#f57c00' : i >= 6 ? '#fbc02d' : '#9e9e9e';
            
            return (
              <Tooltip key={i} title={`Rating ${i}: ${count} events`} arrow>
                <Box
                  onClick={() => setMinImportance(i)}
                  sx={{
                    flex: 1,
                    height: `${Math.max(height, 5)}%`,
                    minHeight: 4,
                    backgroundColor: isActive ? barColor : 'action.disabled',
                    borderRadius: '2px 2px 0 0',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.3,
                    transition: 'all 0.2s',
                    '&:hover': {
                      opacity: 1,
                      transform: 'scaleY(1.1)',
                    },
                  }}
                />
              </Tooltip>
            );
          })}
        </Box>
        
        {/* Labels */}
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
          {[...Array(11)].map((_, i) => (
            <Typography
              key={i}
              variant="caption"
              sx={{
                flex: 1,
                textAlign: 'center',
                color: i >= minImportance ? 'text.primary' : 'text.disabled',
                fontWeight: i === minImportance ? 'bold' : 'normal',
              }}
            >
              {i}
            </Typography>
          ))}
        </Box>

        {/* Slider */}
        <Slider
          value={minImportance}
          onChange={(_, value) => setMinImportance(value as number)}
          min={0}
          max={10}
          step={1}
          marks
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `≥${v}`}
          sx={{
            '& .MuiSlider-thumb': {
              backgroundColor: getImportanceColor(minImportance),
            },
            '& .MuiSlider-track': {
              backgroundColor: getImportanceColor(minImportance),
            },
          }}
        />
        
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Showing events with importance ≥ {minImportance}
          </Typography>
          <Chip 
            size="small" 
            label={`${sortedEvents.length} events`}
            color={minImportance >= 8 ? 'error' : 'default'}
          />
        </Stack>
      </Paper>

      {/* Perspective Toggle */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Filter by Perspective
        </Typography>
        <ToggleButtonGroup
          value={perspectiveFilter}
          exclusive
          onChange={(_, value) => value && setPerspectiveFilter(value)}
          size="small"
        >
          <ToggleButton value="all">
            <AllIcon sx={{ mr: 0.5 }} /> All
          </ToggleButton>
          <ToggleButton value="criminal" sx={{ '&.Mui-selected': { backgroundColor: 'rgba(211, 47, 47, 0.2)' } }}>
            <CriminalIcon sx={{ mr: 0.5, color: '#d32f2f' }} /> Criminal
          </ToggleButton>
          <ToggleButton value="business" sx={{ '&.Mui-selected': { backgroundColor: 'rgba(25, 118, 210, 0.2)' } }}>
            <BusinessIcon sx={{ mr: 0.5, color: '#1976d2' }} /> Business
          </ToggleButton>
          <ToggleButton value="government" sx={{ '&.Mui-selected': { backgroundColor: 'rgba(56, 142, 60, 0.2)' } }}>
            <GovernmentIcon sx={{ mr: 0.5, color: '#388e3c' }} /> Government
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Search events"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOrder}
              label="Sort by"
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            >
              <MenuItem value="date-desc">Newest first</MenuItem>
              <MenuItem value="date-asc">Oldest first</MenuItem>
              <MenuItem value="importance">Importance</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by tag</InputLabel>
            <Select
              value={filterTag}
              label="Filter by tag"
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <MenuItem value="">All tags</MenuItem>
              {allTags.map(tag => (
                <MenuItem key={tag} value={tag}>{tag}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {/* Timeline */}
      <Box sx={{ position: 'relative', pl: 3 }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: 'absolute',
            left: 8,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: 'primary.main',
          }}
        />

        {sortedEvents.map((event) => {
          const location = event.locationId ? getLocationById(event.locationId) : null;
          const people = getPeopleByEventId(event.id);
          const isHighImportance = event.importanceRating && event.importanceRating >= 8;
          const isCritical = event.importanceRating && event.importanceRating >= 10;

          return (
            <Box key={event.id} sx={{ position: 'relative', mb: 3 }}>
              {/* Timeline dot */}
              <Box
                sx={{
                  position: 'absolute',
                  left: -24,
                  top: 16,
                  width: isHighImportance ? 20 : 16,
                  height: isHighImportance ? 20 : 16,
                  borderRadius: '50%',
                  backgroundColor: getImportanceColor(event.importanceRating || 0),
                  border: '3px solid',
                  borderColor: 'background.paper',
                  boxShadow: isCritical ? '0 0 12px rgba(211, 47, 47, 0.6)' : isHighImportance ? '0 0 8px rgba(245, 124, 0, 0.5)' : 'none',
                  marginLeft: isHighImportance ? '-2px' : 0,
                }}
              />

              <Paper
                component={RouterLink}
                to={`/events/${event.id}`}
                sx={{
                  p: 2,
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  borderLeft: isHighImportance ? '4px solid' : 'none',
                  borderColor: getImportanceColor(event.importanceRating || 0),
                  backgroundColor: isCritical 
                    ? 'rgba(211, 47, 47, 0.08)' 
                    : isHighImportance 
                    ? 'rgba(245, 124, 0, 0.05)' 
                    : 'background.paper',
                  '&:hover': { 
                    backgroundColor: isCritical 
                      ? 'rgba(211, 47, 47, 0.12)' 
                      : isHighImportance 
                      ? 'rgba(245, 124, 0, 0.1)' 
                      : 'action.hover' 
                  },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1}>
                  <Box sx={{ flex: 1, minWidth: 200 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="h6">{event.title}</Typography>
                      {event.importanceRating && event.importanceRating >= 8 && (
                        <ImportantIcon color="error" fontSize="small" />
                      )}
                      {event.onCamera === 'fully' && <CameraIcon fontSize="small" color="success" />}
                      {event.onCamera === 'partial' && <CameraIcon fontSize="small" color="warning" />}
                      {event.onCamera === 'no' && <NoCameraIcon fontSize="small" color="disabled" />}
                    </Stack>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {event.summary || event.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                      {location && (
                        <Chip size="small" label={location.name} variant="outlined" color="primary" />
                      )}
                      {people.slice(0, 3).map(p => (
                        <Chip key={p.id} size="small" label={p.name} variant="outlined" />
                      ))}
                      {people.length > 3 && (
                        <Chip size="small" label={`+${people.length - 3} more`} variant="outlined" />
                      )}
                    </Stack>

                    {event.tags && event.tags.length > 0 && (
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
                        {event.tags.map(tag => (
                          <Chip key={tag} size="small" label={tag} sx={{ fontSize: '0.7rem' }} />
                        ))}
                      </Stack>
                    )}

                    {/* Perspective indicators */}
                    {event.perspectives && event.perspectives.length > 0 && (
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
                        {event.perspectives.map((p, idx) => (
                          <Chip
                            key={idx}
                            size="small"
                            icon={
                              p.type === 'criminal' ? <CriminalIcon sx={{ fontSize: '14px !important' }} /> :
                              p.type === 'business' ? <BusinessIcon sx={{ fontSize: '14px !important' }} /> :
                              <GovernmentIcon sx={{ fontSize: '14px !important' }} />
                            }
                            label={p.type}
                            sx={{
                              fontSize: '0.7rem',
                              backgroundColor: 
                                p.type === 'criminal' ? 'rgba(211, 47, 47, 0.15)' :
                                p.type === 'business' ? 'rgba(25, 118, 210, 0.15)' :
                                'rgba(56, 142, 60, 0.15)',
                              borderColor:
                                p.type === 'criminal' ? '#d32f2f' :
                                p.type === 'business' ? '#1976d2' :
                                '#388e3c',
                              border: '1px solid',
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                      {event.date || 'Date unknown'}
                      {event.dateUncertain && ' (uncertain)'}
                    </Typography>
                    {event.importanceRating && (
                      <Chip
                        size="small"
                        label={`${event.importanceRating}/10`}
                        sx={{
                          mt: 0.5,
                          fontWeight: 'bold',
                          backgroundColor: getImportanceColor(event.importanceRating),
                          color: event.importanceRating >= 6 ? 'white' : 'text.primary',
                        }}
                      />
                    )}
                  </Box>
                </Stack>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
