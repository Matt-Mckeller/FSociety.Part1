import { TileContainer } from "@expanse/hud"
import { Box, Stack, Typography } from "@mui/material";
import { Section, Hero } from "@4eye/web/components/layout";
import { hero, sections } from "./content";

export default function WhoTile() {
  return (
    <TileContainer mode="scroll">
      <Section id="hero" tone="accent">
        <Hero {...hero} />
      </Section>
      <Section id="story" align="start">
        <Stack spacing={3}>
          {sections.map(({ heading, body }) => (
            <Box key={heading}>
              <Typography variant="h5" component="h2" gutterBottom>
                {heading}
              </Typography>
              <Typography variant="body1">{body}</Typography>
            </Box>
          ))}
        </Stack>
      </Section>
    </TileContainer>
  );
}
