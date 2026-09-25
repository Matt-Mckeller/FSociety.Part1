import { Typography, Paper, Box, Chip, Stack, Alert, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Link from 'next/link';

export default function UnlockablePage() {
  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: '#a855f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
        }}>
          <LockOpenIcon sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ mb: 0.5 }}>Unlockable Content</Typography>
          <Typography variant="body2" color="text.secondary">
            Progression-gated features that reward user engagement and level advancement
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture - Enhanced */}
      <Paper sx={{
        p: 2.5,
        mb: 3,
        background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
        borderLeft: '4px solid #a855f7',
        borderRadius: 2
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#7c3aed' }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip label="Game System" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#a855f7', color: 'white' }} />
          <Chip label="Content System" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#8b5cf6', color: 'white' }} />
          <Chip label="Progression" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#7c3aed', color: 'white' }} />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          <strong>Assumed React Context:</strong>
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="UnlockableContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#a855f7', color: '#7c3aed' }} />
          <Chip label="UserProgressContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#a855f7', color: '#7c3aed' }} />
          <Chip label="GameContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#a855f7', color: '#7c3aed' }} />
        </Stack>
        <Typography variant="caption" color="warning.main" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic' }}>
          Note: Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
        Certain content, features, or sections are locked and become available based on the user's level.
        This encourages progression and rewards engagement, creating a compelling loop that motivates continued learning.
      </Typography>

      {/* Level-Gated Sections as Cards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        🔐 Level-Gated Sections
      </Typography>
      <Typography variant="body2" paragraph color="text.secondary">
        Specific slides or content blocks require a minimum user level to access.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', border: '1px solid #e5e7eb', '&:hover': { boxShadow: 3, borderColor: '#a855f7' }, transition: 'all 0.2s' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>🔒</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Locked Slides</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Slides can be gated by level requirement — e.g., "Slide: Advanced Topics — requires Level 5"
              </Typography>
              <Chip label="Level Required" size="small" sx={{ mt: 1.5, bgcolor: '#fef3c7', color: '#92400e' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', border: '1px solid #e5e7eb', '&:hover': { boxShadow: 3, borderColor: '#a855f7' }, transition: 'all 0.2s' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>📦</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Locked Content Blocks</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Individual blocks within slides can be locked (e.g., bonus examples, deep dives)
              </Typography>
              <Chip label="Partial Access" size="small" sx={{ mt: 1.5, bgcolor: '#dbeafe', color: '#1e40af' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', border: '1px solid #e5e7eb', '&:hover': { boxShadow: 3, borderColor: '#a855f7' }, transition: 'all 0.2s' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>👁️</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Visual Lock Indicator</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Locked content shows a lock icon with level requirement, teasing upcoming rewards
              </Typography>
              <Chip label="UI Feedback" size="small" sx={{ mt: 1.5, bgcolor: '#dcfce7', color: '#166534' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Unlockable Features as Grid Cards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        🎁 Unlockable Features
      </Typography>
      <Typography variant="body2" paragraph color="text.secondary">
        Advanced actions, themes, or interactive elements unlock as the user progresses.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            height: '100%',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: 'none',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            transition: 'all 0.2s'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>⚡</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Actions</Typography>
              <Typography variant="body2" sx={{ color: '#92400e' }}>
                Advanced AI actions unlock at higher levels (e.g., "Formal Proof" at Level 10)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            height: '100%',
            background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
            border: 'none',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            transition: 'all 0.2s'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>🎨</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Themes</Typography>
              <Typography variant="body2" sx={{ color: '#9d174d' }}>
                Premium color themes and visual customizations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            height: '100%',
            background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
            border: 'none',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            transition: 'all 0.2s'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>✨</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Decoratives</Typography>
              <Typography variant="body2" sx={{ color: '#3730a3' }}>
                Character skins, profile frames, badges
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            height: '100%',
            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            border: 'none',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            transition: 'all 0.2s'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>🎮</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Action Bars</Typography>
              <Typography variant="body2" sx={{ color: '#065f46' }}>
                Specialized action bars unlock at specific levels
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Level Progression Example */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        📊 Level Progression Tiers
      </Typography>
      <Typography variant="body2" paragraph color="text.secondary">
        Example unlock schedule showing what becomes available at each tier.
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4, border: '1px solid #e5e7eb' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f9fafb' }}>
              <TableCell sx={{ fontWeight: 700 }}>Level</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Unlocks</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><Chip label="1-3" size="small" sx={{ bgcolor: '#dcfce7', color: '#166534' }} /></TableCell>
              <TableCell>Basic Actions, Default Theme</TableCell>
              <TableCell>Starter</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Chip label="4-6" size="small" sx={{ bgcolor: '#dbeafe', color: '#1e40af' }} /></TableCell>
              <TableCell>Summarize Action, 2 New Themes</TableCell>
              <TableCell>Explorer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Chip label="7-9" size="small" sx={{ bgcolor: '#fef3c7', color: '#92400e' }} /></TableCell>
              <TableCell>Explain Like I'm 5, Profile Frames</TableCell>
              <TableCell>Learner</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Chip label="10-14" size="small" sx={{ bgcolor: '#fce7f3', color: '#9d174d' }} /></TableCell>
              <TableCell>Formal Proof, Custom Action Bar</TableCell>
              <TableCell>Scholar</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Chip label="15+" size="small" sx={{ bgcolor: '#e0e7ff', color: '#3730a3' }} /></TableCell>
              <TableCell>All Premium Content, Badges</TableCell>
              <TableCell>Master</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Alert severity="info" sx={{ mt: 3, mb: 4 }}>
        <strong>Progression Design:</strong> Unlockable content creates a sense of progression and discovery,
        encouraging users to engage more deeply with the learning material. The key is balancing
        accessibility with aspiration — users should feel rewarded, not restricted.
      </Alert>

      {/* Related Features */}
      <Paper sx={{ p: 2.5, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
          🔗 Related Features
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Link href="/docs/features/game-ui" passHref style={{ textDecoration: 'none' }}>
            <Chip
              label="Game UI"
              size="small"
              clickable
              sx={{ bgcolor: '#dbeafe', color: '#1e40af', '&:hover': { bgcolor: '#bfdbfe' } }}
            />
          </Link>
          <Link href="/docs/features/quests" passHref style={{ textDecoration: 'none' }}>
            <Chip
              label="Quests"
              size="small"
              clickable
              sx={{ bgcolor: '#dcfce7', color: '#166534', '&:hover': { bgcolor: '#bbf7d0' } }}
            />
          </Link>
          <Link href="/docs/features/theming" passHref style={{ textDecoration: 'none' }}>
            <Chip
              label="Theming"
              size="small"
              clickable
              sx={{ bgcolor: '#fce7f3', color: '#9d174d', '&:hover': { bgcolor: '#fbcfe8' } }}
            />
          </Link>
        </Stack>
      </Paper>
    </>
  );
}
