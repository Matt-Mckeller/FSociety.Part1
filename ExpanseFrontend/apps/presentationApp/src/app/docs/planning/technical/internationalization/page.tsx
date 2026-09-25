import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Divider, Stack, Card, CardContent, Grid, Alert } from '@mui/material';

const i18nTiers = [
  { tier: 'UI Text', approach: 'react-i18next', description: 'Static UI labels, buttons, navigation', coverage: 'Full' },
  { tier: 'Content Translations', approach: 'Database + CMS', description: 'Slide content with professional translations stored in database', coverage: 'Partial' },
  { tier: 'AI Fallback', approach: 'On-demand AI', description: 'When no human translation exists, AI generates translation on-the-fly', coverage: 'Full' },
];

const supportedLocales = [
  { code: 'en', name: 'English', status: 'primary' },
  { code: 'es', name: 'Spanish', status: 'planned' },
  { code: 'fr', name: 'French', status: 'planned' },
  { code: 'de', name: 'German', status: 'planned' },
  { code: 'zh', name: 'Chinese (Simplified)', status: 'planned' },
  { code: 'ja', name: 'Japanese', status: 'planned' },
  { code: 'ko', name: 'Korean', status: 'planned' },
  { code: 'ar', name: 'Arabic (RTL)', status: 'planned' },
];

const translationWorkflow = [
  { step: 1, action: 'Content Created', description: 'New content block created in primary language (English)' },
  { step: 2, action: 'Flagged for Translation', description: 'Content marked as needing translation for target locales' },
  { step: 3, action: 'AI Draft', description: 'AI generates initial translation draft for each locale' },
  { step: 4, action: 'Human Review', description: 'Translator reviews and approves/edits AI draft' },
  { step: 5, action: 'Published', description: 'Translation marked as reviewed and published' },
];

export default function InternationalizationPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Internationalization (i18n)
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Multi-tier internationalization strategy supporting UI translations, content localization, and AI-assisted fallbacks.
        </Typography>
      </Box>

      {/* Three-Tier Approach */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Three-Tier Translation Strategy
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Translations are layered: UI text uses react-i18next, content uses database storage with workflow, 
        and AI provides fallback when human translations are unavailable.
      </Alert>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {i18nTiers.map((tier, idx) => (
          <Grid item xs={12} md={4} key={tier.tier}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {tier.tier}
                  </Typography>
                </Box>
                <Chip 
                  label={tier.approach} 
                  size="small" 
                  sx={{ mb: 1.5, fontFamily: 'monospace', fontSize: '0.7rem' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {tier.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Supported Locales */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Supported Locales
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600, width: 100 }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Language</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 100 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supportedLocales.map((locale) => (
              <TableRow key={locale.code}>
                <TableCell>
                  <code style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
                    {locale.code}
                  </code>
                </TableCell>
                <TableCell>{locale.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={locale.status} 
                    size="small"
                    sx={{ 
                      fontSize: '0.7rem',
                      bgcolor: locale.status === 'primary' ? '#dcfce7' : '#fef3c7',
                      color: locale.status === 'primary' ? '#166534' : '#92400e',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Translation Workflow */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Content Translation Workflow
      </Typography>
      <Stack spacing={1.5}>
        {translationWorkflow.map((step) => (
          <Paper 
            key={step.step}
            variant="outlined" 
            sx={{ 
              p: 2, 
              display: 'flex', 
              gap: 2,
              borderLeft: '4px solid',
              borderLeftColor: 'primary.main',
            }}
          >
            <Box 
              sx={{ 
                width: 28, 
                height: 28, 
                borderRadius: 1, 
                bgcolor: 'primary.main', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {step.step}
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {step.action}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Content API */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Locale-Aware Content API
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          bgcolor: '#1e293b',
          borderRadius: 2,
          mb: 1,
        }}
      >
        <Typography 
          component="code" 
          sx={{ 
            fontFamily: '"Fira Code", "JetBrains Mono", monospace',
            color: '#38bdf8',
            fontSize: 14,
          }}
        >
          GET /api/content/:blockId?locale=es&fallback=ai
        </Typography>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Returns translated content for the requested locale. If no human translation exists and 
        <code style={{ backgroundColor: '#f1f5f9', padding: '0 4px', margin: '0 4px', borderRadius: 2 }}>
          fallback=ai
        </code> 
        is set, generates an AI translation.
      </Typography>
    </>
  );
}
