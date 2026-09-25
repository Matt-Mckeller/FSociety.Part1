import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  IconButton,
  Collapse,
  Tooltip,
  Avatar,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsIcon from '@mui/icons-material/Settings';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import { lightColors, VARIATION_STYLES, EMOJI_OPTIONS } from '../constants';
import type { PromptConfig, VariationStyle, EmojiUsage, AudienceSelection } from '../types';

interface PromptConfigPanelProps {
  config: PromptConfig;
  onConfigChange: (config: PromptConfig) => void;
}

function getAudienceIcon(type: AudienceSelection['type']) {
  switch (type) {
    case 'persona': return <PersonIcon sx={{ fontSize: 14 }} />;
    case 'segment': return <GroupIcon sx={{ fontSize: 14 }} />;
    case 'demographic': return <PeopleIcon sx={{ fontSize: 14 }} />;
  }
}

export function PromptConfigPanel({ config, onConfigChange }: PromptConfigPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleGuidelineToggle = (guidelineId: string) => {
    const updatedGuidelines = config.guidelines.map(g => 
      g.id === guidelineId ? { ...g, enabled: !g.enabled } : g
    );
    onConfigChange({ ...config, guidelines: updatedGuidelines });
  };

  const handleStyleToggle = (styleId: VariationStyle) => {
    const currentStyles = config.variationStyles;
    let updatedStyles: VariationStyle[];
    
    if (currentStyles.includes(styleId)) {
      // Remove if already selected (but keep at least one)
      updatedStyles = currentStyles.filter(s => s !== styleId);
      if (updatedStyles.length === 0) updatedStyles = ['ai-default'];
    } else {
      // Add to selection
      updatedStyles = [...currentStyles, styleId];
    }
    
    onConfigChange({ ...config, variationStyles: updatedStyles });
  };

  const handleEmojiChange = (emoji: EmojiUsage) => {
    onConfigChange({ ...config, emojiUsage: emoji });
  };

  const handleAudienceToggle = (audienceId: string) => {
    const updatedAudiences = config.audienceSelections.map(a =>
      a.id === audienceId ? { ...a, selected: !a.selected } : a
    );
    onConfigChange({ ...config, audienceSelections: updatedAudiences });
  };

  const handleGenericAudienceToggle = () => {
    onConfigChange({ 
      ...config, 
      useGenericAudience: !config.useGenericAudience,
      // Clear audience selections if switching to generic
      audienceSelections: !config.useGenericAudience 
        ? config.audienceSelections.map(a => ({ ...a, selected: false }))
        : config.audienceSelections
    });
  };

  const selectedAudienceCount = config.audienceSelections.filter(a => a.selected).length;

  return (
    <Paper 
      sx={{ 
        mb: 2, 
        bgcolor: lightColors.paper, 
        border: `1px solid ${lightColors.border}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer',
          bgcolor: isExpanded ? lightColors.paperHover : 'transparent',
          '&:hover': { bgcolor: lightColors.paperHover },
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: lightColors.primary }}>
            <SettingsIcon sx={{ fontSize: 18 }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} color={lightColors.text.primary}>
              Prompt Configuration
            </Typography>
            <Typography variant="caption" color={lightColors.text.secondary}>
              {config.guidelines.filter(g => g.enabled).length} guidelines • {config.variationStyles.length} styles • {config.emojiUsage} emojis
            </Typography>
          </Box>
        </Box>
        <IconButton size="small">
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={isExpanded}>
        <Divider sx={{ borderColor: lightColors.border }} />
        <Box sx={{ p: 2 }}>
          {/* Guidelines Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" fontWeight={700} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
              CONTENT GUIDELINES
            </Typography>
            <FormGroup>
              <Stack spacing={0.5}>
                {config.guidelines.map((guideline) => (
                  <Tooltip key={guideline.id} title={guideline.description} placement="right">
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={guideline.enabled}
                          onChange={() => handleGuidelineToggle(guideline.id)}
                          size="small"
                          sx={{ 
                            color: lightColors.text.muted,
                            '&.Mui-checked': { color: lightColors.primary },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" color={lightColors.text.primary}>
                          {guideline.label}
                        </Typography>
                      }
                    />
                  </Tooltip>
                ))}
              </Stack>
            </FormGroup>
          </Box>

          <Divider sx={{ mb: 2, borderColor: lightColors.border }} />

          {/* Data Stacking (Layered Generation) */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LayersIcon sx={{ color: lightColors.secondary, fontSize: 18 }} />
              <Typography variant="caption" fontWeight={700} color={lightColors.text.secondary}>
                DATA STACKING
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch 
                  checked={config.enableDataStacking}
                  onChange={() => onConfigChange({ ...config, enableDataStacking: !config.enableDataStacking })}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: lightColors.secondary },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: lightColors.secondary },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" color={lightColors.text.primary}>
                    Enable layered generation
                  </Typography>
                  <Typography variant="caption" color={lightColors.text.secondary}>
                    Creates compressed depth through layered generation and review phases
                  </Typography>
                </Box>
              }
            />
          </Box>

          <Divider sx={{ mb: 2, borderColor: lightColors.border }} />

          {/* Audience Reviews Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GroupIcon sx={{ color: lightColors.info, fontSize: 18 }} />
                <Typography variant="caption" fontWeight={700} color={lightColors.text.secondary}>
                  AUDIENCE REVIEWS
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch 
                    checked={config.enableAudienceReviews}
                    onChange={() => onConfigChange({ ...config, enableAudienceReviews: !config.enableAudienceReviews })}
                    size="small"
                  />
                }
                label={<Typography variant="caption" color={lightColors.text.secondary}>Enable</Typography>}
                sx={{ m: 0 }}
              />
            </Box>
            
            {config.enableAudienceReviews && (
              <Box sx={{ pl: 1 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={config.useGenericAudience}
                      onChange={handleGenericAudienceToggle}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" color={lightColors.text.primary}>
                      Use generic audience (AI will infer)
                    </Typography>
                  }
                  sx={{ mb: 1 }}
                />
                
                {!config.useGenericAudience && (
                  <>
                    <Typography variant="caption" color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                      Select specific audiences for targeted reviews:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                      {config.audienceSelections.map((audience) => (
                        <Chip
                          key={audience.id}
                          icon={<Box sx={{ display: 'flex' }}>{getAudienceIcon(audience.type)}</Box>}
                          label={audience.name}
                          size="small"
                          onClick={() => handleAudienceToggle(audience.id)}
                          sx={{
                            cursor: 'pointer',
                            bgcolor: audience.selected ? lightColors.info : lightColors.paper,
                            color: audience.selected ? 'white' : lightColors.text.primary,
                            border: `1px solid ${audience.selected ? lightColors.info : lightColors.border}`,
                            '& .MuiChip-icon': {
                              color: audience.selected ? 'white' : lightColors.text.secondary,
                            },
                            '&:hover': {
                              bgcolor: audience.selected ? lightColors.info : lightColors.paperHover,
                            },
                          }}
                        />
                      ))}
                    </Box>
                    {selectedAudienceCount > 0 && (
                      <Typography variant="caption" color={lightColors.info} sx={{ display: 'block', mt: 1 }}>
                        {selectedAudienceCount} audience{selectedAudienceCount > 1 ? 's' : ''} selected for review
                      </Typography>
                    )}
                  </>
                )}
              </Box>
            )}
          </Box>

          <Divider sx={{ mb: 2, borderColor: lightColors.border }} />

          {/* Variation Styles */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" fontWeight={700} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
              VARIATION STYLES
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {VARIATION_STYLES.map((style) => {
                const isSelected = config.variationStyles.includes(style.id);
                return (
                  <Tooltip key={style.id} title={style.description}>
                    <Chip
                      icon={<Box sx={{ display: 'flex', color: 'inherit' }}>{style.icon}</Box>}
                      label={style.label}
                      size="small"
                      onClick={() => handleStyleToggle(style.id)}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: isSelected ? lightColors.secondary : lightColors.paper,
                        color: isSelected ? 'white' : lightColors.text.primary,
                        border: `1px solid ${isSelected ? lightColors.secondary : lightColors.border}`,
                        '& .MuiChip-icon': {
                          color: isSelected ? 'white' : lightColors.text.secondary,
                        },
                        '&:hover': {
                          bgcolor: isSelected ? lightColors.secondary : lightColors.paperHover,
                        },
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </Box>

          <Divider sx={{ mb: 2, borderColor: lightColors.border }} />

          {/* Emoji Usage */}
          <Box>
            <Typography variant="caption" fontWeight={700} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
              EMOJI USAGE
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {EMOJI_OPTIONS.map((option) => {
                const isSelected = config.emojiUsage === option.value;
                return (
                  <Tooltip key={option.value} title={option.description}>
                    <Paper
                      sx={{
                        p: 1.5,
                        cursor: 'pointer',
                        textAlign: 'center',
                        minWidth: 70,
                        border: `2px solid ${isSelected ? lightColors.primary : lightColors.border}`,
                        bgcolor: isSelected ? `${lightColors.primary}11` : lightColors.paper,
                        '&:hover': {
                          borderColor: lightColors.primary,
                          bgcolor: isSelected ? `${lightColors.primary}11` : lightColors.paperHover,
                        },
                      }}
                      onClick={() => handleEmojiChange(option.value)}
                    >
                      <Typography sx={{ fontSize: '1.25rem', mb: 0.5 }}>{option.icon}</Typography>
                      <Typography 
                        variant="caption" 
                        fontWeight={isSelected ? 600 : 400}
                        color={isSelected ? lightColors.primary : lightColors.text.primary}
                      >
                        {option.label}
                      </Typography>
                    </Paper>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}
