import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export interface CallToActionProps {
  title: string;
  subtitle?: string;
  actionLabel: string;
  actionHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Title + optional subtitle + primary/secondary action buttons.
 * Pure content composition — wrap in a `<Section tone="accent">` for
 * page placement.
 */
export function CallToAction({
  title,
  subtitle,
  actionLabel,
  actionHref,
  secondaryLabel,
  secondaryHref,
}: CallToActionProps) {
  return (
    <Stack spacing={3} sx={{
      alignItems: "center"
    }}>
      <Typography variant="h2">{title}</Typography>
      {subtitle && (
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontWeight: 400,
            maxWidth: 640
          }}>
          {subtitle}
        </Typography>
      )}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
        <Button component={Link} href={actionHref} variant="contained" size="large">
          {actionLabel}
        </Button>
        {secondaryLabel && secondaryHref && (
          <Button component={Link} href={secondaryHref} variant="outlined" size="large">
            {secondaryLabel}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
