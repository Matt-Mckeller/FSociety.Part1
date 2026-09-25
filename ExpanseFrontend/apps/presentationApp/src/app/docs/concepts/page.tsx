import { Typography, Box, Paper, Grid, Card, CardContent, CardActionArea, Chip, Alert } from '@mui/material'
import Link from 'next/link'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

const concepts = [
  {
    title: 'Currency System',
    href: '/docs/concepts/currency',
    description: 'Virtual coins earned through learning activities and spent on customizations',
    icon: MonetizationOnIcon,
    color: '#10b981',
    status: 'placeholder',
  },
  {
    title: 'XP & Progression',
    href: '/docs/concepts/progression',
    description: 'Experience points, levels, and user advancement through the learning journey',
    icon: TrendingUpIcon,
    color: '#8b5cf6',
    status: 'placeholder',
  },
  {
    title: 'Quest System',
    href: '/docs/concepts/quests',
    description: 'Trackable objectives that reward users for completing learning activities',
    icon: EmojiEventsIcon,
    color: '#f59e0b',
    status: 'placeholder',
  },
]

export default function ConceptsPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
        <Box
          sx={{
            bgcolor: '#fbbf24',
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(251, 191, 36, 0.4)',
          }}
        >
          <LightbulbIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            Core Concepts
          </Typography>
          <Typography variant="body1" color="text.secondary">
            High-level understanding of key systems that power the learning experience
          </Typography>
        </Box>
      </Box>

      {/* Status Alert */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <strong>Placeholder Section:</strong> This section is reserved for high-level concept documentation.
        Content will be added to explain core systems like currency, XP, and quests at a conceptual level,
        separate from feature implementation details.
      </Alert>

      {/* Concepts Grid */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Documented Concepts
      </Typography>

      <Grid container spacing={2.5}>
        {concepts.map((concept) => {
          const Icon = concept.icon
          return (
            <Grid item xs={12} sm={6} md={4} key={concept.href}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  transition: 'all 0.2s ease',
                  opacity: concept.status === 'placeholder' ? 0.7 : 1,
                  '&:hover': {
                    borderColor: concept.color,
                    boxShadow: `0 4px 12px ${concept.color}18`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  href={concept.href}
                  sx={{ height: '100%', alignItems: 'flex-start' }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          bgcolor: `${concept.color}15`,
                          display: 'flex',
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ color: concept.color, fontSize: 24 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                            {concept.title}
                          </Typography>
                          {concept.status === 'placeholder' && (
                            <Chip
                              label="TBD"
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: '0.65rem',
                                bgcolor: '#94a3b8',
                                color: 'white',
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                          {concept.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* Sync Strategy Note */}
      <Paper
        variant="outlined"
        sx={{
          mt: 4,
          p: 2.5,
          bgcolor: 'grey.50',
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          📋 About This Section
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Concepts provide high-level overviews of core systems. They explain the "what" and "why"
          while feature pages explain the "how." This separation keeps documentation maintainable
          and allows concepts to be referenced from multiple feature pages.
        </Typography>
      </Paper>
    </>
  )
}
