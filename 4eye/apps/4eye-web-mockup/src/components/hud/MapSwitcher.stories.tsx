"use client";

import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Popover,
  Typography,
  alpha,
  keyframes,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import BlurOnRoundedIcon from "@mui/icons-material/BlurOnRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import TabRoundedIcon from "@mui/icons-material/TabRounded";
import TabUnselectedRoundedIcon from "@mui/icons-material/TabUnselectedRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DensitySmallRoundedIcon from "@mui/icons-material/DensitySmallRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { useState, type ComponentType, useRef, useEffect } from "react";
import { MapSwitcher } from "./MapSwitcher";
import { ActiveMapProvider } from "./state";
import type { ActiveMapKey } from "./mapContent/types";

// =============================================================================
// Shared tokens
// =============================================================================

const DARK_PILL_SX = {
  background:
    "linear-gradient(135deg, #071527 0%, #0d2347 55%, #071e3d 100%)",
  border: "1px solid rgba(100,160,255,0.22)",
  boxShadow:
    "0 2px 24px rgba(5,20,60,0.9), inset 0 1px 0 rgba(150,200,255,0.08)",
} as const;

const PILL_BG_SX = {
  background:
    "linear-gradient(135deg, #0d1117 0%, #161b22 55%, #0d1117 100%)",
  border: "1px solid rgba(99,179,237,0.22)",
  boxShadow:
    "0 4px 24px rgba(0,0,10,0.8), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.5)",
} as const;

const doubleStrike = keyframes`
  0%   { background-position: -160% 50% }
  24%  { background-position: 240% 50%  }
  100% { background-position: 240% 50%  }
`;

const ICE_VEIN_SX = {
  display: "inline-block",
  background:
    "linear-gradient(115deg, #dbeafe 0%, #e5e7eb 28%, #ffffff 33%, #dbeafe 38%, #dbeafe 50%, #ffffff 55%, #dbeafe 60%, #dbeafe 100%)",
  backgroundSize: "300% 100%",
  backgroundPosition: "-160% 50%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: `${doubleStrike} 7s ease-in-out infinite`,
  animationDelay: "8s",
} as const;

// =============================================================================
// Shared types
// =============================================================================

type IconC = ComponentType<{ sx?: object }>;

interface RealmCluster {
  primary: IconC;
  secondary?: IconC;
  tertiary?: IconC;
  label: string;
}

// =============================================================================
// GalleryChip — used in Section C / D showcase
// =============================================================================

function GalleryChip({
  cluster,
  active,
  Chevron,
  carouselIndicator,
  noChevron,
}: {
  cluster: RealmCluster;
  active: boolean;
  Chevron?: IconC;
  carouselIndicator?: boolean;
  noChevron?: boolean;
}) {
  const { primary: P, secondary: S, tertiary: T, label } = cluster;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.25,
        py: 0.5,
        borderRadius: 99,
        bgcolor: active ? "rgba(255,255,255,0.14)" : "transparent",
      }}
    >
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.35 }}>
        <P sx={{ fontSize: 18, color: "#93c5fd", flexShrink: 0 }} />
        {S && <S sx={{ fontSize: 13, color: "#93c5fd", opacity: 0.85, flexShrink: 0 }} />}
        {T && <T sx={{ fontSize: 11, color: "#93c5fd", opacity: 0.6, flexShrink: 0 }} />}
      </Box>
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, letterSpacing: 0.4, lineHeight: 1, ...ICE_VEIN_SX }}
      >
        {label}
      </Typography>
      {active && !noChevron && (
        carouselIndicator ? (
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.3, ml: 0.25 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "#93c5fd",
                  opacity: i === 0 ? 1 : 0.35,
                }}
              />
            ))}
          </Box>
        ) : Chevron ? (
          <Chevron sx={{ fontSize: 14, color: "#93c5fd", opacity: 0.7 }} />
        ) : null
      )}
    </Box>
  );
}

function RealmRow({
  variant,
}: {
  variant: {
    website: RealmCluster;
    app: RealmCluster;
    technical: RealmCluster;
    Chevron?: IconC;
    carouselIndicator?: boolean;
    noChevron?: boolean;
  };
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1.25,
        py: 0.75,
        borderRadius: 99,
        ...DARK_PILL_SX,
      }}
    >
      <GalleryChip
        cluster={variant.website}
        active
        Chevron={variant.Chevron}
        carouselIndicator={variant.carouselIndicator}
        noChevron={variant.noChevron}
      />
      <GalleryChip cluster={variant.app} active={false} />
      <GalleryChip cluster={variant.technical} active={false} />
    </Box>
  );
}

