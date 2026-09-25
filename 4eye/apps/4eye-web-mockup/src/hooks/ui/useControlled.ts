"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Adapter for components that may be either controlled (parent owns `value`,
 * supplies `onChange`) or uncontrolled (component owns the state, optional
 * `defaultValue`, optional `onChange` for notification).
 *
 * The control mode is locked at first render based on whether `value` was
 * provided, matching React's controlled-input contract.
 */
export function useControlled<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void,
): [T, (next: T) => void] {
  const isControlledRef = useRef(value !== undefined);
  const [internal, setInternal] = useState<T>(defaultValue);

  const current = isControlledRef.current ? (value as T) : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlledRef.current) setInternal(next);
      onChange?.(next);
    },
    [onChange],
  );

  return [current, setValue];
}
