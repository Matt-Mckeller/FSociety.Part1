import { Typography, Paper, Box, Alert, Chip, Stack, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MouseIcon from '@mui/icons-material/Mouse';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Link from 'next/link';

const contextualActions = [
  { type: '📝 Text Selection', icon: '📝', actions: ['Define', 'Simplify', 'Research', 'Copy', 'Highlight', 'Notes'] },
  { type: '🖼️ Image', icon: '🖼️', actions: ['Expand', 'Describe', 'Find Similar', 'Save', 'Share'] },
  { type: '💻 Code Block', icon: '💻', actions: ['Run', 'Copy', 'Explain', 'Simplify', 'Debug'] },
  { type: '🎨 Slide Background', icon: '🎨', actions: ['Add Note', 'Report Issue', 'Share', 'Bookmark'] },
  { type: '🎮 Interactive Element', icon: '🎮', actions: ['Reset', 'Help', 'Skip', 'Hint'] },
];

export default function ContextMenuPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
        }}>
          <MoreVertIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
            Context Menu Override
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Smart right-click menus with contextual AI-powered actions
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderLeft: '4px solid #6366f1',
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#6366f1' }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip
            label="Slide Engine"
            size="small"
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#6366f1', color: 'white', fontWeight: 600 }}
          />
          <Chip
            label="AI Actions"
            size="small"
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#8b5cf6', color: 'white', fontWeight: 600 }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontWeight: 600 }}>
          React Context:
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip
            label="ContextMenuContext"
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.7rem', borderColor: '#6366f1', color: '#6366f1' }}
          />
          <Chip
            label="SelectionContext"
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.7rem', borderColor: '#6366f1', color: '#6366f1' }}
          />
        </Stack>
        <Typography variant="caption" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic', color: '#f59e0b' }}>
          ⚠️ Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      <Typography variant="body1" paragraph sx={{ color: '#475569', lineHeight: 1.7 }}>
        A custom right-click context menu that overrides the browser default. Provides contextual
        actions relevant to the current element or slide.
      </Typography>

      {/* Features Cards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 700, color: '#1e293b' }}>
        Features
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%', border: '1px solid #e2e8f0', borderRadius: 2, '&:hover': { borderColor: '#6366f1', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }, transition: 'all 0.2s' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                <MouseIcon sx={{ color: '#6366f1', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Custom Menu</Typography>
              <Typography variant="body2" color="text.secondary">
                Replaces browser right-click menu with app-specific actions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%', border: '1px solid #e2e8f0', borderRadius: 2, '&:hover': { borderColor: '#6366f1', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }, transition: 'all 0.2s' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                <SettingsIcon sx={{ color: '#6366f1', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Context-Aware</Typography>
              <Typography variant="body2" color="text.secondary">
                Menu options vary based on the clicked element type
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%', border: '1px solid #e2e8f0', borderRadius: 2, '&:hover': { borderColor: '#6366f1', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }, transition: 'all 0.2s' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                <KeyboardIcon sx={{ color: '#6366f1', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Keyboard Accessible</Typography>
              <Typography variant="body2" color="text.secondary">
                Open via keyboard shortcut (Shift+F10)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contextual Actions Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 700, color: '#1e293b' }}>
        Contextual Actions by Element Type
      </Typography>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 700, color: '#6366f1', width: '30%' }}>Element Type</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#6366f1' }}>Available Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contextualActions.map((row) => (
              <TableRow key={row.type} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{row.type}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {row.actions.map((action) => (
                      <Chip
                        key={action}
                        label={action}
                        size="small"
                        sx={{ bgcolor: '#f1f5f9', color: '#475569', fontSize: '0.75rem' }}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Placeholder Warning */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: '#fef3c7',
          border: '1px solid #fcd34d',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
        }}
      >
        <Typography sx={{ fontSize: '1.25rem' }}>⚠️</Typography>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400e', mb: 0.5 }}>
            Placeholder Actions
          </Typography>
          <Typography variant="body2" sx={{ color: '#a16207' }}>
            Specific menu items TBD — initial implementation uses placeholder actions while the full action set is defined.
          </Typography>
        </Box>
      </Paper>

      {/* Component */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 700, color: '#1e293b' }}>
        Component
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        <strong>New component:</strong> <code style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>ContextMenuOverride</code> — see Components page
      </Typography>

      {/* Related Features */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 700, color: '#1e293b' }}>
        Related Features
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Link href="/docs/features/ai-actions" style={{ textDecoration: 'none' }}>
          <Chip
            label="🤖 AI Actions"
            clickable
            sx={{ bgcolor: '#ede9fe', color: '#6366f1', fontWeight: 600, '&:hover': { bgcolor: '#c7d2fe' } }}
          />
        </Link>
        <Link href="/docs/features/action-bars" style={{ textDecoration: 'none' }}>
          <Chip
            label="⚡ Action Bars"
            clickable
            sx={{ bgcolor: '#ede9fe', color: '#6366f1', fontWeight: 600, '&:hover': { bgcolor: '#c7d2fe' } }}
          />
        </Link>
        <Link href="/docs/features/presentation" style={{ textDecoration: 'none' }}>
          <Chip
            label="📊 Presentation"
            clickable
            sx={{ bgcolor: '#ede9fe', color: '#6366f1', fontWeight: 600, '&:hover': { bgcolor: '#c7d2fe' } }}
          />
        </Link>
      </Stack>
    </>
  );
}