function CollapsedOnlyChip({
  cluster,
  Chevron,
}: {
  cluster: RealmCluster;
  Chevron?: IconC;
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1.25,
        py: 0.75,
        borderRadius: 99,
        ...DARK_PILL_SX,
      }}
    >
      <GalleryChip cluster={cluster} active Chevron={Chevron} />
    </Box>
  );
}

// =============================================================================
// Section C clusters — chosen direction
// =============================================================================

const WEBSITE_PICK: RealmCluster = {
  primary: BlurOnRoundedIcon,
  secondary: DialpadRoundedIcon,
  label: "Website",
};

const APP_PICK: RealmCluster = {
  primary: RocketLaunchRoundedIcon,
  secondary: DashboardRoundedIcon,
  tertiary: BoltRoundedIcon,
  label: "App",
};

const TECH_PICK: RealmCluster = {
  primary: SchemaRoundedIcon,
  secondary: AccountTreeRoundedIcon,
  tertiary: DataObjectRoundedIcon,
  label: "Technical",
};

// =============================================================================
// Section D — static cluster options
// =============================================================================

const STATIC_CLUSTERS: {
  n: number;
  title: string;
  note: string;
  cluster: Omit<RealmCluster, "label">;
}[] = [
  {
    n: 201,
    title: "D1 · Layers + BlurOn + Dialpad",
    note: "The live MapSwitcher cluster — always-static chrome, label only changes.",
    cluster: {
      primary: LayersRoundedIcon,
      secondary: BlurOnRoundedIcon,
      tertiary: DialpadRoundedIcon,
    },
  },
  {
    n: 202,
    title: "D2 · BlurOn + Dialpad",
    note: "2-icon minimal — dot-matrix + keypad.",
    cluster: { primary: BlurOnRoundedIcon, secondary: DialpadRoundedIcon },
  },
  {
    n: 203,
    title: "D3 · Tab + Apps",
    note: "Browser-tab glyph + 3×3 grid — generic workspace chrome.",
    cluster: { primary: TabRoundedIcon, secondary: AppsRoundedIcon },
  },
  {
    n: 204,
    title: "D4 · TabUnselected + GridView",
    note: "Outline tab + 2×2 grid — lighter, framing chrome.",
    cluster: { primary: TabUnselectedRoundedIcon, secondary: GridViewRoundedIcon },
  },
  {
    n: 205,
    title: "D5 · Dots",
    note: "Three filled circles — minimal switcher mark.",
    cluster: {
      primary: () => (
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.4 }}>
          <FiberManualRecordRoundedIcon sx={{ fontSize: 8, color: "#93c5fd", opacity: 0.5 }} />
          <FiberManualRecordRoundedIcon sx={{ fontSize: 12, color: "#93c5fd" }} />
          <FiberManualRecordRoundedIcon sx={{ fontSize: 8, color: "#93c5fd", opacity: 0.5 }} />
        </Box>
      ),
    },
  },
  {
    n: 206,
    title: "D6 · ViewModule + Storage",
    note: "Tile grid + storage bars — multi-surface index chrome.",
    cluster: { primary: ViewModuleRoundedIcon, secondary: StorageRoundedIcon },
  },
];

// =============================================================================
// Showcase cards
// =============================================================================

function ShowcaseCard({
  n,
  title,
  desc,
  children,
}: {
  n: number;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        border: "1px solid #e2e8f0",
        bgcolor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 800, color: "#94a3b8", fontFamily: "monospace", lineHeight: 1 }}
        >
          {String(n).padStart(3, "0")}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b" }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ color: "#64748b", lineHeight: 1.5 }}>
        {desc}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", pt: 0.5 }}>
        {children}
      </Box>
    </Box>
  );
}

// =============================================================================
// IconClusterShowcase — Section C + D combined
// =============================================================================

