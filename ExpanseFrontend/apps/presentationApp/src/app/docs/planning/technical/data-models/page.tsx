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
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        Data Models
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: 'text.secondary', maxWidth: 700 }}>
        Core entities stored in the backend. Detailed schemas defined in TypeScript interfaces.
      </Typography>

      {entityGroups.map((group) => (
        <Box key={group.title} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            {group.title}
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Entity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Key Fields</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.entities.map((row) => (
                  <TableRow key={row.entity}>
                    <TableCell>
                      <code style={{ 
                        backgroundColor: '#f1f5f9', 
                        padding: '2px 6px', 
                        borderRadius: 4,
                        fontSize: 13 
                      }}>
                        {row.entity}
                      </code>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary' }}>
                      {row.fields}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Entity Relationships
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Typography component="pre" sx={{ fontFamily: 'monospace', fontSize: 13, m: 0, overflow: 'auto' }}>
{`User ─┬─> UserQuestProgress ─> Quest
      ├─> Inventory
      ├─> UserModalityProfile
      ├─> UserPreferences
      ├─> WellnessMetrics
      └─> Feedback

Presentation ─> Slide ─> SlideBlock ─> ContentBlock
                                            │
                                            ├─> ContentVariant (audience, accessibility, locale)
                                            └─> ContentVersion (draft → review → published)

SessionAnalytics ─> SlideAnalytics
                └─> UserModalityProfile (updated from analytics)

AIContentCache ─> ContentBlock (caches AI transformations per block)
TranslationStatus ─> ContentBlock × Locale`}
        </Typography>
      </Paper>
    </>
  );
}
