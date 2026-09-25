import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Chip, Divider, Alert, Card, CardContent } from '@mui/material';

const newComponents = [
  { component: 'WhyChip', description: 'A small clickable chip/tag placed near concepts. When clicked, reveals a brief explanation of why the topic matters — helping learners understand relevance and stay motivated', priority: 'High' },
  { component: 'ContextMenuOverride', description: 'Custom right-click context menu component that overrides browser default. Displays contextual, element-aware actions. Placeholder actions initially', priority: 'High' },
  { component: 'ConfigurablePanel', description: 'Reusable, collapsible panel component. Accepts any child content. Supports docking positions (top/bottom/left/right), persistence to localStorage, and keyboard shortcut toggling. Resizing and drag-and-drop docking deferred to post-MVP', priority: 'High' },
  { component: 'ContentFeedbackPanel', description: 'Panel for submitting detailed feedback on the current slide/content. Includes text input, star/emoji rating, category tags (confusing, great, needs work, etc.), and submit action. Renders inside a ConfigurablePanel', priority: 'High' },
  { component: 'FeedbackInputBar', description: "Quick-reaction bar component with configurable reaction buttons (I'm Confused, I Get It, etc.). Supports real-time aggregation display for presenter mode", priority: 'High' },
  { component: 'Achievement', description: 'Achievement display component for quest/milestone completion', priority: 'Medium' },
  { component: 'Badge', description: 'Badge/medal display component', priority: 'Medium' },
];

