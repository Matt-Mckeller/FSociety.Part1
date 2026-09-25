import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import TransformRoundedIcon from "@mui/icons-material/TransformRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import MovieFilterRoundedIcon from "@mui/icons-material/MovieFilterRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";
import DirectionsRunRoundedIcon from "@mui/icons-material/DirectionsRunRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import HearingRoundedIcon from "@mui/icons-material/HearingRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

export type StageStatus = "active" | "warning" | "idle";
export type PipelineStatus = "active" | "degraded" | "offline";
export type PipelineType =
  | "protection"
  | "input"
  | "review"
  | "ideation"
  | "production"
  | "publish"
  | "routine"
  | "relationship"
  | "stewardship";

/** Three body-layers. Foundational is the default spine the other two stack on. */
export type PipelineLayerId = "foundational" | "content" | "daily-life";

/**
 * Slot kinds — what the socket *is*, independent of which pipeline fills it.
 * Shape on the body and in the slot rail follows this, not the pipeline colour.
 */
export type SlotType =
  | "core"
  | "channel"
  | "filter"
  | "spark"
  | "craft"
  | "broadcast"
  | "pulse"
  | "cadence"
  | "anchor";

export type SlotShape = "circle" | "diamond" | "square" | "hex" | "pill" | "triangle";

/** Named sites on the seated 4eye (viewBox 0 0 200 300). */
export type SlotPosition =
  | "crown"
  | "visor"
  | "throat"
  | "heart"
  | "solar"
  | "root"
  | "leftHand"
  | "rightHand"
  | "feet";

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  Icon: ComponentType<SvgIconProps>;
  status: StageStatus;
}

export interface PipelineStat {
  label: string;
  value: string;
  accent?: string;
}

export interface PipelineCharacter {
  id: string;
  type: PipelineType;
  layer: PipelineLayerId;
  /** Preferred socket kind — a pipeline can only sit in a matching slot. */
  slotType: SlotType;
  /** Home slot when first equipped on this layer. */
  defaultSlotId: string;
  /** The character-class name of the pipeline. */
  name: string;
  subtext: string;
  color: string;
  Icon: ComponentType<SvgIconProps>;
  status: PipelineStatus;
  stats: PipelineStat[];
  stages: PipelineStage[];
}

export interface PipelineLayer {
  id: PipelineLayerId;
  /** Short rail label. */
  label: string;
  /** Overline — Foundational is tagged Default. */
  kicker: string;
  description: string;
  color: string;
}

export interface PipelineSlot {
  id: string;
  layer: PipelineLayerId;
  type: SlotType;
  position: SlotPosition;
  label: string;
}

export const PIPELINE_LAYERS: PipelineLayer[] = [
  {
    id: "foundational",
    label: "Foundational",
    kicker: "Default",
    description:
      "The spine. Protection, input, and review — the pipelines every other layer stands on.",
    color: "#22d3ee",
  },
  {
    id: "content",
    label: "Content creation",
    kicker: "Make",
    description: "Spark to ship. Ideation at the visor, craft in the hands, publish at the throat.",
    color: "#a78bfa",
  },
  {
    id: "daily-life",
    label: "Daily life",
    kicker: "Live",
    description: "The day's body. Rhythm in the solar, bond at the heart, hearth at the ground.",
    color: "#34d399",
  },
];

export const SLOT_POSITION_XY: Record<SlotPosition, { x: number; y: number; label: string }> = {
  crown: { x: 100, y: 12, label: "Crown" },
  visor: { x: 100, y: 44, label: "Visor" },
  throat: { x: 100, y: 86, label: "Throat" },
  heart: { x: 100, y: 122, label: "Heart" },
  solar: { x: 100, y: 152, label: "Solar" },
  root: { x: 100, y: 178, label: "Root" },
  leftHand: { x: 50, y: 202, label: "Left hand" },
  rightHand: { x: 150, y: 202, label: "Right hand" },
  feet: { x: 100, y: 230, label: "Ground" },
};

export const SLOT_TYPE_META: Record<SlotType, { label: string; shape: SlotShape }> = {
  core: { label: "Core", shape: "circle" },
  channel: { label: "Channel", shape: "square" },
  filter: { label: "Filter", shape: "diamond" },
  spark: { label: "Spark", shape: "circle" },
  craft: { label: "Craft", shape: "hex" },
  broadcast: { label: "Broadcast", shape: "triangle" },
  pulse: { label: "Pulse", shape: "circle" },
  cadence: { label: "Cadence", shape: "pill" },
  anchor: { label: "Anchor", shape: "hex" },
};

