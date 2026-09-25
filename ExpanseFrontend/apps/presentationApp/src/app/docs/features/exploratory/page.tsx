import { Typography, List, ListItem, ListItemText, Paper, Box, Chip, Stack, Card, CardContent, Grid, Divider } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const conceptCards = [
  {
    icon: '🔤',
    title: 'Interactive Words',
    description: 'Clickable words with expanded information — clicking reveals definitions, related concepts, or AI-generated explanations.',
    status: ['Needs Design', 'Concept Only'],
    details: ['Format: TBD', 'Behavior: TBD', 'AI Integration potential']
  },
  {
    icon: '📐',
    title: 'Custom UI Components (3-piece)',
    description: 'Multi-part expandable UI that reveals progressive levels of detail — Summary → Details → Deep Dive in a connected visual format.',
    status: ['Needs Design', 'Will Return to Define'],
    details: ['Component structure TBD', 'Animation patterns TBD']
  },
  {
    icon: '🎮',
    title: 'Mock Game Components',
    description: 'Full profile views, skill trees, knowledge nesting, and inventory systems for the gamified learning experience.',
    status: ['Placeholder', 'Detailed Spec Needed'],
    details: ['Profile (Full View)', 'Skills / Attributes', 'Knowledge Trees', 'Inventory System']
  }
];

const relatedFeatures = [
  { name: 'Learning System', href: '/docs/features/learning', description: 'Core learning mechanics' },
  { name: 'AI Actions', href: '/docs/features/ai-actions', description: 'AI-powered interactions' },
  { name: 'Game UI', href: '/docs/features/game-ui', description: 'Gamification elements' },
  { name: 'Progression', href: '/docs/features/progression', description: 'XP and leveling systems' }
];

export default function ExploratoryPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
        <Box sx={{
          width: 48,
          height: 48,
          bgcolor: '#fbbf24',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ExploreIcon sx={{ color: '#fff', fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Exploratory / TBD
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Conceptual features awaiting design exploration and detailed specification
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          borderLeft: '4px solid #f59e0b',
          borderRadius: 2
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#92400e' }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip
            label="TBD"
            size="small"
            sx={{
              bgcolor: '#f59e0b',
              color: '#fff',
              fontWeight: 600,
              mr: 0.5,
              mb: 0.5
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          <strong>Assumed React Context:</strong>
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="To be determined" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#d97706', color: '#92400e' }} />
        </Stack>
        <Typography variant="caption" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic', color: '#b45309' }}>
          Note: Architecture and context structure will be defined during design phase.
        </Typography>
      </Paper>

      {/* Conceptual Warning */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          bgcolor: '#fefce8',
          border: '1px dashed #facc15',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <LightbulbIcon sx={{ color: '#eab308', fontSize: 32 }} />
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#854d0e', mb: 0.25 }}>
            🧪 Experimental Territory
          </Typography>
          <Typography variant="body2" color="text.secondary">
            These features are conceptual ideas that need further exploration, design work, and validation before implementation.
          </Typography>
        </Box>
      </Paper>

      {/* Concept Cards */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Exploratory Concepts
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {conceptCards.map((concept) => (
          <Grid item xs={12} md={4} key={concept.title}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                borderColor: '#fcd34d',
                bgcolor: '#fffbeb',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#f59e0b',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#fef3c7',
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20
                  }}>
                    {concept.icon}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {concept.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                  {concept.description}
                </Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#92400e', display: 'block', mb: 0.5 }}>
                    Status
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {concept.status.map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        size="small"
                        sx={{
                          bgcolor: '#fef3c7',
                          color: '#92400e',
                          fontSize: '0.65rem',
                          height: 20,
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#92400e', display: 'block', mb: 0.5 }}>
                    Details
                  </Typography>
                  <List dense disablePadding sx={{ '& .MuiListItem-root': { py: 0, minHeight: 24 } }}>
                    {concept.details.map((detail) => (
                      <ListItem key={detail} disableGutters>
                        <ListItemText
                          primary={detail}
                          primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Next Steps */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArrowForwardIcon sx={{ color: '#f59e0b' }} />
          Next Steps
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Help shape these exploratory features by contributing ideas and designs:
        </Typography>
        <List dense>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="📋 Define user stories and use cases for each concept"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="🎨 Create wireframes or mockups for visual concepts"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="🔬 Research similar implementations in other platforms"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="🧩 Identify dependencies on other modules or features"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="📝 Document technical requirements and constraints"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        </List>
      </Paper>

      {/* Related Features */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Related Features
      </Typography>
      <Grid container spacing={1.5}>
        {relatedFeatures.map((feature) => (
          <Grid item xs={6} sm={3} key={feature.name}>
            <Link href={feature.href} style={{ textDecoration: 'none' }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#f59e0b',
                    bgcolor: '#fffbeb'
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#f59e0b' }}>
                  {feature.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
