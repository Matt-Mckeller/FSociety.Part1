"use client";

/**
 * LensRail — profile navigation in three shapes, with nested Other menus.
 *
 *   grouped   Surfaced (and the active lens) at rest · hover/focus/tap peeks
 *             the rest of Core · Other opens Complex / Facets nested menus
 *   accordion groups stack; Other expands to nested subgroup rows
 *   two-tier  group row · then lenses (Other shows subgroup chips + lenses)
 *
 * Complex explorers (Engagement) and Facets live under Other so Core stays short.
 * The grouped peek is the default: nine Core pills at rest is more menu than
 * the landing page can teach.
 */

import * as React from "react";
import {
  Box,
  Divider,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { LENS_ICONS, ChevronIcon } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";
import { PROFILE_VIEW_META, type ProfileView } from "../model/types";
import {
  ACTIVE_GROUPS,
  LENS_HINT,
  LENS_LABEL,
  PRIMARY_CORE_LENSES,
  groupOf,
  lensesInGroup,
  subgroupOf,
  type Lens,
  type LensGroup,
  type LensSubgroup,
} from "./lensGroups";

export type RailLayout = "grouped" | "accordion" | "two-tier";
export const RAIL_LAYOUTS: RailLayout[] = ["grouped", "accordion", "two-tier"];

const ACCORDION_OPEN_LIMIT = 3;
const PEEK_LEAVE_MS = 180;

function useFineHover(): boolean {
  const [ok, setOk] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setOk(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return ok;
}

function lensLabel(lens: Lens): string {
  return LENS_LABEL[lens] ?? PROFILE_VIEW_META[lens as ProfileView]?.label ?? lens;
}

function lensHint(lens: Lens): string {
  return LENS_HINT[lens] ?? PROFILE_VIEW_META[lens as ProfileView]?.description ?? "";
}

function LensButton({
  lens,
  active,
  accent,
  onSelect,
  registerRef,
  dense,
}: {
  lens: Lens;
  active: boolean;
  accent: string;
  onSelect: () => void;
  registerRef?: (el: HTMLDivElement | null) => void;
  dense?: boolean;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const Icon = LENS_ICONS[lens as keyof typeof LENS_ICONS];

  return (
    <Tooltip title={lensHint(lens)} arrow placement="bottom">
      <Box
        ref={registerRef}
        role="tab"
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: dense ? 0.4 : 0.6,
          flexShrink: 0,
          px: dense ? 1 : 1.4,
          py: dense ? 0.45 : 0.7,
          cursor: "pointer",
          borderRadius: 999,
          whiteSpace: "nowrap",
          border: "1px solid",
          borderColor: active ? alpha(accent, 0.5) : "transparent",
          bgcolor: active ? alpha(accent, 0.12) : "transparent",
          transition: "background-color .18s ease, border-color .18s ease",
          "&:hover": { bgcolor: active ? alpha(accent, 0.16) : "action.hover" },
          "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
        }}
      >
        {Icon && (
          <Box
            component={Icon}
            size={dense ? 13 : 15}
            sx={{
              color: active ? ink : "text.secondary",
              flexShrink: 0,
              transition: "color .18s ease",
            }}
          />
        )}
        <Typography
          component="span"
          sx={{
            fontSize: dense ? "0.68rem" : "0.74rem",
            fontWeight: active ? 800 : 600,
            letterSpacing: 0.2,
            lineHeight: 1,
            color: active ? ink : "text.secondary",
          }}
        >
          {lensLabel(lens)}
        </Typography>
      </Box>
    </Tooltip>
  );
}

function GroupLabel({ group, accent }: { group: LensGroup; accent: string }) {
  const surface = useSurface();
  return (
    <Tooltip title={group.blurb} arrow>
      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: surface.ink(accent),
          opacity: 0.75,
          flexShrink: 0,
          cursor: "help",
          px: 0.5,
        }}
      >
        {group.label}
      </Typography>
    </Tooltip>
  );
}

const scrollRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  overflowX: "auto",
  py: 0.5,
  maskImage:
    "linear-gradient(90deg, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%)",
  "&::-webkit-scrollbar": { height: 4 },
  "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 2 },
} as const;

/* ----------------------------------------------------------- peek (grouped) */

function useRailPeek() {
  const [hovered, setHovered] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const leaveTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeave = React.useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  React.useEffect(() => () => clearLeave(), [clearLeave]);

  const expanded = hovered || pinned;

  const onPointerEnter = React.useCallback(() => {
    clearLeave();
    setHovered(true);
  }, [clearLeave]);

  const onPointerLeave = React.useCallback(() => {
    clearLeave();
    leaveTimer.current = setTimeout(() => setHovered(false), PEEK_LEAVE_MS);
  }, [clearLeave]);

  const togglePinned = React.useCallback(() => {
    setPinned((prev) => !prev);
  }, []);

  const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setPinned(false);
      setHovered(false);
    }
  }, []);

  return { expanded, pinned, onPointerEnter, onPointerLeave, togglePinned, onKeyDown };
}

function PagesPeekChip({
  count,
  expanded,
  accent,
  onToggle,
}: {
  count: number;
  expanded: boolean;
  accent: string;
  onToggle: () => void;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const label = expanded ? "Hide pages" : `${count} more pages`;

  return (
    <Tooltip
      title={expanded ? "Pin pages open — or move away to hide them" : "Show the rest of Core"}
      arrow
    >
      <Box
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.35,
          flexShrink: 0,
          px: 1,
          py: 0.45,
          borderRadius: 999,
          cursor: "pointer",
          border: "1px solid",
          borderColor: expanded ? alpha(accent, 0.5) : "divider",
          bgcolor: expanded ? alpha(accent, 0.12) : "transparent",
          "&:hover": { bgcolor: expanded ? alpha(accent, 0.16) : "action.hover" },
          "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
        }}
      >
        <Typography
          sx={{
            fontSize: "0.68rem",
            fontWeight: expanded ? 800 : 700,
            color: expanded ? ink : "text.secondary",
            letterSpacing: 0.2,
            whiteSpace: "nowrap",
          }}
        >
          {expanded ? "Pages" : `+${count}`}
        </Typography>
        <Box
          component={ChevronIcon}
          size={11}
          sx={{
            color: "text.secondary",
            flexShrink: 0,
            transform: expanded ? "rotate(-90deg)" : "rotate(90deg)",
            transition: "transform 180ms ease",
          }}
        />
      </Box>
    </Tooltip>
  );
}

/* ----------------------------------------------------------- Other menus */

function NestedOtherControl({
  active,
  accent,
  onChange,
  group,
}: {
  active: Lens;
  accent: string;
  onChange: (lens: Lens) => void;
  group: LensGroup;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const nest = subgroupOf(active);
  const inOther = nest?.group.id === group.id || groupOf(active)?.id === group.id;
  const activeLabel = inOther
    ? nest
      ? `${nest.subgroup.label} · ${lensLabel(active)}`
      : lensLabel(active)
    : group.label;

  return (
    <>
      <Tooltip title={group.blurb} arrow>
        <Box
          role="button"
          tabIndex={0}
          aria-haspopup="menu"
          aria-expanded={Boolean(anchor)}
          aria-label={`${group.label} menu`}
          onClick={(e) => setAnchor(e.currentTarget)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setAnchor(e.currentTarget as HTMLElement);
            }
          }}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.4,
            flexShrink: 0,
            px: 1.15,
            py: 0.55,
            borderRadius: 999,
            cursor: "pointer",
            border: "1px solid",
            borderColor: inOther ? alpha(accent, 0.5) : "divider",
            bgcolor: inOther ? alpha(accent, 0.12) : "transparent",
            maxWidth: 168,
            "&:hover": { bgcolor: inOther ? alpha(accent, 0.16) : "action.hover" },
            "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: inOther ? 800 : 700,
              color: inOther ? ink : "text.secondary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {activeLabel}
          </Typography>
          <Box
            component={ChevronIcon}
            size={11}
            sx={{ color: "text.secondary", transform: "rotate(90deg)", flexShrink: 0 }}
          />
        </Box>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{ paper: { sx: { minWidth: 220, maxHeight: 360 } } }}
      >
        {(group.subgroups ?? []).map((sub, si) => (
          <React.Fragment key={sub.id}>
            {si > 0 ? <Divider sx={{ my: 0.5 }} /> : null}
            <ListSubheader
              sx={{
                lineHeight: 1.4,
                py: 0.75,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ink,
                bgcolor: "background.paper",
              }}
            >
              {sub.label}
            </ListSubheader>
            {sub.lenses.map((lens) => {
              const Icon = LENS_ICONS[lens as keyof typeof LENS_ICONS];
              return (
                <MenuItem
                  key={lens}
                  dense
                  selected={active === lens}
                  onClick={() => {
                    onChange(lens);
                    setAnchor(null);
                  }}
                >
                  {Icon ? (
                    <Box
                      component={Icon}
                      size={15}
                      sx={{ mr: 1.25, color: active === lens ? ink : "text.secondary" }}
                    />
                  ) : null}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: active === lens ? 800 : 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {lensLabel(lens)}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: 200,
                      }}
                    >
                      {lensHint(lens)}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
          </React.Fragment>
        ))}
      </Menu>
    </>
  );
}

