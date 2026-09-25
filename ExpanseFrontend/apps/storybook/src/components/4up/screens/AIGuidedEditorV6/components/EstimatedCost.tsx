import { Box, Typography, Paper, Chip, Divider, Tooltip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TokenIcon from '@mui/icons-material/Token';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { lightColors, calculateCost, CONTENT_TYPES } from '../constants';
import type { Layer, ContentTypeId, FeedbackOptions } from '../types';

interface EstimatedCostProps {
  layers: Layer[];
  contentType: ContentTypeId;
  feedbackOptions: FeedbackOptions;
  showBreakdown?: boolean;
}

export function EstimatedCost({ 
  layers, 
  contentType, 
  feedbackOptions,
  showBreakdown = true 
}: EstimatedCostProps) {
  const feedbackFlags = {
    themeAlignment: feedbackOptions.enableThemeAlignment,
    audienceReview: feedbackOptions.enableAudienceReview,
    painPointAnalysis: feedbackOptions.enablePainPointAnalysis,
    toneAnalysis: feedbackOptions.enableToneAnalysis,
    goalAlignment: feedbackOptions.enableGoalAlignment,
  };

  const { totalCost, totalTokens, breakdown } = calculateCost(layers, contentType, feedbackFlags);
  
  const contentTypeData = CONTENT_TYPES.find(t => t.id === contentType);
  
  // Estimate time based on tokens (rough estimate: 50 tokens/second)
  const estimatedSeconds = Math.ceil(totalTokens / 50);
  const estimatedTime = estimatedSeconds < 60 
    ? `~${estimatedSeconds}s` 
    : `~${Math.ceil(estimatedSeconds / 60)}m`;

  const enabledLayersCount = layers.filter(l => l.enabled).length;
  const feedbackCount = Object.values(feedbackFlags).filter(Boolean).length;

  return (
    <Paper sx={{ p: 2, bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AttachMoneyIcon sx={{ color: lightColors.primary }} />
        <Typography variant="subtitle2" fontWeight={600} color={lightColors.text.primary}>
          Estimated Cost
        </Typography>
      </Box>

      {/* Summary Stats */}
      <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
        <Tooltip title="Estimated API cost">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={700} color={lightColors.primary}>
              ${totalCost.toFixed(3)}
            </Typography>
            <Typography variant="caption" color={lightColors.text.secondary}>
              Total Cost
            </Typography>
          </Box>
        </Tooltip>
        
        <Tooltip title="Total tokens to be processed">
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TokenIcon sx={{ fontSize: 16, color: lightColors.text.secondary }} />
              <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>
                {totalTokens.toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="caption" color={lightColors.text.secondary}>
              Tokens
            </Typography>
          </Box>
        </Tooltip>

        <Tooltip title="Estimated processing time">
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 16, color: lightColors.text.secondary }} />
              <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>
                {estimatedTime}
              </Typography>
            </Box>
            <Typography variant="caption" color={lightColors.text.secondary}>
              Time
            </Typography>
          </Box>
        </Tooltip>
      </Box>

      {/* Factors Summary */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Chip 
          label={`${contentTypeData?.icon} ${contentTypeData?.label} (${contentTypeData?.baseCost}x)`}
          size="small"
          sx={{ bgcolor: lightColors.primaryLight, color: lightColors.primary }}
        />
        <Chip 
          label={`${enabledLayersCount} layers`}
          size="small"
          sx={{ bgcolor: lightColors.paperHover }}
        />
        {feedbackCount > 0 && (
          <Chip 
            label={`${feedbackCount} feedback options`}
            size="small"
            sx={{ bgcolor: lightColors.paperHover }}
          />
        )}
      </Box>

      {showBreakdown && breakdown.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
            COST BREAKDOWN
          </Typography>
          
          <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
            {breakdown.map((item, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  py: 0.75,
                  borderBottom: index < breakdown.length - 1 ? `1px solid ${lightColors.border}` : 'none',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color={lightColors.text.primary}>
                    {item.label}
                  </Typography>
                  <Typography variant="caption" color={lightColors.text.muted}>
                    {item.tokens.toLocaleString()} tokens
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                  ${item.cost.toFixed(4)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Cost visualization */}
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color={lightColors.text.secondary}>
                Cost Distribution
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', height: 8, borderRadius: 1, overflow: 'hidden' }}>
              {breakdown.map((item, index) => {
                const percentage = (item.cost / totalCost) * 100;
                const colors = [
                  lightColors.primary,
                  lightColors.secondary,
                  lightColors.success,
                  lightColors.warning,
                  lightColors.info,
                ];
                return (
                  <Tooltip key={index} title={`${item.label}: $${item.cost.toFixed(4)} (${percentage.toFixed(1)}%)`}>
                    <Box
                      sx={{
                        width: `${percentage}%`,
                        bgcolor: colors[index % colors.length],
                        transition: 'width 0.3s',
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}
