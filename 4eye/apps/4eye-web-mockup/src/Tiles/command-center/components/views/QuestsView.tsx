"use client";

/**
 * Executive Center — Quests view.
 *
 * The work-hierarchy browser: Legend → Campaign → Storyline → Quest →
 * Objective, walked through the single Relationship edge table. Each node is an
 * {@link EntityRow} with an expand/collapse caret; the whole tree re-skins
 * between PM and narrative labels via the ViewMode toggle. Inspect opens any
 * node in the shared Inspector.
 */

import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import type { Entity, ViewMode } from "@4eye/types";

import { useCommandCenter } from "../../store/CommandCenterProvider";
import { EntityRow } from "../EntityRow";
import { QuestGlyph } from "../planning-glyphs";
import { Panel } from "./shared";

/** A node in the hierarchy tree; children resolved lazily from the store. */
function TreeNode({
  entity,
  depth,
  expandedIds,
  toggle,
}: {
  entity: Entity;
  depth: number;
  expandedIds: Set<string>;
  toggle: (id: string) => void;
}) {
  const { store } = useCommandCenter();
  const children = React.useMemo(
    () =>
      store
        .edgesFrom(entity.id)
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((r) => store.getEntity(r.toId))
        .filter((e): e is Entity => Boolean(e)),
    [entity.id, store],
  );
  const hasChildren = children.length > 0;
  const expanded = expandedIds.has(entity.id);

  const caret = hasChildren ? (
    <IconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        toggle(entity.id);
      }}
      aria-label={expanded ? `Collapse ${entity.name}` : `Expand ${entity.name}`}
      sx={{ p: 0.25, width: 26, height: 26, flexShrink: 0 }}
    >
      {expanded ? (
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
      ) : (
        <KeyboardArrowRightRoundedIcon sx={{ fontSize: 18 }} />
      )}
    </IconButton>
  ) : (
    <Box sx={{ width: 26, flexShrink: 0 }} />
  );

  return (
    <>
      <EntityRow entity={entity} indent={depth} leading={caret} showSummary={depth < 2} showTypeGlyph={false} />
      {expanded &&
        children.map((child) => (
          <TreeNode
            key={child.id}
            entity={child}
            depth={depth + 1}
            expandedIds={expandedIds}
            toggle={toggle}
          />
        ))}
    </>
  );
}

export function QuestsView() {
  const { store, state, setViewMode } = useCommandCenter();

  const roots = React.useMemo(
    () => store.entitiesOfType("legend"),
    [store],
  );
  // If there is no legend, fall back to campaigns as roots.
  const effectiveRoots = roots.length > 0 ? roots : store.entitiesOfType("campaign");

  // Default: legend + campaigns expanded so storylines are visible but collapsed.
  const defaultExpanded = React.useMemo(() => {
    const ids = new Set<string>();
    const seed = (entity: Entity, depth: number) => {
      if (depth >= 2) return;
      ids.add(entity.id);
      store
        .edgesFrom(entity.id)
        .map((r) => store.getEntity(r.toId))
        .filter((e): e is Entity => Boolean(e))
        .forEach((child) => seed(child, depth + 1));
    };
    effectiveRoots.forEach((r) => seed(r, 0));
    return ids;
  }, [effectiveRoots, store]);

  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(defaultExpanded);

  const toggle = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = React.useCallback(() => {
    setExpandedIds(new Set(store.allEntities().map((e) => e.id)));
  }, [store]);
  const collapseAll = React.useCallback(() => setExpandedIds(new Set()), []);
  const expandToCampaigns = React.useCallback(
    () => setExpandedIds(new Set(defaultExpanded)),
    [defaultExpanded],
  );

  return (
    <Panel
      title="Work Hierarchy"
      fill
      glyph={
        <Box sx={{ color: "primary.main", display: "flex" }}>
          <QuestGlyph size={18} />
        </Box>
      }
      action={
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <ButtonGroup
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              "& .MuiButton-root": {
                textTransform: "none",
                fontWeight: 700,
                fontSize: 11,
                px: 0.9,
                py: 0.15,
                borderColor: "divider",
                lineHeight: 1.6,
              },
            }}
          >
            <Button onClick={collapseAll}>Collapse</Button>
            <Button onClick={expandToCampaigns}>Campaigns</Button>
            <Button onClick={expandAll}>Expand All</Button>
          </ButtonGroup>
          <ToggleButtonGroup
            size="small"
            exclusive
            color="primary"
            value={state.viewMode}
            onChange={(_, v: ViewMode | null) => v && setViewMode(v)}
            aria-label="Label style"
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 700,
                fontSize: 11,
                px: 1,
                py: 0.15,
                borderColor: "divider",
              },
            }}
          >
            <ToggleButton value="narrative">Narrative</ToggleButton>
            <ToggleButton value="pm">PM</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      }
    >
      <Stack spacing={0.6}>
        {effectiveRoots.map((root) => (
          <TreeNode
            key={root.id}
            entity={root}
            depth={0}
            expandedIds={expandedIds}
            toggle={toggle}
          />
        ))}
      </Stack>
    </Panel>
  );
}
