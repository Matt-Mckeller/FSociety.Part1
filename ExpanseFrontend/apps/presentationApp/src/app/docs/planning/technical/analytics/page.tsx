import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Divider, Card, CardContent, Grid, Chip } from '@mui/material';

const perUserData = [
  { dataPoint: 'Time on Slide', description: 'Duration spent on each slide' },
  { dataPoint: 'AI Action Usage', description: 'Which actions triggered, frequency, and content context' },
  { dataPoint: 'Feedback Submitted', description: 'Quick reactions and detailed feedback' },
  { dataPoint: 'Quiz Performance', description: 'Scores, attempts, time to complete' },
  { dataPoint: 'Session Duration', description: 'Total time in presentation' },
  { dataPoint: 'Navigation Patterns', description: 'Forward/back, skipped slides, revisits' },
  { dataPoint: 'Content Variant Served', description: 'Which accessibility/audience variant rendered' },
  { dataPoint: 'Engagement Signals', description: 'Confusion, comprehension, pacing signals' },
];

const modalityMetrics = [
  { metric: 'Action Bar Usage', description: 'Frequency of each action bar (Visual, Auditory, Kinesthetic, etc.)' },
  { metric: 'Top Actions', description: 'Most-used individual actions per user' },
  { metric: 'Modality Distribution', description: 'Pie/bar chart of action usage by modality category' },
  { metric: 'Modality Over Time', description: 'How preferences shift across sessions' },
  { metric: 'Content-Action Correlation', description: 'Which actions are used for which content types' },
  { metric: 'Effectiveness by Modality', description: 'Quiz performance correlated with modality used' },
];

const studentPreferences = [
  { preference: 'Preferred Modalities', description: 'Inferred from action bar usage (e.g., "Visual-dominant")' },
  { preference: 'Pacing Preference', description: 'Fast, medium, slow — inferred from time-on-slide and skip patterns' },
  { preference: 'Depth Preference', description: 'Surface vs. deep — based on Expand/Deep Dive usage' },
  { preference: 'Social vs. Solo', description: 'Preference for collaboration features' },
  { preference: 'Time-of-Day Patterns', description: 'When user is most active/engaged' },
  { preference: 'Session Length Preference', description: 'Short bursts vs. long sessions' },
  { preference: 'Break Frequency', description: 'How often user takes breaks' },
  { preference: 'Accessibility Mode', description: 'Explicitly selected + inferred needs' },
  { preference: 'Content Type Affinity', description: 'Which content types (video, text, interactive) get most engagement' },
];

const aggregatedMetrics = [
  { metric: 'Audience Sentiment', description: 'Real-time reaction aggregation' },
  { metric: 'Confusion Hot Spots', description: 'Slides/content with high "I\'m Confused" signals' },
  { metric: 'Engagement Score', description: 'Composite engagement metric per slide' },
  { metric: 'Completion Rate', description: 'Percentage of audience completing presentation' },
  { metric: 'Average Time per Slide', description: 'Helps identify content that needs pacing adjustment' },
  { metric: 'AI Action Popularity', description: 'Most-used AI actions across audience' },
  { metric: 'Class Modality Distribution', description: 'Aggregate modality preferences across class/audience' },
  { metric: 'Modality Effectiveness by Content', description: 'Which modalities work best for which slides' },
  { metric: 'Common Student Profiles', description: 'Clustering of student preference patterns' },
  { metric: 'Break/Wellness Patterns', description: 'Aggregate data on when students need breaks' },
  { metric: 'Preference Divergence', description: 'Identify students with unusual preference patterns for personalized attention' },
];

export default function AnalyticsPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Analytics & User Telemetry
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Data collection and aggregation for understanding user behavior, content effectiveness, 
          and learning outcomes.
        </Typography>
      </Box>

      {/* Per-User Data */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Per-User Data Points
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Data Point</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perUserData.map((row) => (
              <TableRow key={row.dataPoint}>
                <TableCell sx={{ fontWeight: 500 }}>{row.dataPoint}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Learning Modality Analytics */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Learning Modality Analytics
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Track which learning modalities and action categories the user engages with most.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modalityMetrics.map((row) => (
              <TableRow key={row.metric}>
                <TableCell sx={{ fontWeight: 500 }}>{row.metric}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Student Preferences */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Derived Student Preferences
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Preferences inferred from behavior patterns and explicit selections.
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {studentPreferences.map((pref) => (
          <Grid item xs={12} sm={6} lg={4} key={pref.preference}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {pref.preference}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                  {pref.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Aggregated Metrics */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Aggregated Metrics (Presenter Dashboard)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Metrics aggregated across all users in a session for the presenter view.
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aggregatedMetrics.map((row) => (
              <TableRow key={row.metric}>
                <TableCell sx={{ fontWeight: 500 }}>{row.metric}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
