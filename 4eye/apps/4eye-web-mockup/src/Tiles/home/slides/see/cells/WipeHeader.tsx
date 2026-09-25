"use client";

import { Box, Stack, Typography } from "@mui/material";
import { ProfilePhoto } from "@expanse/character/2d";

/**
 * WipeHeader — the "Without 4eye → With 4eye" header strip displayed atop the
 * Day-to-Day and Memory & Growth panels. Heads sit above their labels; the
 * center column anchors the strip with a larger 4eye ProfilePhoto.
 */
export function WipeHeader() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "end",
        columnGap: { xs: 2, sm: 3 },
        mb: { xs: 3, md: 4 },
        px: { xs: 0.5, sm: 1 },
      }}
    >
      <Stack spacing={1.25} sx={{
        alignItems: "center"
      }}>
        <ProfilePhoto
          variant="tech"
          eyeDesign="scanner"
          size={64}
          zoom="head"
          background="transparent"
          shadow={false}
          eyeGlowColor="#ef4444"
          secondaryColor="#f87171"
          showStatusLEDs
          statusLEDCount={3}
        />
        <Typography
          sx={{
            letterSpacing: "0.04em",
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "text.disabled",
          }}
        >
          Without 4eye
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: { xs: 2.5, sm: 3 },
        }}
      >
        <ProfilePhoto
          variant="sleek"
          eyeDesign="aperture"
          size={96}
          zoom="head"
          background="transparent"
          shadow={false}
          showForeheadMark
        />
      </Box>
      <Stack spacing={1.25} sx={{
        alignItems: "center"
      }}>
        <ProfilePhoto
          variant="sleek"
          eyeDesign="aperture"
          size={64}
          zoom="head"
          background="transparent"
          shadow={false}
          showForeheadMark
        />
        <Typography
          sx={{
            letterSpacing: "0.04em",
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "primary.main",
          }}
        >
          With 4eye
        </Typography>
      </Stack>
    </Box>
  );
}
