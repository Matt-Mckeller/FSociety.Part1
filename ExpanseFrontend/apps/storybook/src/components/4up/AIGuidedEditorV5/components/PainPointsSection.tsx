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
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { lightColors, getScoreColor } from '../constants';
import type { PainPointAlignment } from '../types';
import { ScoreIndicator } from './ScoreIndicator';

interface PainPointsSectionProps {
  painPoints: PainPointAlignment[];
  viewMode: 'simple' | 'advanced';
}

export function PainPointsSection({ painPoints, viewMode }: PainPointsSectionProps) {
  const [expandedPoint, setExpandedPoint] = useState<string | null>(null);
  
  // Get top 3 pain points by alignment score
  const topPainPoints = [...painPoints]
    .sort((a, b) => b.alignmentScore - a.alignmentScore)
    .slice(0, 3);

  if (viewMode === 'simple') {
    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: lightColors.text.primary, fontWeight: 600 }}>
          🎯 Pain Point Alignment (Top 3)
        </Typography>
        <Stack spacing={1}>
          {topPainPoints.map((pp, index) => (
            <Box 
              key={pp.painPoint}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                p: 1.5,
                bgcolor: `${getScoreColor(pp.alignmentScore)}11`,
                borderRadius: 1,
                border: `1px solid ${getScoreColor(pp.alignmentScore)}33`,
              }}
            >
              <Avatar 
                sx={{ 
                  width: 28, 
                  height: 28, 
                  bgcolor: getScoreColor(pp.alignmentScore),
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                  {pp.painPoint}
                </Typography>
              </Box>
              <Chip 
                label={`${pp.alignmentScore}%`} 
                size="small"
                sx={{ 
                  bgcolor: `${getScoreColor(pp.alignmentScore)}22`,
                  color: getScoreColor(pp.alignmentScore),
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
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: lightColors.text.primary, fontWeight: 600 }}>
          🎯 Pain Point Alignment
        </Typography>
        <Tooltip title="How well your content addresses your audience's key pain points">
          <InfoOutlinedIcon sx={{ fontSize: 16, color: lightColors.text.secondary }} />
        </Tooltip>
      </Box>

      <Paper sx={{ p: 2, mb: 2, bgcolor: lightColors.paperHover, border: `1px solid ${lightColors.border}` }}>
        <Typography variant="caption" color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
          Pain points are problems your audience faces. Addressing them builds trust and relevance.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {topPainPoints.map((pp, i) => (
            <ScoreIndicator 
              key={pp.painPoint}
              score={pp.alignmentScore} 
              label={`#${i + 1}`} 
              size="small" 
            />
          ))}
        </Box>
      </Paper>

      <Stack spacing={1.5}>
        {topPainPoints.map((pp, index) => {
          const isExpanded = expandedPoint === pp.painPoint;
          return (
            <Paper 
              key={pp.painPoint}
              sx={{ 
                overflow: 'hidden',
                border: `1px solid ${getScoreColor(pp.alignmentScore)}44`,
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
                onClick={() => setExpandedPoint(isExpanded ? null : pp.painPoint)}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: getScoreColor(pp.alignmentScore),
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600} color={lightColors.text.primary}>
                    {pp.painPoint}
                  </Typography>
                  <Typography variant="body2" color={lightColors.text.secondary} sx={{ mt: 0.5 }}>
                    {pp.description}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScoreIndicator score={pp.alignmentScore} size="small" showLabel={false} />
                  <IconButton size="small">
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={isExpanded}>
                <Divider sx={{ borderColor: lightColors.border }} />
                <Box sx={{ p: 2, bgcolor: lightColors.paperHover }}>
                  {/* Content excerpts that address this pain point */}
                  <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                    HOW YOUR CONTENT ADDRESSES THIS:
                  </Typography>
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {pp.contentExcerpts.map((excerpt, i) => (
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

                  {/* Suggestions to improve */}
                  {pp.suggestions.length > 0 && (
                    <>
                      <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                        SUGGESTIONS TO IMPROVE:
                      </Typography>
                      <Stack spacing={1}>
                        {pp.suggestions.map((suggestion, i) => (
                          <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.warning}11`, border: `1px solid ${lightColors.warning}33` }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                              <WarningIcon sx={{ color: lightColors.warning, fontSize: 16, mt: 0.25 }} />
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

      {/* Additional pain points (not in top 3) */}
      {painPoints.length > 3 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color={lightColors.text.secondary}>
            +{painPoints.length - 3} more pain points with lower alignment
          </Typography>
        </Box>
      )}
    </Box>
  );
}