function IconClusterShowcase() {
  return (
    <Box sx={{ p: 4, maxWidth: 760, mx: "auto" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: "#1e293b" }}>
        MapSwitcher — Icon Cluster
      </Typography>
      <Typography variant="body2" sx={{ color: "#64748b", mb: 4, lineHeight: 1.6 }}>
        Final chosen direction for the realm-switcher pill. The icon cluster on the left is
        always static — only the text label changes when you switch realms. The live
        interactive prototype is in the <strong>Interactive Pill</strong> story.
      </Typography>

      {/* Section C — chosen clusters, all active states */}
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0f172a", mb: 0.25 }}>
        Section C · Chosen clusters — expanded pill states
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "#64748b", display: "block", mb: 2, lineHeight: 1.5 }}
      >
        BlurOn + Dialpad for Website · Rocket + Dashboard + Bolt for App ·
        Schema + AccountTree + DataObject for Technical
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, mb: 5 }}>
        <ShowcaseCard n={101} title="Expanded — Website active" desc="All 3 chips visible; active chip carries the chevron.">
          <RealmRow
            variant={{
              website: WEBSITE_PICK,
              app: APP_PICK,
              technical: TECH_PICK,
              Chevron: KeyboardArrowDownRoundedIcon,
            }}
          />
        </ShowcaseCard>
        <ShowcaseCard n={102} title="Expanded — App active" desc="App chip carries the chevron; Website + Technical inactive.">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1.25,
              py: 0.75,
              borderRadius: 99,
              ...DARK_PILL_SX,
            }}
          >
            <GalleryChip cluster={WEBSITE_PICK} active={false} />
            <GalleryChip cluster={APP_PICK} active Chevron={KeyboardArrowDownRoundedIcon} />
            <GalleryChip cluster={TECH_PICK} active={false} />
          </Box>
        </ShowcaseCard>
        <ShowcaseCard n={103} title="Expanded — Technical active" desc="Technical chip carries the chevron; 3-icon cluster reads together.">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1.25,
              py: 0.75,
              borderRadius: 99,
              ...DARK_PILL_SX,
            }}
          >
            <GalleryChip cluster={WEBSITE_PICK} active={false} />
            <GalleryChip cluster={APP_PICK} active={false} />
            <GalleryChip cluster={TECH_PICK} active Chevron={KeyboardArrowDownRoundedIcon} />
          </Box>
        </ShowcaseCard>
        <ShowcaseCard n={104} title="Collapsed — Website" desc="Single-chip resting state. BlurOn + Dialpad + Website label + chevron.">
          <CollapsedOnlyChip cluster={WEBSITE_PICK} Chevron={KeyboardArrowDownRoundedIcon} />
        </ShowcaseCard>
        <ShowcaseCard n={105} title="Collapsed — App" desc="Single-chip resting state for the App realm.">
          <CollapsedOnlyChip cluster={APP_PICK} Chevron={KeyboardArrowDownRoundedIcon} />
        </ShowcaseCard>
        <ShowcaseCard n={106} title="Collapsed — Technical" desc="Single-chip resting state; 3-icon cluster in a compact pill.">
          <CollapsedOnlyChip cluster={TECH_PICK} Chevron={KeyboardArrowDownRoundedIcon} />
        </ShowcaseCard>
      </Box>

      {/* Section D — static cluster alternatives */}
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0f172a", mb: 0.25 }}>
        Section D · Static cluster alternatives
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "#64748b", display: "block", mb: 2, lineHeight: 1.5 }}
      >
        Each card shows the same cluster labelled Website / App / Technical so you can judge
        how stable the chrome feels across label switches.
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
        {STATIC_CLUSTERS.map((sc) => (
          <ShowcaseCard key={sc.n} n={sc.n} title={sc.title} desc={sc.note}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              {(["Website", "App", "Technical"] as const).map((lbl) => (
                <CollapsedOnlyChip
                  key={lbl}
                  cluster={{ ...sc.cluster, label: lbl }}
                  Chevron={KeyboardArrowDownRoundedIcon}
                />
              ))}
            </Box>
          </ShowcaseCard>
        ))}
      </Box>
    </Box>
  );
}

// =============================================================================
// Domains — for the interactive Layers picker
// =============================================================================

const DOMAINS = [
  { id: "learning",  label: "Learning",  color: "#6b9bd2" },
  { id: "work",      label: "Work",      color: "#7ec8a4" },
  { id: "life",      label: "Life",      color: "#f4a261" },
  { id: "marketing", label: "Marketing", color: "#c97ed4" },
  { id: "game",      label: "Game",      color: "#e8b86d" },
] as const;