/* ----------------------------------------------------------- grouped rail */

function coreLensVisible(lens: Lens, active: Lens, expanded: boolean, coreLenses: Lens[]): boolean {
  if (expanded) return true;
  if (PRIMARY_CORE_LENSES.has(lens)) return true;
  return lens === active && coreLenses.includes(active);
}

function GroupedRail({ active, accent, onChange, refs }: RailShapeProps) {
  const core = ACTIVE_GROUPS.find((g) => g.id === "core");
  const other = ACTIVE_GROUPS.find((g) => g.id === "other");
  const peek = useRailPeek();
  const fineHover = useFineHover();
  const coreLenses = core?.lenses ?? [];
  const hiddenCount = coreLenses.filter(
    (lens) => !coreLensVisible(lens, active, false, coreLenses),
  ).length;

  return (
    <Box sx={scrollRowSx}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.45, px: 1.5 }}>
        {core ? (
          <Stack
            onMouseEnter={fineHover ? peek.onPointerEnter : undefined}
            onMouseLeave={fineHover ? peek.onPointerLeave : undefined}
            onFocus={peek.onPointerEnter}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                peek.onPointerLeave();
              }
            }}
            onKeyDown={peek.onKeyDown}
            sx={{ flexDirection: "row", alignItems: "center", gap: 0.45 }}
          >
            <GroupLabel group={core} accent={accent} />
            {core.lenses.map((lens) =>
              coreLensVisible(lens, active, peek.expanded, coreLenses) ? (
                <LensButton
                  key={lens}
                  dense
                  lens={lens}
                  active={active === lens}
                  accent={accent}
                  onSelect={() => onChange(lens)}
                  registerRef={(el) => refs.current.set(lens, el)}
                />
              ) : null,
            )}
            {hiddenCount > 0 ? (
              <PagesPeekChip
                count={hiddenCount}
                expanded={peek.expanded}
                accent={accent}
                onToggle={peek.togglePinned}
              />
            ) : null}
          </Stack>
        ) : null}

        {other ? (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 0.5, my: 0.4, borderColor: alpha(accent, 0.3) }}
            />
            <GroupLabel group={other} accent={accent} />
            <NestedOtherControl
              active={active}
              accent={accent}
              onChange={onChange}
              group={other}
            />
          </>
        ) : null}

        {ACTIVE_GROUPS.filter((g) => g.id !== "core" && g.id !== "other").map(
          (g) => (
            <React.Fragment key={g.id}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 0.5, my: 0.4, borderColor: alpha(accent, 0.3) }}
              />
              <GroupLabel group={g} accent={accent} />
              {g.lenses.map((lens) => (
                <LensButton
                  key={lens}
                  dense
                  lens={lens}
                  active={active === lens}
                  accent={accent}
                  onSelect={() => onChange(lens)}
                  registerRef={(el) => refs.current.set(lens, el)}
                />
              ))}
            </React.Fragment>
          ),
        )}
      </Stack>
    </Box>
  );
}

