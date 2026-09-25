import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Paper,
  IconButton,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  contentTypes,
  platforms,
  campaigns,
  contentPillars,
  toneOptions,
  goalOptions,
  type ContentType,
  type Platform,
} from '../../../mocks/4up/mockData';

interface CreateScreenProps {
  onBack?: () => void;
  onGenerate?: (config: GenerationConfig) => void;
}

export interface GenerationConfig {
  contentType: ContentType | null;
  platforms: Platform[];
  campaign: string | null;
  pillar: string | null;
  topic: string;
  tone: string;
  goal: string;
  additionalContext: string;
}

const steps = ['Content Type', 'Platforms', 'Details', 'Generate'];

export function CreateScreen({ onBack, onGenerate }: CreateScreenProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [config, setConfig] = useState<GenerationConfig>({
    contentType: null,
    platforms: [],
    campaign: null,
    pillar: null,
    topic: '',
    tone: 'Professional',
    goal: 'Drive engagement',
    additionalContext: '',
  });

  const handleContentTypeSelect = (type: ContentType) => {
    setConfig((prev) => ({ ...prev, contentType: type }));
    setActiveStep(1);
  };

  const handlePlatformToggle = (platform: Platform) => {
    setConfig((prev) => ({
      ...prev,
      platforms: prev.platforms.find((p) => p.id === platform.id)
        ? prev.platforms.filter((p) => p.id !== platform.id)
        : [...prev.platforms, platform],
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleGenerate = () => {
    onGenerate?.(config);
  };

  const canProceedToDetails = config.platforms.length > 0;
  const canGenerate = config.topic.trim().length > 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {onBack && (
          <IconButton onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Create Content
        </Typography>
        <Tooltip title="Generation Settings">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 0: Content Type Selection */}
      {activeStep === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            What type of content do you want to create?
          </Typography>
          <Grid container spacing={2}>
            {contentTypes.map((type) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={type.id}>
                <Card
                  sx={{
                    height: '100%',
                    border: config.contentType?.id === type.id ? 2 : 1,
                    borderColor:
                      config.contentType?.id === type.id
                        ? 'primary.main'
                        : 'divider',
                  }}
                >
                  <CardActionArea
                    onClick={() => handleContentTypeSelect(type)}
                    sx={{ height: '100%', p: 2 }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ mb: 1 }}>
                        {type.icon}
                      </Typography>
                      <Typography variant="h6">{type.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {type.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Step 1: Platform Selection */}
      {activeStep === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Select target platforms
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose one or more platforms. Content will be optimized for each.
          </Typography>
          <Grid container spacing={2}>
            {platforms.map((platform) => {
              const isSelected = config.platforms.find(
                (p) => p.id === platform.id
              );
              return (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={platform.id}>
                  <Card
                    sx={{
                      border: isSelected ? 2 : 1,
                      borderColor: isSelected ? platform.color : 'divider',
                      transition: 'all 0.2s',
                    }}
                  >
                    <CardActionArea
                      onClick={() => handlePlatformToggle(platform)}
                      sx={{ p: 2 }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          {platform.icon}
                        </Typography>
                        <Typography variant="subtitle1">
                          {platform.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Selected platforms chips */}
          {config.platforms.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Selected ({config.platforms.length}):
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {config.platforms.map((p) => (
                  <Chip
                    key={p.id}
                    label={p.name}
                    onDelete={() => handlePlatformToggle(p)}
                    sx={{ bgcolor: p.color, color: 'white' }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canProceedToDetails}
            >
              Continue
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 2: Details */}
      {activeStep === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Content Details
          </Typography>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
              {/* Topic/Idea */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Topic or Idea"
                  placeholder="What do you want to create content about?"
                  value={config.topic}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, topic: e.target.value }))
                  }
                  multiline
                  rows={3}
                  required
                />
              </Grid>

              {/* Campaign */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Campaign (optional)</InputLabel>
                  <Select
                    value={config.campaign || ''}
                    label="Campaign (optional)"
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        campaign: e.target.value || null,
                      }))
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {campaigns.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              bgcolor: c.color,
                            }}
                          />
                          {c.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Content Pillar */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Content Pillar (optional)</InputLabel>
                  <Select
                    value={config.pillar || ''}
                    label="Content Pillar (optional)"
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        pillar: e.target.value || null,
                      }))
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {contentPillars.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              bgcolor: p.color,
                            }}
                          />
                          {p.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Tone */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Autocomplete
                  freeSolo
                  options={toneOptions}
                  value={config.tone}
                  onChange={(_, value) =>
                    setConfig((prev) => ({
                      ...prev,
                      tone: value || 'Professional',
                    }))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tone" />
                  )}
                />
              </Grid>

              {/* Goal */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Autocomplete
                  freeSolo
                  options={goalOptions}
                  value={config.goal}
                  onChange={(_, value) =>
                    setConfig((prev) => ({
                      ...prev,
                      goal: value || 'Drive engagement',
                    }))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Primary Goal" />
                  )}
                />
              </Grid>

              {/* Additional Context */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Additional Context (optional)"
                  placeholder="Any specific instructions, hashtags, mentions, links to include..."
                  value={config.additionalContext}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      additionalContext: e.target.value,
                    }))
                  }
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canGenerate}
            >
              Continue
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 3: Review & Generate */}
      {activeStep === 3 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Review & Generate
          </Typography>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Content Type
                </Typography>
                <Typography variant="body1">
                  {config.contentType?.icon} {config.contentType?.label}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Platforms
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {config.platforms.map((p) => (
                    <Chip
                      key={p.id}
                      label={p.name}
                      size="small"
                      sx={{ bgcolor: p.color, color: 'white' }}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid size={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Topic
                </Typography>
                <Typography variant="body1">{config.topic}</Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tone
                </Typography>
                <Typography variant="body1">{config.tone}</Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Goal
                </Typography>
                <Typography variant="body1">{config.goal}</Typography>
              </Grid>

              {config.campaign && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Campaign
                  </Typography>
                  <Typography variant="body1">
                    {campaigns.find((c) => c.id === config.campaign)?.name}
                  </Typography>
                </Grid>
              )}

              {config.pillar && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Content Pillar
                  </Typography>
                  <Typography variant="body1">
                    {contentPillars.find((p) => p.id === config.pillar)?.name}
                  </Typography>
                </Grid>
              )}

              {config.additionalContext && (
                <Grid size={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Additional Context
                  </Typography>
                  <Typography variant="body1">
                    {config.additionalContext}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              startIcon={<AutoAwesomeIcon />}
              onClick={handleGenerate}
              size="large"
              sx={{ px: 4 }}
            >
              Generate Content
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
