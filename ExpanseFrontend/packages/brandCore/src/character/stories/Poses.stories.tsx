/**
 * Character Poses Gallery
 *
 * Pre-defined character poses (primitives/frames) that can be used
 * statically or as keyframes in animations.
 */
import type { Meta, StoryObj } from "@storybook/react"
import { CharacterForwardStanding } from "../poses/CharacterForwardStanding"
import { CharacterRightStanding } from "../poses/CharacterRightStanding"
import { CharacterLeftStanding } from "../poses/CharacterLeftStanding"
import { CharacterCelebration1 } from "../poses/CharacterCelebration1"
import { CharacterCelebration2 } from "../poses/CharacterCelebration2"
import { ContactUsCharacter } from "../poses/ContactUsCharacter"
import { ContactUsCharacterUnified } from "../poses/ContactUsCharacterUnified"
import { BrandProvider } from "../../context/BrandContext"

const meta: Meta = {
  title: "BrandCore/Character/4eye/Poses",
  decorators: [
    (Story) => (
      <BrandProvider>
        <div
          style={{
            background: "#ffffff",
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <Story />
        </div>
      </BrandProvider>
    ),
  ],
}

export default meta

// =====================
// All Poses Gallery
// =====================

export const AllPosesGallery: StoryObj = {
  name: "All Poses",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "2rem",
        alignItems: "end",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <CharacterForwardStanding />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Forward</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <CharacterLeftStanding />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Left</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <CharacterRightStanding />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Right</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <CharacterCelebration1 compact />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Celebration 1</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <CharacterCelebration2 compact />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Celebration 2</span>
      </div>
    </div>
  ),
}

// =====================
// Contact Us Character
// =====================

export const ContactUs: StoryObj<typeof ContactUsCharacter> = {
  name: "Contact Us (Original)",
  render: () => (
    <div style={{ width: "180px", height: "180px" }}>
      <ContactUsCharacter />
    </div>
  ),
}

export const ContactUsUnified: StoryObj<typeof ContactUsCharacterUnified> = {
  name: "Contact Us (Unified Proportions)",
  render: (args) => (
    <div style={{ height: "250px" }}>
      <ContactUsCharacterUnified {...args} />
    </div>
  ),
  args: {
    showFace: true,
    showHeadphones: true,
    showHair: true,
    limbOpacity: 0.5,
  },
  argTypes: {
    showFace: { control: "boolean" },
    showHeadphones: { control: "boolean" },
    showHair: { control: "boolean" },
    limbOpacity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
  },
}

// =====================
// Comparison: Original vs Unified
// =====================

export const ContactUsComparison: StoryObj = {
  name: "Contact Us Comparison",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "180px", height: "180px", margin: "0 auto" }}>
          <ContactUsCharacter />
        </div>
        <span
          style={{
            color: "#888",
            fontSize: "12px",
            display: "block",
            marginTop: "1rem",
          }}
        >
          Original (different proportions, head-only)
        </span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "250px" }}>
          <ContactUsCharacterUnified />
        </div>
        <span
          style={{
            color: "#888",
            fontSize: "12px",
            display: "block",
            marginTop: "1rem",
          }}
        >
          Unified (standard body proportions)
        </span>
      </div>
    </div>
  ),
}