export const PIPELINE_SLOTS: PipelineSlot[] = [
  // Foundational — spine plus two off-hand sockets
  { id: "slot-f-crown", layer: "foundational", type: "filter", position: "crown", label: "Crown filter" },
  { id: "slot-f-heart", layer: "foundational", type: "channel", position: "heart", label: "Heart channel" },
  { id: "slot-f-root", layer: "foundational", type: "core", position: "root", label: "Root core" },
  { id: "slot-f-left", layer: "foundational", type: "channel", position: "leftHand", label: "Off-hand channel" },
  { id: "slot-f-right", layer: "foundational", type: "filter", position: "rightHand", label: "Off-hand filter" },
  // Content creation — visor, throat, hands, spare solar
  { id: "slot-c-visor", layer: "content", type: "spark", position: "visor", label: "Visor spark" },
  { id: "slot-c-throat", layer: "content", type: "broadcast", position: "throat", label: "Throat broadcast" },
  { id: "slot-c-right", layer: "content", type: "craft", position: "rightHand", label: "Right craft" },
  { id: "slot-c-left", layer: "content", type: "craft", position: "leftHand", label: "Left craft" },
  { id: "slot-c-solar", layer: "content", type: "channel", position: "solar", label: "Solar channel" },
  // Daily life — heart, solar, ground, spare crown and hand
  { id: "slot-d-heart", layer: "daily-life", type: "pulse", position: "heart", label: "Heart pulse" },
  { id: "slot-d-solar", layer: "daily-life", type: "cadence", position: "solar", label: "Solar cadence" },
  { id: "slot-d-feet", layer: "daily-life", type: "anchor", position: "feet", label: "Ground anchor" },
  { id: "slot-d-crown", layer: "daily-life", type: "spark", position: "crown", label: "Crown spark" },
  { id: "slot-d-hand", layer: "daily-life", type: "craft", position: "rightHand", label: "Hand craft" },
];

