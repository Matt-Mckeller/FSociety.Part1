import { Typography, Paper, Box, Chip, Stack, Alert, Card, CardContent, Grid } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Link from 'next/link';

const muiThemes = [
  { name: 'Ocean Blue', color: '#1976d2' },
  { name: 'Forest Green', color: '#388e3c' },
  { name: 'Sunset Orange', color: '#f57c00' },
  { name: 'Royal Purple', color: '#7b1fa2' },
  { name: 'Midnight Dark', color: '#263238' },
  { name: 'Rose Pink', color: '#c2185b' },
];

const themeOptions = [
  {
    title: 'Light/Dark Mode',
    description: 'Toggle between light and dark theme variants',
    icons: [<LightModeIcon key="light" sx={{ color: '#ffc107' }} />, <DarkModeIcon key="dark" sx={{ color: '#5c6bc0' }} />],
  },
  {
    title: 'Color Palette Override',
    description: 'Customize primary, secondary, and accent colors',
    icons: [<ColorLensIcon key="color" sx={{ color: '#e91e63' }} />],
  },
  {
    title: 'Font Selection',
    description: 'Choose from available font families (accessibility consideration)',
    icons: [<TextFieldsIcon key="font" sx={{ color: '#00bcd4' }} />],
  },
  {
    title: 'Spacing & Density',
    description: 'Adjust UI density (compact, comfortable, spacious)',
    icons: [<ViewCompactIcon key="density" sx={{ color: '#9c27b0' }} />],
  },
];

const relatedFeatures = [
  { name: 'Decorative Items', href: '/docs/features/decorative' },
  { name: 'Unlockable Content', href: '/docs/features/unlockable' },
  { name: 'Presentation Mode', href: '/docs/features/presentation-mode' },
];

export default function ThemingPage() {
  return (
    <>
      {/* Header with gradient icon box */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #3f51b5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(156, 39, 176, 0.4)',
          }}
        >
          <PaletteIcon sx={{ fontSize: 36, color: 'white' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            Customization & Theming
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Make it yours — personalize colors, themes, and visual style
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture - enhanced */}
      <Paper
        sx={{
          p: 2.5,
          mb: 4,
          background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e8eaf6 100%)',
          borderLeft: '4px solid',
          borderImage: 'linear-gradient(180deg, #e91e63, #9c27b0, #3f51b5) 1',
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#7b1fa2' }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip
            label="Slide Engine"
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontWeight: 500 }}>
          React Context Dependencies:
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip
            label="ThemeContext"
            size="small"
            sx={{ bgcolor: '#e91e63', color: 'white', fontSize: '0.7rem', fontWeight: 500 }}
          />
          <Chip
            label="UserPreferencesContext"
            size="small"
            sx={{ bgcolor: '#9c27b0', color: 'white', fontSize: '0.7rem', fontWeight: 500 }}
          />
        </Stack>
        <Typography variant="caption" color="warning.main" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic' }}>
          Note: Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      {/* Color Selection with visual swatches */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Color Selection
      </Typography>
      <Typography variant="body2" paragraph color="text.secondary">
        User-customizable color choices for personalization:
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              height: '100%',
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #00bcd4, #4caf50) border-box',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
                    boxShadow: '0 2px 8px rgba(0, 188, 212, 0.4)',
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Accent Color</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                User's preferred accent color for UI highlights, buttons, and interactive elements
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              height: '100%',
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff7043, #ffca28) border-box',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ff7043 0%, #ffca28 100%)',
                    boxShadow: '0 2px 8px rgba(255, 112, 67, 0.4)',
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Profile Color</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Personal color used in avatar frames, badges, and profile decorations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* MUI Color Theme Selector with filled color chips */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        MUI Color Theme Selector
      </Typography>
      <Typography variant="body2" paragraph color="text.secondary">
        Users can select from multiple pre-built MUI color themes. Themes are swappable at runtime via MUI's ThemeProvider.
      </Typography>
      <Paper
        sx={{
          p: 3,
          mb: 4,
          bgcolor: 'grey.50',
          borderRadius: 3,
        }}
      >
        <Grid container spacing={2}>
          {muiThemes.map((theme) => (
            <Grid item xs={6} sm={4} md={2} key={theme.name}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px ${theme.color}40`,
                    borderColor: theme.color,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: theme.color,
                    boxShadow: `0 2px 8px ${theme.color}60`,
                  }}
                />
                <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'center' }}>
                  {theme.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                  {theme.color}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Theme Customization as feature cards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Theme Customization
      </Typography>
      <Typography variant="body2" paragraph color="text.secondary">
        Core theming capabilities:
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {themeOptions.map((option) => (
          <Grid item xs={12} sm={6} key={option.title}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      p: 1,
                      borderRadius: 1.5,
                      bgcolor: 'grey.100',
                    }}
                  >
                    {option.icons}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {option.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert severity="info" sx={{ mb: 4 }}>
        <strong>Persistence:</strong> Theme preferences are saved to the user profile and persist across sessions.
      </Alert>

      {/* Related Features */}
      <Paper
        sx={{
          p: 2.5,
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#1976d2' }}>
          Related Features
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {relatedFeatures.map((feature) => (
            <Link key={feature.name} href={feature.href} style={{ textDecoration: 'none' }}>
              <Chip
                label={feature.name}
                clickable
                sx={{
                  bgcolor: 'white',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: '#e3f2fd',
                  },
                }}
              />
            </Link>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
