import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button } from "@mui/material";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import { SceneStudioProvider, useOpenSceneStudio, useSceneStudio } from "./context/SceneStudioContext";
import { SceneStudioViewBody } from "./components/SceneStudioViewBody";

// ─── Decorator wraps stories in the required provider ─────────────────────────

function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <SceneStudioProvider>
      <Box sx={{ width: "100vw", height: "100vh", position: "relative", bgcolor: "background.default" }}>
        {children}
      </Box>
    </SceneStudioProvider>
  );
}

// ─── Trigger helper ───────────────────────────────────────────────────────────

function TriggerButton({ view }: { view?: "gallery" | "storyboard" }) {
  const open = useOpenSceneStudio();
  const { isOpen } = useSceneStudio();
  return (
    <Box sx={{ p: 4 }}>
      <Button
        variant="contained"
        startIcon={<MovieCreationRoundedIcon />}
        onClick={() => open(view)}
        disabled={isOpen}
      >
        Open Scene Studio {view ? `(${view})` : ""}
      </Button>
    </Box>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "scene-studio/SceneStudioOverlay",
  decorators: [
    (Story) => (
      <StudioShell>
        <Story />
      </StudioShell>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj;

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Gallery tab open — shows all 100 assets grouped by folder */
export const GalleryView: Story = {
  name: "Gallery — open",
  render: () => (
    <>
      <TriggerButton view="gallery" />
      <SceneStudioViewBody />
    </>
  ),
  play: async ({ canvasElement: _c }) => {
    // Auto-open on story load — click the trigger button
    const btn = document.querySelector<HTMLButtonElement>('button[class*="MuiButton"]');
    btn?.click();
  },
};

/** Storyboard tab open — shows the S2-C sequence from DB + 2 seeded ones */
export const StoryboardView: Story = {
  name: "Storyboard — open",
  render: () => (
    <>
      <TriggerButton view="storyboard" />
      <SceneStudioViewBody />
    </>
  ),
  play: async () => {
    const btn = document.querySelector<HTMLButtonElement>('button[class*="MuiButton"]');
    btn?.click();
  },
};

/** Closed state — shows the trigger button in context (e.g. from SequencesPage) */
export const Closed: Story = {
  name: "Closed — trigger only",
  render: () => (
    <>
      <TriggerButton />
      <SceneStudioViewBody />
    </>
  ),
};
