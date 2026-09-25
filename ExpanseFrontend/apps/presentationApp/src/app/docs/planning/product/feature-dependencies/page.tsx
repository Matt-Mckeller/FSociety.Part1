import { Typography, Box, Paper, Divider, Stack, Chip, Alert } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const phases = [
  {
    phase: 'Phase 1: Shell',
    focus: 'Foundation',
    deliverables: 'App shell, routing, auth, slide navigation with placeholder content',
    dependencies: [],
    color: '#1565c0',
  },
  {
    phase: 'Phase 2: Gamification UI',
    focus: 'Game layer',
    deliverables: 'Status bars, quest panel, coin animations, level-up flow',
    dependencies: ['Phase 1: Shell'],
    color: '#7c4dff',
  },
  {
    phase: 'Phase 3: Presenter Mode',
    focus: 'Real-time',
    deliverables: 'WebSockets, presenter sync, self-paced mode, audience types',
    dependencies: ['Phase 1: Shell'],
    color: '#00897b',
  },
  {
    phase: 'Phase 4: Actions & Feedback',
    focus: 'Interaction',
    deliverables: 'Action bars (mocked AI), context menu, feedback system',
    dependencies: ['Phase 2: Gamification UI'],
    color: '#f57c00',
  },
  {
    phase: 'Phase 5: Content System',
    focus: 'Content',
    deliverables: 'Block model, variants, accessibility modes, AI caching',
    dependencies: ['Phase 1: Shell'],
    color: '#c62828',
  },
  {
    phase: 'Phase 6: Panels & Chat',
    focus: 'Panels',
    deliverables: 'Panel system, chat, notes, analytics',
    dependencies: ['Phase 3: Presenter Mode', 'Phase 4: Actions & Feedback'],
    color: '#5c6bc0',
  },
  {
    phase: 'Phase 7: AI Integration',
    focus: 'AI',
    deliverables: 'Real AI calls, learning strategies UI, content pipelines',
    dependencies: ['Phase 5: Content System', 'Phase 4: Actions & Feedback'],
    color: '#388e3c',
  },
  {
    phase: 'Phase 8: Polish',
    focus: 'Complete',
    deliverables: 'Theming, decorative elements, profile view, inventory',
    dependencies: ['Phase 6: Panels & Chat', 'Phase 7: AI Integration'],
    color: '#78909c',
  },
];

const featureDependencies = [
  { feature: 'Presentation System', dependsOn: [], enabledBy: 'Core' },
  { feature: 'Game UI', dependsOn: ['Presentation System'], enabledBy: 'Routing, Auth' },
  { feature: 'Quest System', dependsOn: ['Game UI', 'User Progress'], enabledBy: 'Gamification Layer' },
  { feature: 'Chat System', dependsOn: ['Presentation System', 'WebSockets'], enabledBy: 'Collaboration' },
  { feature: 'Action Bars', dependsOn: ['Presentation System', 'Content System'], enabledBy: 'AI Integration' },
  { feature: 'Feedback System', dependsOn: ['Action Bars', 'User Progress'], enabledBy: 'Analytics' },
  { feature: 'Learning Features', dependsOn: ['Content System', 'AI Integration'], enabledBy: 'Accessibility' },
];

export default function FeatureDependenciesPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Feature Dependencies
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Interdependency hierarchy showing which features depend on others and the recommended build order.
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }} icon={false}>
        Features, modules, value offerings, goals, and audiences are independent data models. 
        Technical elements (APIs, Accessibility, etc.) relate between them.
      </Alert>

      {/* Implementation Phases */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
        Implementation Phases
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        8-phase build plan with explicit dependencies:
      </Typography>
      
      <Stack spacing={2} sx={{ mb: 4 }}>
        {phases.map((phase) => (
          <Paper 
            key={phase.phase}
            variant="outlined" 
            sx={{ 
              p: 2.5, 
              borderLeft: `4px solid ${phase.color}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {phase.phase}
                  </Typography>
                  <Chip 
                    label={phase.focus} 
                    size="small" 
                    sx={{ 
                      bgcolor: `${phase.color}15`, 
                      color: phase.color,
                      fontWeight: 500,
                      fontSize: '0.7rem',
                    }} 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {phase.deliverables}
                </Typography>
                {phase.dependencies.length > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                    <Typography variant="caption" color="text.secondary">Depends on:</Typography>
                    {phase.dependencies.map((dep) => (
                      <Chip 
                        key={dep} 
                        label={dep} 
                        size="small" 
                        variant="outlined"
                        sx={{ height: 20, fontSize: '0.65rem' }} 
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Feature Dependency Chain */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Feature Dependency Chain
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Relationships between features and what enables them:
      </Typography>
      
      <Stack spacing={1.5}>
        {featureDependencies.map((item) => (
          <Paper 
            key={item.feature}
            variant="outlined" 
            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, minWidth: 160 }}>
              {item.feature}
            </Typography>
            {item.dependsOn.length > 0 && (
              <>
                <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {item.dependsOn.map((dep) => (
                    <Chip 
                      key={dep} 
                      label={dep} 
                      size="small" 
                      variant="outlined"
                      sx={{ height: 20, fontSize: '0.65rem' }} 
                    />
                  ))}
                </Box>
              </>
            )}
            {item.dependsOn.length === 0 && (
              <Chip label="Core / No Dependencies" size="small" sx={{ bgcolor: '#dcfce7', color: '#166534', fontSize: '0.65rem' }} />
            )}
          </Paper>
        ))}
      </Stack>
    </>
  );
}
