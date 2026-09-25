import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Collapse,
  Divider,
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsIcon from '@mui/icons-material/Settings';
import { lightColors, EMOJI_OPTIONS } from '../constants';
import type { EditorConfiguration, EmojiUsage } from '../types';

interface ConfigurationPanelProps {
  config: EditorConfiguration;
  onConfigChange: (config: EditorConfiguration) => void;
}

export function ConfigurationPanel({ config, onConfigChange }: ConfigurationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleGuidelineToggle = (guidelineId: string) => {
    const updatedGuidelines = config.guidelines.map(g => 
      g.id === guidelineId ? { ...g, enabled: !g.enabled } : g
    );
    onConfigChange({ ...config, guidelines: updatedGuidelines });
  };

  const handleEmojiChange = (emoji: EmojiUsage) => {
    onConfigChange({ ...config, emojiUsage: emoji });
  };

  const enabledCount = config.guidelines.filter(g => g.enabled).length;

  return (
    <Paper 
      sx={{ 
        bgcolor: lightColors.paper, 
        border: `1px solid ${lightColors.border}`,
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
              Content Guidelines
            </Typography>
            <Typography variant="caption" color={lightColors.text.secondary}>
              {enabledCount} active • {config.emojiUsage} emojis
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
          {/* Guidelines */}
          <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
            CONTENT GUIDELINES
          </Typography>
          <FormGroup sx={{ mb: 2 }}>
            {config.guidelines.map((guideline) => (
              <FormControlLabel
                key={guideline.id}
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
                  <Box>
                    <Typography variant="body2" color={lightColors.text.primary}>
                      {guideline.label}
                    </Typography>
                    <Typography variant="caption" color={lightColors.text.secondary}>
                      {guideline.description}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: 'flex-start', mb: 0.5 }}
              />
            ))}
          </FormGroup>

          <Divider sx={{ my: 2, borderColor: lightColors.border }} />

          {/* Emoji Usage */}
          <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
            EMOJI USAGE
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {EMOJI_OPTIONS.map((option) => {
              const isSelected = config.emojiUsage === option.value;
              return (
                <Paper
                  key={option.value}
                  sx={{
                    p: 1.5,
                    cursor: 'pointer',
                    textAlign: 'center',
                    flex: 1,
                    border: `2px solid ${isSelected ? lightColors.primary : lightColors.border}`,
                    bgcolor: isSelected ? `${lightColors.primary}11` : lightColors.paper,
                    '&:hover': {
                      borderColor: lightColors.primary,
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
              );
            })}
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}
