import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  IconButton,
  Collapse,
  Button,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import { lightColors } from '../constants';
import type { ContentVariation, ContentTypeId } from '../types';
import { ScoreIndicator } from './ScoreIndicator';

interface VariationsPanelProps {
  variations: ContentVariation[];
  selectedVariationId?: string;
  onSelectVariation: (id: string) => void;
  onEditVariation: (id: string) => void;
  onCopyVariation: (id: string) => void;
  onRegenerateVariation: (id: string) => void;
  contentType: ContentTypeId;
  isGenerating?: boolean;
}

export function VariationsPanel({
  variations,
  selectedVariationId,
  onSelectVariation,
  onEditVariation,
  onCopyVariation,
  onRegenerateVariation,
  // contentType can be used for platform-specific styling
  isGenerating = false,
}: VariationsPanelProps) {
  const [expandedVariations, setExpandedVariations] = useState<Set<string>>(new Set([variations[0]?.id]));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedVariations((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopy = (id: string) => {
    onCopyVariation(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getVariationLabel = (index: number, variation: ContentVariation): string => {
    const labels = ['Original', 'Alternative A', 'Alternative B', 'Alternative C', 'Alternative D'];
    if (variation.label) return variation.label;
    return labels[index] || `Variation ${index + 1}`;
  };

  return (
    <Card sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}` }}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>
            Content Variations
          </Typography>
          <Chip 
            label={`${variations.length} versions`} 
            size="small" 
            sx={{ bgcolor: lightColors.primaryLight, color: lightColors.primary }} 
          />
        </Box>

        {/* Variations List */}
        <Stack spacing={1.5}>
          {variations.map((variation, index) => {
            const isExpanded = expandedVariations.has(variation.id);
            const isSelected = selectedVariationId === variation.id;
            
            return (
              <Paper
                key={variation.id}
                sx={{
                  border: `2px solid ${isSelected ? lightColors.primary : lightColors.border}`,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  bgcolor: isSelected ? `${lightColors.primary}08` : lightColors.paper,
                  '&:hover': {
                    borderColor: isSelected ? lightColors.primary : lightColors.borderHover,
                  },
                }}
              >
                {/* Variation Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: lightColors.paperHover },
                  }}
                  onClick={() => toggleExpanded(variation.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {isSelected && (
                      <CheckCircleIcon sx={{ color: lightColors.primary, fontSize: 20 }} />
                    )}
                    <Box>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight={600} 
                        color={lightColors.text.primary}
                      >
                        {getVariationLabel(index, variation)}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                        {variation.focusArea && (
                          <Chip 
                            label={variation.focusArea} 
                            size="small" 
                            sx={{ 
                              height: 18, 
                              fontSize: '0.65rem',
                              bgcolor: lightColors.secondaryLight,
                              color: lightColors.secondary,
                            }} 
                          />
                        )}
                        {variation.style && (
                          <Chip 
                            label={variation.style} 
                            size="small" 
                            sx={{ 
                              height: 18, 
                              fontSize: '0.65rem',
                              bgcolor: lightColors.primaryLight,
                              color: lightColors.primary,
                            }} 
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScoreIndicator score={variation.score || 75} size="small" showLabel={false} />
                    <IconButton size="small">
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                </Box>

                {/* Variation Content */}
                <Collapse in={isExpanded}>
                  <Box sx={{ px: 1.5, pb: 1.5 }}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: lightColors.paperHover,
                        borderRadius: 1,
                        mb: 1.5,
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        color={lightColors.text.primary}
                        sx={{ 
                          whiteSpace: 'pre-wrap',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {variation.content}
                      </Typography>
                    </Paper>

                    {/* Stats */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                      <Typography variant="caption" color={lightColors.text.secondary}>
                        {variation.content.split(/\s+/).length} words
                      </Typography>
                      <Typography variant="caption" color={lightColors.text.secondary}>
                        {variation.content.length} characters
                      </Typography>
                      {variation.generatedAt && (
                        <Typography variant="caption" color={lightColors.text.secondary}>
                          Generated {new Date(variation.generatedAt).toLocaleTimeString()}
                        </Typography>
                      )}
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {!isSelected && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => onSelectVariation(variation.id)}
                          sx={{
                            bgcolor: lightColors.primary,
                            textTransform: 'none',
                            '&:hover': { bgcolor: lightColors.primaryHover },
                          }}
                        >
                          Use This
                        </Button>
                      )}
                      <Tooltip title={copiedId === variation.id ? 'Copied!' : 'Copy'}>
                        <IconButton
                          size="small"
                          onClick={() => handleCopy(variation.id)}
                          sx={{ 
                            color: copiedId === variation.id ? lightColors.success : lightColors.text.secondary 
                          }}
                        >
                          {copiedId === variation.id ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => onEditVariation(variation.id)}
                          sx={{ color: lightColors.text.secondary }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Regenerate">
                        <IconButton
                          size="small"
                          onClick={() => onRegenerateVariation(variation.id)}
                          disabled={isGenerating}
                          sx={{ color: lightColors.text.secondary }}
                        >
                          <RefreshIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Collapse>
              </Paper>
            );
          })}
        </Stack>

        {/* Add Variation Button */}
        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            disabled={isGenerating || variations.length >= 5}
            sx={{
              borderStyle: 'dashed',
              borderColor: lightColors.border,
              color: lightColors.text.secondary,
              textTransform: 'none',
              '&:hover': {
                borderColor: lightColors.primary,
                bgcolor: lightColors.paperHover,
              },
            }}
          >
            + Generate New Variation
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
