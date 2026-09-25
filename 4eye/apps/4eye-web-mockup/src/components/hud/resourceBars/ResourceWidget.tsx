"use client";

/**
 * ResourceWidget — one corner resource HUD (Mind or Body). Wraps the compact
 * orbital pill and its expanded states with local view state:
 *   compact → detail (orbs) → neural (radar) → compact   (click the pill)
 * The detail view carries an Edit toggle that flips it into
 * {@link ResourceEditPanel} for live value/label editing.
 *
 * Reads its resources from {@link ResourceBarsProvider} so edits are shared and
 * persist for the session.
 */

import * as React from "react";
import { Stack } from "@mui/material";

import { useResourceBars, type ResourceDomain } from "./ResourceBarsProvider";
import { ResourceEditPanel } from "./ResourceEditPanel";
import {
  ActionButton,
  NeuralPanel,
  OrbitalCompactWidget,
  OrbsPanel,
  advance,
  type HUDState,
} from "./widgets";

export function ResourceWidget({
  domain,
  accent,
  centerGlyph,
  centerWords,
  detailTitle,
  neuralTitle,
  align,
}: {
  domain: ResourceDomain;
  accent: string;
  centerGlyph: string;
  centerWords: string[];
  detailTitle: string;
  neuralTitle: string;
  /** Which corner the widget docks to (drives panel/cluster sidedness). */
  align: "left" | "right";
}) {
  const { state } = useResourceBars();
  const resources = state[domain];
  const [hudState, setHudState] = React.useState<HUDState>("compact");
  const [editing, setEditing] = React.useState(false);
  const lastUnlock = React.useRef(0);

  // Body lens visit bumps bodyUnlockToken — open PRESENCE detail once per bump.
  React.useEffect(() => {
    if (domain !== "body") return;
    const token = state.bodyUnlockToken;
    if (token <= 0 || token === lastUnlock.current) return;
    lastUnlock.current = token;
    setHudState("detail");
    setEditing(false);
  }, [domain, state.bodyUnlockToken]);

  const collapse = () => {
    setHudState("compact");
    setEditing(false);
  };

  const editToggle = (
    <ActionButton
      accent={accent}
      active={editing}
      onClick={() => setEditing((e) => !e)}
      title="Edit resource values"
    >
      ✎
    </ActionButton>
  );

  return (
    <Stack
      sx={{
        flexDirection: "column-reverse",
        gap: 1.25,
        alignItems: align === "left" ? "flex-start" : "flex-end",
      }}
    >
      <OrbitalCompactWidget
        resources={resources}
        hudState={hudState}
        accent={accent}
        centerGlyph={centerGlyph}
        centerWords={centerWords}
        onClick={() => setHudState((s) => advance(s))}
      />
      {hudState === "detail" &&
        (editing ? (
          <ResourceEditPanel
            domain={domain}
            resources={resources}
            accent={accent}
            title={detailTitle}
            onClose={() => setEditing(false)}
          />
        ) : (
          <OrbsPanel
            resources={resources}
            accent={accent}
            title={detailTitle}
            actionsSide={align === "left" ? "right" : "left"}
            extraActions={editToggle}
            onCollapse={collapse}
          />
        ))}
      {hudState === "neural" && (
        <NeuralPanel resources={resources} accent={accent} title={neuralTitle} onCollapse={collapse} />
      )}
    </Stack>
  );
}
