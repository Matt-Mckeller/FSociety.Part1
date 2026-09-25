import { useEffect, useState } from "react";
import { pickWeightedWave } from "./scanWaves";
import type { WaveId } from "./scanWaves";

export interface ScanCycleState {
  /**
   * Increments on every sweep trigger. Use as a React `key` on the
   * wave element to force a DOM remount and restart the CSS animation.
   */
  scanKey: number;
  /** Which wave definition to render for this cycle. */
  waveId: WaveId;
}

/**
 * useScanCycle — manages the periodic scan sweep schedule.
 *
 * Timing:
 *   1. Fires after 4 s when `active` becomes true.
 *   2. Then fires every 30 s until `active` becomes false.
 *
 * Each trigger picks a new wave via the weighted-random `pickWeightedWave()`
 * function (WideGlide = 50 %, others split the remaining 50 %).
 *
 * Resets cleanly on deactivation — no stale timers or keys.
 */
export function useScanCycle(active: boolean): ScanCycleState {
  const [state, setState] = useState<ScanCycleState>({
    scanKey: 0,
    waveId:  "wideGlide",
  });

  useEffect(() => {
    if (!active) return;

    const fire = () =>
      setState(prev => ({ scanKey: prev.scanKey + 1, waveId: pickWeightedWave() }));

    // First sweep at +4 s, then every 30 s.
    let interval: ReturnType<typeof setInterval>;
    const t1 = setTimeout(() => {
      fire();
      interval = setInterval(fire, 30_000);
    }, 4_000);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [active]);

  return state;
}
