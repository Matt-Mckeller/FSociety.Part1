import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRingCycle } from "../hooks/useRingCycle";
import { RING_SCHEDULE } from "../rings";

describe("useRingCycle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts on the first ring in the schedule by default", () => {
    const { result } = renderHook(() => useRingCycle());
    expect(result.current).toBe(RING_SCHEDULE[0].id);
  });

  it("respects a custom initial variant", () => {
    const { result } = renderHook(() => useRingCycle("saturn"));
    expect(result.current).toBe("saturn");
  });

  it("advances to the next variant after the current one's duration elapses", () => {
    const { result } = renderHook(() => useRingCycle());
    expect(result.current).toBe(RING_SCHEDULE[0].id);
    act(() => {
      vi.advanceTimersByTime(RING_SCHEDULE[0].duration);
    });
    expect(result.current).toBe(RING_SCHEDULE[1].id);
  });

  it("wraps around to the start after the last variant", () => {
    const last = RING_SCHEDULE[RING_SCHEDULE.length - 1];
    const { result } = renderHook(() => useRingCycle(last.id));
    act(() => {
      vi.advanceTimersByTime(last.duration);
    });
    expect(result.current).toBe(RING_SCHEDULE[0].id);
  });

  it("clears its timeout on unmount (no setState after unmount)", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = renderHook(() => useRingCycle());
    unmount();
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
