import { Typography, Paper, Chip, Stack, Box, Card, CardContent, Grid, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkIcon from '@mui/icons-material/Link';

const gameComponents = [
  { 
    name: 'CurrencyStatusBar', 
    purpose: 'In-game currency display (coins)', 
    icon: '🪙',
    source: 'ui/game',
    color: '#f59e0b',
  },
  { 
    name: 'ExperienceStatusBar', 
    purpose: 'XP progress visualization bar', 
    icon: '⭐',
    source: 'ui/game',
    color: '#8b5cf6',
  },
  { 
    name: 'ProfileIconStatusBar', 
    purpose: 'Compact profile with avatar in header', 
    icon: '👤',
    source: 'ui/game',
    color: '#3b82f6',
  },
  { 
    name: 'ClaimEventRewardsView', 
    purpose: 'Full-screen reward claim on level-up', 
    icon: '🎉',
    source: 'ui/game',
    color: '#22c55e',
  },
  { 
    name: 'ProfileDisplay', 
    purpose: 'Full profile view with stats & items', 
    icon: '📊',
    source: 'ui/game',
    color: '#06b6d4',
  },
  { 
    name: 'WalletBanner', 
    purpose: 'Expanded currency/wallet display', 
    icon: '💰',
    source: 'ui/game',
    color: '#f59e0b',
    note: '⚠️ Needs visual improvements',
  },
];

const gameMechanics = [
  { mechanic: 'XP (Experience Points)', description: 'Earned from viewing slides, using actions, completing quizzes', icon: '⭐' },
  { mechanic: 'Coins', description: 'Currency spent on AI actions; earned from quests and achievements', icon: '🪙' },
  { mechanic: 'Levels', description: 'Progression system based on XP; unlocks content and features', icon: '📈' },
  { mechanic: 'Quests', description: 'Trackable objectives with XP/coin rewards', icon: '🎯' },
  { mechanic: 'Achievements', description: 'Milestone recognitions for accomplishments', icon: '🏆' },
  { mechanic: 'Inventory', description: 'Items owned, equipped cosmetics, unlocked rewards', icon: '🎒' },
];

const overlayElements = [
  { element: 'Profile Status Display', position: 'Top-right', description: 'Avatar, level indicator, quick profile access' },
  { element: 'Currency/XP Status Bars', position: 'Header', description: 'Current coins and XP progress' },
  { element: 'System Action Icons', position: 'Header', description: 'Settings, Inventory, Notifications' },
  { element: 'Level-Up Overlay', position: 'Full-screen modal', description: 'Celebration and reward claim' },
];

const relatedFeatures = [
  { label: 'Quests', href: '/docs/features/quests', description: 'Quest system & rewards' },
  { label: 'Unlockable Content', href: '/docs/features/unlockable', description: 'Level-gated content' },
  { label: 'Feedback', href: '/docs/features/feedback', description: 'Visual reward animations' },
];

export default function GameUIPage() {
  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#8b5cf615' }}>
          <SportsEsportsIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Game UI Integration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gamification layer with XP, coins, levels, achievements, and inventory
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2.5, 
          mb: 4, 
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderLeft: '4px solid #8b5cf6',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip label="Game System" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#8b5cf6', color: 'white' }} />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          <strong>Assumed React Context:</strong>
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="GameContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }} />
          <Chip label="UserProgressContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }} />
          <Chip label="CurrencyContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }} />
          <Chip label="InventoryContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }} />
        </Stack>
        <Typography variant="caption" color="warning.main" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic' }}>
          Note: Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      {/* Game Mechanics Overview */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>🎮</span> Game Mechanics
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {gameMechanics.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.mechanic}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', gap: 1.5 }}>
                <Typography sx={{ fontSize: '1.5rem' }}>{item.icon}</Typography>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {item.mechanic}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                    {item.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* UI Components */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>🧩</span> UI Components
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Existing Storybook components that power the game UI layer.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ width: 50 }}></TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Purpose</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 100 }}>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameComponents.map((comp) => (
              <TableRow key={comp.name}>
                <TableCell sx={{ fontSize: '1.25rem', textAlign: 'center' }}>{comp.icon}</TableCell>
                <TableCell>
                  <code style={{ 
                    backgroundColor: `${comp.color}15`, 
                    color: comp.color,
                    padding: '2px 6px', 
                    borderRadius: 4,
                    fontWeight: 600,
                  }}>
                    {comp.name}
                  </code>
                  {comp.note && (
                    <Typography variant="caption" sx={{ ml: 1, color: 'warning.main' }}>
                      {comp.note}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{comp.purpose}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                  {comp.source}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Game UI Overlay Layout */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>📐</span> Overlay Layout
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        The Game UI Overlay is layered on the presentation shell, similar to ProfileDisplayWithIcons but optimized for the presentation context.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Element</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overlayElements.map((item) => (
              <TableRow key={item.element}>
                <TableCell sx={{ fontWeight: 500 }}>{item.element}</TableCell>
                <TableCell>
                  <Chip label={item.position} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                </TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Profile View Details */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccountCircleIcon /> Profile View
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="body2" color="text.secondary" paragraph>
          The Profile View displays the user's full profile including learning stats, equipped items, and inventory slots. 
          This is a comprehensive component that will be detailed in a separate specification.
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Expected Sections:</Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="User Stats" size="small" variant="outlined" />
          <Chip label="Skills/Attributes" size="small" variant="outlined" />
          <Chip label="Knowledge Trees" size="small" variant="outlined" />
          <Chip label="Equipped Items" size="small" variant="outlined" />
          <Chip label="Achievement Wall" size="small" variant="outlined" />
          <Chip label="Learning History" size="small" variant="outlined" />
        </Stack>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Related Features */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LinkIcon /> Related Features
      </Typography>
      <Grid container spacing={2}>
        {relatedFeatures.map((feature) => (
          <Grid item xs={12} sm={4} key={feature.label}>
            <Card 
              variant="outlined" 
              component={Link}
              href={feature.href}
              sx={{ 
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: 1,
                },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {feature.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
