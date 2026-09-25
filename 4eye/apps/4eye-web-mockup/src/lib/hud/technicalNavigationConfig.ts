import { route } from "../routes";
import type { MapGridNavigationConfig } from "@expanse/map";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import WebhookRoundedIcon from "@mui/icons-material/WebhookRounded";
import ChangeHistoryRoundedIcon from "@mui/icons-material/ChangeHistoryRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";

/**
 * 4eye Technical Realm HUD navigation grid (3 wide × 4 tall).
 *
 *   y=0:  auth         webhooks     changelog
 *   y=1:  sdk          settings     api
 *   y=2:  data         performance  integrations
 *   y=3:  —            pipelines    —
 *
 * Color groups:
 *   - green  (primary):   api, sdk, data, auth, pipelines
 *   - cyan   (secondary): settings (home anchor)
 *   - amber  (tertiary):  webhooks, changelog, performance, integrations
 */

const GREEN = { inactive: "rgba(34,197,94,0.4)",   active: "#22c55e" };
const CYAN  = { inactive: "rgba(6,182,212,0.45)",  active: "#06b6d4" };
const AMBER = { inactive: "rgba(245,158,11,0.4)",  active: "#f59e0b" };

export const TECHNICAL_HUD_NAV_CONFIG: MapGridNavigationConfig = {
  dimensions: {
    width: 3,
    height: 4,
    homePosition: { x: 1, y: 1 },
    wrapAround: true,
  },
  categoryLabels: {
    primary:   "Policy",
    secondary: "Home",
    tertiary:  "Observe & grade",
  },
  routing: {
    mode: "hybrid",
    syncUrl: false,
    initialFromUrl: true,
  },
  tiles: [
    // Row 0
    {
      id: "auth",
      position: { x: 0, y: 0 },
      url: route("/technical/auth"),
      seo: { title: "Auth — 4eye Technical" },
      display: { label: "Auth", category: "primary", colors: GREEN, icon: LockRoundedIcon },
    },
    {
      id: "webhooks",
      position: { x: 1, y: 0 },
      url: route("/technical/webhooks"),
      seo: { title: "Webhooks — 4eye Technical" },
      display: { label: "Webhooks", category: "tertiary", colors: AMBER, icon: WebhookRoundedIcon },
    },
    {
      id: "changelog",
      position: { x: 2, y: 0 },
      url: route("/technical/changelog"),
      seo: { title: "Changelog — 4eye Technical" },
      display: { label: "Changelog", category: "tertiary", colors: AMBER, icon: ChangeHistoryRoundedIcon },
    },
    // Row 1 (home center)
    {
      id: "sdk",
      position: { x: 0, y: 1 },
      url: route("/technical/sdk"),
      seo: { title: "SDK — 4eye Technical" },
      display: { label: "SDK", category: "primary", colors: GREEN, icon: TerminalRoundedIcon },
    },
    {
      id: "settings",
      position: { x: 1, y: 1 },
      url: route("/technical"),
      seo: { title: "Settings — 4eye Technical" },
      display: { label: "Settings", category: "secondary", colors: CYAN, icon: TuneRoundedIcon },
    },
    {
      id: "api",
      position: { x: 2, y: 1 },
      url: route("/technical/api"),
      seo: { title: "API — 4eye Technical" },
      display: { label: "API", category: "primary", colors: GREEN, icon: ApiRoundedIcon },
    },
    // Row 2
    {
      id: "data",
      position: { x: 0, y: 2 },
      url: route("/technical/data"),
      seo: { title: "Data — 4eye Technical" },
      display: { label: "Data", category: "primary", colors: GREEN, icon: StorageRoundedIcon },
    },
    {
      id: "performance",
      position: { x: 1, y: 2 },
      url: route("/technical/performance"),
      seo: { title: "Performance — 4eye Technical" },
      display: { label: "Performance", category: "tertiary", colors: AMBER, icon: SpeedRoundedIcon },
    },
    {
      id: "integrations",
      position: { x: 2, y: 2 },
      url: route("/technical/integrations"),
      seo: { title: "Integrations — 4eye Technical" },
      display: { label: "Integrations", category: "tertiary", colors: AMBER, icon: ExtensionRoundedIcon },
    },
    // Row 3
    {
      id: "pipelines",
      position: { x: 1, y: 3 },
      url: route("/technical/pipelines"),
      seo: { title: "Pipelines — 4eye Technical" },
      display: { label: "Pipelines", category: "primary", colors: GREEN, icon: AccountTreeRoundedIcon },
    },
  ],
};
