"use client";

/**
 * ProfileControls — the small persisted display preferences for this surface.
 *
 * Three of these exist because the right answer wasn't obvious up front and is
 * easier to judge live than in the abstract: nav shape, attribute treatment and
 * density all depend on how they sit next to each other at a given width. They
 * are cheap to keep, and each remembers its own choice.
 *
 * `usePersistedChoice` is deliberately effect-based: reading `localStorage`
 * during render would hydrate-mismatch, and writes are best-effort because
 * Safari private mode throws.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { DensityIcon, type BrandIconProps } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";

export function usePersistedChoice<T extends string>(
  key: string,
  fallback: T,
  allowed: readonly T[],
): [T, (v: T) => void] {
  const [value, setValue] = React.useState<T>(fallback);

  React.useEffect(() => {
    try {
      const v = window.localStorage.getItem(key) as T | null;
      if (v && allowed.includes(v)) setValue(v);
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
    // `allowed` is a module-level constant at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = React.useCallback(
    (v: T) => {
      setValue(v);
      try {
        window.localStorage.setItem(key, v);
      } catch {
        /* ignored */
      }
    },
    [key],
  );

  return [value, set];
}

/** A pill that cycles through its options, showing the current one. */
export function CycleControl<T extends string>({
  label,
  value,
  options,
  accent,
  Icon,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  accent: string;
  Icon?: React.ComponentType<BrandIconProps>;
  onChange: (v: T) => void;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const next = options[(options.indexOf(value) + 1) % options.length];

  return (
    <Tooltip title={`${label}: ${value} — click for ${next}`} arrow>
      <Stack
        role="button"
        tabIndex={0}
        aria-label={`${label}, currently ${value}. Activate for ${next}.`}
        onClick={() => onChange(next)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(next);
          }
        }}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
          px: 0.9,
          py: 0.3,
          borderRadius: 999,
          cursor: "pointer",
          flexShrink: 0,
          border: "1px solid",
          borderColor: alpha(accent, 0.35),
          bgcolor: alpha(accent, 0.07),
          "&:hover": { bgcolor: alpha(accent, 0.13), borderColor: alpha(accent, 0.55) },
          "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
        }}
      >
        {Icon && <Box component={Icon} size={12} sx={{ color: ink }} />}
        <Typography
          sx={{
            fontSize: 9.5,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: ink,
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

export { DensityIcon };
