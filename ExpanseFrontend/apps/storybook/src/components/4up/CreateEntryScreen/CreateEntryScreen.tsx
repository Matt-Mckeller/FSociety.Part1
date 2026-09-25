import { Box, Typography, Card, CardContent, CardActionArea, Grid, Chip, IconButton, Tooltip, Avatar, alpha } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AssistantIcon from '@mui/icons-material/Assistant';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ScheduleIcon from '@mui/icons-material/Schedule';

export interface CreateEntryOption {
  id: 'preset' | 'ai-guided' | 'full-manual' | 'scheduled';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
  recommended?: boolean;
}

export interface CreateEntryScreenProps {
  onBack?: () => void;
  onSelectOption?: (optionId: CreateEntryOption['id']) => void;
}

const createEntryOptions: CreateEntryOption[] = [
  {
    id: 'preset',
    title: 'Preset Prompts',
    description: 'Pre-configured templates with goals, audiences, and data sources already selected. Get AI-generated content recommendations or create with one click.',
    icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
    color: '#90caf9',
    badge: 'Recommended',
    recommended: true,
  },
  {
    id: 'ai-guided',
    title: 'AI Guided Manual Entry',
    description: 'Write your own content and get real-time AI feedback on goal alignment, audience fit, and optimization suggestions.',
    icon: <AssistantIcon sx={{ fontSize: 40 }} />,
    color: '#ce93d8',
  },
  {
    id: 'full-manual',
    title: 'Full Manual Entry',
    description: 'Complete creative freedom. Write and publish without AI assistance or preset configurations.',
    icon: <EditNoteIcon sx={{ fontSize: 40 }} />,
    color: '#ffb74d',
  },
  {
    id: 'scheduled',
    title: 'Auto Scheduled',
    description: 'Set up automated content generation. AI creates and schedules content based on your preferences.',
    icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
    color: '#66bb6a',
    badge: 'Beta',
  },
];

export function CreateEntryScreen({ onBack, onSelectOption }: CreateEntryScreenProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        {onBack && (
          <IconButton onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Create Content</Typography>
          <Typography variant="body2" color="text.secondary">
            Choose how you want to start creating
          </Typography>
        </Box>
        <Tooltip title="Settings">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3}>
        {createEntryOptions.map((option) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={option.id}>
            <Card
              sx={{
                height: '100%',
                position: 'relative',
                transition: 'all 0.3s ease',
                border: 2,
                borderColor: option.recommended ? option.color : 'transparent',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 40px ${alpha(option.color, 0.3)}`,
                  borderColor: option.color,
                },
              }}
            >
              {option.badge && (
                <Chip
                  label={option.badge}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: option.recommended ? option.color : 'warning.main',
                    color: option.recommended ? 'background.default' : 'white',
                    fontWeight: 600,
                  }}
                />
              )}
              <CardActionArea
                onClick={() => onSelectOption?.(option.id)}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent sx={{ textAlign: 'center', pt: option.badge ? 4 : 2 }}>
                  <Avatar
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: alpha(option.color, 0.15),
                      color: option.color,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {option.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {option.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