export const PIPELINES: PipelineCharacter[] = [
  {
    id: "pipeline-protection",
    type: "protection",
    layer: "foundational",
    slotType: "filter",
    defaultSlotId: "slot-f-crown",
    name: "Guardian",
    subtext: "Protection Pipeline · Class: Sentinel",
    color: "#ef4444",
    Icon: ShieldRoundedIcon,
    status: "active",
    stats: [
      { label: "Threats blocked", value: "1,204", accent: "#ef4444" },
      { label: "Auth success rate", value: "99.8%" },
      { label: "Avg response", value: "12 ms" },
    ],
    stages: [
      { id: "p1", name: "Authenticate", description: "Verify identity via token, session, or key", Icon: LockRoundedIcon, status: "active" },
      { id: "p2", name: "Authorize", description: "Check permission scope against policy rules", Icon: VerifiedUserRoundedIcon, status: "active" },
      { id: "p3", name: "Sanitize", description: "Strip malformed, malicious, or oversized input", Icon: BlockRoundedIcon, status: "active" },
      { id: "p4", name: "Audit", description: "Log identity, action, and result for compliance", Icon: GppGoodRoundedIcon, status: "active" },
    ],
  },
  {
    id: "pipeline-input",
    type: "input",
    layer: "foundational",
    slotType: "channel",
    defaultSlotId: "slot-f-heart",
    name: "Conduit",
    subtext: "Input Pipeline · Class: Channeler",
    color: "#3b82f6",
    Icon: DownloadRoundedIcon,
    status: "active",
    stats: [
      { label: "Events / min", value: "3,470" },
      { label: "Error rate", value: "0.4%", accent: "#f59e0b" },
      { label: "Queue depth", value: "88" },
    ],
    stages: [
      { id: "i1", name: "Ingest", description: "Accept raw payloads from upstream sources", Icon: CloudUploadRoundedIcon, status: "active" },
      { id: "i2", name: "Validate", description: "Schema check — reject malformed records early", Icon: AssignmentRoundedIcon, status: "active" },
      { id: "i3", name: "Transform", description: "Normalize, cast types, and resolve references", Icon: TransformRoundedIcon, status: "active" },
      { id: "i4", name: "Enrich", description: "Attach context, metadata, and derived signals", Icon: AutoFixHighRoundedIcon, status: "warning" },
      { id: "i5", name: "Route", description: "Fan out to the correct downstream consumer", Icon: RouteRoundedIcon, status: "active" },
    ],
  },
  {
    id: "pipeline-review",
    type: "review",
    layer: "foundational",
    slotType: "core",
    defaultSlotId: "slot-f-root",
    name: "Arbiter",
    subtext: "Review Pipeline · Class: Judge",
    color: "#f59e0b",
    Icon: RateReviewRoundedIcon,
    status: "degraded",
    stats: [
      { label: "In review", value: "24" },
      { label: "Avg review time", value: "4.2 h", accent: "#f59e0b" },
      { label: "Approval rate", value: "78%" },
    ],
    stages: [
      { id: "r1", name: "Submit", description: "Entity enters the review queue with context attached", Icon: AssignmentRoundedIcon, status: "active" },
      { id: "r2", name: "Flag", description: "Auto-triage: risk score, category, and priority assigned", Icon: FlagRoundedIcon, status: "warning" },
      { id: "r3", name: "Review", description: "Assigned reviewer evaluates with full context", Icon: GroupsRoundedIcon, status: "active" },
      { id: "r4", name: "Decide", description: "Approve, reject, or escalate with a required note", Icon: CheckCircleRoundedIcon, status: "idle" },
    ],
  },
  {
    id: "pipeline-muse",
    type: "ideation",
    layer: "content",
    slotType: "spark",
    defaultSlotId: "slot-c-visor",
    name: "Muse",
    subtext: "Ideation Pipeline · Class: Originator",
    color: "#a78bfa",
    Icon: AutoAwesomeRoundedIcon,
    status: "active",
    stats: [
      { label: "Sparks captured", value: "186" },
      { label: "Chosen this week", value: "7", accent: "#a78bfa" },
      { label: "Time-to-draft", value: "11 m" },
    ],
    stages: [
      { id: "m1", name: "Notice", description: "Catch the flicker before it talks itself out of existing", Icon: LightbulbRoundedIcon, status: "active" },
      { id: "m2", name: "Capture", description: "Get it out of the head and onto a surface that keeps it", Icon: EditNoteRoundedIcon, status: "active" },
      { id: "m3", name: "Shape", description: "Find the form — clip, post, scene, lesson — without finishing it", Icon: MovieFilterRoundedIcon, status: "active" },
      { id: "m4", name: "Choose", description: "Pick the one that ships this cycle. The rest wait without dying", Icon: CenterFocusStrongRoundedIcon, status: "warning" },
    ],
  },
  {
    id: "pipeline-forge",
    type: "production",
    layer: "content",
    slotType: "craft",
    defaultSlotId: "slot-c-right",
    name: "Forge",
    subtext: "Production Pipeline · Class: Maker",
    color: "#14b8a6",
    Icon: ConstructionRoundedIcon,
    status: "active",
    stats: [
      { label: "Cuts this week", value: "12" },
      { label: "Avg edit pass", value: "2.4", accent: "#14b8a6" },
      { label: "Ready to ship", value: "3" },
    ],
    stages: [
      { id: "f1", name: "Draft", description: "Make the ugly first version while the idea is still hot", Icon: EditNoteRoundedIcon, status: "active" },
      { id: "f2", name: "Cut", description: "Remove everything that is not the point", Icon: ContentCutRoundedIcon, status: "active" },
      { id: "f3", name: "Polish", description: "Sound, colour, pacing — the last 10% that reads as care", Icon: MovieFilterRoundedIcon, status: "warning" },
      { id: "f4", name: "Package", description: "Title, thumbnail, caption — the thing people actually click", Icon: Inventory2RoundedIcon, status: "active" },
    ],
  },
  {
    id: "pipeline-beacon",
    type: "publish",
    layer: "content",
    slotType: "broadcast",
    defaultSlotId: "slot-c-throat",
    name: "Beacon",
    subtext: "Publish Pipeline · Class: Herald",
    color: "#f59e0b",
    Icon: CampaignRoundedIcon,
    status: "active",
    stats: [
      { label: "Live this week", value: "5" },
      { label: "Reach 24h", value: "48k", accent: "#f59e0b" },
      { label: "Learn-backs", value: "9" },
    ],
    stages: [
      { id: "b1", name: "Stage", description: "Queue the package against the calendar and the audience clock", Icon: Inventory2RoundedIcon, status: "active" },
      { id: "b2", name: "Release", description: "Hit publish. Do not hover. The work is already decided", Icon: RocketLaunchRoundedIcon, status: "active" },
      { id: "b3", name: "Circulate", description: "Put it where the people actually are, not where it is convenient", Icon: ShareRoundedIcon, status: "active" },
      { id: "b4", name: "Learn", description: "Read what landed. Feed it back to Muse, not to the ego", Icon: InsightsRoundedIcon, status: "idle" },
    ],
  },
  {
    id: "pipeline-rhythm",
    type: "routine",
    layer: "daily-life",
    slotType: "cadence",
    defaultSlotId: "slot-d-solar",
    name: "Rhythm",
    subtext: "Routine Pipeline · Class: Keeper",
    color: "#22c55e",
    Icon: ReplayRoundedIcon,
    status: "active",
    stats: [
      { label: "Days kept", value: "18" },
      { label: "Morning hit rate", value: "83%", accent: "#22c55e" },
      { label: "Rest debt", value: "2.1 h" },
    ],
    stages: [
      { id: "y1", name: "Wake", description: "Start the day on purpose, not by accident of the phone", Icon: WbTwilightRoundedIcon, status: "active" },
      { id: "y2", name: "Aim", description: "Name the one thing the day is for before the inbox names it", Icon: CenterFocusStrongRoundedIcon, status: "active" },
      { id: "y3", name: "Move", description: "Body first, then the work — the order that keeps both", Icon: DirectionsRunRoundedIcon, status: "warning" },
      { id: "y4", name: "Rest", description: "Stop while there is still a tomorrow to spend", Icon: HotelRoundedIcon, status: "idle" },
    ],
  },
  {
    id: "pipeline-bond",
    type: "relationship",
    layer: "daily-life",
    slotType: "pulse",
    defaultSlotId: "slot-d-heart",
    name: "Bond",
    subtext: "Relationship Pipeline · Class: Companion",
    color: "#e11d48",
    Icon: FavoriteRoundedIcon,
    status: "active",
    stats: [
      { label: "Reached today", value: "3" },
      { label: "Unrepaired", value: "1", accent: "#e11d48" },
      { label: "Held this week", value: "6" },
    ],
    stages: [
      { id: "o1", name: "Notice", description: "See the person in front of you, not the version in your head", Icon: HearingRoundedIcon, status: "active" },
      { id: "o2", name: "Reach", description: "Make contact — a message, a look, a meal — before the gap grows", Icon: HandshakeRoundedIcon, status: "active" },
      { id: "o3", name: "Hold", description: "Stay in the room once it is no longer convenient", Icon: VolunteerActivismRoundedIcon, status: "active" },
      { id: "o4", name: "Repair", description: "Name the break and close it. Unrepaired bonds become weather", Icon: FavoriteRoundedIcon, status: "warning" },
    ],
  },
  {
    id: "pipeline-hearth",
    type: "stewardship",
    layer: "daily-life",
    slotType: "anchor",
    defaultSlotId: "slot-d-feet",
    name: "Hearth",
    subtext: "Body & home Pipeline · Class: Steward",
    color: "#d97706",
    Icon: HomeRoundedIcon,
    status: "active",
    stats: [
      { label: "Meals real", value: "4 / 6" },
      { label: "Home reset", value: "2 d ago" },
      { label: "Recovery", value: "61%", accent: "#d97706" },
    ],
    stages: [
      { id: "h1", name: "Fuel", description: "Eat like a body that has work tomorrow, not a machine that can wait", Icon: RestaurantRoundedIcon, status: "active" },
      { id: "h2", name: "Shelter", description: "Keep the room a place you can think in — clutter is a tax", Icon: HomeRoundedIcon, status: "warning" },
      { id: "h3", name: "Recover", description: "Sleep, water, quiet — the unglamorous stack that funds the rest", Icon: SpaRoundedIcon, status: "active" },
      { id: "h4", name: "Return", description: "Come back to the work from a body that can actually do it", Icon: ReplayRoundedIcon, status: "idle" },
    ],
  },
];

