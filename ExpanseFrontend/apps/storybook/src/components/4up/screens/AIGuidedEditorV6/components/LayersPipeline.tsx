import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Switch,
  Collapse,
  Divider,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { lightColors, LAYER_CATEGORY_COLORS, CONTENT_TYPES } from '../constants';
import type { Layer, ContentTypeId } from '../types';

interface LayersPipelineProps {
  layers: Layer[];
  onLayersChange: (layers: Layer[]) => void;
  contentType?: ContentTypeId;
  showRecommendations?: boolean;
}

export function LayersPipeline({ 
  layers, 
  onLayersChange, 
  contentType,
  showRecommendations = true 
}: LayersPipelineProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const contentTypeData = contentType ? CONTENT_TYPES.find(t => t.id === contentType) : null;
  const recommendedLayerIds = contentTypeData?.recommendedLayers || [];

  const enabledLayers = layers.filter(l => l.enabled);
  const disabledLayers = layers.filter(l => !l.enabled && !l.required);

  const handleToggleLayer = (layerId: string) => {
    const updatedLayers = layers.map(layer => 
      layer.id === layerId && !layer.required 
        ? { ...layer, enabled: !layer.enabled }
        : layer
    );
    onLayersChange(updatedLayers);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    // Find the actual indices in the full layers array
    const enabledLayersList = layers.filter(l => l.enabled);
    const draggedLayer = enabledLayersList[draggedIndex];
    const targetLayer = enabledLayersList[index];
    
    if (draggedLayer.required || targetLayer.required) return;
    
    // Reorder
    const newLayers = [...layers];
    const draggedIdx = newLayers.findIndex(l => l.id === draggedLayer.id);
    const targetIdx = newLayers.findIndex(l => l.id === targetLayer.id);
    
    const [removed] = newLayers.splice(draggedIdx, 1);
    newLayers.splice(targetIdx, 0, removed);
    
    onLayersChange(newLayers);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const getCategoryColors = (category: string) => {
    return LAYER_CATEGORY_COLORS[category] || LAYER_CATEGORY_COLORS.generation;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: lightColors.text.primary, fontWeight: 600 }}>
          🔄 Processing Pipeline
        </Typography>
        <Typography variant="caption" color={lightColors.text.secondary}>
          {enabledLayers.length} active layers
        </Typography>
      </Box>

      {/* Visual Pipeline Flow */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: lightColors.paperHover, border: `1px solid ${lightColors.border}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {enabledLayers.map((layer, index) => {
            const colors = getCategoryColors(layer.category);
            const isRecommended = recommendedLayerIds.includes(layer.id);
            return (
              <Box key={layer.id} sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={layer.description}>
                  <Chip
                    label={`${layer.icon} ${layer.shortLabel}`}
                    size="small"
                    sx={{
                      bgcolor: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      fontWeight: 600,
                      ...(isRecommended && showRecommendations && {
                        boxShadow: `0 0 0 2px ${lightColors.success}44`,
                      }),
                    }}
                  />
                </Tooltip>
                {index < enabledLayers.length - 1 && (
                  <ArrowForwardIcon sx={{ color: lightColors.text.muted, mx: 0.5, fontSize: 16 }} />
                )}
              </Box>
            );
          })}
        </Box>
        <Typography variant="caption" color={lightColors.text.muted} sx={{ display: 'block', mt: 1 }}>
          Content flows through each layer in order. Drag to reorder.
        </Typography>
      </Paper>

      {/* Active Layers (Reorderable) */}
      <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
        ACTIVE LAYERS
      </Typography>
      <Box sx={{ mb: 3 }}>
        {enabledLayers.map((layer, index) => {
          const colors = getCategoryColors(layer.category);
          const isExpanded = expandedLayer === layer.id;
          const isRecommended = recommendedLayerIds.includes(layer.id);
          const isDragging = draggedIndex === index;

          return (
            <Paper
              key={layer.id}
              draggable={!layer.required}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              sx={{
                mb: 1,
                overflow: 'hidden',
                border: `1px solid ${colors.border}`,
                bgcolor: isDragging ? `${colors.bg}` : lightColors.paper,
                opacity: isDragging ? 0.8 : 1,
                cursor: layer.required ? 'default' : 'grab',
                transition: 'all 0.2s',
                '&:hover': { bgcolor: colors.bg },
              }}
            >
              <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                {!layer.required && (
                  <DragIndicatorIcon sx={{ color: lightColors.text.muted, fontSize: 20 }} />
                )}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: colors.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
                >
                  {layer.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                      {layer.label}
                    </Typography>
                    {layer.required && (
                      <Chip label="Required" size="small" sx={{ height: 18, fontSize: '0.65rem' }} />
                    )}
                    {isRecommended && showRecommendations && (
                      <Chip 
                        label="Recommended" 
                        size="small" 
                        sx={{ 
                          height: 18, 
                          fontSize: '0.65rem',
                          bgcolor: lightColors.successLight,
                          color: lightColors.success,
                        }} 
                      />
                    )}
                  </Box>
                  <Typography variant="caption" color={lightColors.text.secondary}>
                    ~{layer.estimatedTokens} tokens • ${(layer.estimatedTokens * 0.00003).toFixed(4)}
                  </Typography>
                </Box>
                {layer.config && (
                  <IconButton size="small" onClick={() => setExpandedLayer(isExpanded ? null : layer.id)}>
                    {isExpanded ? <ExpandLessIcon /> : <SettingsIcon sx={{ fontSize: 18 }} />}
                  </IconButton>
                )}
                {!layer.required && (
                  <Switch
                    checked={layer.enabled}
                    onChange={() => handleToggleLayer(layer.id)}
                    size="small"
                  />
                )}
              </Box>

              {layer.config && (
                <Collapse in={isExpanded}>
                  <Divider />
                  <Box sx={{ p: 2, bgcolor: lightColors.paperHover }}>
                    <Typography variant="caption" color={lightColors.text.secondary}>
                      Layer configuration options will appear here based on layer type.
                    </Typography>
                  </Box>
                </Collapse>
              )}
            </Paper>
          );
        })}
      </Box>

      {/* Available Layers */}
      {disabledLayers.length > 0 && (
        <>
          <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
            AVAILABLE LAYERS
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            {disabledLayers.map((layer) => {
              const colors = getCategoryColors(layer.category);
              const isRecommended = recommendedLayerIds.includes(layer.id);
              return (
                <Tooltip key={layer.id} title={layer.description}>
                  <Chip
                    icon={<Box sx={{ pl: 0.5 }}>{layer.icon}</Box>}
                    label={layer.shortLabel}
                    onClick={() => handleToggleLayer(layer.id)}
                    size="small"
                    sx={{
                      cursor: 'pointer',
                      bgcolor: lightColors.paper,
                      color: lightColors.text.primary,
                      border: `1px dashed ${colors.border}`,
                      '&:hover': {
                        bgcolor: colors.bg,
                        borderStyle: 'solid',
                      },
                      ...(isRecommended && showRecommendations && {
                        borderColor: lightColors.success,
                        bgcolor: `${lightColors.success}11`,
                      }),
                    }}
                  />
                </Tooltip>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
}
