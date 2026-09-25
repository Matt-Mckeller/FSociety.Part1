"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { MODALITIES, MODALITY_GRID_LAYOUT } from "./data";
import type {
  ModalityDef,
  ModalityGridLayout,
  ModalityKey,
} from "./types";

interface ModalityContextValue {
  modalities: Record<ModalityKey, ModalityDef>;
  layout: ModalityGridLayout;
  getDef: (key: ModalityKey) => ModalityDef;
}

const ModalityContext = createContext<ModalityContextValue | null>(null);

export interface ModalityProviderProps {
  children: ReactNode;
  /** Override the default modality registry (e.g. for stories or tests). */
  modalities?: Record<ModalityKey, ModalityDef>;
  /** Override the default grid layout. */
  layout?: ModalityGridLayout;
}

export function ModalityProvider({
  children,
  modalities = MODALITIES,
  layout = MODALITY_GRID_LAYOUT,
}: ModalityProviderProps) {
  const value = useMemo<ModalityContextValue>(
    () => ({
      modalities,
      layout,
      getDef: (key) => modalities[key],
    }),
    [modalities, layout],
  );

  return (
    <ModalityContext.Provider value={value}>
      {children}
    </ModalityContext.Provider>
  );
}

export function useModality(): ModalityContextValue {
  const ctx = useContext(ModalityContext);
  if (!ctx) {
    throw new Error("useModality must be used within a <ModalityProvider>");
  }
  return ctx;
}

export function useModalityDef(key: ModalityKey): ModalityDef {
  return useModality().getDef(key);
}
