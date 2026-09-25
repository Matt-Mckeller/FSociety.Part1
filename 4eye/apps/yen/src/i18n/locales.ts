/**
 * The locales this site ships, and the shape of a message catalogue.
 *
 * Deliberately a context and a dictionary rather than locale-prefixed routes:
 * yen is one small surface, and moving every route under `/[locale]` to get a
 * language switcher would be a large change to buy a feature the page does not
 * have content for yet. The seam is drawn so that widening it later is a
 * provider swap — every string already goes through `t()`, so nothing in the
 * components has to change.
 *
 * Arabic is in the list on purpose. A locale set that is all left-to-right
 * never exercises `dir`, and a layout that has never been rendered
 * right-to-left is a layout that does not support it.
 */

export const LOCALES = ["en", "es", "fr", "de", "ja", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export interface LocaleMeta {
  code: Locale;
  /** The language's own name — a switcher that says "Spanish" to a Spanish
   *  speaker is a switcher written for someone who does not need it. */
  endonym: string;
  english: string;
  dir: "ltr" | "rtl";
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: "en", endonym: "English", english: "English", dir: "ltr" },
  es: { code: "es", endonym: "Español", english: "Spanish", dir: "ltr" },
  fr: { code: "fr", endonym: "Français", english: "French", dir: "ltr" },
  de: { code: "de", endonym: "Deutsch", english: "German", dir: "ltr" },
  ja: { code: "ja", endonym: "日本語", english: "Japanese", dir: "ltr" },
  ar: { code: "ar", endonym: "العربية", english: "Arabic", dir: "rtl" },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Storage key for the chosen locale. Shared by the provider and the boot script. */
export const LOCALE_STORAGE_KEY = "yen.locale";

/**
 * Spread onto editorial prose that comes from `@yen/content`.
 *
 * That copy is English and only English right now — the interface is
 * translated, the writing is not. Inside an RTL page, an unmarked English
 * paragraph inherits `dir="rtl"` and the bidi algorithm moves its trailing
 * punctuation to the front: "…land on this branch." renders as
 * ".land on this branch". The text is still English, so it must say so.
 *
 * Delete this the moment the content package ships translations — at that point
 * the prose follows the page and pinning it to English would be the bug.
 */
export const CONTENT_TEXT_PROPS = { lang: "en", dir: "ltr" as const };
