import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
  IconButton,
  Collapse,
  Avatar,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { lightColors, getScoreColor } from '../constants';
import type { ThemeAlignment } from '../types';
import { ScoreIndicator } from './ScoreIndicator';

interface ThemeAlignmentSectionProps {
  themes: ThemeAlignment[];
  viewMode: 'simple' | 'advanced';
}

export function ThemeAlignmentSection({ themes, viewMode }: ThemeAlignmentSectionProps) {
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);
  
  // Separate and sort themes
  const coreThemes = themes
    .filter(t => t.themeType === 'core')
    .sort((a, b) => b.alignmentScore - a.alignmentScore)
    .slice(0, 3);
    
  const secondaryThemes = themes
    .filter(t => t.themeType === 'secondary')
    .sort((a, b) => b.alignmentScore - a.alignmentScore)
    .slice(0, 3);

  if (viewMode === 'simple') {
    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: lightColors.text.primary, fontWeight: 600 }}>
          🎨 Theme & Purpose Alignment
        </Typography>
        
        {/* Core Themes */}
        <Typography variant="caption" sx={{ display: 'block', mb: 1, color: lightColors.text.secondary, fontWeight: 600 }}>
          CORE THEMES (Top 3)
        </Typography>
        <Stack spacing={1} sx={{ mb: 2 }}>
          {coreThemes.map((theme) => (
            <Box 
              key={theme.themeName}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                p: 1.5,
                bgcolor: `${lightColors.primary}11`,
                borderRadius: 1,
                border: `1px solid ${lightColors.primary}33`,
              }}
            >
              <Avatar 
                sx={{ 
                  width: 28, 
                  height: 28, 
                  bgcolor: lightColors.primary,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <StarIcon sx={{ fontSize: 16 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                  {theme.themeName}
                </Typography>
              </Box>
              <Chip 
                label={`${theme.alignmentScore}%`} 
                size="small"
                sx={{ 
                  bgcolor: `${getScoreColor(theme.alignmentScore)}22`,
                  color: getScoreColor(theme.alignmentScore),
                  fontWeight: 700,
                }}
              />
            </Box>
          ))}
        </Stack>

        {/* Secondary Themes */}
        <Typography variant="caption" sx={{ display: 'block', mb: 1, color: lightColors.text.secondary, fontWeight: 600 }}>
          SECONDARY THEMES (Top 3)
        </Typography>
        <Stack spacing={1}>
          {secondaryThemes.map((theme) => (
            <Box 
              key={theme.themeName}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                p: 1.5,
                bgcolor: `${lightColors.secondary}11`,
                borderRadius: 1,
                border: `1px solid ${lightColors.secondary}33`,
              }}
            >
              <Avatar 
                sx={{ 
                  width: 28, 
                  height: 28, 
                  bgcolor: lightColors.secondary,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <StarBorderIcon sx={{ fontSize: 16 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                  {theme.themeName}
                </Typography>
              </Box>
              <Chip 
                label={`${theme.alignmentScore}%`} 
                size="small"
                sx={{ 
                  bgcolor: `${getScoreColor(theme.alignmentScore)}22`,
                  color: getScoreColor(theme.alignmentScore),
                  fontWeight: 700,
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    );
  }

  // Advanced view
  const renderThemeList = (themeList: ThemeAlignment[], type: 'core' | 'secondary') => (
    <Stack spacing={1.5}>
      {themeList.map((theme) => {
        const isExpanded = expandedTheme === theme.themeName;
        return (
          <Paper 
            key={theme.themeName}
            sx={{ 
              overflow: 'hidden',
              border: `1px solid ${type === 'core' ? lightColors.primary : lightColors.secondary}44`,
              bgcolor: lightColors.paper,
            }}
          >
            <Box 
              sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 1.5,
                cursor: 'pointer',
                '&:hover': { bgcolor: lightColors.paperHover },
              }}
              onClick={() => setExpandedTheme(isExpanded ? null : theme.themeName)}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: type === 'core' ? lightColors.primary : lightColors.secondary,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {type === 'core' ? <StarIcon sx={{ fontSize: 18 }} /> : <StarBorderIcon sx={{ fontSize: 18 }} />}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="subtitle2" fontWeight={600} color={lightColors.text.primary}>
                    {theme.themeName}
                  </Typography>
                  <Chip 
                    label={`${Math.round(theme.weight * 100)}% weight`} 
                    size="small"
                    sx={{ 
                      height: 20,
                      fontSize: '0.65rem',
                      bgcolor: lightColors.paperHover,
                      color: lightColors.text.secondary,
                    }}
                  />
                </Box>
                <Typography variant="body2" color={lightColors.text.secondary}>
                  {theme.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                  {theme.keywords.slice(0, 4).map(kw => (
                    <Chip 
                      key={kw} 
                      label={kw} 
                      size="small" 
                      sx={{ 
                        height: 22, 
                        fontSize: '0.7rem',
                        bgcolor: `${type === 'core' ? lightColors.primary : lightColors.secondary}11`,
                        color: type === 'core' ? lightColors.primary : lightColors.secondary,
                      }} 
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScoreIndicator score={theme.alignmentScore} size="small" showLabel={false} />
                <IconButton size="small">
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
            </Box>

            <Collapse in={isExpanded}>
              <Divider sx={{ borderColor: lightColors.border }} />
              <Box sx={{ p: 2, bgcolor: lightColors.paperHover }}>
                {/* How theme was used in content */}
                <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                  HOW THIS THEME APPEARS IN YOUR CONTENT:
                </Typography>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {theme.usageInContent.map((excerpt, i) => (
                    <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.success}11`, border: `1px solid ${lightColors.success}33` }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <CheckCircleIcon sx={{ color: lightColors.success, fontSize: 16, mt: 0.25 }} />
                        <Typography variant="body2" color={lightColors.text.primary} sx={{ fontStyle: 'italic' }}>
                          "{excerpt}"
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>

                {/* Suggestions to strengthen theme */}
                {theme.suggestions.length > 0 && (
                  <>
                    <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                      SUGGESTIONS TO STRENGTHEN:
                    </Typography>
                    <Stack spacing={1}>
                      {theme.suggestions.map((suggestion, i) => (
                        <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.info}11`, border: `1px solid ${lightColors.info}33` }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <LightbulbIcon sx={{ color: lightColors.info, fontSize: 16, mt: 0.25 }} />
                            <Typography variant="body2" color={lightColors.text.primary}>
                              {suggestion}
                            </Typography>
                          </Box>
                        </Paper>
                      ))}
                    </Stack>
                  </>
                )}
              </Box>
            </Collapse>
          </Paper>
        );
      })}
    </Stack>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: lightColors.text.primary, fontWeight: 600 }}>
          🎨 Theme & Purpose Alignment
        </Typography>
        <Tooltip title="How well your content reflects your company's core themes and purpose">
          <InfoOutlinedIcon sx={{ fontSize: 16, color: lightColors.text.secondary }} />
        </Tooltip>
      </Box>

      {/* Core Themes */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <StarIcon sx={{ color: lightColors.primary, fontSize: 18 }} />
          <Typography variant="caption" fontWeight={700} color={lightColors.primary}>
            CORE THEMES (Top 3)
          </Typography>
        </Box>
        {renderThemeList(coreThemes, 'core')}
      </Box>

      {/* Secondary Themes */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <StarBorderIcon sx={{ color: lightColors.secondary, fontSize: 18 }} />
          <Typography variant="caption" fontWeight={700} color={lightColors.secondary}>
            SECONDARY THEMES (Top 3)
          </Typography>
        </Box>
        {renderThemeList(secondaryThemes, 'secondary')}
      </Box>
    </Box>
  );
}
