import { Box, ButtonBase, Typography } from '@mui/material';
import { eyeColors, eyeRadii } from '../theme';
import { IconProfile } from '../icons';
import type { EditorProfile } from '../types';

interface ProfileChipProps {
  profile: EditorProfile;
  onClick?: () => void;
  compact?: boolean;
}

export function ProfileChip({ profile, onClick, compact }: ProfileChipProps) {
  const accent = profile.accent ?? eyeColors.accent;
  const initials =
    profile.initials ??
    profile.name
      .split(/\s+/)
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <ButtonBase
      onClick={onClick}
      disabled={!onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: compact ? 0.75 : 1,
        py: compact ? 0.4 : 0.6,
        borderRadius: eyeRadii.sm,
        border: `1px solid ${eyeColors.border}`,
        bgcolor: eyeColors.paper,
        textAlign: 'left',
        maxWidth: 220,
        '&:hover': onClick
          ? { borderColor: accent, bgcolor: eyeColors.paperHover }
          : undefined,
      }}
    >
      <Box
        sx={{
          width: compact ? 26 : 30,
          height: compact ? 26 : 30,
          borderRadius: '50%',
          bgcolor: accent,
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 700,
          overflow: 'hidden',
        }}
      >
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          initials || <IconProfile size={14} />
        )}
      </Box>
      {!compact && (
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: eyeColors.text.primary,
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {profile.name}
          </Typography>
          {profile.subtitle && (
            <Typography
              sx={{
                fontSize: 11,
                color: eyeColors.text.secondary,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {profile.subtitle}
            </Typography>
          )}
        </Box>
      )}
    </ButtonBase>
  );
}
