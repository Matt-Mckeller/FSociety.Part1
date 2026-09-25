import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, Card, CardContent, Chip, Alert, Divider } from '@mui/material'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar'
import ChatIcon from '@mui/icons-material/Chat'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import InventoryIcon from '@mui/icons-material/Inventory'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import InteractiveShellPreview from './InteractiveShellPreview'

const regions = [
  { region: 'Top Bar', behavior: 'Logo, XP/level display, coins, notifications, and profile menu' },
  { region: 'Left Navigation Panel', behavior: 'Section list with progress indicators + quick action buttons for Quests, Chat, Notes' },
  { region: 'Primary Content Area', behavior: 'Slide content (fixed position, sometimes scrollable)' },
  { region: 'Right Panel Drawer', behavior: 'Contextual panels (Notes, Inventory) that slide in from right. Height adjusts when Chat is open.' },
  { region: 'Bottom Chat Panel', behavior: 'Chat panel slides up from bottom, takes full width priority over right panels.' },
  { region: 'Profile Menu', behavior: 'Dropdown with Profile, Inventory, Settings, Help, Sign Out' },
]

const quickAccessPanels = [
  { name: 'Quest Panel', icon: EmojiEventsIcon, color: '#f59e0b', description: 'Track objectives, view progress, claim rewards. Opens as overlay drawer with backdrop - becomes primary focus.', status: 'Implemented', behavior: 'Overlay' },
  { name: 'Chat Panel', icon: ChatIcon, color: '#3b82f6', description: 'Presenter chat, AI assistant, team messaging. Opens from BOTTOM - takes full width priority, content shrinks vertically.', status: 'Placeholder', behavior: 'Bottom' },
  { name: 'Notes Panel', icon: StickyNote2Icon, color: '#10b981', description: 'User notes and annotations per slide. Opens from right side - height adjusts when Chat is open.', status: 'Placeholder', behavior: 'Right Side' },
]

const profileMenuItems = [
  { name: 'Profile', icon: PersonIcon, color: '#64748b', description: 'View and edit user profile' },
  { name: 'Inventory', icon: InventoryIcon, color: '#8b5cf6', description: 'User unlockables, equipped items, customizations' },
  { name: 'Settings', icon: SettingsIcon, color: '#64748b', description: 'App preferences, accessibility, theme' },
]

