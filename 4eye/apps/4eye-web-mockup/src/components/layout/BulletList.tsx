import { Stack, Typography, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";

export interface BulletListItem {
  primary: string;
  secondary?: string;
}

export interface BulletListProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: (string | BulletListItem)[];
}

function normalize(item: string | BulletListItem): BulletListItem {
  return typeof item === "string" ? { primary: item } : item;
}

/**
 * Bulleted list block with optional eyebrow/title/subtitle header.
 * Pure content composition — wrap in a `<Section>` for page placement.
 */
export function BulletList({ eyebrow, title, subtitle, items }: BulletListProps) {
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
      <Stack spacing={2} sx={{ width: "100%", maxWidth: 640, textAlign: "left" }}>
        {items.map(normalize).map((item, i) => (
          <Stack key={i} direction="row" spacing={2} sx={{
            alignItems: "flex-start"
          }}>
            <Box sx={{ color: "primary.main", mt: "2px" }}>
              <CheckCircleOutlineIcon />
            </Box>
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.primary}
              </Typography>
              {item.secondary && (
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  {item.secondary}
                </Typography>
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
