"use client";

/**
 * StatusTargetHud — in-page HUD Display for one Mood / Aura / Gear / Buff target.
 *
 * Replaces hover popovers and Dialog-as-inspect for these four. Pin actions
 * write into the shared loadout bars when a LoadoutProvider is present.
 */

import * as React from "react";
import {
  Box,
  Button,
  Collapse,
  LinearProgress,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import {
  ACTION_BAR_KINDS,
  ACTION_BAR_META,
  type ActionBarKind,
  type LoadoutActionRef,
} from "@4eye/web/components/loadout/model/types";
import { useLoadoutOptional } from "@4eye/web/components/loadout/store/LoadoutProvider";
import { useOpenEmotionInspect } from "@4eye/web/components/hud/state";
import { lensIdForMood } from "../model/emotions";
import { SLOT_LABEL } from "../model/equipment";
import { MOOD_META, type MoodLabel } from "../model/status";
import {
  STATUS_TARGET_KIND_META,
  statusTargetKey,
  type StatusTargetRef,
} from "../model/statusTargets";
import { timeLeftLabel } from "../lib/time";
import {
  useOptionalProfileStore,
  useProfileStore,
} from "../store/CharacterProfileStore";
import {
  useCharacterAuras,
  useCharacterSeedEffects,
  useCharacterStatus,
} from "../store/useCharacterPresentation";
import { StatusTargetMark } from "./StatusTargetMark";
import { nextCost } from "./Auras";

export interface StatusTargetHudProps {
  target: StatusTargetRef;
  onClose: () => void;
  /** Glyph size in the HUD header (default 26). */
  markSize?: number;
}

function PinRow({ target }: { target: StatusTargetRef }) {
  const loadout = useLoadoutOptional();
  if (!loadout) return null;

  const actionRef: LoadoutActionRef = { kind: "status", target };
  const key = statusTargetKey(target);

  const pinnedTo = (bar: ActionBarKind) =>
    loadout.state.bars[bar].some(
      (r) => r.kind === "status" && statusTargetKey(r.target) === key,
    );

  const toggle = (bar: ActionBarKind) => {
    const list = loadout.state.bars[bar];
    const idx = list.findIndex(
      (r) => r.kind === "status" && statusTargetKey(r.target) === key,
    );
    if (idx >= 0) {
      loadout.dispatch({ type: "remove-from-bar", bar, index: idx });
    } else {
      loadout.dispatch({ type: "save-to-bar", bar, ref: actionRef });
    }
  };

  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75, mt: 1 }}>
      {ACTION_BAR_KINDS.map((bar) => {
        const meta = ACTION_BAR_META[bar];
        const on = pinnedTo(bar);
        return (
          <Button
            key={bar}
            size="small"
            variant={on ? "contained" : "outlined"}
            startIcon={<PushPinOutlinedIcon sx={{ fontSize: 14 }} />}
            onClick={() => toggle(bar)}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              fontSize: "0.68rem",
              borderColor: alpha(meta.color, 0.45),
              color: on ? "#fff" : meta.color,
              bgcolor: on ? meta.color : alpha(meta.color, 0.06),
              "&:hover": {
                bgcolor: on ? meta.color : alpha(meta.color, 0.14),
                borderColor: meta.color,
              },
            }}
          >
            {on ? `On ${meta.label}` : `Pin · ${meta.label}`}
          </Button>
        );
      })}
    </Stack>
  );
}

function MoodBody({ moodId }: { moodId: string }) {
  const status = useCharacterStatus();
  const openInspect = useOpenEmotionInspect();
  const meta = MOOD_META[moodId as keyof typeof MOOD_META];
  if (!meta) return null;

  const intensity =
    status.mood === moodId
      ? status.moodIntensity
      : status.additionalMoods?.find((m) => m.id === moodId)?.intensity ?? 50;
  const color = meta.color;

  return (
    <Stack sx={{ gap: 1 }}>
      <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "baseline" }}>
        <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: "text.secondary" }}>
          {meta.valence} · intensity
        </Typography>
        <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, color }}>{intensity}</Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={Math.min(100, intensity)}
        sx={{
          height: 6,
          borderRadius: 1,
          bgcolor: alpha(color, 0.15),
          "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 1 },
        }}
      />
      <Button
        size="small"
        variant="outlined"
        onClick={() => openInspect(lensIdForMood(moodId as MoodLabel))}
        sx={{
          alignSelf: "flex-start",
          textTransform: "none",
          fontWeight: 800,
          fontSize: "0.7rem",
          borderColor: alpha(color, 0.4),
          color,
        }}
      >
        Open Emotion Inspect
      </Button>
    </Stack>
  );
}

