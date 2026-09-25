/**
 * FocusCardExpanded - Medium view for Strategic Focus
 * Shows more detail in an expandable card format
 */
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  LinearProgress,
  IconButton,
  Tooltip,
  alpha,
  Grid,
  Divider,
  Button,
} from '@mui/material'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import FlagIcon from '@mui/icons-material/Flag'
import type { StrategicFocus, Campaign } from '../../types'

export interface FocusCardExpandedProps {
  focus: StrategicFocus
  campaigns?: Campaign[]
  onClick?: () => void
}

const factorColors: Record<string, string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
  critical: '#DC2626',
  favorable: '#10B981',
  neutral: '#6B7280',
  unfavorable: '#EF4444',
}

const factorLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
  favorable: 'Favorable',
  neutral: 'Neutral',
  unfavorable: 'Unfavorable',
}

export function FocusCardExpanded({ focus, campaigns = [], onClick }: FocusCardExpandedProps) {
  const trend = focus.previousWeight 
    ? focus.currentWeight > focus.previousWeight 
      ? 'up' 
      : focus.currentWeight < focus.previousWeight 
        ? 'down' 
        : 'flat'
    : 'flat'

  const TrendIcon = trend === 'up' ? TrendingUpIcon : trend === 'down' ? TrendingDownIcon : TrendingFlatIcon
  const trendColor = trend === 'up' ? '#EF4444' : trend === 'down' ? '#10B981' : '#6B7280'

  const connectedCampaigns = campaigns.filter(c => focus.connectedCampaignIds?.includes(c.id))

  // Sort problems by severity
  const sortedProblems = [...focus.problems].filter(p => p.isActive).sort((a, b) => b.severity - a.severity)

  // Group goals by timeframe
  const shortTermGoals = focus.goals.filter(g => g.timeframe === 'short')
  const mediumTermGoals = focus.goals.filter(g => g.timeframe === 'medium')
  const longTermGoals = focus.goals.filter(g => g.timeframe === 'long')

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        borderTop: 4, 
        borderColor: focus.currentWeight > 60 ? 'error.main' : focus.currentWeight > 40 ? 'warning.main' : 'success.main',
        boxShadow: '0 10px 40px -10px rgb(0 0 0 / 0.2)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': onClick ? {
          boxShadow: '0 15px 50px -10px rgb(0 0 0 / 0.25)',
          transform: 'translateY(-2px)',
        } : {},
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ fontSize: '2rem' }}>{focus.icon}</Typography>
            <Box>
              <Typography variant="h5" fontWeight={700} color="text.primary">
                {focus.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {focus.level === 'umbrella' ? 'Umbrella Focus' : 'Campaign Focus'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ textAlign: 'right', mr: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                <Typography variant="h4" fontWeight={800} color="text.primary">
                  {focus.currentWeight}
                </Typography>
                <Tooltip title={`${trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'Unchanged'} from ${focus.previousWeight || focus.currentWeight}`}>
                  <TrendIcon sx={{ fontSize: 24, color: trendColor }} />
                </Tooltip>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Weight Score
              </Typography>
            </Box>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onClick?.() }}>
              <OpenInFullIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Description */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {focus.description}
        </Typography>

        {/* Weight Bar */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={focus.currentWeight}
            sx={{
              height: 12,
              borderRadius: 6,
              bgcolor: alpha('#6366F1', 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 6,
                background: focus.currentWeight > 60 
                  ? 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)' 
                  : focus.currentWeight > 40 
                    ? 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)' 
                    : 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
              },
            }}
          />
        </Box>

        {/* Weight Factors */}
        <Box sx={{ mb: 3, p: 2, bgcolor: alpha('#6366F1', 0.03), borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
            WEIGHT FACTORS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="caption" color="text.secondary">⚡ Urgency</Typography>
                <Chip
                  label={factorLabels[focus.weightFactors.urgency]}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: alpha(factorColors[focus.weightFactors.urgency], 0.15),
                    color: factorColors[focus.weightFactors.urgency],
                    fontWeight: 600,
                  }}
                />
                {focus.weightFactors.urgencyNotes && (
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                    {focus.weightFactors.urgencyNotes}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="caption" color="text.secondary">⭐ Importance</Typography>
                <Chip
                  label={factorLabels[focus.weightFactors.importance]}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: alpha(factorColors[focus.weightFactors.importance], 0.15),
                    color: factorColors[focus.weightFactors.importance],
                    fontWeight: 600,
                  }}
                />
                {focus.weightFactors.importanceNotes && (
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                    {focus.weightFactors.importanceNotes}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="caption" color="text.secondary">🎯 Feasibility</Typography>
                <Chip
                  label={factorLabels[focus.weightFactors.feasibility]}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: alpha(factorColors[focus.weightFactors.feasibility], 0.15),
                    color: factorColors[focus.weightFactors.feasibility],
                    fontWeight: 600,
                  }}
                />
                {focus.weightFactors.feasibilityNotes && (
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                    {focus.weightFactors.feasibilityNotes}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="caption" color="text.secondary">🌍 Context</Typography>
                <Chip
                  label={factorLabels[focus.weightFactors.context]}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: alpha(factorColors[focus.weightFactors.context], 0.15),
                    color: factorColors[focus.weightFactors.context],
                    fontWeight: 600,
                  }}
                />
                {focus.weightFactors.contextNotes && (
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                    {focus.weightFactors.contextNotes}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Problems and Goals Side by Side */}
        <Grid container spacing={3}>
          {/* Problems */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <WarningAmberIcon sx={{ color: 'error.main' }} />
              <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                PROBLEMS ({sortedProblems.length})
              </Typography>
            </Box>
            <Stack spacing={1}>
              {sortedProblems.map((problem) => (
                <Box
                  key={problem.id}
                  sx={{
                    p: 1.5,
                    bgcolor: alpha('#EF4444', 0.05),
                    borderRadius: 1,
                    borderLeft: 3,
                    borderColor: problem.severity >= 8 ? '#DC2626' : problem.severity >= 5 ? '#F59E0B' : '#6B7280',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={500}>
                      {problem.title}
                    </Typography>
                    <Chip
                      label={`${problem.severity}/10`}
                      size="small"
                      sx={{
                        bgcolor: problem.severity >= 8 ? '#FEE2E2' : problem.severity >= 5 ? '#FEF3C7' : '#F3F4F6',
                        color: problem.severity >= 8 ? '#DC2626' : problem.severity >= 5 ? '#D97706' : '#6B7280',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                  {problem.description && (
                    <Typography variant="caption" color="text.secondary">
                      {problem.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Goals */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <FlagIcon sx={{ color: 'success.main' }} />
              <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                GOALS ({focus.goals.length})
              </Typography>
            </Box>
            <Stack spacing={2}>
              {shortTermGoals.length > 0 && (
                <Box>
                  <Typography variant="caption" fontWeight={600} color="success.main" sx={{ mb: 1, display: 'block' }}>
                    SHORT-TERM
                  </Typography>
                  <Stack spacing={0.5}>
                    {shortTermGoals.map((goal) => (
                      <Box key={goal.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: goal.status === 'achieved' ? '#10B981' : goal.status === 'in-progress' ? '#F59E0B' : '#D1D5DB' }} />
                        <Typography variant="body2">{goal.title}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {mediumTermGoals.length > 0 && (
                <Box>
                  <Typography variant="caption" fontWeight={600} color="info.main" sx={{ mb: 1, display: 'block' }}>
                    MEDIUM-TERM
                  </Typography>
                  <Stack spacing={0.5}>
                    {mediumTermGoals.map((goal) => (
                      <Box key={goal.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: goal.status === 'achieved' ? '#10B981' : goal.status === 'in-progress' ? '#F59E0B' : '#D1D5DB' }} />
                        <Typography variant="body2">{goal.title}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {longTermGoals.length > 0 && (
                <Box>
                  <Typography variant="caption" fontWeight={600} color="secondary.main" sx={{ mb: 1, display: 'block' }}>
                    LONG-TERM
                  </Typography>
                  <Stack spacing={0.5}>
                    {longTermGoals.map((goal) => (
                      <Box key={goal.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: goal.status === 'achieved' ? '#10B981' : goal.status === 'in-progress' ? '#F59E0B' : '#D1D5DB' }} />
                        <Typography variant="body2">{goal.title}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Current Strategy */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
            CURRENT STRATEGY
          </Typography>
          <Box sx={{ p: 2, bgcolor: alpha('#6366F1', 0.05), borderRadius: 2, borderLeft: 4, borderColor: '#6366F1' }}>
            <Typography variant="body1" fontWeight={500}>
              {focus.currentStrategyNotes || focus.strategies.find(s => s.id === focus.currentStrategyId)?.title || 'No strategy defined'}
            </Typography>
          </Box>
        </Box>

        {/* Checkpoints */}
        {focus.checkpoints.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
              CHECKPOINTS (Weight Triggers)
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {focus.checkpoints.map((cp) => (
                <Chip
                  key={cp.id}
                  label={`${cp.title} → ${cp.triggeredWeight}`}
                  size="small"
                  variant={cp.status === 'reached' ? 'filled' : 'outlined'}
                  color={cp.status === 'reached' ? 'success' : 'default'}
                  sx={{ fontWeight: 500 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Connected Campaigns */}
        {connectedCampaigns.length > 0 && (
          <Box>
            <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
              CONNECTED CAMPAIGNS
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {connectedCampaigns.map((campaign) => (
                <Chip
                  key={campaign.id}
                  label={campaign.title}
                  size="small"
                  sx={{ bgcolor: campaign.color, color: 'white', fontWeight: 600 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}>
          <Button variant="outlined" size="small" onClick={(e) => { e.stopPropagation(); onClick?.() }}>
            View Full Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
