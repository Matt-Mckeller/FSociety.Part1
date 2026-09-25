"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import type { SlideId } from "@4eye/web/Tiles/home/slideshow/steps";
import type { FourEyeMascotHandle } from "@expanse/character/2d";

/**
 * Registry that lets each slide expose a `MascotSlot` element to the
 * persistent-mascot overlay without `HomeTile` having to wire up a
 * dedicated `useState` per slide.
 *
 * The provider stores one DOM element ref per registered `SlideId`.
 * Slides call `register(id, el)` on mount (typically via a small
 * `<MascotSlotForSlide>` component) and `register(id, null)` on unmount.
 *
 * The overlay reads the registered element for the *currently active*
 * slide (passed in by the consumer) and measures it on layout.
 */
interface MascotRegistryContextValue {
  register: (id: SlideId, el: HTMLDivElement | null) => void;
  /** Returns the registered element for the given slide, or null. */
  getElement: (id: SlideId) => HTMLDivElement | null;
  /**
   * Bumped whenever a slot registers / unregisters. Lets the overlay
   * re-measure when an element first becomes available.
   */
  registrationToken: number;
}

const MascotRegistryContext = createContext<MascotRegistryContextValue | null>(null);

/**
 * Imperative-controls context for the persistent mascot.
 *
 * The single live `<FourEyeMascot>` rendered by `PersistentMascotOverlay`
 * publishes its imperative handle here on mount. Any descendant — most
 * notably per-slide action bars and slide CTAs — can call
 * `usePersistentMascot()` to fire animations without prop-threading.
 *
 * Why a ref-of-ref instead of plain state? The handle is set inside a
 * `useImperativeHandle` callback that runs during commit; storing it in
 * state would trigger an extra render of every subscriber. Keeping it
 * on a ref means subscribers grab the latest handle at call time and
 * pay no re-render cost.
 */
interface MascotControlsContextValue {
  /** Internal — set by `PersistentMascotOverlay`. Do not call from app code. */
  handleRef: MutableRefObject<FourEyeMascotHandle | null>;
}

const MascotControlsContext = createContext<MascotControlsContextValue | null>(null);

export function PersistentMascotProvider({ children }: { children: ReactNode }) {
  const slotsRef = useRef<Partial<Record<SlideId, HTMLDivElement | null>>>({});
  const [registrationToken, setRegistrationToken] = useState(0);
  const handleRef = useRef<FourEyeMascotHandle | null>(null);

  const register = useCallback((id: SlideId, el: HTMLDivElement | null) => {
    if (slotsRef.current[id] === el) return;
    slotsRef.current[id] = el;
    setRegistrationToken((n) => n + 1);
  }, []);

  const getElement = useCallback(
    (id: SlideId) => slotsRef.current[id] ?? null,
    [],
  );

  const registryValue = useMemo<MascotRegistryContextValue>(
    () => ({ register, getElement, registrationToken }),
    [register, getElement, registrationToken],
  );

  const controlsValue = useMemo<MascotControlsContextValue>(
    () => ({ handleRef }),
    [],
  );

  return (
    <MascotControlsContext.Provider value={controlsValue}>
      <MascotRegistryContext.Provider value={registryValue}>{children}</MascotRegistryContext.Provider>
    </MascotControlsContext.Provider>
  );
}

export function useMascotRegistry(): MascotRegistryContextValue {
  const v = useContext(MascotRegistryContext);
  if (!v) {
    throw new Error("useMascotRegistry must be used within <PersistentMascotProvider>");
  }
  return v;
}

/**
 * Internal hook for `PersistentMascotOverlay` to publish its imperative
 * handle into the provider. App code should not call this directly.
 */
export function useMascotControlsRegistry(): MascotControlsContextValue {
  const v = useContext(MascotControlsContext);
  if (!v) {
    throw new Error(
      "useMascotControlsRegistry must be used within <PersistentMascotProvider>",
    );
  }
  return v;
}

/**
 * Imperative access to the live persistent mascot. Returns a stable
 * controls object whose methods are no-ops when no mascot is currently
 * mounted (e.g. during the intro). Intended for slide CTAs and
 * per-slide action bars that want to fire `playSelect` / `playAnxious` /
 * `playExcited` without HomeTile-level prop wiring.
 *
 * Must be called inside a `<PersistentMascotProvider>`.
 */
export function usePersistentMascot(): {
  playSelect: () => void;
  playAnxious: () => void;
  playExcited: () => void;
} {
  const { handleRef } = useMascotControlsRegistry();
  return useMemo(
    () => ({
      playSelect: () => handleRef.current?.playSelect(),
      playAnxious: () => handleRef.current?.playAnxious(),
      playExcited: () => handleRef.current?.playExcited(),
    }),
    [handleRef],
  );
}
