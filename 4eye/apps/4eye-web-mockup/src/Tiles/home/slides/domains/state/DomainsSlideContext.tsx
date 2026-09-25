"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { DOMAINS_PLACES, DOMAINS_WHENS } from "./domains.constants";

export interface DomainsSlideContextValue {
  eyebrow: string;
  /** Section title for the "Live in Person / Online" band. */
  whereverTitle: string;
  /** Section title for the "In Schools / At Work / At Home" band. */
  wheneverTitle: string;
  whens: typeof DOMAINS_WHENS;
  places: typeof DOMAINS_PLACES;
  /** True when the Expand action has swapped the bands for a carousel. */
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const DomainsSlideContext = createContext<DomainsSlideContextValue | undefined>(undefined);

export function DomainsSlideProvider({ children }: PropsWithChildren) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded((v) => !v), []);

  const value = useMemo<DomainsSlideContextValue>(
    () => ({
      eyebrow: "Domains",
      whereverTitle: "Wherever.",
      wheneverTitle: "Whenever.",
      whens: DOMAINS_WHENS,
      places: DOMAINS_PLACES,
      isExpanded,
      toggleExpanded,
    }),
    [isExpanded, toggleExpanded],
  );

  return <DomainsSlideContext.Provider value={value}>{children}</DomainsSlideContext.Provider>;
}

export function useDomainsSlideContext() {
  const context = useContext(DomainsSlideContext);
  if (!context) {
    throw new Error("useDomainsSlideContext must be used within DomainsSlideProvider");
  }
  return context;
}
