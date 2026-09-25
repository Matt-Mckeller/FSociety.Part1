/**
 * FocusDetailPage - Full view for Strategic Focus
 * Complete information with tabs for deep analysis
 */
import { useState } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Stack,
  LinearProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  alpha,
  Button,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import type { StrategicFocus, Campaign, GlobalSWOT } from '../../types'

interface FocusDetailPageProps {
  focus: StrategicFocus
  campaigns?: Campaign[]
  globalSwot?: GlobalSWOT
  onBack: () => void
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
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

const rewardColors: Record<string, string> = {
  low: '#6B7280',
  medium: '#F59E0B',
  high: '#10B981',
  'very-high': '#059669',
}

const riskColors: Record<string, string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
}

export function FocusDetailPage({ focus, campaigns = [], onBack }: FocusDetailPageProps) {
  const [tabValue, setTabValue] = useState(0)

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
  const sortedProblems = [...focus.problems].filter(p => p.isActive).sort((a, b) => b.severity - a.severity)

  const shortTermGoals = focus.goals.filter(g => g.timeframe === 'short')
  const mediumTermGoals = focus.goals.filter(g => g.timeframe === 'medium')
  const longTermGoals = focus.goals.filter(g => g.timeframe === 'long')

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
          Back to Strategic Focus
        </Button>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontSize: '3rem' }}>{focus.icon}</Typography>
            <Box>
              <Typography variant="h4" fontWeight={800} color="text.primary">
                {focus.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {focus.level === 'umbrella' ? 'Umbrella Strategic Focus' : 'Campaign Strategic Focus'}
              </Typography>
            </Box>
          </Box>
          <Card sx={{ p: 2, textAlign: 'center', minWidth: 150 }}>
            <Typography variant="overline" color="text.secondary">Weight Score</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography variant="h3" fontWeight={900} color="text.primary">
                {focus.currentWeight}
              </Typography>
              <Tooltip title={`${trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'Unchanged'} from ${focus.previousWeight || focus.currentWeight}`}>
                <TrendIcon sx={{ fontSize: 28, color: trendColor }} />
              </Tooltip>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Updated: {focus.weightUpdatedAt || 'Unknown'}
            </Typography>
          </Card>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 800 }}>
          {focus.description}
        </Typography>

        {/* Weight Bar */}
        <Box sx={{ mt: 3, maxWidth: 600 }}>
          <LinearProgress
            variant="determinate"
            value={focus.currentWeight}
            sx={{
              height: 16,
              borderRadius: 8,
              bgcolor: alpha('#6366F1', 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 8,
                background: focus.currentWeight > 60 
                  ? 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)' 
                  : focus.currentWeight > 40 
                    ? 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)' 
                    : 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
              },
            }}
          />
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="Overview" />
          <Tab label="SWOT Analysis" />
          <Tab label="Problems & Goals" />
          <Tab label="Strategies" />
          <Tab label="History" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Weight Factors */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Weight Factors
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Factor</strong></TableCell>
                        <TableCell><strong>Level</strong></TableCell>
                        <TableCell><strong>Notes</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>⚡ Urgency</TableCell>
                        <TableCell>
                          <Chip 
                            label={focus.weightFactors.urgency.toUpperCase()} 
                            size="small"
                            sx={{ bgcolor: alpha(factorColors[focus.weightFactors.urgency], 0.15), color: factorColors[focus.weightFactors.urgency], fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>{focus.weightFactors.urgencyNotes || '—'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>⭐ Importance</TableCell>
                        <TableCell>
                          <Chip 
                            label={focus.weightFactors.importance.toUpperCase()} 
                            size="small"
                            sx={{ bgcolor: alpha(factorColors[focus.weightFactors.importance], 0.15), color: factorColors[focus.weightFactors.importance], fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>{focus.weightFactors.importanceNotes || '—'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>🎯 Feasibility</TableCell>
                        <TableCell>
                          <Chip 
                            label={focus.weightFactors.feasibility.toUpperCase()} 
                            size="small"
                            sx={{ bgcolor: alpha(factorColors[focus.weightFactors.feasibility], 0.15), color: factorColors[focus.weightFactors.feasibility], fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>{focus.weightFactors.feasibilityNotes || '—'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>🌍 Context</TableCell>
                        <TableCell>
                          <Chip 
                            label={focus.weightFactors.context.toUpperCase()} 
                            size="small"
                            sx={{ bgcolor: alpha(factorColors[focus.weightFactors.context], 0.15), color: factorColors[focus.weightFactors.context], fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>{focus.weightFactors.contextNotes || '—'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Checkpoints */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Checkpoints (Weight Triggers)
                </Typography>
                <Stack spacing={2}>
                  {focus.checkpoints.map((cp) => (
                    <Box 
                      key={cp.id}
                      sx={{ 
                        p: 2, 
                        bgcolor: cp.status === 'reached' ? alpha('#10B981', 0.1) : alpha('#6366F1', 0.05),
                        borderRadius: 2,
                        borderLeft: 4,
                        borderColor: cp.status === 'reached' ? '#10B981' : '#6366F1',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {cp.status === 'reached' ? (
                            <CheckCircleIcon sx={{ color: '#10B981' }} />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ color: '#6366F1' }} />
                          )}
                          <Typography fontWeight={600}>{cp.title}</Typography>
                        </Box>
                        <Chip 
                          label={`→ ${cp.triggeredWeight}`}
                          size="small"
                          sx={{ fontWeight: 700, bgcolor: alpha('#6366F1', 0.15), color: '#6366F1' }}
                        />
                      </Box>
                      {cp.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
                          {cp.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Connected Items */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Connected Items
                </Typography>
                
                {connectedCampaigns.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Campaigns
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {connectedCampaigns.map((campaign) => (
                        <Chip
                          key={campaign.id}
                          label={campaign.title}
                          sx={{ bgcolor: campaign.color, color: 'white', fontWeight: 600 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {focus.connectedStorylineIds && focus.connectedStorylineIds.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Storylines
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {focus.connectedStorylineIds.map((id) => (
                        <Chip key={id} label={id} variant="outlined" size="small" />
                      ))}
                    </Stack>
                  </Box>
                )}

                {focus.connectedQuestIds && focus.connectedQuestIds.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Quests
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {focus.connectedQuestIds.map((id) => (
                        <Chip key={id} label={id} variant="outlined" size="small" />
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* SWOT Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {/* Strengths */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderTop: 4, borderColor: '#10B981' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  💪 Strengths
                  <Chip label={focus.strengths.length} size="small" />
                </Typography>
                <Stack spacing={1.5}>
                  {focus.strengths.map((item) => (
                    <Box key={item.id} sx={{ p: 1.5, bgcolor: alpha('#10B981', 0.05), borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography fontWeight={500}>{item.title}</Typography>
                        {item.impact && (
                          <Chip 
                            label={item.impact} 
                            size="small" 
                            sx={{ 
                              bgcolor: item.impact === 'high' ? alpha('#10B981', 0.2) : alpha('#6B7280', 0.2),
                              color: item.impact === 'high' ? '#059669' : '#6B7280',
                              fontWeight: 600,
                              fontSize: '0.65rem',
                            }} 
                          />
                        )}
                      </Box>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Weaknesses */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderTop: 4, borderColor: '#F59E0B' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  😓 Weaknesses
                  <Chip label={focus.weaknesses.length} size="small" />
                </Typography>
                <Stack spacing={1.5}>
                  {focus.weaknesses.map((item) => (
                    <Box key={item.id} sx={{ p: 1.5, bgcolor: alpha('#F59E0B', 0.05), borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography fontWeight={500}>{item.title}</Typography>
                        {item.impact && (
                          <Chip 
                            label={item.impact} 
                            size="small" 
                            sx={{ 
                              bgcolor: item.impact === 'high' ? alpha('#F59E0B', 0.2) : alpha('#6B7280', 0.2),
                              color: item.impact === 'high' ? '#D97706' : '#6B7280',
                              fontWeight: 600,
                              fontSize: '0.65rem',
                            }} 
                          />
                        )}
                      </Box>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Opportunities */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderTop: 4, borderColor: '#3B82F6' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  🌟 Opportunities
                  <Chip label={focus.opportunities.length} size="small" />
                </Typography>
                <Stack spacing={1.5}>
                  {focus.opportunities.map((item) => (
                    <Box key={item.id} sx={{ p: 1.5, bgcolor: alpha('#3B82F6', 0.05), borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography fontWeight={500}>{item.title}</Typography>
                        {item.impact && (
                          <Chip 
                            label={item.impact} 
                            size="small" 
                            sx={{ 
                              bgcolor: item.impact === 'high' ? alpha('#3B82F6', 0.2) : alpha('#6B7280', 0.2),
                              color: item.impact === 'high' ? '#2563EB' : '#6B7280',
                              fontWeight: 600,
                              fontSize: '0.65rem',
                            }} 
                          />
                        )}
                      </Box>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Risks */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderTop: 4, borderColor: '#EF4444' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  ⚠️ Risks
                  <Chip label={focus.risks.length} size="small" />
                </Typography>
                <Stack spacing={1.5}>
                  {focus.risks.map((item) => (
                    <Box key={item.id} sx={{ p: 1.5, bgcolor: alpha('#EF4444', 0.05), borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography fontWeight={500}>{item.title}</Typography>
                        {item.impact && (
                          <Chip 
                            label={item.impact} 
                            size="small" 
                            sx={{ 
                              bgcolor: item.impact === 'high' ? alpha('#EF4444', 0.2) : alpha('#6B7280', 0.2),
                              color: item.impact === 'high' ? '#DC2626' : '#6B7280',
                              fontWeight: 600,
                              fontSize: '0.65rem',
                            }} 
                          />
                        )}
                      </Box>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Problems & Goals Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {/* Problems */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  🔴 Problems
                  <Chip label={sortedProblems.length} size="small" color="error" />
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Problem</strong></TableCell>
                        <TableCell align="center"><strong>Severity</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedProblems.map((problem) => (
                        <TableRow key={problem.id}>
                          <TableCell>
                            <Typography fontWeight={500}>{problem.title}</Typography>
                            {problem.description && (
                              <Typography variant="caption" color="text.secondary">
                                {problem.description}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                              <LinearProgress
                                variant="determinate"
                                value={problem.severity * 10}
                                sx={{
                                  width: 60,
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: alpha('#EF4444', 0.1),
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    bgcolor: problem.severity >= 8 ? '#DC2626' : problem.severity >= 5 ? '#F59E0B' : '#6B7280',
                                  },
                                }}
                              />
                              <Typography variant="body2" fontWeight={700}>
                                {problem.severity}/10
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Goals */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  🎯 Goals
                  <Chip label={focus.goals.length} size="small" color="success" />
                </Typography>

                {shortTermGoals.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight={700} color="success.main" sx={{ mb: 1 }}>
                      SHORT-TERM
                    </Typography>
                    <Stack spacing={1}>
                      {shortTermGoals.map((goal) => (
                        <Box 
                          key={goal.id} 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: alpha('#10B981', 0.05), 
                            borderRadius: 1,
                            borderLeft: 3,
                            borderColor: goal.status === 'achieved' ? '#10B981' : goal.status === 'in-progress' ? '#F59E0B' : '#D1D5DB',
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography fontWeight={500}>{goal.title}</Typography>
                            <Chip 
                              label={goal.status.replace('-', ' ')} 
                              size="small"
                              color={goal.status === 'achieved' ? 'success' : goal.status === 'in-progress' ? 'warning' : 'default'}
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </Box>
                          {goal.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {goal.description}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}

                {mediumTermGoals.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight={700} color="info.main" sx={{ mb: 1 }}>
                      MEDIUM-TERM
                    </Typography>
                    <Stack spacing={1}>
                      {mediumTermGoals.map((goal) => (
                        <Box 
                          key={goal.id} 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: alpha('#3B82F6', 0.05), 
                            borderRadius: 1,
                            borderLeft: 3,
                            borderColor: goal.status === 'achieved' ? '#10B981' : goal.status === 'in-progress' ? '#F59E0B' : '#D1D5DB',
                          }}
                        >
                          <Typography fontWeight={500}>{goal.title}</Typography>
                          {goal.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {goal.description}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}

                {longTermGoals.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700} color="secondary.main" sx={{ mb: 1 }}>
                      LONG-TERM
                    </Typography>
                    <Stack spacing={1}>
                      {longTermGoals.map((goal) => (
                        <Box 
                          key={goal.id} 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: alpha('#8B5CF6', 0.05), 
                            borderRadius: 1,
                            borderLeft: 3,
                            borderColor: goal.status === 'achieved' ? '#10B981' : goal.status === 'in-progress' ? '#F59E0B' : '#D1D5DB',
                          }}
                        >
                          <Typography fontWeight={500}>{goal.title}</Typography>
                          {goal.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {goal.description}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Strategies Tab */}
      <TabPanel value={tabValue} index={3}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Current Strategy
            </Typography>
            <Box sx={{ p: 2, bgcolor: alpha('#6366F1', 0.05), borderRadius: 2, borderLeft: 4, borderColor: '#6366F1' }}>
              <Typography variant="h6" fontWeight={600}>
                {focus.currentStrategyNotes || focus.strategies.find(s => s.id === focus.currentStrategyId)?.title || 'No strategy defined'}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Strategy Comparison
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Strategy</strong></TableCell>
                    <TableCell align="center"><strong>Speed</strong></TableCell>
                    <TableCell align="center"><strong>Reward</strong></TableCell>
                    <TableCell align="center"><strong>Risk</strong></TableCell>
                    <TableCell align="center"><strong>Effort</strong></TableCell>
                    <TableCell align="center"><strong>Sustainable</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {focus.strategies.map((strategy) => (
                    <TableRow 
                      key={strategy.id}
                      sx={{ 
                        bgcolor: strategy.id === focus.currentStrategyId ? alpha('#6366F1', 0.05) : 'transparent',
                      }}
                    >
                      <TableCell>
                        <Box>
                          <Typography fontWeight={600}>{strategy.title}</Typography>
                          {strategy.description && (
                            <Typography variant="caption" color="text.secondary">
                              {strategy.description}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={strategy.speed} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={strategy.reward.replace('-', ' ')} 
                          size="small"
                          sx={{ 
                            bgcolor: alpha(rewardColors[strategy.reward], 0.15),
                            color: rewardColors[strategy.reward],
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={strategy.risk} 
                          size="small"
                          sx={{ 
                            bgcolor: alpha(riskColors[strategy.risk], 0.15),
                            color: riskColors[strategy.risk],
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={strategy.effort} 
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {strategy.sustainable ? (
                          <CheckCircleIcon sx={{ color: '#10B981' }} />
                        ) : (
                          <Typography variant="body2" color="text.secondary">No</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* History Tab */}
      <TabPanel value={tabValue} index={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Weight History
            </Typography>
            {focus.weightHistory && focus.weightHistory.length > 0 ? (
              <Stack spacing={1}>
                {focus.weightHistory.map((entry, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      p: 2, 
                      bgcolor: alpha('#6366F1', 0.03), 
                      borderRadius: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {entry.date}
                      </Typography>
                      {entry.reason && (
                        <Typography variant="body2">
                          {entry.reason}
                        </Typography>
                      )}
                    </Box>
                    <Chip label={entry.weight} sx={{ fontWeight: 700 }} />
                  </Box>
                ))}
              </Stack>
            ) : (
              <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                <Typography>No history recorded yet</Typography>
                <Typography variant="caption">
                  Weight changes will be tracked here
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  )
}
