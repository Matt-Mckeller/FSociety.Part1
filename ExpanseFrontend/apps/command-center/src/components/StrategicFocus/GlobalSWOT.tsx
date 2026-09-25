/**
 * GlobalSWOT - Displays umbrella-level SWOT analysis
 * This is the overall business SWOT, separate from per-focus SWOT
 */
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Grid,
  alpha,
  Collapse,
  IconButton,
} from '@mui/material'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import type { GlobalSWOT as GlobalSWOTType, SWOTItem } from '../../types'

interface GlobalSWOTProps {
  swot: GlobalSWOTType
  compact?: boolean
}

interface SWOTSectionProps {
  title: string
  icon: string
  items: SWOTItem[]
  color: string
  bgColor: string
}

function SWOTSection({ title, icon, items, color, bgColor }: SWOTSectionProps) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        borderTop: 4,
        borderColor: color,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
            cursor: 'pointer',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography 
            variant="h6" 
            fontWeight={700} 
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <span>{icon}</span>
            {title}
            <Chip 
              label={items.length} 
              size="small"
              sx={{ 
                ml: 1,
                bgcolor: alpha(color, 0.15),
                color: color,
                fontWeight: 700,
              }}
            />
          </Typography>
          <IconButton size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        
        <Collapse in={expanded}>
          <Stack spacing={1.5}>
            {items.map((item) => (
              <Box 
                key={item.id}
                sx={{ 
                  p: 1.5, 
                  bgcolor: alpha(bgColor, 0.05),
                  borderRadius: 1,
                  borderLeft: 3,
                  borderColor: item.impact === 'high' ? color : alpha(color, 0.4),
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography fontWeight={500} sx={{ flex: 1 }}>
                    {item.title}
                  </Typography>
                  {item.impact && (
                    <Chip 
                      label={item.impact.toUpperCase()}
                      size="small"
                      sx={{ 
                        ml: 1,
                        bgcolor: item.impact === 'high' 
                          ? alpha(color, 0.2) 
                          : item.impact === 'medium'
                            ? alpha(color, 0.12)
                            : alpha(color, 0.05),
                        color: color,
                        fontWeight: 600,
                        fontSize: '0.65rem',
                        height: 20,
                      }}
                    />
                  )}
                </Box>
                {item.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.description}
                  </Typography>
                )}
                {item.mitigations && item.mitigations.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Mitigations:
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
                      {item.mitigations.map((m, i) => (
                        <Chip 
                          key={i} 
                          label={m} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export function GlobalSWOT({ swot, compact = false }: GlobalSWOTProps) {
  const totalItems = swot.strengths.length + swot.weaknesses.length + swot.opportunities.length + swot.risks.length

  if (compact) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            🌐 Global SWOT Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: alpha('#10B981', 0.1), borderRadius: 2 }}>
                <Typography variant="h4" fontWeight={800} color="#10B981">
                  {swot.strengths.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Strengths
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: alpha('#F59E0B', 0.1), borderRadius: 2 }}>
                <Typography variant="h4" fontWeight={800} color="#F59E0B">
                  {swot.weaknesses.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Weaknesses
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: alpha('#3B82F6', 0.1), borderRadius: 2 }}>
                <Typography variant="h4" fontWeight={800} color="#3B82F6">
                  {swot.opportunities.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Opportunities
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: alpha('#EF4444', 0.1), borderRadius: 2 }}>
                <Typography variant="h4" fontWeight={800} color="#EF4444">
                  {swot.risks.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Risks
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {swot.lastUpdated && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'right' }}>
              Last updated: {swot.lastUpdated}
            </Typography>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            🌐 Global SWOT Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Umbrella-level strengths, weaknesses, opportunities, and risks
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Chip 
            label={`${totalItems} items`}
            sx={{ fontWeight: 600 }}
          />
          {swot.lastUpdated && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              Updated: {swot.lastUpdated}
            </Typography>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SWOTSection
            title="Strengths"
            icon="💪"
            items={swot.strengths}
            color="#10B981"
            bgColor="#10B981"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SWOTSection
            title="Weaknesses"
            icon="😓"
            items={swot.weaknesses}
            color="#F59E0B"
            bgColor="#F59E0B"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SWOTSection
            title="Opportunities"
            icon="🌟"
            items={swot.opportunities}
            color="#3B82F6"
            bgColor="#3B82F6"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SWOTSection
            title="Risks"
            icon="⚠️"
            items={swot.risks}
            color="#EF4444"
            bgColor="#EF4444"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
