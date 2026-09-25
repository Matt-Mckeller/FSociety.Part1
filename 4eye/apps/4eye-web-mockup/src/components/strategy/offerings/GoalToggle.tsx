"use client";

import { Tabs, Tab, Box } from "@mui/material";
import { type ReactNode } from "react";
import { useControlled } from "@4eye/web/hooks/ui";

export interface GoalToggleOption<K extends string = string> {
  key: K;
  label: string;
}

export interface GoalToggleProps<K extends string = string> {
  options: GoalToggleOption<K>[];
  defaultKey?: K;
  /** Controlled value. When set, the toggle is controlled. */
  value?: K;
  /** Called whenever the active key changes. */
  onChange?: (key: K) => void;
  renderPanel: (key: K) => ReactNode;
}

export default function GoalToggle<K extends string = string>({
  options,
  defaultKey,
  value,
  onChange,
  renderPanel,
}: GoalToggleProps<K>) {
  const [active, setActive] = useControlled<K>(
    value,
    defaultKey ?? options[0].key,
    onChange,
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={active}
        onChange={(_, v) => setActive(v as K)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        {options.map((o) => (
          <Tab key={o.key} value={o.key} label={o.label} />
        ))}
      </Tabs>
      <Box>{renderPanel(active)}</Box>
    </Box>
  );
}
