import { Box, Chip, Tooltip, Typography } from '@mui/material';
import { CONTENT_TYPES } from '../../AIGuidedEditorV6/constants';
import type { ContentTypeId } from '../../AIGuidedEditorV6/types';
import { eyeColors, eyeRadii } from '../theme';

interface ContentTypeChipsProps {
  selectedType: ContentTypeId;
  onSelectType: (type: ContentTypeId) => void;
  accent?: string;
}

/** Label-only outlined content-type chips for V7 (same CONTENT_TYPES data as V6). */
export function ContentTypeChips({
  selectedType,
  onSelectType,
  accent = eyeColors.accent,
}: ContentTypeChipsProps) {
  const selected = CONTENT_TYPES.find((t) => t.id === selectedType);

  return (
    <Box
      sx={{
        p: 1.75,
        bgcolor: eyeColors.paper,
        border: `1px solid ${eyeColors.border}`,
        borderRadius: eyeRadii.md,
      }}
    >
      <Typography
        sx={{
          mb: 1,
          fontSize: 13,
          fontWeight: 700,
          color: eyeColors.text.primary,
        }}
      >
        Content type
      </Typography>

      <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap', mb: selected ? 1.25 : 0 }}>
        {CONTENT_TYPES.map((type) => {
          const active = type.id === selectedType;
          return (
            <Tooltip key={type.id} title={type.description} arrow>
              <Chip
                label={type.label}
                onClick={() => onSelectType(type.id)}
                size="small"
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  height: 30,
                  fontWeight: 600,
                  bgcolor: active ? accent : 'transparent',
                  color: active ? '#fff' : eyeColors.text.primary,
                  borderColor: active ? accent : eyeColors.border,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  '&:hover': {
                    bgcolor: active ? eyeColors.accentHover : eyeColors.paperHover,
                    borderColor: active ? eyeColors.accentHover : eyeColors.borderHover,
                  },
                }}
              />
            </Tooltip>
          );
        })}
      </Box>

      {selected && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 1,
            pt: 1.25,
            borderTop: `1px solid ${eyeColors.border}`,
          }}
        >
          <Meta label="Words" value={selected.wordLimit ? `~${selected.wordLimit}` : '—'} />
          <Meta label="Layers" value={`${selected.recommendedLayers.length}`} />
          <Meta label="Base cost" value={`${selected.baseCost}x`} />
        </Box>
      )}
    </Box>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.4, color: eyeColors.text.muted, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 650, color: eyeColors.text.primary }}>{value}</Typography>
    </Box>
  );
}
