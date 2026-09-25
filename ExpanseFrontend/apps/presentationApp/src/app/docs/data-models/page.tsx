import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const entityGroups = [
  {
    title: 'User & Game State',
    entities: [
      { entity: 'User', fields: 'id, email, displayName, level, xp, coins, preferences, equippedItems', description: 'Player profile and game state' },
      { entity: 'UserQuestProgress', fields: 'userId, questId, progress, isComplete, completedAt', description: "User's progress on each quest" },
      { entity: 'Inventory', fields: 'userId, items[]', description: "User's owned items and unlocks" },
    ],
  },
  {
    title: 'Presentations & Slides',
    entities: [
      { entity: 'Slide', fields: 'id, name, presentationIds[], audienceTypes[], order, unlockLevel', description: 'Slide metadata with audience targeting' },
      { entity: 'SlideBlock', fields: 'slideId, blockId, order, overrides', description: 'Block instance in a slide (with optional local overrides)' },
      { entity: 'Presentation', fields: 'id, name, description, slideIds[], isPublic', description: 'Collection of slides forming a presentation' },
      { entity: 'PresentationSession', fields: 'id, presenterId, presentationId, currentSlideId, participants[], isLive', description: 'Real-time presenter session for sync' },
    ],
  },
  {
    title: 'Content System',
    entities: [
      { entity: 'ContentBlock', fields: 'id, type, baseContent, version, createdAt, updatedAt', description: 'Reusable content block' },
      { entity: 'ContentVariant', fields: 'blockId, variantType, locale, audienceType, content, isAIGenerated, reviewedAt', description: 'Layered variant (audience, accessibility, language)' },
      { entity: 'ContentVersion', fields: 'blockId, version, content, status, publishedAt, publishedBy', description: 'Version history with draft/review/published workflow' },
      { entity: 'AIContentCache', fields: 'blockId, action, params, result, generatedAt, hitCount', description: 'Cached AI transformations' },
      { entity: 'TranslationStatus', fields: 'blockId, locale, status, translator, reviewedBy', description: 'Translation workflow tracking' },
    ],
  },
  {
    title: 'Quests & Feedback',
    entities: [
      { entity: 'Quest', fields: 'id, name, description, criteria, rewardXp, rewardCoins, isRepeatable', description: 'Trackable objectives with rewards' },
      { entity: 'Feedback', fields: 'id, userId?, sourceType, sourceId, type, content, rating, createdAt', description: 'User or AI feedback on content' },
    ],
  },
  {
    title: 'Analytics',
    entities: [
      { entity: 'SessionAnalytics', fields: 'userId, presentationId, sessionId, startTime, endTime, interactions[]', description: 'Per-session aggregation' },
      { entity: 'SlideAnalytics', fields: 'slideId, sessionId, timeSpent, interactions, feedbackSignals', description: 'Per-slide metrics' },
      { entity: 'UserModalityProfile', fields: 'userId, visualScore, auditoryScore, kinestheticScore, ...', description: 'Inferred modality preferences' },
      { entity: 'UserPreferences', fields: 'userId, derivedFromActions[], lastUpdated', description: 'Derived preferences' },
      { entity: 'WellnessMetrics', fields: 'userId, breakPatterns, focusIndicators, suggestions[]', description: 'Break patterns, focus indicators' },
    ],
  },
];

export default function DataModelsPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Data Models
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Core entities stored in the backend. Detailed schemas in TypeScript interfaces.
      </Typography>

      {entityGroups.map((group) => (
        <Box key={group.title} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {group.title}
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Entity</strong></TableCell>
                  <TableCell><strong>Key Fields</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.entities.map((row) => (
                  <TableRow key={row.entity}>
                    <TableCell><code>{row.entity}</code></TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{row.fields}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Entity Relationships
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.100' }}>
        <Typography component="pre" sx={{ fontFamily: 'monospace', fontSize: 13, m: 0 }}>
{`User ─┬─> UserQuestProgress ─> Quest
      ├─> Inventory
      ├─> UserModalityProfile
      ├─> UserPreferences
      ├─> WellnessMetrics
      └─> Feedback

Presentation ─> Slide ─> SlideBlock ─> ContentBlock
                              └─> ContentVariant
                              └─> ContentVersion
                              └─> AIContentCache

PresentationSession ─> Presentation
                   └─> User (presenter)
                   └─> User[] (participants)`}
        </Typography>
      </Paper>
    </>
  );
}
