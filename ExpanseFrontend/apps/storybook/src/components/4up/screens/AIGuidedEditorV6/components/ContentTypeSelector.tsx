import { Box, Chip, Typography, Tooltip, Paper } from '@mui/material';
import { lightColors, CONTENT_TYPES } from '../constants';
import type { ContentTypeId } from '../types';

interface ContentTypeSelectorProps {
  selectedType: ContentTypeId;
  onSelectType: (type: ContentTypeId) => void;
  showDetails?: boolean;
}

export function ContentTypeSelector({ 
  selectedType, 
  onSelectType, 
  showDetails = true 
}: ContentTypeSelectorProps) {
  const selectedTypeData = CONTENT_TYPES.find(t => t.id === selectedType);

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1.5, color: lightColors.text.primary, fontWeight: 600 }}>
        📄 Content Type
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: showDetails ? 2 : 0 }}>
        {CONTENT_TYPES.map((type) => {
          const isSelected = selectedType === type.id;
          return (
            <Tooltip key={type.id} title={type.description} arrow>
              <Chip
                label={`${type.icon} ${type.label}`}
                onClick={() => onSelectType(type.id)}
                size="medium"
                sx={{
                  cursor: 'pointer',
                  bgcolor: isSelected ? lightColors.primary : lightColors.paper,
                  color: isSelected ? 'white' : lightColors.text.primary,
                  border: `2px solid ${isSelected ? lightColors.primary : lightColors.border}`,
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: isSelected ? lightColors.primaryHover : lightColors.paperHover,
                    borderColor: isSelected ? lightColors.primaryHover : lightColors.primary,
                  },
                }}
              />
            </Tooltip>
          );
        })}
      </Box>

      {showDetails && selectedTypeData && (
        <Paper sx={{ p: 2, bgcolor: lightColors.paperHover, border: `1px solid ${lightColors.border}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="h6">{selectedTypeData.icon}</Typography>
            <Box>
              <Typography variant="subtitle2" color={lightColors.text.primary} fontWeight={600}>
                {selectedTypeData.label}
              </Typography>
              <Typography variant="body2" color={lightColors.text.secondary}>
                {selectedTypeData.description}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3, mt: 1.5 }}>
            {selectedTypeData.wordLimit && (
              <Box>
                <Typography variant="caption" color={lightColors.text.muted}>Word Limit</Typography>
                <Typography variant="body2" color={lightColors.text.primary} fontWeight={600}>
                  ~{selectedTypeData.wordLimit.toLocaleString()} words
                </Typography>
              </Box>
            )}
            <Box>
              <Typography variant="caption" color={lightColors.text.muted}>Recommended Layers</Typography>
              <Typography variant="body2" color={lightColors.text.primary} fontWeight={600}>
                {selectedTypeData.recommendedLayers.length} layers
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color={lightColors.text.muted}>Base Cost</Typography>
              <Typography variant="body2" color={lightColors.text.primary} fontWeight={600}>
                {selectedTypeData.baseCost}x
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
