"use client";

/**
 * LoadoutPages — the Character loadout surface. A row of free-form, named page
 * chips (Family / Learning / Date night …) switches the active keypad page;
 * each page renders its groups via {@link KeypadGrid} with fixed positions for
 * muscle memory. An Edit affordance opens {@link PageEditorDialog} to manage the
 * page's name/icon/color and its groups; "+" creates a new page.
 *
 * Template pages are grouped into Life (Primary · Learn · Love) and Content
 * Engine (Create · Engage · Influence · Content) families with a thin row
 * label between them. Custom pages (not paired to any template) follow after.
 */

import * as React from "react";
import { Box, Chip, IconButton, Stack, Tooltip, Typography, alpha } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import { useLoadout } from "../store/LoadoutProvider";
import type { LoadoutPage } from "../model/types";
import { BINDING_TEMPLATES, TEMPLATE_FAMILIES } from "../model/binding-templates";
import { KeypadGrid } from "./KeypadGrid";
import { PageEditorDialog, makeEmptyPage } from "./PageEditorDialog";

function PageChip({
  page,
  active,
  onClick,
}: {
  page: LoadoutPage;
  active: boolean;
  onClick: () => void;
}) {
  const accent = page.color ?? "#64748b";
  return (
    <Chip
      onClick={onClick}
      label={
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
          {page.icon && <Box component="span" sx={{ fontSize: "0.95rem", lineHeight: 1 }}>{page.icon}</Box>}
          <Box component="span" sx={{ fontWeight: 800 }}>{page.name}</Box>
        </Stack>
      }
      sx={{
        height: 30,
        cursor: "pointer",
        color: active ? accent : "text.secondary",
        bgcolor: active ? alpha(accent, 0.1) : "background.default",
        border: "1px solid",
        borderColor: active ? alpha(accent, 0.4) : "divider",
        "&:hover": { bgcolor: alpha(accent, 0.14), borderColor: alpha(accent, 0.45) },
      }}
    />
  );
}

function FamilyRowLabel({ label, ink }: { label: string; ink?: string }) {
  return (
    <Typography
      sx={{
        fontSize: "0.52rem",
        fontWeight: 800,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: ink ?? "text.disabled",
        opacity: ink ? 0.9 : 0.7,
        alignSelf: "center",
      }}
    >
      {label}
    </Typography>
  );
}

export function LoadoutPages() {
  const { state, dispatch } = useLoadout();
  const [editPageId, setEditPageId] = React.useState<string | null>(null);

  const activePage =
    state.pages.find((p) => p.id === state.activePageId) ?? state.pages[0] ?? null;
  const editPage = editPageId ? state.pages.find((p) => p.id === editPageId) ?? null : null;

  if (!activePage) return null;

  const handlePageClick = (page: LoadoutPage) => {
    const template = BINDING_TEMPLATES.find((t) => t.pageId === page.id);
    if (template) {
      dispatch({ type: "apply-binding-template", templateId: template.id });
    } else {
      dispatch({ type: "set-active-page", pageId: page.id });
    }
  };

  // Build a structured list: family rows first, then any custom pages.
  const templatePageIds = new Set(BINDING_TEMPLATES.map((t) => t.pageId));
  const customPages = state.pages.filter((p) => !templatePageIds.has(p.id));

  return (
    <Stack spacing={1.5}>
      {/* Page switcher — grouped by family */}
      <Stack sx={{ gap: 0.5 }}>
        {TEMPLATE_FAMILIES.map((family) => {
          const familyPages = family.ids
            .map((tid) => {
              const t = BINDING_TEMPLATES.find((bt) => bt.id === tid);
              return t ? state.pages.find((p) => p.id === t.pageId) : undefined;
            })
            .filter((p): p is LoadoutPage => Boolean(p));
          if (familyPages.length === 0) return null;
          return (
            <Stack key={family.id} sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 0.75 }}>
              <FamilyRowLabel label={family.label} ink={family.ink} />
              {familyPages.map((page) => (
                <PageChip
                  key={page.id}
                  page={page}
                  active={page.id === activePage.id}
                  onClick={() => handlePageClick(page)}
                />
              ))}
            </Stack>
          );
        })}
        {customPages.length > 0 && (
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 0.75 }}>
            <FamilyRowLabel label="Custom" />
            {customPages.map((page) => (
              <PageChip
                key={page.id}
                page={page}
                active={page.id === activePage.id}
                onClick={() => handlePageClick(page)}
              />
            ))}
          </Stack>
        )}
        <Stack sx={{ flexDirection: "row", mt: 0.25 }}>
          <Tooltip title="New page" arrow>
            <IconButton
              size="small"
              aria-label="Add loadout page"
              onClick={() => {
                const page = makeEmptyPage();
                dispatch({ type: "add-page", page });
                setEditPageId(page.id);
              }}
              sx={{ border: "1px dashed", borderColor: "divider" }}
            >
              <AddRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* Active page header + edit */}
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: activePage.color ?? "text.primary" }}>
          {activePage.icon ? `${activePage.icon} ` : ""}
          {activePage.name}
        </Typography>
        <Tooltip title="Edit this page" arrow>
          <IconButton size="small" aria-label="Edit page" onClick={() => setEditPageId(activePage.id)}>
            <TuneRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Groups stack vertically: P/S/T rows-of-3 form a 3×3 numpad; a single
          keypad group is its own 3×3; quads/rows stack cleanly below. */}
      <Stack sx={{ gap: 1.5, alignItems: "flex-start" }}>
        {activePage.groups.map((group) => (
          <KeypadGrid key={group.id} pageId={activePage.id} group={group} pageColor={activePage.color} />
        ))}
      </Stack>

      <PageEditorDialog open={editPage != null} page={editPage} onClose={() => setEditPageId(null)} />
    </Stack>
  );
}
