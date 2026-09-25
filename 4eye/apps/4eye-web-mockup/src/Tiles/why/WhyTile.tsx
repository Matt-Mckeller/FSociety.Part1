"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { TileContainer } from "@expanse/hud"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Container,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import {
  BulletList,
  CallToAction,
  FeatureCardGrid,
  Quote,
} from "@4eye/web/components/layout";
import {
  hero,
  hooks,
  progress,
  goals,
  maximizedLearning,
  futureTypes,
  transitionQuote,
  hudRequirements,
  offeringGroups,
  communicationValue,
  atmosphereValue,
  appeals,
  audience,
  social,
  learningAiFeatures,
  customization,
  gamified,
  cta,
} from "./content";

// =============================================================================
// Tab definitions
// =============================================================================

type TabKey = "overview" | "offerings" | "learning-ai" | "impact" | "journey";

interface TocItem {
  id: string;
  label: string;
}

interface TabDef {
  key: TabKey;
  label: string;
  icon: ReactElement;
  toc: TocItem[];
}

const TAB_DEFS: TabDef[] = [
  {
    key: "overview",
    label: "Overview",
    icon: <LightbulbRoundedIcon fontSize="small" />,
    toc: [
      { id: "hooks", label: "Value statements" },
      { id: "progress", label: "Learn. Earn. Enjoy." },
      { id: "goals", label: "Goals sections" },
    ],
  },
  {
    key: "offerings",
    label: "Offerings",
    icon: <RedeemRoundedIcon fontSize="small" />,
    toc: offeringGroups.map((g) => ({ id: g.id, label: g.title })),
  },
  {
    key: "learning-ai",
    label: "Learning AI",
    icon: <SchoolRoundedIcon fontSize="small" />,
    toc: [
      { id: "ai-features", label: "Learning AI features" },
      { id: "ai-customization", label: "Tailored to you" },
      { id: "ai-gamified", label: "Gamified integration" },
    ],
  },
  {
    key: "impact",
    label: "Impact",
    icon: <FavoriteRoundedIcon fontSize="small" />,
    toc: [
      { id: "impact-communication", label: "Communication" },
      { id: "impact-atmosphere", label: "Atmosphere" },
      { id: "impact-learning", label: "Maximized learning" },
      { id: "impact-appeals", label: "Strategy & appeals" },
      { id: "impact-audience", label: "Target audience" },
      { id: "impact-social", label: "Social" },
    ],
  },
  {
    key: "journey",
    label: "Journey",
    icon: <RocketLaunchRoundedIcon fontSize="small" />,
    toc: [
      { id: "journey-future", label: "The future of…" },
      { id: "journey-quote", label: "Transition" },
      { id: "journey-hud", label: "HUD requirements" },
      { id: "journey-cta", label: "Sign up" },
    ],
  },
];

const DRAWER_WIDTH = 240;

const accordionSx = {
  scrollMarginTop: 16,
  "&:before": { display: "none" },
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
} as const;

// =============================================================================
// Component
// =============================================================================

