import { Chip, alpha, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PendingIcon from '@mui/icons-material/Pending';
import type { StatusLevel, OverallStatus } from '../../../types/plans';

interface StatusBadgeProps {
  status: StatusLevel | OverallStatus;
  size?: 'small' | 'medium';
}

export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  const theme = useTheme();
  
  const getConfig = () => {
    switch (status) {
      case 'done':
      case 'Done':
        return {
          icon: <CheckCircleIcon />,
          color: theme.palette.success.main,
          bgcolor: alpha(theme.palette.success.main, 0.1),
          label: 'Done',
        };
      case 'partial':
      case 'Partial':
      case 'Data + UI':
        return {
          icon: <PendingIcon />,
          color: theme.palette.warning.main,
          bgcolor: alpha(theme.palette.warning.main, 0.1),
          label: status === 'partial' ? 'Partial' : status,
        };
      case 'Data Only':
        return {
          icon: <PendingIcon />,
          color: theme.palette.info.main,
          bgcolor: alpha(theme.palette.info.main, 0.1),
          label: 'Data Only',
        };
      case 'planned':
      case 'Planned':
        return {
          icon: <RadioButtonUncheckedIcon />,
          color: theme.palette.text.secondary,
          bgcolor: alpha(theme.palette.text.secondary, 0.08),
          label: 'Planned',
        };
      default:
        return {
          icon: <RadioButtonUncheckedIcon />,
          color: theme.palette.text.secondary,
          bgcolor: alpha(theme.palette.text.secondary, 0.08),
          label: status,
        };
    }
  };

  const config = getConfig();

  return (
    <Chip
      size={size}
      label={config.label}
      sx={{
        bgcolor: config.bgcolor,
        color: config.color,
        fontWeight: 600,
        fontSize: '0.75rem',
        border: 'none',
        '& .MuiChip-icon': {
          color: config.color,
        },
      }}
    />
  );
}

interface StatusIndicatorProps {
  status: StatusLevel;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  switch (status) {
    case 'done':
      return <span title="Done">✅</span>;
    case 'partial':
      return <span title="Partial">🟡</span>;
    case 'planned':
      return <span title="Planned">🔴</span>;
    default:
      return null;
  }
}