type DomainId = (typeof DOMAINS)[number]["id"];
type Domain = (typeof DOMAINS)[number];

const REALM_OPTIONS = [
  { id: "website",   label: "Website",   Icon: TravelExploreRoundedIcon },
  { id: "app",       label: "App",       Icon: RocketLaunchRoundedIcon },
  { id: "technical", label: "Technical", Icon: SchemaRoundedIcon },
] as const;

type RealmId = (typeof REALM_OPTIONS)[number]["id"];
type RealmOption = (typeof REALM_OPTIONS)[number];

// =============================================================================
// InteractivePill component
// =============================================================================

function InteractivePillComponent() {
  const [selectedDomain, setSelectedDomain] = useState<Domain>(DOMAINS[0]);
  const [selectedRealm, setSelectedRealm] = useState<RealmOption>(REALM_OPTIONS[0]);
  const [expanded, setExpanded] = useState(false);

  const [domainAnchor, setDomainAnchor] = useState<HTMLElement | null>(null);
  const [realmAnchor, setRealmAnchor] = useState<HTMLElement | null>(null);
  const [blurAnchor, setBlurAnchor] = useState<HTMLElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Collapse realm expansion on outside click
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setExpanded(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [expanded]);

  const iconBtnSx = {
    all: "unset" as const,
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "4px",
    p: "2px",
    transition: "background 150ms ease",
    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
    "&:focus-visible": { outline: "1px solid rgba(147,197,253,0.55)", borderRadius: "4px" },
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.75,
        borderRadius: 999,
        ...PILL_BG_SX,
      }}
    >
      {/* ── Icon cluster ─────────────────────────────────────────── */}
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
        {/* Layers + domain dot */}
        <Box
          component="button"
          aria-label="Select domain"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            setDomainAnchor(e.currentTarget)
          }
          sx={{ ...iconBtnSx, position: "relative" }}
        >
          <LayersRoundedIcon sx={{ fontSize: 16, color: "#ffffff" }} />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: -1,
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: selectedDomain.color,
              border: "1.5px solid #0d1117",
              transition: "background-color 200ms ease",
            }}
          />
        </Box>

        {/* BlurOn */}
        <Box
          component="button"
          aria-label="Context slot"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            setBlurAnchor(e.currentTarget)
          }
          sx={iconBtnSx}
        >
          <BlurOnRoundedIcon sx={{ fontSize: 14, color: "#ffffff", opacity: 0.9 }} />
        </Box>

        {/* Dialpad — realm picker */}
        <Box
          component="button"
          aria-label="Select realm"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            setRealmAnchor(e.currentTarget)
          }
          sx={iconBtnSx}
        >
          <DialpadRoundedIcon sx={{ fontSize: 13, color: "#ffffff", opacity: 0.82 }} />
        </Box>
      </Box>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <Box
        sx={{
          width: "1px",
          height: 14,
          bgcolor: "rgba(255,255,255,0.28)",
          flexShrink: 0,
          mx: 0.75,
        }}
      />

      {/* ── Realm label / expand area ─────────────────────────────── */}
      <AnimatePresence initial={false} mode="popLayout">
        {!expanded ? (
          <Box
            key="collapsed"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => setExpanded(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded(true);
              }
            }}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              cursor: "pointer",
              outline: "none",
              "&:focus-visible": {
                outline: "1px solid rgba(147,197,253,0.55)",
                borderRadius: "4px",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                lineHeight: 1,
                userSelect: "none",
                ...ICE_VEIN_SX,
              }}
            >
              {selectedRealm.label}
            </Typography>
            <ChevronRightRoundedIcon
              sx={{ fontSize: 12, color: "#ffffff", opacity: 0.7, flexShrink: 0 }}
            />
          </Box>
        ) : (
          <Box
            key="expanded"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            sx={{ display: "inline-flex", alignItems: "center", gap: "2px" }}
          >
            {REALM_OPTIONS.map((realm, i) => (
              <Box
                key={realm.id}
                sx={{ display: "inline-flex", alignItems: "center", gap: "2px" }}
              >
                {i > 0 && (
                  <ChevronRightRoundedIcon
                    sx={{
                      fontSize: 12,
                      color: "#ffffff",
                      opacity: 0.34,
                      flexShrink: 0,
                      mx: "-1px",
                    }}
                  />
                )}
                <Typography
                  component="span"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRealm(realm);
                    setExpanded(false);
                  }}
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    lineHeight: 1,
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "opacity 180ms ease",
                    ...(realm.id === selectedRealm.id
                      ? ICE_VEIN_SX
                      : {
                          color: "#ffffff",
                          opacity: 0.58,
                          "&:hover": { opacity: 0.82 },
                        }),
                  }}
                >
                  {realm.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </AnimatePresence>

      {/* ── Domain picker popover ─────────────────────────────────── */}
      <Popover
        open={Boolean(domainAnchor)}
        anchorEl={domainAnchor}
        onClose={() => setDomainAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              bgcolor: "#0d1117",
              border: "1px solid rgba(99,179,237,0.22)",
              borderRadius: 2,
              boxShadow: "0 8px 32px rgba(0,0,10,0.7)",
              overflow: "hidden",
              minWidth: 160,
            },
          },
        }}
      >
        <Box sx={{ py: 0.5 }}>
          <Typography
            sx={{
              px: 1.5,
              py: 0.75,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.8,
              color: "rgba(147,197,253,0.5)",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            Domain
          </Typography>
          {DOMAINS.map((d) => (
            <Box
              key={d.id}
              onClick={() => {
                setSelectedDomain(d);
                setDomainAnchor(null);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: 1.5,
                py: 0.875,
                cursor: "pointer",
                bgcolor:
                  d.id === selectedDomain.id
                    ? "rgba(255,255,255,0.06)"
                    : "transparent",
                "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                transition: "background 120ms ease",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: d.color,
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${alpha(d.color, 0.5)}`,
                }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color:
                    d.id === selectedDomain.id
                      ? "#ffffff"
                      : "rgba(255,255,255,0.7)",
                  flex: 1,
                }}
              >
                {d.label}
              </Typography>
              {d.id === selectedDomain.id && (
                <CheckRoundedIcon
                  sx={{ fontSize: 13, color: d.color, flexShrink: 0 }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Popover>

      {/* ── Realm picker (Dialpad) popover ────────────────────────── */}
      <Popover
        open={Boolean(realmAnchor)}
        anchorEl={realmAnchor}
        onClose={() => setRealmAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              bgcolor: "#0d1117",
              border: "1px solid rgba(99,179,237,0.22)",
              borderRadius: 2,
              boxShadow: "0 8px 32px rgba(0,0,10,0.7)",
              overflow: "hidden",
              minWidth: 160,
            },
          },
        }}
      >
        <Box sx={{ py: 0.5 }}>
          <Typography
            sx={{
              px: 1.5,
              py: 0.75,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.8,
              color: "rgba(147,197,253,0.5)",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            Realm
          </Typography>
          {REALM_OPTIONS.map((r) => {
            const Icon = r.Icon;
            return (
              <Box
                key={r.id}
                onClick={() => {
                  setSelectedRealm(r);
                  setRealmAnchor(null);
                  setExpanded(false);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  px: 1.5,
                  py: 0.875,
                  cursor: "pointer",
                  bgcolor:
                    r.id === selectedRealm.id
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                  transition: "background 120ms ease",
                }}
              >
                <Icon
                  sx={{
                    fontSize: 15,
                    color:
                      r.id === selectedRealm.id
                        ? "#93c5fd"
                        : "rgba(147,197,253,0.55)",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color:
                      r.id === selectedRealm.id
                        ? "#ffffff"
                        : "rgba(255,255,255,0.7)",
                    flex: 1,
                  }}
                >
                  {r.label}
                </Typography>
                {r.id === selectedRealm.id && (
                  <CheckRoundedIcon
                    sx={{ fontSize: 13, color: "#93c5fd", flexShrink: 0 }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Popover>

      {/* ── BlurOn info popover ───────────────────────────────────── */}
      <Popover
        open={Boolean(blurAnchor)}
        anchorEl={blurAnchor}
        onClose={() => setBlurAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              bgcolor: "#0d1117",
              border: "1px solid rgba(99,179,237,0.22)",
              borderRadius: 2,
              boxShadow: "0 8px 32px rgba(0,0,10,0.7)",
              p: 1.75,
              maxWidth: 220,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
          <BlurOnRoundedIcon sx={{ fontSize: 16, color: "rgba(147,197,253,0.7)" }} />
          <Typography
            sx={{ fontSize: 12, fontWeight: 700, color: "#ffffff" }}
          >
            Context Slot
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}
        >
          This slot is open — see{" "}
          <Box component="span" sx={{ color: "#93c5fd", fontWeight: 600 }}>
            BlurOn Concepts
          </Box>{" "}
          story for semantic options.
        </Typography>
      </Popover>
    </Box>
  );
}

// =============================================================================
// InteractivePill story wrapper
// =============================================================================

function InteractivePillStory() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0d1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <InteractivePillComponent />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
        <Typography
          variant="caption"
          sx={{
            color: "rgba(147,197,253,0.4)",
            fontFamily: "monospace",
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          Click{" "}
          <Box component="span" sx={{ color: "rgba(147,197,253,0.7)" }}>
            Layers
          </Box>{" "}
          to pick a domain ·{" "}
          <Box component="span" sx={{ color: "rgba(147,197,253,0.7)" }}>
            Dialpad
          </Box>{" "}
          to pick a realm ·{" "}
          <Box component="span" sx={{ color: "rgba(147,197,253,0.7)" }}>
            label
          </Box>{" "}
          to expand
        </Typography>
      </Box>

      {/* Domain swatches reference */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 1,
          px: 2,
          py: 1,
          borderRadius: 2,
          border: "1px solid rgba(99,179,237,0.1)",
          bgcolor: "rgba(99,179,237,0.03)",
        }}
      >
        {DOMAINS.map((d) => (
          <Box key={d.id} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: d.color,
              }}
            />
            <Typography
              sx={{
                fontSize: 10,
                color: "rgba(255,255,255,0.45)",
                fontFamily: "monospace",
                letterSpacing: 0.3,
              }}
            >
              {d.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// =============================================================================
// BlurOn Concepts
// =============================================================================

interface BlurConceptDef {
  id: string;
  title: string;
  rationale: string;
  accentColor: string;
  Icon: IconC;
  DemoIcon?: IconC;
  demoOptions?: string[];
}

const BLUR_CONCEPTS: BlurConceptDef[] = [
  {
    id: "focus",
    title: "Focus Mode",
    rationale:
      "BlurOn = current attention state. Ambient (blurred) ↔ Sharp (focused). 4eye is built around focus — this slot surfaces the mode the user is in right now.",
    accentColor: "#6b9bd2",
    Icon: CenterFocusStrongRoundedIcon,
    demoOptions: ["Ambient", "Focused", "Deep Work"],
  },
  {
    id: "ai",
    title: "AI Lens",
    rationale:
      "BlurOn = AI augmentation level. Blur = more AI assistance; no blur = manual/raw view. Surfaces how much Claude is mediating what the user sees.",
    accentColor: "#c97ed4",
    Icon: AutoAwesomeRoundedIcon,
    demoOptions: ["Manual", "Assisted", "Guided"],
  },
  {
    id: "density",
    title: "View Density",
    rationale:
      "BlurOn = information density toggle. Blur = overview/macro, sharp = detail/micro. Maps well to the map metaphor: zoom in vs zoom out.",
    accentColor: "#7ec8a4",
    Icon: DensitySmallRoundedIcon,
    demoOptions: ["Overview", "Standard", "Detail"],
  },
  {
    id: "environment",
    title: "Environment Context",
    rationale:
      "BlurOn = current working context (where the user is physically). Surfaces IRL environment so 4eye can adapt — e.g. in school vs at home vs mobile.",
    accentColor: "#e8b86d",
    Icon: PlaceRoundedIcon,
    demoOptions: ["School", "Work", "Home", "Mobile"],
  },
];

function BlurConceptCard({ concept }: { concept: BlurConceptDef }) {
  const [selected, setSelected] = useState(0);
  const Icon = concept.Icon;

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        border: `1px solid ${alpha(concept.accentColor, 0.25)}`,
        bgcolor: alpha(concept.accentColor, 0.04),
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1.5,
            bgcolor: alpha(concept.accentColor, 0.15),
            border: `1px solid ${alpha(concept.accentColor, 0.3)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ fontSize: 17, color: concept.accentColor }} />
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: 13, fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}
          >
            {concept.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: concept.accentColor,
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: 0.4,
            }}
          >
            BlurOn slot
          </Typography>
        </Box>
      </Box>

      {/* Rationale */}
      <Typography sx={{ fontSize: 12, color: "#475569", lineHeight: 1.6 }}>
        {concept.rationale}
      </Typography>

      {/* Mini interactive demo */}
      {concept.demoOptions && (
        <Box>
          <Typography
            sx={{
              fontSize: 10,
              color: "#94a3b8",
              fontWeight: 700,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              fontFamily: "monospace",
              mb: 0.75,
            }}
          >
            Interactive
          </Typography>
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            {concept.demoOptions.map((opt, i) => (
              <Box
                key={opt}
                onClick={() => setSelected(i)}
                sx={{
                  px: 1.25,
                  py: 0.5,
                  borderRadius: 99,
                  border: `1px solid ${i === selected ? concept.accentColor : alpha(concept.accentColor, 0.25)}`,
                  bgcolor:
                    i === selected
                      ? alpha(concept.accentColor, 0.15)
                      : "transparent",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  "&:hover": {
                    bgcolor: alpha(concept.accentColor, 0.1),
                    borderColor: concept.accentColor,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: i === selected ? 700 : 500,
                    color: i === selected ? concept.accentColor : "#64748b",
                    transition: "color 150ms ease",
                  }}
                >
                  {opt}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              mt: 1.25,
              px: 1.5,
              py: 0.75,
              borderRadius: 1.5,
              bgcolor: "#0d1117",
              border: "1px solid rgba(99,179,237,0.12)",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            <Icon sx={{ fontSize: 13, color: concept.accentColor }} />
            <Typography sx={{ fontSize: 11, color: "#ffffff", fontWeight: 600 }}>
              {concept.demoOptions[selected]}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

function BlurOnConceptsStory() {
  return (
    <Box sx={{ p: 4, maxWidth: 760, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
        <BlurOnRoundedIcon sx={{ fontSize: 22, color: "#64748b" }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
          BlurOn — Semantic Options
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: "#64748b", mb: 4, lineHeight: 1.6 }}>
        The BlurOn icon in the{" "}
        <strong>[Layers][BlurOn][Dialpad]</strong> cluster is currently
        decorative chrome. Four meaningful uses are proposed below — each with
        an interactive mini-demo. Pick one and it becomes the second interactive
        control in the pill.
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {BLUR_CONCEPTS.map((c) => (
          <BlurConceptCard key={c.id} concept={c} />
        ))}
      </Box>
    </Box>
  );
}

// =============================================================================
// Story meta + exports
// =============================================================================

const meta: Meta = {
  title: "HUD / Map / MapSwitcher",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "dark",  value: "#0d1117" },
      ],
    },
  },
};

export default meta;

/**
 * The real MapSwitcher component — fully interactive, wired to
 * ActiveMapProvider so switching works.
 */
export const LiveComponent: StoryObj = {
  name: "Live Component",
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0d1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 8,
        gap: 4,
      }}
    >
      <ActiveMapProvider<ActiveMapKey> defaultMap="website">
        <MapSwitcher />
      </ActiveMapProvider>
      <Typography
        variant="caption"
        sx={{
          color: "rgba(147,197,253,0.4)",
          fontFamily: "monospace",
          letterSpacing: 0.5,
        }}
      >
        Click the pill to expand · click a realm label to switch · Esc or click
        outside to collapse
      </Typography>
    </Box>
  ),
};

/** Icon cluster showcase — chosen direction for the realm switcher. */
export const IconCluster: StoryObj = {
  name: "Icon Cluster — Chosen Direction",
  render: () => <IconClusterShowcase />,
};

/** Interactive pill prototype — Layers picks domain, Dialpad picks realm. */
export const InteractivePill: StoryObj = {
  name: "Interactive Pill",
  parameters: { backgrounds: { default: "dark" } },
  render: () => <InteractivePillStory />,
};

/** Gallery of semantic options for the BlurOn icon slot. */
export const BlurOnConcepts: StoryObj = {
  name: "BlurOn Concepts",
  render: () => <BlurOnConceptsStory />,
};
