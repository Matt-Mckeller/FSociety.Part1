import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Divider } from '@mui/material';

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
      <Typography variant="h3" gutterBottom>
        Analytics & User Telemetry
      </Typography>
      <Typography variant="body1" paragraph>
        Data collection and aggregation for understanding user behavior, content effectiveness, and learning outcomes.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Per-User Data Points
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Data Point</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perUserData.map((row) => (
              <TableRow key={row.dataPoint}>
                <TableCell><strong>{row.dataPoint}</strong></TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Learning Modality Analytics
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Track which learning modalities and action categories the user engages with most.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Metric</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modalityMetrics.map((row) => (
              <TableRow key={row.metric}>
                <TableCell><strong>{row.metric}</strong></TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Student Preferences & Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Derived preferences based on behavior patterns.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Preference</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentPreferences.map((row) => (
              <TableRow key={row.preference}>
                <TableCell><strong>{row.preference}</strong></TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Aggregated Analytics (Presenter/Admin View)
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Metric</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aggregatedMetrics.map((row) => (
              <TableRow key={row.metric}>
                <TableCell><strong>{row.metric}</strong></TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Related Entities
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.100' }}>
        <Typography component="pre" sx={{ fontFamily: 'monospace', fontSize: 13, m: 0 }}>
{`SessionAnalytics    — Per-session aggregation
SlideAnalytics      — Per-slide metrics
UserProgress        — Longitudinal user progress tracking
UserModalityProfile — Inferred modality preferences and history
UserPreferences     — Derived preferences (pacing, depth, social/solo)
WellnessMetrics     — Break patterns, session lengths, focus indicators`}
        </Typography>
      </Paper>
    </>
  );
}
