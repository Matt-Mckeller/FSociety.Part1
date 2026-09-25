/**
 * Presentation Variants Configuration
 * Maps different presentation lengths to slide selections from the full deck
 */
import type { Slide, PresentationVariant } from "./types"
import { slides } from "./slides"

/**
 * 10-Minute Presentation Variant
 * Curated selection of 35 slides for a concise pitch
 * Omits sensitive financial details
 */
export const tenMinuteVariant: PresentationVariant = {
  id: "10-min",
  name: "10-Minute Pitch",
  description:
    "Condensed pitch deck for time-limited presentations. Sensitive information omitted.",
  duration: "10 minutes",
  slideNumbers: [
    // Introduction (3 slides)
    1, 2, 3,
    // Table of Contents
    7,
    // Problem Statement (5 slides)
    8, 9, 10, 11, 12,
    // Goals & Outcomes (3 slides)
    17, 18, 19,
    // Solution & Product (3 slides)
    25, 26, 27,
    // Core Game Elements (8 slides)
    28, 29, 30, 31, 32, 33, 34, 35,
    // Competitive Advantages (2 slides)
    51, 52,
    // Scale & Market (5 slides)
    36, 37, 38, 39, 40,
    // Go To Market (2 slides)
    53, 54,
    // Features Preview (2 slides)
    77, 78,
    // Closing (2 slides)
    111, 112,
  ],
  audience: "investor",
}

/**
 * 5-7 Minute Presentation Variant
 * Ultra-condensed version for quick pitches (22 slides)
 */
export const fiveMinuteVariant: PresentationVariant = {
  id: "5-min",
  name: "5-7 Minute Quick Pitch",
  description:
    "Ultra-condensed pitch for elevator-style presentations and quick overviews.",
  duration: "5-7 minutes",
  slideNumbers: [
    // Introduction (2 slides)
    1, 3,
    // Problem Overview (3 slides)
    8, 10, 11,
    // Goals (2 slides)
    17, 18,
    // Solution (3 slides)
    25, 26, 27,
    // Core Product Flow (3 slides)
    57, 62, 63,
    // Scale & Market (4 slides)
    36, 37, 38, 39,
    // Revenue Opportunity (2 slides)
    45, 46,
    // Closing (3 slides)
    101, 111, 112,
  ],
  audience: "general",
}

/**
 * Full Presentation (112 slides)
 */
export const fullVariant: PresentationVariant = {
  id: "full",
  name: "Full Presentation",
  description: "Complete comprehensive pitch deck with all 112 slides.",
  duration: "45-60 minutes",
  slideNumbers: Array.from({ length: 112 }, (_, i) => i + 1),
  audience: "general",
}

/**
 * Investor-Focused Variant
 * Emphasizes market size, financials, and competitive positioning
 */
export const investorVariant: PresentationVariant = {
  id: "investor",
  name: "Investor Focus",
  description:
    "Slides tailored for investor audiences emphasizing market opportunity and financials.",
  duration: "15-20 minutes",
  slideNumbers: [
    // Introduction
    1, 2, 3,
    // Problem (high-level)
    8, 10, 12,
    // Goals
    17, 18,
    // Solution Overview
    25, 26, 27,
    // Market Size & Opportunity (emphasis)
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    // Competitive Advantages
    51, 52,
    // Go To Market
    53, 54, 55, 56,
    // Revenue Model
    57, 58,
    // Closing
    101, 111, 112,
  ],
  audience: "investor",
}

/**
 * Educator-Focused Variant
 * Emphasizes pedagogical benefits and student outcomes
 */
export const educatorVariant: PresentationVariant = {
  id: "educator",
  name: "Educator Focus",
  description:
    "Slides tailored for educators emphasizing learning outcomes and classroom integration.",
  duration: "20-25 minutes",
  slideNumbers: [
    // Introduction
    1, 2, 3,
    // Problem (student-focused)
    8, 9, 10, 11, 12, 13, 14, 15, 16,
    // Goals & Outcomes (emphasis)
    17, 18, 19, 20, 21, 22, 23, 24,
    // Solution & Product
    25, 26, 27,
    // Core Game Elements (learning-focused)
    28, 29, 30, 31, 32, 33, 34,
    // Product Features
    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
    // Closing
    111, 112,
  ],
  audience: "educator",
}

// All available variants
export const presentationVariants: PresentationVariant[] = [
  fullVariant,
  tenMinuteVariant,
  fiveMinuteVariant,
  investorVariant,
  educatorVariant,
]

/**
 * Get slides for a specific variant
 */
export function getSlidesForVariant(variantId: string): Slide[] {
  const variant = presentationVariants.find((v) => v.id === variantId)
  if (!variant) return slides

  return variant.slideNumbers
    .map((num) => slides.find((s) => s.slideNumber === num))
    .filter((s): s is Slide => s !== undefined)
}

/**
 * Get variant by ID
 */
export function getVariant(variantId: string): PresentationVariant | undefined {
  return presentationVariants.find((v) => v.id === variantId)
}