function AuraBody({ auraId }: { auraId: string }) {
  const auras = useCharacterAuras();
  const store = useOptionalProfileStore();
  const aura = auras.find((a) => a.id === auraId);
  if (!aura) return null;

  const level = store?.state.auraLevels[auraId] ?? aura.degrees.length - 1;
  const active = store ? !!store.state.auraActive[auraId] : true;
  const locked = level < 0;
  const degree = locked ? "Locked" : aura.degrees[level] ?? "—";
  const cost = nextCost(level, aura.degrees.length - 1);
  const color = aura.color;

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>
        {degree}
        {aura.maxPerk ? ` · ${aura.maxPerk}` : ""}
      </Typography>
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
        {!aura.alwaysOn && store && !locked && (
          <Button
            size="small"
            variant={active ? "contained" : "outlined"}
            onClick={() => store.dispatch({ type: "toggle-aura", auraId })}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              fontSize: "0.7rem",
              bgcolor: active ? color : undefined,
              borderColor: alpha(color, 0.45),
              color: active ? "#fff" : color,
            }}
          >
            {active ? "Applied" : "Apply"}
          </Button>
        )}
        {aura.alwaysOn && (
          <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, color }}>Always on</Typography>
        )}
        {store && cost != null && (
          <Button
            size="small"
            variant="outlined"
            disabled={store.state.influenceBalance < cost}
            onClick={() => store.dispatch({ type: "upgrade-aura", auraId })}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              fontSize: "0.7rem",
              borderColor: alpha(color, 0.4),
              color,
            }}
          >
            Upgrade · {cost}✦
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

function GearBody({ itemId }: { itemId: string }) {
  const { state, dispatch } = useProfileStore();
  const item = state.equippedItems.find((i) => i.id === itemId);
  if (!item) return null;
  const color = item.color;

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>
        {SLOT_LABEL[item.slot]} · {item.rarity}
      </Typography>
      {item.description && (
        <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", lineHeight: 1.45 }}>
          {item.description}
        </Typography>
      )}
      {(item.attributeBonuses?.length ?? 0) > 0 && (
        <Stack sx={{ gap: 0.25 }}>
          {item.attributeBonuses!.map((b) => (
            <Typography key={b.attributeId} sx={{ fontSize: "0.68rem", color: "text.secondary" }}>
              {b.label}{" "}
              <strong style={{ color }}>
                {b.delta > 0 ? "+" : ""}
                {b.delta}
              </strong>
            </Typography>
          ))}
        </Stack>
      )}
      <Button
        size="small"
        variant="outlined"
        onClick={() =>
          dispatch({
            type: item.equipped ? "unequip-item" : "equip-item",
            itemId: item.id,
          })
        }
        sx={{
          alignSelf: "flex-start",
          textTransform: "none",
          fontWeight: 800,
          fontSize: "0.7rem",
          borderColor: alpha(color, 0.4),
          color,
        }}
      >
        {item.equipped ? "Unequip" : "Equip"}
      </Button>
    </Stack>
  );
}

function BuffBody({ effectId }: { effectId: string }) {
  const { state } = useProfileStore();
  const seeded = useCharacterSeedEffects();
  const effect = (seeded ?? state.activeEffects).find((e) => e.id === effectId);
  if (!effect) return null;
  const color = effect.color;

  return (
    <Stack sx={{ gap: 0.5 }}>
      {effect.description && (
        <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", lineHeight: 1.45 }}>
          {effect.description}
        </Typography>
      )}
      {effect.expiresAt && (
        <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, color }}>
          {timeLeftLabel(effect.expiresAt)} remaining
        </Typography>
      )}
      {(effect.attributeModifiers?.length ?? 0) > 0 ? (
        effect.attributeModifiers!.map((m) => (
          <Typography key={m.id} sx={{ fontSize: "0.68rem", color: "text.secondary" }}>
            {m.label}{" "}
            <strong style={{ color }}>
              {m.delta > 0 ? "+" : ""}
              {m.delta}
            </strong>
          </Typography>
        ))
      ) : (
        <Typography sx={{ fontSize: "0.68rem", color: "text.secondary" }}>
          No attribute modifiers.
        </Typography>
      )}
    </Stack>
  );
}

