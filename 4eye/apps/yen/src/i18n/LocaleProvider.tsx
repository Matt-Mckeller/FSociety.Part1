"use client";

/**
 * The locale context, and the one hook everything else uses.
 *
 * Two things worth knowing:
 *
 * **Hydration.** The server has no idea what the visitor picked, so the first
 * render is always `DEFAULT_LOCALE` on both sides and the stored choice is
 * adopted in an effect. Reading `localStorage` or `navigator.language` during
 * render is the classic way to make a locale switcher that throws a hydration
 * mismatch on every load.
 *
 * **`document.documentElement`.** `lang` and `dir` live on `<html>`, which this
 * provider does not render — so it writes them imperatively when the locale
 * changes. That keeps screen readers and the CSS logical properties correct
 * without moving the whole app under a locale route.
 */

import * as React from "react";

import {
  DEFAULT_LOCALE,
  LOCALE_META,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
} from "./locales";
import { BASE_CATALOGUE, CATALOGUES, type MessageKey } from "./messages";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (next: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

/** `{n}`-style interpolation. Deliberately the simplest thing that works. */
function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (whole, key) =>
    key in vars ? String(vars[key]) : whole,
  );
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE);

  // Adopt the stored choice, then the browser's preference, after mount.
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(stored)) {
        setLocaleState(stored);
        return;
      }
    } catch {
      /* storage unavailable — fall through to the browser preference */
    }
    const preferred = navigator.languages
      ?.map((l) => l.split("-")[0])
      .find((l) => isLocale(l));
    if (isLocale(preferred)) setLocaleState(preferred);
  }, []);

  // `<html lang>` and `<html dir>` are outside this tree, so set them directly.
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", LOCALE_META[locale].dir);
  }, [locale]);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignored — the choice just won't survive a reload */
    }
  }, []);

  const value = React.useMemo<LocaleContextValue>(() => {
    const catalogue = CATALOGUES[locale];
    return {
      locale,
      dir: LOCALE_META[locale].dir,
      setLocale,
      // Per-key fallback, not per-catalogue: a partly translated locale shows
      // the strings it has and English for the rest, rather than reverting
      // wholesale the moment one key is missing.
      t: (key, vars) => interpolate(catalogue[key] ?? BASE_CATALOGUE[key], vars),
    };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}

/** Sugar for the common case. */
export function useT() {
  return useLocale().t;
}
