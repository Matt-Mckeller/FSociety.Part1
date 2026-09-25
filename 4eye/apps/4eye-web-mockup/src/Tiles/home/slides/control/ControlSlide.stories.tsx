import type { Meta, StoryObj } from "@storybook/react";
import ControlSlide from "./ControlSlide";
import { SlideshowProvider } from "../../slideshow/SlideshowProvider";
import { ReplayIntroProvider } from "../../slideshow/ReplayIntroProvider";
import { STEPS } from "../../slideshow/steps";

const meta: Meta<typeof ControlSlide> = {
  title: "Marketing / Home / Control Slide",
  component: ControlSlide,
  decorators: [
    (Story) => (
      <SlideshowProvider total={STEPS.length}>
        <ReplayIntroProvider replayIntro={() => {}}>
          <Story />
        </ReplayIntroProvider>
      </SlideshowProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ControlSlide>;

/**
 * UNIFIED — The baseline. Deliberate button presses, cool purple palette.
 * Controller at belly. Standard mount animation.
 * Story: "You control your attention."
 * Labels: pillars (learning · communication · humans · mood…)
 */
export const Unified: Story = {};

/**
 * ASCENT — Controller raised high; character looks back/up.
 * Warm amber-gold palette. Head tilts back with each button press.
 * Triumphant coin burst + 100 XP fire at the end of the mount.
 * Story: "Every press lifts you higher."
 * Labels: brand pillars (improve · heal · protect · win · grow…)
 */
export const Ascent: Story = {
  args: { variantId: "ascent" },
};

/**
 * FLOW — Watch device, no gamification overlays.
 * Blue teal palette. Character glances at wrist — mindful awareness.
 * Story: "Awareness is the first move."
 * Labels: habits (sleep · screen time · exercise · social…)
 */
export const Flow: Story = {
  args: { variantId: "flow" },
};

/**
 * EARN — Controller held low; high-energy grind mode.
 * Emerald green palette. Head bobs with anticipation, rapid mash,
 * coin burst fires during the mount itself, 200 XP reward.
 * Story: "Build the habit. Collect the reward."
 * Labels: skills (focus · memory · clarity · empathy · decisions…)
 */
export const Earn: Story = {
  args: { variantId: "earn" },
};
