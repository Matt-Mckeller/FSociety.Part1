"use client";

import { useState, useEffect } from "react";

export function useDataCascade(count: number, intervalMs = 4200) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const run = () => {
      // Cascade flows bottom-up: ordered[count-1] = AION → ordered[0] = Chat
      for (let step = 0; step < count; step++) {
        const tileIdx = count - 1 - step;
        setTimeout(() => setActiveIdx(tileIdx), step * 165);
      }
      setTimeout(() => setActiveIdx(null), count * 165 + 500);
    };

    run();
    const t = setInterval(run, intervalMs);
    return () => clearInterval(t);
  }, [count, intervalMs]);

  return activeIdx;
}
