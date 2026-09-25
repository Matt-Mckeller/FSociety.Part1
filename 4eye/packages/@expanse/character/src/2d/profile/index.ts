/**
 * Profile Components
 *
 * Cropped, zoomed views of the 4eye character for avatars,
 * profile pictures, and gamified UI elements.
 *
 * ## Components
 *
 * - **ProfilePhoto** - Core cropped photo component with zoom levels
 * - **ProfileFrame** - Tiered gamification borders wrapping ProfilePhoto
 * - **TierBadge** - Standalone tier indicator badge
 *
 * ## Zoom Levels
 *
 * ### Head-focused (for avatars, icons)
 * - `full` - Entire character (head to toes)
 * - `head` - Complete head with margin
 * - `face` - Face-focused crop (default)
 * - `eye` - Brain/eye focus area
 * - `tight` - Extreme closeup on eye
 *
 * ### Body-focused (for larger displays)
 * - `shoulders` - Head + shoulders (portrait style)
 * - `torso` - Upper body (head + torso)
 *
 * ## Tier System
 *
 * 1. **Spark** - Simple border (beginner)
 * 2. **Glow** - Gradient + subtle glow
 * 3. **Shine** - Animated pulse + dots
 * 4. **Radiance** - Ornate multi-layer frame
 * 5. **Brilliance** - Full effects + particles (master)
 *
 * @module character/profile
 */

// =============================================================================
// PROFILE PHOTO
// =============================================================================

export {
  ProfilePhoto,
  getViewBoxForZoom,
  type ProfilePhotoProps,
  type ProfileZoom,
  type ProfileBorder,
  type ViewBoxConfig,
} from "./ProfilePhoto"

// =============================================================================
// PROFILE FRAME (TIERED BORDERS)
// =============================================================================

export {
  ProfileFrame,
  TierBadge,
  TIER_NAMES,
  TIER_DESCRIPTIONS,
  TIER_CONFIGS,
  getTierDecorativePadding,
  type ProfileFrameProps,
  type TierLevel,
  type TierConfig,
  type ThemeColorKey,
} from "./ProfileFrame"
