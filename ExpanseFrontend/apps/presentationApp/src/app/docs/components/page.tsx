import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Chip, Divider, Alert } from '@mui/material';

const newComponents = [
  { component: 'WhyChip', description: 'A small clickable chip/tag placed near concepts. When clicked, reveals a brief explanation of why the topic matters — helping learners understand relevance and stay motivated', priority: 'High' },
  { component: 'ContextMenuOverride', description: 'Custom right-click context menu component that overrides browser default. Displays contextual, element-aware actions. Placeholder actions initially', priority: 'High' },
  { component: 'ConfigurablePanel', description: 'Reusable, collapsible panel component. Accepts any child content. Supports docking positions (top/bottom/left/right), persistence to localStorage, and keyboard shortcut toggling. Resizing and drag-and-drop docking deferred to post-MVP', priority: 'High' },
  { component: 'ContentFeedbackPanel', description: 'Panel for submitting detailed feedback on the current slide/content. Includes text input, star/emoji rating, category tags (confusing, great, needs work, etc.), and submit action. Renders inside a ConfigurablePanel', priority: 'High' },
  { component: 'FeedbackInputBar', description: "Quick-reaction bar component with configurable reaction buttons (I'm Confused, I Get It, etc.). Supports real-time aggregation display for presenter mode", priority: 'High' },
  { component: 'Achievement', description: 'Achievement display component for quest/milestone completion', priority: 'Medium' },
  { component: 'Badge', description: 'Badge/medal display component', priority: 'Medium' },
];

const existingComponents = {
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

export default function ComponentsPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Components
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        New Components to Create
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Components that need to be built for this app.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Component</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newComponents.map((row) => (
              <TableRow key={row.component}>
                <TableCell><code>{row.component}</code></TableCell>
                <TableCell>{row.description}</TableCell>
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

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" gutterBottom>
        Existing Storybook Components
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        From the Storybook app in ExpanseFrontend.
      </Typography>

      {Object.entries(existingComponents).map(([category, components]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {category}
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Component</strong></TableCell>
                  <TableCell><strong>Source</strong></TableCell>
                  <TableCell><strong>Purpose</strong></TableCell>
                  <TableCell><strong>Notes</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {components.map((row) => (
                  <TableRow key={row.component}>
                    <TableCell><code>{row.component}</code></TableCell>
                    <TableCell><code>{row.source}</code></TableCell>
                    <TableCell>{row.purpose}</TableCell>
                    <TableCell>{row.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Mock Game Components (TBD)
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body1" component="ul" sx={{ pl: 2, m: 0 }}>
          <li><strong>Profile</strong> — Full profile view with learning stats, equipped items, slots</li>
          <li><strong>Skills/Attributes</strong> — Skill trees and progression</li>
          <li><strong>Knowledge Trees</strong> — Nested knowledge structures</li>
          <li><strong>Inventory</strong> — Item management</li>
        </Typography>
      </Paper>
    </>
  );
}