export const STAGE_STATUS_COLOR: Record<StageStatus, string> = {
  active: "#22c55e",
  warning: "#f59e0b",
  idle: "#64748b",
};

export const PIPELINE_STATUS_META: Record<PipelineStatus, { label: string; color: string }> = {
  active: { label: "Active", color: "#22c55e" },
  degraded: { label: "Degraded", color: "#f59e0b" },
  offline: { label: "Offline", color: "#ef4444" },
};

/** Slot count on a layer before a purchased extra. Each layer ships five sockets. */
export const MAX_EQUIP_SLOTS = 5;

/** slotId → pipelineId. Null / missing means empty. */
export type PipelineFill = Record<string, string | null>;

const FOUNDATIONAL_FILL: PipelineFill = {
  "slot-f-crown": "pipeline-protection",
  "slot-f-heart": "pipeline-input",
  "slot-f-root": "pipeline-review",
  "slot-f-left": null,
  "slot-f-right": null,
};

const CONTENT_FILL: PipelineFill = {
  "slot-c-visor": "pipeline-muse",
  "slot-c-throat": "pipeline-beacon",
  "slot-c-right": "pipeline-forge",
  "slot-c-left": null,
  "slot-c-solar": null,
};

const DAILY_FILL: PipelineFill = {
  "slot-d-heart": "pipeline-bond",
  "slot-d-solar": "pipeline-rhythm",
  "slot-d-feet": "pipeline-hearth",
  "slot-d-crown": null,
  "slot-d-hand": null,
};

