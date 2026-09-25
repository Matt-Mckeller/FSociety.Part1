import { Typography, Paper, Box, Chip, Stack, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RepeatIcon from '@mui/icons-material/Repeat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';

const exampleQuests = [
  { name: 'Slide Explorer', objective: 'View 3 slides', reward: '50 XP', icon: '👀' },
  { name: 'Curious Learner', objective: 'Interact with 3 expandable sections', reward: '75 XP', icon: '🔍' },
  { name: 'Active Participant', objective: 'Send 3 actions', reward: '100 XP + 10 coins', icon: '💬' },
  { name: 'Quiz Champion', objective: 'Complete a quiz with 80%+ score', reward: '200 XP + 25 coins', icon: '🏆' },
];

const questFeatures = [
  { icon: <EmojiEventsIcon />, title: 'XP Rewards', description: 'Earn experience points for completing objectives', color: '#f59e0b' },
  { icon: <MonetizationOnIcon />, title: 'Coin Rewards', description: 'Earn virtual currency for achievements', color: '#10b981' },
  { icon: <RepeatIcon />, title: 'Repeatable Quests', description: 'Some quests can be completed multiple times', color: '#8b5cf6' },
  { icon: <CheckCircleIcon />, title: 'Progress Tracking', description: 'Visual progress indicators in quest panel', color: '#3b82f6' },
];

export default function QuestsPage() {
  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          borderRadius: 2, 
          bgcolor: '#f59e0b15',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ExploreIcon sx={{ fontSize: 32, color: '#f59e0b' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ mb: 0.5 }}>Quest System</Typography>
          <Typography variant="body1" color="text.secondary">
            Trackable objectives with XP and coin rewards for gamified learning
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper variant="outlined" sx={{ 
        p: 2.5, 
        mb: 4, 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderLeft: '4px solid #f59e0b',
        borderRadius: 2
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          📦 Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip label="Game System" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#f59e0b20', fontWeight: 500 }} />
          <Chip label="Panel System" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#3b82f620', fontWeight: 500 }} />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          <strong>React Context:</strong>
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="QuestContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#f59e0b', color: '#f59e0b' }} />
          <Chip label="GameContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#10b981', color: '#10b981' }} />
          <Chip label="UserProgressContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#8b5cf6', color: '#8b5cf6' }} />
        </Stack>
      </Paper>

      {/* Quest Features */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        ✨ Quest Features
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {questFeatures.map((feature) => (
          <Grid item xs={12} sm={6} key={feature.title}>
            <Card variant="outlined" sx={{ 
              height: '100%', 
              borderLeft: `3px solid ${feature.color}`,
              transition: 'all 0.2s',
              '&:hover': { boxShadow: 2, transform: 'translateY(-2px)' }
            }}>
              <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 1.5, 
                  bgcolor: `${feature.color}15`,
                  color: feature.color,
                  display: 'flex'
                }}>
                  {feature.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Example Quests */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        🎯 Example Quests
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Quest</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Objective</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Reward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exampleQuests.map((quest) => (
              <TableRow key={quest.name} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography component="span" sx={{ fontSize: 18 }}>{quest.icon}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{quest.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{quest.objective}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={quest.reward} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#f59e0b15', 
                      color: '#d97706',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Quest Rewards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        🏆 Reward System
      </Typography>
      <Paper variant="outlined" sx={{ p: 2.5, mb: 4, borderRadius: 2 }}>
        <Typography variant="body1" paragraph sx={{ mb: 2 }}>
          Rewards are <strong>configurable per quest</strong> and can include:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              p: 2, 
              bgcolor: '#fef3c715', 
              borderRadius: 2,
              border: '1px solid #fbbf2440'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <StarIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Experience Points (XP)</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Contributes to user level progression
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              p: 2, 
              bgcolor: '#d1fae515', 
              borderRadius: 2,
              border: '1px solid #10b98140'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <MonetizationOnIcon sx={{ color: '#10b981', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Virtual Coins</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Can be spent on unlockables and customizations
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Model */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        💾 Data Model
      </Typography>
      <Paper variant="outlined" sx={{ 
        p: 2.5, 
        bgcolor: '#1e293b', 
        borderRadius: 2,
        mb: 4
      }}>
        <Typography 
          component="pre" 
          sx={{ 
            fontFamily: 'Monaco, Consolas, monospace', 
            fontSize: 13, 
            m: 0,
            color: '#e2e8f0',
            overflow: 'auto'
          }}
        >
{`Quest {
  id: string
  name: string
  description: string
  criteria: QuestCriteria
  rewardXp: number
  rewardCoins: number
  isRepeatable: boolean
}

QuestCriteria {
  type: 'view_slides' | 'interact' | 'send_actions' | 'quiz_score'
  target: number
  current: number
}`}
        </Typography>
      </Paper>

      {/* Related Features */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        🔗 Related Features
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/game-ui" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">Game UI →</Typography>
              <Typography variant="caption" color="text.secondary">
                XP bar, level display, and profile integration
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/panels" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">Panel System →</Typography>
              <Typography variant="caption" color="text.secondary">
                Quest Tracker Panel configuration
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/unlockable" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">Unlockable Features →</Typography>
              <Typography variant="caption" color="text.secondary">
                Level-gated content unlocked via progression
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