export function StatusTargetHud({ target, onClose, markSize = 26 }: StatusTargetHudProps) {
  const kindMeta = STATUS_TARGET_KIND_META[target.kind];
  const auras = useCharacterAuras();
  const { state } = useProfileStore();
  const seeded = useCharacterSeedEffects();
  const status = useCharacterStatus();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const color =
    target.kind === "mood"
      ? MOOD_META[target.moodId]?.color ?? kindMeta.color
      : target.kind === "aura"
        ? auras.find((a) => a.id === target.auraId)?.color ?? kindMeta.color
        : target.kind === "gear"
          ? state.equippedItems.find((i) => i.id === target.itemId)?.color ?? kindMeta.color
          : (seeded ?? state.activeEffects).find((e) => e.id === target.effectId)?.color ??
            kindMeta.color;

  const label =
    target.kind === "mood"
      ? MOOD_META[target.moodId]?.label ?? target.moodId
      : target.kind === "aura"
        ? auras.find((a) => a.id === target.auraId)?.label ?? target.auraId
        : target.kind === "gear"
          ? state.equippedItems.find((i) => i.id === target.itemId)?.name ?? target.itemId
          : (seeded ?? state.activeEffects).find((e) => e.id === target.effectId)?.label ??
            target.effectId;

  const meta =
    target.kind === "mood"
      ? `${status.moodIntensity}`
      : target.kind === "aura"
        ? (() => {
            const lvl = state.auraLevels[target.auraId] ?? -1;
            const aura = auras.find((a) => a.id === target.auraId);
            return lvl < 0 ? "Locked" : aura?.degrees[lvl];
          })()
        : target.kind === "gear"
          ? SLOT_LABEL[state.equippedItems.find((i) => i.id === target.itemId)?.slot ?? "ring"]
          : (() => {
              const e = (seeded ?? state.activeEffects).find((x) => x.id === target.effectId);
              return e?.expiresAt ? timeLeftLabel(e.expiresAt) : undefined;
            })();

  const gearItem =
    target.kind === "gear" ? state.equippedItems.find((i) => i.id === target.itemId) : null;
  const effect =
    target.kind === "buff"
      ? (seeded ?? state.activeEffects).find((e) => e.id === target.effectId)
      : null;

  return (
    <Collapse in unmountOnExit>
      <Box
        role="region"
        aria-label={`${kindMeta.label}: ${label}`}
        sx={{
          mt: 1.25,
          p: 1.5,
          borderRadius: 2,
          border: "1.5px solid",
          borderColor: alpha(color, 0.45),
          bgcolor: alpha(color, 0.06),
          boxShadow: `0 0 0 1px ${alpha(color, 0.08)}, 0 8px 24px ${alpha(color, 0.12)}`,
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, mb: 1 }}>
          <Box sx={{ color, display: "flex" }}>
            <StatusTargetMark
              target={target}
              size={markSize}
              auraCatalog={auras}
              gearItem={gearItem}
              effect={effect}
            />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              sx={{
                fontSize: "0.58rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                color: "text.secondary",
              }}
            >
              {kindMeta.section} · HUD
            </Typography>
            <Typography sx={{ fontSize: "0.88rem", fontWeight: 800, color, lineHeight: 1.2 }}>
              {label}
            </Typography>
            {meta && (
              <Typography sx={{ fontSize: "0.64rem", fontWeight: 700, color: "text.secondary" }}>
                {meta}
              </Typography>
            )}
          </Box>
          <Button
            size="small"
            aria-label="Close HUD"
            onClick={onClose}
            sx={{ minWidth: 32, color: "text.secondary" }}
          >
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </Button>
        </Stack>

        {target.kind === "mood" && <MoodBody moodId={target.moodId} />}
        {target.kind === "aura" && <AuraBody auraId={target.auraId} />}
        {target.kind === "gear" && <GearBody itemId={target.itemId} />}
        {target.kind === "buff" && <BuffBody effectId={target.effectId} />}

        <PinRow target={target} />
      </Box>
    </Collapse>
  );
}
