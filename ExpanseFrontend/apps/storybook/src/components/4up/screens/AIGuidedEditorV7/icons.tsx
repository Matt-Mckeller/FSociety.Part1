import { Box, Typography } from '@mui/material';
import type { ReactNode, SVGProps } from 'react';
import { eyeColors } from './theme';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...rest }: IconProps) {
  const { size: _s, ...svgProps } = { size, ...rest };
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    ...svgProps,
  };
}

export function IconBack(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H6" />
      <path d="M11 7l-5 5 5 5" />
    </svg>
  );
}

export function IconSave(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 4h10l2 2v14H6V4z" />
      <path d="M9 4v4h7" />
      <path d="M9 16h6" />
    </svg>
  );
}

export function IconGenerate(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

export function IconProfile(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="9" r="3.25" />
      <path d="M5.5 19c1.4-2.8 3.7-4.2 6.5-4.2S17.1 16.2 18.5 19" />
    </svg>
  );
}

export function IconPanel(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="5" width="15" height="14" rx="2" />
      <path d="M4.5 10h15" />
      <path d="M10.5 10v9" />
    </svg>
  );
}

export function IconScore(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8.5v4l2.25 2.25" />
    </svg>
  );
}

export function IconExplore(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M10.2 10.2l4.6-1.5-1.5 4.6-4.6 1.5 1.5-4.6z" />
    </svg>
  );
}

export function IconActions(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 7h10" />
      <path d="M5 12h14" />
      <path d="M5 17h8" />
    </svg>
  );
}

export function IconLayer(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5l7 3.5L12 12 5 8.5 12 5z" />
      <path d="M5 12.5L12 16l7-3.5" />
      <path d="M5 16l7 3.5L19 16" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 10l5 5 5-5" />
    </svg>
  );
}

export function IconChevronUp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 14l5-5 5 5" />
    </svg>
  );
}

export function IconPost(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

export function IconCarousel(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="7" y="6" width="10" height="12" rx="1.5" />
      <path d="M4 8v8M20 8v8" />
    </svg>
  );
}

export function IconThread(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 6h8v4H8zM8 14h8v4H8z" />
      <path d="M10 10v4" />
    </svg>
  );
}

export function IconArticle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 5h12v14H6z" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  );
}

export function IconVideo(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="7" width="12" height="10" rx="1.5" />
      <path d="M16 10l4-2v8l-4-2z" />
    </svg>
  );
}

export function IconReel(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="8" y="4" width="8" height="16" rx="2" />
      <path d="M10 8h4M10 16h4" />
    </svg>
  );
}

export function IconStory(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconNewsletter(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16v10H4z" />
      <path d="M4 8l8 5 8-5" />
    </svg>
  );
}

export function IconAd(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 18V8l7-3 7 3v10" />
      <path d="M9 18v-5h6v5" />
    </svg>
  );
}

export function MonoLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: 11,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        color: eyeColors.text.muted,
        letterSpacing: 0.3,
      }}
    >
      {children}
    </Typography>
  );
}

export function IconBadge({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 1,
        color: active ? eyeColors.accent : eyeColors.text.secondary,
        bgcolor: active ? eyeColors.accentSoft : 'transparent',
      }}
    >
      {children}
    </Box>
  );
}
