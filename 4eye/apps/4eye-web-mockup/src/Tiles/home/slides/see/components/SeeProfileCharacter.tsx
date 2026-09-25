"use client";

import { createTheme, useTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ProfilePhoto } from "@expanse/character/2d";

/**
 * PromiseCharacter — a blue ProfilePhoto (act1) used inside the Configure
 * glimpse to represent the user's 4eye presence on the See/Promise page.
 */
export function SeeProfileCharacter({ size = 120 }: { size?: number }) {
  const base = useTheme();
  const blueTheme = createTheme(base, {
    components: {
      ExpanseCharacter: {
        variants: {
          default: {
            headColor: "#93c5fd",
            limbColor: "#93c5fd",
            bodyColor: "#1d4ed8",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={blueTheme}>
      <ProfilePhoto
        variant="friendly"
        eyeGlowColor="#3b82f6"
        secondaryColor="#60a5fa"
        size={size}
        zoom="torso"
        background="transparent"
        shadow={false}
        showForeheadMark
      />
    </ThemeProvider>
  );
}
