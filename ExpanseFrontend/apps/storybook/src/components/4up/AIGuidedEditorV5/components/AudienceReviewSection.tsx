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
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { lightColors, getScoreColor } from '../constants';
import type { AudienceReview } from '../types';
import { ScoreIndicator } from './ScoreIndicator';

interface AudienceReviewSectionProps {
  reviews: AudienceReview[];
  viewMode: 'simple' | 'advanced';
}

function getAudienceIcon(type: AudienceReview['audienceType']) {
  switch (type) {
    case 'persona': return <PersonIcon sx={{ fontSize: 18 }} />;
    case 'segment': return <GroupIcon sx={{ fontSize: 18 }} />;
    case 'demographic': return <PeopleIcon sx={{ fontSize: 18 }} />;
  }
}

function getAudienceColor(type: AudienceReview['audienceType']) {
  switch (type) {
    case 'persona': return lightColors.primary;
    case 'segment': return lightColors.secondary;
    case 'demographic': return lightColors.info;
  }
}

export function AudienceReviewSection({ reviews, viewMode }: AudienceReviewSectionProps) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  
  // Sort by appeal score
  const sortedReviews = [...reviews].sort((a, b) => b.appealScore - a.appealScore);

  if (viewMode === 'simple') {
    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: lightColors.text.primary, fontWeight: 600 }}>
          👥 Audience Appeal Reviews
        </Typography>
        <Stack spacing={1}>
          {sortedReviews.map((review) => (
            <Box 
              key={review.audienceId}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                p: 1.5,
                bgcolor: `${getAudienceColor(review.audienceType)}11`,
                borderRadius: 1,
                border: `1px solid ${getAudienceColor(review.audienceType)}33`,
              }}
            >
              <Avatar 
                sx={{ 
                  width: 28, 
                  height: 28, 
                  bgcolor: getAudienceColor(review.audienceType),
                }}
              >
                {getAudienceIcon(review.audienceType)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                  {review.audienceName}
                </Typography>
                <Typography variant="caption" color={lightColors.text.secondary}>
                  {review.audienceType}
                </Typography>
              </Box>
              <Chip 
                label={`${review.appealScore}%`} 
                size="small"
                sx={{ 
                  bgcolor: `${getScoreColor(review.appealScore)}22`,
                  color: getScoreColor(review.appealScore),
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
          👥 Audience Appeal Reviews
        </Typography>
        <Tooltip title="How different audience segments might respond to your content">
          <InfoOutlinedIcon sx={{ fontSize: 16, color: lightColors.text.secondary }} />
        </Tooltip>
      </Box>

      <Paper sx={{ p: 2, mb: 2, bgcolor: lightColors.paperHover, border: `1px solid ${lightColors.border}` }}>
        <Typography variant="caption" color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
          Each audience type has unique preferences and pain points. This analysis shows how your content resonates with each.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {sortedReviews.slice(0, 4).map((review) => (
            <ScoreIndicator 
              key={review.audienceId}
              score={review.appealScore} 
              label={review.audienceName.split(' ')[0]} 
              size="small" 
            />
          ))}
        </Box>
      </Paper>

      <Stack spacing={1.5}>
        {sortedReviews.map((review) => {
          const isExpanded = expandedReview === review.audienceId;
          const color = getAudienceColor(review.audienceType);
          
          return (
            <Paper 
              key={review.audienceId}
              sx={{ 
                overflow: 'hidden',
                border: `1px solid ${color}44`,
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
                onClick={() => setExpandedReview(isExpanded ? null : review.audienceId)}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: color,
                  }}
                >
                  {getAudienceIcon(review.audienceType)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={600} color={lightColors.text.primary}>
                      {review.audienceName}
                    </Typography>
                    <Chip 
                      label={review.audienceType} 
                      size="small"
                      sx={{ 
                        height: 20,
                        fontSize: '0.65rem',
                        bgcolor: `${color}22`,
                        color: color,
                      }}
                    />
                  </Box>
                  {/* Sample reaction preview */}
                  {review.sampleReaction && (
                    <Typography variant="body2" color={lightColors.text.secondary} sx={{ fontStyle: 'italic' }}>
                      "{review.sampleReaction.substring(0, 60)}..."
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScoreIndicator score={review.appealScore} size="small" showLabel={false} />
                  <IconButton size="small">
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={isExpanded}>
                <Divider sx={{ borderColor: lightColors.border }} />
                <Box sx={{ p: 2, bgcolor: lightColors.paperHover }}>
                  {/* Sample Reaction */}
                  {review.sampleReaction && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                        LIKELY REACTION:
                      </Typography>
                      <Paper sx={{ p: 1.5, bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}` }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <FormatQuoteIcon sx={{ color: lightColors.text.muted, fontSize: 20 }} />
                          <Typography variant="body2" color={lightColors.text.primary} sx={{ fontStyle: 'italic' }}>
                            "{review.sampleReaction}"
                          </Typography>
                        </Box>
                      </Paper>
                    </Box>
                  )}

                  {/* Resonance Factors */}
                  <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                    WHAT RESONATES:
                  </Typography>
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {review.resonanceFactors.map((factor, i) => (
                      <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.success}11`, border: `1px solid ${lightColors.success}33` }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <CheckCircleIcon sx={{ color: lightColors.success, fontSize: 16, mt: 0.25 }} />
                          <Typography variant="body2" color={lightColors.text.primary}>
                            {factor}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>

                  {/* Concerns */}
                  {review.concerns.length > 0 && (
                    <>
                      <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                        POTENTIAL CONCERNS:
                      </Typography>
                      <Stack spacing={1} sx={{ mb: 2 }}>
                        {review.concerns.map((concern, i) => (
                          <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.warning}11`, border: `1px solid ${lightColors.warning}33` }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                              <WarningIcon sx={{ color: lightColors.warning, fontSize: 16, mt: 0.25 }} />
                              <Typography variant="body2" color={lightColors.text.primary}>
                                {concern}
                              </Typography>
                            </Box>
                          </Paper>
                        ))}
                      </Stack>
                    </>
                  )}

                  {/* Recommendations */}
                  {review.recommendations.length > 0 && (
                    <>
                      <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                        RECOMMENDATIONS:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {review.recommendations.map((rec, i) => (
                          <Chip 
                            key={i} 
                            label={rec} 
                            size="small" 
                            sx={{ 
                              bgcolor: `${lightColors.info}22`,
                              color: lightColors.info,
                            }} 
                          />
                        ))}
                      </Box>
                    </>
                  )}
                </Box>
              </Collapse>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}