const existingComponents: Record<string, { component: string; source: string; purpose: string; notes: string }[]> = {
  'Game UI & Status Bars': [
    { component: 'CurrencyStatusBar', source: 'ui/game', purpose: 'In-game currency display', notes: '' },
    { component: 'ExperienceStatusBar', source: 'ui/game', purpose: 'XP / level progress bar', notes: '' },
    { component: 'ProfileIconStatusBar', source: 'ui/game', purpose: 'Profile status with avatar icon', notes: 'Core Game UI Overlay element' },
    { component: 'ProfileDisplay', source: 'ui/game', purpose: 'Full profile view', notes: 'For Profile View feature' },
    { component: 'WalletBanner', source: 'ui/game', purpose: 'Expanded currency display', notes: '⚠️ Needs visual improvements' },
    { component: 'TicketCard', source: 'ui/points', purpose: 'Multi-section card with XP display', notes: 'Possible quest/reward representation' },
    { component: 'PointsChart', source: 'ui/points', purpose: 'Chart visualization of points/XP', notes: 'Maybe — evaluate during build' },
  ],
  'Reward & Progression': [
    { component: 'ClaimEventRewardsView', source: 'ui/game', purpose: 'Full view for claiming rewards', notes: 'Level-up reward flow' },
    { component: 'ClaimEventRewardDisplayModal', source: 'ui/game', purpose: 'Modal for claiming event rewards', notes: 'Triggered on level-up' },
    { component: 'Achievement', source: 'ui/game', purpose: 'Achievement display', notes: '⚠️ Needs to be built/added' },
    { component: 'Badge', source: 'ui/game', purpose: 'Badge/medal display', notes: '⚠️ Needs to be built/added' },
  ],
  'Inventory': [
    { component: 'InventorySidePanel', source: 'ui/game', purpose: 'Inventory management panel', notes: '⚠️ Needs improvements' },
    { component: 'InventoryView', source: 'ui/game', purpose: 'Full inventory view', notes: '⚠️ Needs improvements' },
    { component: 'InventoryGrid', source: 'ui/game', purpose: 'Grid layout for inventory items', notes: 'May be used in different context' },
  ],
  'Chat System': [
    { component: 'LearningChatContainer', source: 'ui/chat', purpose: 'Full chat layout container', notes: '⚠️ May need updates for presentation context' },
    { component: 'LearningChatInput', source: 'ui/chat', purpose: 'Message input with send controls', notes: '' },
    { component: 'LearningChatMessageList', source: 'ui/chat', purpose: 'Scrollable message list', notes: '' },
    { component: 'LearningChatMessageBubble', source: 'ui/chat', purpose: 'Individual message bubble', notes: '' },
    { component: 'LearningChatTypingIndicator', source: 'ui/chat', purpose: 'Animated typing/thinking indicator', notes: '' },
    { component: 'LearningChatMarkdownRenderer', source: 'ui/chat', purpose: 'Renders markdown content in messages', notes: '' },
  ],
  'Characters & Transitions': [
    { component: 'StaticCharacter', source: 'ui/theme', purpose: 'Character in static pose', notes: 'Section transition screens' },
    { component: 'CharacterForwardStanding', source: 'ui/theme', purpose: 'Character facing forward', notes: 'Section transition screens' },
    { component: 'CharacterCelebration1', source: 'ui/theme', purpose: 'Character celebration animation', notes: 'Level-up / quest completion' },
    { component: 'CharacterCelebration2', source: 'ui/theme', purpose: 'Character celebration animation', notes: 'Level-up / quest completion' },
    { component: 'CharacterPushingBar', source: 'ui/game', purpose: 'Animated character pushing progress bar', notes: 'Transition screens' },
    { component: 'WalkingCharacter', source: 'ui/game', purpose: 'Animated walking character', notes: 'Transition screens' },
  ],
  'Decorative & Theming': [
    { component: 'TripleDash', source: 'ui/theme', purpose: 'Configurable triple-dash decorative element', notes: 'Section transition screens' },
    { component: 'LightDarkModeToggleSwitch', source: 'ui/theme', purpose: 'Light/dark mode toggle', notes: 'Theme customization' },
    { component: 'ExpandingBar', source: 'ui/theme', purpose: 'Animated expanding bar', notes: 'Decorative transitions' },
    { component: 'ExpandingBorderBox', source: 'ui/theme', purpose: 'Box with animated expanding border', notes: 'Decorative transitions' },
    { component: 'TypographyResponsive', source: 'ui/theme', purpose: 'Auto-scales text to viewport', notes: 'Slide content' },
    { component: 'ExpanseLoadingSpinner', source: 'ui/theme', purpose: 'Branded loading spinner', notes: 'Loading states between slides' },
  ],
  'Icons': [
    { component: 'CoinIcon', source: 'ui/theme', purpose: 'Currency coin icon', notes: 'Coin gain animation, UI elements' },
    { component: 'GemIcon', source: 'ui/theme', purpose: 'Premium currency gem icon', notes: 'UI elements' },
    { component: 'CoinStackIcon', source: 'ui/theme', purpose: 'Stacked coins icon', notes: 'UI elements' },
    { component: 'ExperienceIcon', source: 'ui/theme', purpose: 'XP/experience point icon', notes: 'Status bars, quest rewards' },
    { component: 'Settings Icon', source: 'MUI Icons', purpose: 'Settings access', notes: 'System action icon' },
    { component: 'Backpack Icon', source: 'MUI Icons', purpose: 'Inventory access', notes: 'System action icon' },
  ],
};

export default function UIComponentsPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          UI Components
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
          New and existing Storybook components used in the PresentationApp.
        </Typography>
      </Box>

      {/* New Components */}
      <Card variant="outlined" sx={{ mb: 4, borderColor: 'error.main', borderWidth: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'error.main' }}>
            New Components to Build
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Components that need to be created for this application.
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: 80 }}>Priority</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newComponents.map((row) => (
                  <TableRow key={row.component}>
                    <TableCell>
                      <code style={{ backgroundColor: '#fef2f2', padding: '2px 6px', borderRadius: 4, color: '#dc2626' }}>
                        {row.component}
                      </code>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>{row.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.priority}
                        size="small"
                        color={row.priority === 'High' ? 'error' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Existing Components */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Existing Storybook Components
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        These components already exist in the Storybook component library and can be reused.
      </Alert>

      {Object.entries(existingComponents).map(([category, components]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            {category}
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Purpose</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {components.map((row) => (
                  <TableRow key={row.component}>
                    <TableCell>
                      <code style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>
                        {row.component}
                      </code>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary' }}>
                      {row.source}
                    </TableCell>
                    <TableCell>{row.purpose}</TableCell>
                    <TableCell sx={{ color: row.notes.includes('⚠️') ? 'warning.main' : 'text.secondary', fontSize: '0.875rem' }}>
                      {row.notes || '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </>
  );
}
