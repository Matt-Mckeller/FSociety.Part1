import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export interface FeatureCard {
  title: string;
  description?: string;
  href?: string;
}

export interface FeatureCardGridProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: FeatureCard[];
  columns?: { xs?: number; sm?: number; md?: number };
}

/**
 * Responsive grid of feature cards with optional eyebrow/title/subtitle
 * header and optional per-card link target.
 *
 * Pure content composition — wrap in a `<Section maxWidth="lg">` for
 * page placement.
 */
export function FeatureCardGrid({
  eyebrow,
  title,
  subtitle,
  items,
  columns = { xs: 12, sm: 6, md: 4 },
}: FeatureCardGridProps) {
  return (
    <Stack spacing={4} sx={{
      alignItems: "center"
    }}>
      <Stack
        spacing={1.5}
        sx={{
          alignItems: "center",
          maxWidth: 720
        }}>
        {eyebrow && (
          <Typography
            variant="overline"
            color="primary"
            sx={{ letterSpacing: "0.2em", fontWeight: 600 }}
          >
            {eyebrow}
          </Typography>
        )}
        {title && <Typography variant="h2">{title}</Typography>}
        {subtitle && (
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400
            }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      <Grid container spacing={3} sx={{
        justifyContent: "center"
      }}>
        {items.map((item) => {
          const card = (
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                {item.description && (
                  <Typography variant="body2" sx={{
                    color: "text.secondary"
                  }}>
                    {item.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          );
          return (
            <Grid key={item.title} size={{ xs: columns.xs, sm: columns.sm, md: columns.md }}>
              {item.href ? (
                <CardActionArea
                  component={Link}
                  href={item.href}
                  sx={{ height: "100%", borderRadius: 2 }}
                >
                  {card}
                </CardActionArea>
              ) : (
                card
              )}
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