/** Matthew: full foundational + the content stack + daily rhythm. */
export const MATTHEW_PIPELINE_FILL: PipelineFill = {
  ...FOUNDATIONAL_FILL,
  ...CONTENT_FILL,
  ...DAILY_FILL,
  "slot-d-heart": null,
  "slot-d-feet": null,
};

/** Janna: daily-life loadout, Conduit on the spine, Muse at the visor. */
export const JANNA_PIPELINE_FILL: PipelineFill = {
  "slot-f-crown": null,
  "slot-f-heart": "pipeline-input",
  "slot-f-root": null,
  "slot-f-left": null,
  "slot-f-right": null,
  "slot-c-visor": "pipeline-muse",
  "slot-c-throat": null,
  "slot-c-right": null,
  "slot-c-left": null,
  "slot-c-solar": null,
  ...DAILY_FILL,
};

/** Emily: bond + hearth, light foundational protection. */
export const EMILY_PIPELINE_FILL: PipelineFill = {
  "slot-f-crown": "pipeline-protection",
  "slot-f-heart": null,
  "slot-f-root": null,
  "slot-f-left": null,
  "slot-f-right": null,
  "slot-c-visor": null,
  "slot-c-throat": null,
  "slot-c-right": null,
  "slot-c-left": null,
  "slot-c-solar": null,
  "slot-d-heart": "pipeline-bond",
  "slot-d-solar": "pipeline-rhythm",
  "slot-d-feet": "pipeline-hearth",
  "slot-d-crown": null,
  "slot-d-hand": null,
};

export const DEFAULT_PIPELINE_FILL: PipelineFill = { ...MATTHEW_PIPELINE_FILL };

export const PIPELINE_FILL_BY_PROFILE: Record<string, PipelineFill> = {
  PROFILE_MATTHEW: MATTHEW_PIPELINE_FILL,
  PROFILE_JANNA: JANNA_PIPELINE_FILL,
  PROFILE_EMILY: EMILY_PIPELINE_FILL,
};

export function emptyFill(): PipelineFill {
  const fill: PipelineFill = {};
  for (const slot of PIPELINE_SLOTS) fill[slot.id] = null;
  return fill;
}

export function fillForProfile(profileId: string | undefined): PipelineFill {
  return { ...(PIPELINE_FILL_BY_PROFILE[profileId ?? ""] ?? DEFAULT_PIPELINE_FILL) };
}

export function slotsForLayer(layer: PipelineLayerId): PipelineSlot[] {
  return PIPELINE_SLOTS.filter((s) => s.layer === layer);
}

export function pipelinesForLayer(layer: PipelineLayerId): PipelineCharacter[] {
  return PIPELINES.filter((p) => p.layer === layer);
}

/** Pipelines that can sit in this socket (same layer + slot type). */
export function pipelinesForSlot(slot: PipelineSlot): PipelineCharacter[] {
  return PIPELINES.filter((p) => p.layer === slot.layer && p.slotType === slot.type);
}

export function pipelineById(id: string | null | undefined): PipelineCharacter | undefined {
  if (!id) return undefined;
  return PIPELINES.find((p) => p.id === id);
}

export function isPipelineEquipped(fill: PipelineFill, pipelineId: string): boolean {
  return Object.values(fill).includes(pipelineId);
}

export function unequippedPipelines(fill: PipelineFill): PipelineCharacter[] {
  return PIPELINES.filter((p) => !isPipelineEquipped(fill, p.id));
}

export function equippedOnLayer(fill: PipelineFill, layer: PipelineLayerId): PipelineCharacter[] {
  return slotsForLayer(layer)
    .map((slot) => pipelineById(fill[slot.id]))
    .filter((p): p is PipelineCharacter => Boolean(p));
}

export function equippedAll(fill: PipelineFill): Array<{ slot: PipelineSlot; pipeline: PipelineCharacter }> {
  return PIPELINE_SLOTS.flatMap((slot) => {
    const pipeline = pipelineById(fill[slot.id]);
    return pipeline ? [{ slot, pipeline }] : [];
  });
}