/* --------------------------------------------------------------- accordion */

function AccordionRail({ active, accent, onChange, refs }: RailShapeProps) {
  const activeGroup = groupOf(active)?.id ?? ACTIVE_GROUPS[0].id;
  const [order, setOrder] = React.useState<string[]>(() => [
    activeGroup,
    ...ACTIVE_GROUPS.map((g) => g.id).filter((id) => id !== activeGroup),
  ]);
  const open = new Set(order.slice(0, ACCORDION_OPEN_LIMIT));
  const surface = useSurface();
  const ink = surface.ink(accent);
  const nest = subgroupOf(active);

  function toggle(id: string) {
    setOrder((prev) => [id, ...prev.filter((x) => x !== id)]);
  }

  return (
    <Stack sx={{ gap: 0.25, py: 0.35 }}>
      {ACTIVE_GROUPS.map((g) => {
        const isOpen = open.has(g.id);
        const count = lensesInGroup(g).length;
        return (
          <Box key={g.id}>
            <Stack
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => toggle(g.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(g.id);
                }
              }}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 0.4,
                cursor: "pointer",
                borderRadius: 1,
                "&:hover": { bgcolor: alpha(accent, 0.06) },
                "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
              }}
            >
              <Box
                component={ChevronIcon}
                size={12}
                sx={{
                  color: ink,
                  transition: "transform 180ms ease",
                  transform: isOpen ? "rotate(90deg)" : "none",
                }}
              />
              <GroupLabel group={g} accent={accent} />
              {!isOpen && (
                <Typography sx={{ fontSize: 9.5, fontWeight: 600, color: "text.secondary" }}>
                  {count}
                </Typography>
              )}
            </Stack>
            {isOpen && g.subgroups ? (
              <Stack sx={{ gap: 0.75, px: 1.5, pb: 0.5 }}>
                {g.subgroups.map((sub: LensSubgroup) => (
                  <Box key={sub.id}>
                    <Typography
                      sx={{
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "text.secondary",
                        mb: 0.35,
                        px: 0.25,
                      }}
                    >
                      {sub.label}
                      {nest?.subgroup.id === sub.id ? " ·" : ""}
                    </Typography>
                    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.4 }}>
                      {sub.lenses.map((lens) => (
                        <LensButton
                          key={lens}
                          dense
                          lens={lens}
                          active={active === lens}
                          accent={accent}
                          onSelect={() => onChange(lens)}
                          registerRef={(el) => refs.current.set(lens, el)}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            ) : null}
            {isOpen && !g.subgroups ? (
              <Box sx={{ ...scrollRowSx, py: 0.2 }}>
                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.4, px: 1.5 }}>
                  {g.lenses.map((lens) => (
                    <LensButton
                      key={lens}
                      dense
                      lens={lens}
                      active={active === lens}
                      accent={accent}
                      onSelect={() => onChange(lens)}
                      registerRef={(el) => refs.current.set(lens, el)}
                    />
                  ))}
                </Stack>
              </Box>
            ) : null}
          </Box>
        );
      })}
    </Stack>
  );
}

/* ---------------------------------------------------------------- two-tier */

