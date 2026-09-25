/**
 * Achievements — domain types.
 *
 * Achievements are milestone-based accomplishments that represent
 * meaningful progress or character growth. Unlike quests (activity
 * tasks), achievements are earned by reaching defined thresholds or
 * demonstrating sustained behaviours.
 */

/**
 * Rarity tier — controls badge colour and prestige.
 * Mirrors the badge-system doc: Common → Uncommon → Rare → Epic → Legendary.
 */
export type AchievementRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface Achievement {
  /** Stable kebab-cased id used as React key and localStorage key. */
  id: string;

  /** Short display title (shown on the badge). */
  title: string;

  /**
   * One-line description of what the achievement represents.
   * Shown on hover / in a detail view.
   */
  description: string;

  /**
   * Human-readable condition for unlocking.
   * Shown when the achievement is locked ("Lock your way here").
   */
  unlockCondition: string;

  /** Whether the achievement has been earned by this player. */
  unlocked: boolean;

  /**
   * Emoji shorthand used on the badge face when no custom SVG is registered.
   * Defaults to "🏆" when omitted.
   */
  icon?: string;

  /**
   * Optional key into `ACHIEVEMENT_ICONS` for a custom SVG mark.
   * When set (or when `id` matches a registered icon), the SVG wins over emoji.
   */
  iconId?: string;

  /**
   * Rarity tier — drives badge accent colour.
   * Defaults to "common".
   */
  rarity?: AchievementRarity;
}
