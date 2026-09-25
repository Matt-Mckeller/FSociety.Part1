"use client";

import * as React from "react";

import {
  STATUS_TARGET_SIZE_STORAGE_KEY,
  type StatusTargetSize,
} from "../model/statusTargetSizes";

export function useStatusTargetSize(options: {
  controlled?: StatusTargetSize;
  defaultSize?: StatusTargetSize;
} = {}) {
  const { controlled, defaultSize = "grid" } = options;
  const [local, setLocal] = React.useState<StatusTargetSize>(defaultSize);

  React.useEffect(() => {
    if (controlled != null) return;
    try {
      const raw = window.localStorage.getItem(STATUS_TARGET_SIZE_STORAGE_KEY);
      if (raw === "compact" || raw === "grid" || raw === "large") {
        setLocal(raw);
      } else {
        setLocal(defaultSize);
      }
    } catch {
      setLocal(defaultSize);
    }
  }, [controlled, defaultSize]);

  const size = controlled ?? local;
  const canSet = controlled == null;

  const setSize = React.useCallback(
    (next: StatusTargetSize) => {
      if (!canSet) return;
      setLocal(next);
      try {
        window.localStorage.setItem(STATUS_TARGET_SIZE_STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
    },
    [canSet],
  );

  return { size, setSize, canSet };
}