function TwoTierRail({ active, accent, onChange, refs }: RailShapeProps) {
  const current = groupOf(active) ?? ACTIVE_GROUPS[0];
  const surface = useSurface();
  const ink = surface.ink(accent);
  const nest = subgroupOf(active);
  const [subId, setSubId] = React.useState<string>(
    () => nest?.subgroup.id ?? current.subgroups?.[0]?.id ?? "",
  );

  React.useEffect(() => {
    if (nest?.subgroup.id) setSubId(nest.subgroup.id);
  }, [nest?.subgroup.id]);

  const activeSub =
    current.subgroups?.find((s) => s.id === subId) ?? current.subgroups?.[0];
  const lensRow = current.subgroups
    ? (activeSub?.lenses ?? [])
    : current.lenses;

  return (
    <Stack sx={{ gap: 0.2 }}>
      <Box sx={{ ...scrollRowSx, py: 0.35 }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.25, px: 1.5 }}>
          {ACTIVE_GROUPS.map((g) => {
            const on = g.id === current.id;
            return (
              <Tooltip key={g.id} title={g.blurb} arrow>
                <Typography
                  role="button"
                  tabIndex={0}
                  onClick={() => onChange(g.defaultLens)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onChange(g.defaultLens);
                    }
                  }}
                  sx={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    pb: 0.4,
                    color: on ? ink : "text.secondary",
                    borderBottom: "2px solid",
                    borderColor: on ? ink : "transparent",
                    "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
                  }}
                >
                  {g.label}
                </Typography>
              </Tooltip>
            );
          })}
        </Stack>
      </Box>

      {current.subgroups ? (
        <Box sx={{ ...scrollRowSx, py: 0.2 }}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, px: 1.5 }}>
            {current.subgroups.map((s) => {
              const on = s.id === activeSub?.id;
              return (
                <Chipish
                  key={s.id}
                  label={s.label}
                  active={on}
                  accent={accent}
                  ink={ink}
                  onClick={() => {
                    setSubId(s.id);
                    onChange(s.defaultLens);
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      ) : null}

      <Box sx={scrollRowSx}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.4, px: 1.5 }}>
          {lensRow.map((lens) => (
            <LensButton
              key={lens}
              dense
              lens={lens}
              active={active === lens}
              accent={accent}
              onSelect={() => onChange(lens)}
              registerRef={(el) => refs.current.set(lens, el)}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

function Chipish({
  label,
  active,
  accent,
  ink,
  onClick,
}: {
  label: string;
  active: boolean;
  accent: string;
  ink: string;
  onClick: () => void;
}) {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        px: 1,
        py: 0.35,
        borderRadius: 999,
        cursor: "pointer",
        border: "1px solid",
        borderColor: active ? alpha(accent, 0.45) : "transparent",
        bgcolor: active ? alpha(accent, 0.1) : "transparent",
        "&:hover": { bgcolor: "action.hover" },
        "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
      }}
    >
      <Typography
        sx={{
          fontSize: "0.68rem",
          fontWeight: active ? 800 : 600,
          color: active ? ink : "text.secondary",
          letterSpacing: 0.2,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

/* -------------------------------------------------------------------- rail */

interface RailShapeProps {
  active: Lens;
  accent: string;
  onChange: (lens: Lens) => void;
  refs: React.MutableRefObject<Map<Lens, HTMLDivElement | null>>;
}

export function LensRail({
  active,
  accent,
  layout,
  onChange,
}: {
  active: Lens;
  accent: string;
  layout: RailLayout;
  onChange: (lens: Lens) => void;
}) {
  const refs = React.useRef(new Map<Lens, HTMLDivElement | null>());
  const flat = React.useMemo(() => ACTIVE_GROUPS.flatMap(lensesInGroup), []);

  function handleKeyDown(e: React.KeyboardEvent) {
    const i = flat.indexOf(active);
    if (i < 0) return;
    let next = i;
    if (e.key === "ArrowRight") next = Math.min(flat.length - 1, i + 1);
    else if (e.key === "ArrowLeft") next = Math.max(0, i - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = flat.length - 1;
    else return;
    e.preventDefault();
    const lens = flat[next];
    onChange(lens);
    refs.current.get(lens)?.focus();
    refs.current.get(lens)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  const shared: RailShapeProps = { active, accent, onChange, refs };

  return (
    <Box role="tablist" aria-label="Profile lens" onKeyDown={handleKeyDown}>
      {layout === "grouped" && <GroupedRail {...shared} />}
      {layout === "accordion" && <AccordionRail {...shared} />}
      {layout === "two-tier" && <TwoTierRail {...shared} />}
    </Box>
  );
}