export default function LayoutPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Application Layout
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        The presentation app uses a <strong>fixed shell layout</strong> with a left navigation panel, 
        central content area, and right-side contextual panels. The top bar provides user status and a 
        consolidated profile menu.
      </Typography>

      {/* Interactive Preview Accordion */}
      <InteractiveShellPreview />

      {/* Layout Regions Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Layout Regions
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Region</strong></TableCell>
              <TableCell><strong>Purpose & Behavior</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regions.map((row) => (
              <TableRow key={row.region}>
                <TableCell><strong>{row.region}</strong></TableCell>
                <TableCell>{row.behavior}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Layout Diagram */}
      <Typography variant="h5" gutterBottom>
        Layout Diagram
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.100', mb: 4 }}>
        <Typography component="pre" sx={{ fontFamily: 'monospace', fontSize: 11, m: 0, lineHeight: 1.4 }}>
{`┌─────────────────────────────────────────────────────────────────────┐
│                          TOP BAR (Fixed)                            │
│  [Logo]  [Level Badge] [XP Bar] [Coins]      [🔔] [👤 Profile ▼]  │
├──────────────────┬──────────────────────────────────┬───────────────┤
│                  │                                  │               │
│  LEFT NAVIGATION │      PRIMARY CONTENT AREA        │  RIGHT PANEL  │
│                  │                                  │   (Notes)     │
│  ┌────────────┐  │                                  │               │
│  │ SECTIONS   │  │        Slide Content             │  ┌─────────┐  │
│  │            │  │                                  │  │ NOTES   │  │
│  │ ○ Intro    │  │   ┌─────────────────────────┐    │  │         │  │
│  │ ● Current  │  │   │                         │    │  │ Note 1  │  │
│  │ ○ Advanced │  │   │    [Content Area]       │    │  │ Note 2  │  │
│  │ ○ Practice │  │   │                         │    │  │ ...     │  │
│  └────────────┘  │   └─────────────────────────┘    │  │         │  │
│                  │                                  │  └─────────┘  │
│  ┌────────────┐  │                                  │               │
│  │QUICK ACCESS│  │                                  │               │
│  │ [🏆][💬][📝]│  │                                  │               │
├──────────────────┴──────────────────────────────────┴───────────────┤
│                       CHAT PANEL (Bottom)                           │
│  [Messages Area]                               [AI Assistant]       │
└─────────────────────────────────────────────────────────────────────┘

Panel Priority: Chat (bottom) > Notes (right) > Content
When both Chat + Notes open: Notes sits above Chat, Chat spans full width`}
        </Typography>
      </Paper>

      {/* Quick Access Panels */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 5, mb: 2 }}>
        <ViewSidebarIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Quick Access Panels
        </Typography>
      </Box>
      
      <Alert severity="success" sx={{ mb: 3 }}>
        <strong>Quick Access Buttons:</strong> Located at the bottom of the left navigation, these buttons toggle 
        contextual panels that slide in from the right. This keeps important tools readily accessible while 
        maintaining a clean content area.
      </Alert>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <strong>Panel Behaviors & Priority:</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
          <li><strong>Overlay panels</strong> (Quest): Opens with a backdrop, grays out content, becomes primary focus. Content does not resize.</li>
          <li><strong>Bottom panel</strong> (Chat): Opens from bottom, takes full width priority. Content shrinks vertically. When Notes is also open, Notes sits above Chat.</li>
          <li><strong>Right side panels</strong> (Notes): Opens from right, content shrinks horizontally. Height adjusts when Chat is open.</li>
        </ul>
        <Box sx={{ mt: 1, fontWeight: 500 }}>
          Priority Order: Quest (overlay) &gt; Chat (bottom) &gt; Notes (right) &gt; Content
        </Box>
      </Alert>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickAccessPanels.map((panel) => {
          const Icon = panel.icon
          return (
            <Grid item xs={12} sm={6} md={4} key={panel.name}>
              <Card
                variant="outlined"
                sx={{
                  borderLeft: `4px solid ${panel.color}`,
                  transition: 'all 0.2s',
                  height: '100%',
                  '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: `${panel.color}15` }}>
                    <Icon sx={{ color: panel.color }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {panel.name}
                      </Typography>
                      <Chip 
                        label={panel.status} 
                        size="small" 
                        sx={{ 
                          height: 18, 
                          fontSize: '0.65rem', 
                          bgcolor: panel.status === 'Implemented' ? '#dcfce7' : '#94a3b8', 
                          color: panel.status === 'Implemented' ? '#166534' : 'white' 
                        }} 
                      />
                      <Chip 
                        label={panel.behavior} 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                          height: 18, 
                          fontSize: '0.65rem',
                          borderColor: panel.behavior === 'Overlay' ? '#f59e0b' : panel.behavior === 'Bottom' ? '#3b82f6' : '#10b981',
                          color: panel.behavior === 'Overlay' ? '#f59e0b' : panel.behavior === 'Bottom' ? '#3b82f6' : '#10b981',
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {panel.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* Profile Menu Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 5, mb: 2 }}>
        <PersonIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Profile Menu
        </Typography>
      </Box>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Consolidated Navigation:</strong> Settings, Inventory, and Profile are now accessible via a 
        dropdown menu attached to the user avatar in the top bar. This reduces toolbar clutter while keeping 
        these options easily accessible.
      </Alert>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {profileMenuItems.map((item) => {
          const Icon = item.icon
          return (
            <Grid item xs={12} sm={4} key={item.name}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: `${item.color}15` }}>
                    <Icon sx={{ color: item.color, fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Key Principles */}
      <Typography variant="h5" gutterBottom>
        Design Principles
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#8b5cf6' }}>
              🎯 Fixed UI Shell
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The entire app maintains a fixed viewport; only the primary content area scrolls. 
              This maintains persistent access to navigation and game UI elements.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#3b82f6' }}>
              📐 Contextual Panels
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Right-side panels slide in on demand, providing quick access to quests, chat, and notes 
              without leaving the current content. Only one panel open at a time.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#10b981' }}>
              🖱️ Quick Access
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Important action buttons (Quests, Chat, Notes) are positioned at the bottom of the left 
              navigation for easy reach, keeping them visible throughout the session.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#f59e0b' }}>
              👤 Unified Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Profile, Inventory, and Settings are consolidated under the avatar dropdown menu, 
              reducing top-bar clutter while maintaining accessibility.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