export default function WhyTile() {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const [tabKey, setTabKey] = useState<TabKey>("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const activeTab = TAB_DEFS.find((t) => t.key === tabKey) ?? TAB_DEFS[0];

  // Reset section refs and active anchor whenever the tab changes.
  useEffect(() => {
    sectionRefs.current = {};
    setActiveAnchor(activeTab.toc[0]?.id ?? null);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [tabKey, activeTab.toc]);

  // Scroll-spy: track which section is currently in view.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveAnchor(visible[0].target.id);
      },
      { root, rootMargin: "0px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    activeTab.toc.forEach((item) => {
      const el = sectionRefs.current[item.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeTab]);

  const scrollToAnchor = (id: string) => {
    const el = sectionRefs.current[id];
    if (el && scrollRef.current) {
      const top = el.offsetTop - 16;
      scrollRef.current.scrollTo({ top, behavior: "smooth" });
    }
    if (!lgUp) setDrawerOpen(false);
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const tocList = useMemo(
    () => (
      <Box sx={{ width: DRAWER_WIDTH, p: 2 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1
          }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ letterSpacing: "0.2em", fontWeight: 700 }}
          >
            On this tab
          </Typography>
          {!lgUp && (
            <IconButton size="small" onClick={() => setDrawerOpen(false)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          {activeTab.label}
        </Typography>
        <List dense disablePadding>
          {activeTab.toc.map((item) => {
            const active = item.id === activeAnchor;
            return (
              <ListItemButton
                key={item.id}
                onClick={() => scrollToAnchor(item.id)}
                selected={active}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  borderLeft: 3,
                  borderColor: active ? "primary.main" : "transparent",
                  pl: 1.5,
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      variant: "body2",
                      fontWeight: active ? 600 : 400,
                      color: active ? "text.primary" : "text.secondary",
                    }
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab, activeAnchor, lgUp],
  );

  return (
    <TileContainer mode="fit" sx={{ display: "flex", flexDirection: "column" }}>
      {/* Compact hero header */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.06) 100%)",
          borderBottom: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
          py: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between"
            }}>
            <Box>
              <Typography
                variant="overline"
                color="primary"
                sx={{ letterSpacing: "0.2em", fontWeight: 700 }}
              >
                {hero.eyebrow}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700 }}>
                {hero.title}
              </Typography>
              {hero.subtitle && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: 0.5
                  }}>
                  {hero.subtitle}
                </Typography>
              )}
            </Box>
            {!lgUp && (
              <Tooltip title="Section index">
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  color="primary"
                  sx={{ border: 1, borderColor: "divider" }}
                >
                  <MenuOpenRoundedIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Container>
      </Box>
      {/* Tab bar */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", flexShrink: 0 }}>
        <Container maxWidth="lg" disableGutters>
          <Tabs
            value={tabKey}
            onChange={(_, v: TabKey) => setTabKey(v)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {TAB_DEFS.map((t) => (
              <Tab
                key={t.key}
                value={t.key}
                label={t.label}
                icon={t.icon}
                iconPosition="start"
                sx={{ minHeight: 56, textTransform: "none", fontWeight: 600 }}
              />
            ))}
          </Tabs>
        </Container>
      </Box>
      {/* Body: scrollable content + (lg) permanent right drawer */}
      <Box sx={{ flex: 1, display: "flex", minHeight: 0 }}>
        <Box ref={scrollRef} sx={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {tabKey === "overview" && (
              <Stack spacing={6}>
                <SectionAnchor id="hooks" setRef={setRef}>
                  <BulletList {...hooks} />
                </SectionAnchor>
                <SectionAnchor id="progress" setRef={setRef}>
                  <BulletList {...progress} />
                </SectionAnchor>
                <SectionAnchor id="goals" setRef={setRef}>
                  <FeatureCardGrid {...goals} />
                </SectionAnchor>
              </Stack>
            )}

            {tabKey === "offerings" && (
              <Stack spacing={4}>
                <Stack
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    textAlign: "center"
                  }}>
                  <Typography
                    variant="overline"
                    color="primary"
                    sx={{ letterSpacing: "0.2em", fontWeight: 700 }}
                  >
                    Top Offerings
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    What members gain
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      maxWidth: 640
                    }}>
                    Eleven offerings, grouped by where they show up in your
                    life.
                  </Typography>
                </Stack>

                <Box>
                  {offeringGroups.map((group, idx) => (
                    <Box
                      key={group.id}
                      id={group.id}
                      ref={setRef(group.id)}
                      sx={{ scrollMarginTop: 16, mb: 1.5 }}
                    >
                      <Accordion
                        defaultExpanded={idx === 0}
                        disableGutters
                        sx={accordionSx}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Stack>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 700 }}
                            >
                              {group.title}
                            </Typography>
                            <Typography variant="body2" sx={{
                              color: "text.secondary"
                            }}>
                              {group.summary}
                            </Typography>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            {group.items.map((item) => (
                              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
                                <Card variant="outlined" sx={{ height: "100%" }}>
                                  <CardContent>
                                    <Typography
                                      variant="subtitle1"
                                      gutterBottom
                                      sx={{ fontWeight: 600 }}
                                    >
                                      {item.title}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "text.secondary"
                                      }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))}
                </Box>
              </Stack>
            )}

            {tabKey === "learning-ai" && (
              <Stack spacing={5}>
                <SectionAnchor id="ai-features" setRef={setRef}>
                  <FeatureCardGrid {...learningAiFeatures} />
                </SectionAnchor>

                <Box
                  ref={setRef("ai-customization")}
                  id="ai-customization"
                  sx={{ scrollMarginTop: 16 }}
                >
                  <Accordion defaultExpanded disableGutters sx={accordionSx}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {customization.title}
                        {customization.eyebrow ? ` — ${customization.eyebrow}` : ""}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <BulletList {...customization} />
                    </AccordionDetails>
                  </Accordion>
                </Box>

                <Box
                  ref={setRef("ai-gamified")}
                  id="ai-gamified"
                  sx={{ scrollMarginTop: 16 }}
                >
                  <Accordion disableGutters sx={accordionSx}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {gamified.title}
                        {gamified.eyebrow ? ` — ${gamified.eyebrow}` : ""}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <BulletList {...gamified} />
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Stack>
            )}

            {tabKey === "impact" && (
              <Stack spacing={2}>
                {[
                  { id: "impact-communication", data: communicationValue },
                  { id: "impact-atmosphere", data: atmosphereValue },
                  { id: "impact-learning", data: maximizedLearning },
                  { id: "impact-appeals", data: appeals },
                  { id: "impact-audience", data: audience },
                  { id: "impact-social", data: social },
                ].map((row, idx) => (
                  <Box
                    key={row.id}
                    ref={setRef(row.id)}
                    id={row.id}
                    sx={{ scrollMarginTop: 16 }}
                  >
                    <Accordion
                      defaultExpanded={idx === 0}
                      disableGutters
                      sx={accordionSx}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Stack>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700 }}
                          >
                            {row.data.title}
                          </Typography>
                          {row.data.eyebrow && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary"
                              }}
                            >
                              {row.data.eyebrow}
                            </Typography>
                          )}
                        </Stack>
                      </AccordionSummary>
                      <AccordionDetails>
                        <BulletList {...row.data} />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))}
              </Stack>
            )}

            {tabKey === "journey" && (
              <Stack spacing={6}>
                <SectionAnchor id="journey-future" setRef={setRef}>
                  <BulletList {...futureTypes} />
                </SectionAnchor>
                <SectionAnchor id="journey-quote" setRef={setRef}>
                  <Quote {...transitionQuote} />
                </SectionAnchor>
                <SectionAnchor id="journey-hud" setRef={setRef}>
                  <BulletList {...hudRequirements} />
                </SectionAnchor>
                <SectionAnchor id="journey-cta" setRef={setRef}>
                  <Box
                    sx={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.08) 100%)",
                      borderRadius: 2,
                      py: 6,
                      px: 3,
                    }}
                  >
                    <CallToAction {...cta} />
                  </Box>
                </SectionAnchor>
              </Stack>
            )}
          </Container>
        </Box>

        {/* Permanent docs drawer on lg+ */}
        {lgUp && (
          <Box
            component="aside"
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              borderLeft: 1,
              borderColor: "divider",
              overflowY: "auto",
              bgcolor: "background.paper",
            }}
          >
            {tocList}
          </Box>
        )}
      </Box>
      {/* Temporary drawer on smaller screens */}
      {!lgUp && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          slotProps={{
            paper: { sx: { width: DRAWER_WIDTH } }
          }}
        >
          <Toolbar variant="dense" />
          {tocList}
        </Drawer>
      )}
    </TileContainer>
  );
}

// =============================================================================
// Helpers
// =============================================================================

function SectionAnchor({
  id,
  setRef,
  children,
}: {
  id: string;
  setRef: (id: string) => (el: HTMLElement | null) => void;
  children: ReactNode;
}) {
  return (
    <Box id={id} ref={setRef(id)} sx={{ scrollMarginTop: 16 }}>
      {children}
    </Box>
  );
}
