import VisibilityIcon from "@mui/icons-material/Visibility";
import HearingIcon from "@mui/icons-material/Hearing";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HubIcon from "@mui/icons-material/Hub";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import HistoryIcon from "@mui/icons-material/History";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MemoryIcon from "@mui/icons-material/Memory";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import GestureIcon from "@mui/icons-material/Gesture";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import LoopIcon from "@mui/icons-material/Loop";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SpeedIcon from "@mui/icons-material/Speed";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import { ACT_COLORS } from "@4eye/web/lib/theme/actColors";
import {
  GridSlot,
  ModalityKey,
  ModalityTier,
  type ModalityDef,
  type ModalityGridLayout,
} from "./types";

/**
 * Single source of truth for every modality.
 *
 * Color groupings (ACT family per concept cluster):
 *   - act1 / sight & expression .... Visual, Verbal
 *   - act2 / sound & people ........ Auditory, Nonverbal, Social
 *   - act3 / cognition ............. Logic, Associative, Recall
 *   - act4 / motion & memory ....... Kinesthetic, Memory, Contextual
 */
export const MODALITIES: Record<ModalityKey, ModalityDef> = {
  [ModalityKey.Visual]:      { key: ModalityKey.Visual,      label: "Visual",      icon: <VisibilityIcon />,      color: ACT_COLORS.act1, tier: ModalityTier.Plus },
  [ModalityKey.Verbal]:      { key: ModalityKey.Verbal,      label: "Verbal",      icon: <RecordVoiceOverIcon />, color: ACT_COLORS.act1, tier: ModalityTier.Chip },
  [ModalityKey.Auditory]:    { key: ModalityKey.Auditory,    label: "Auditory",    icon: <HearingIcon />,         color: ACT_COLORS.act2, tier: ModalityTier.Plus },
  [ModalityKey.Nonverbal]:   { key: ModalityKey.Nonverbal,   label: "Nonverbal",   icon: <GestureIcon />,         color: ACT_COLORS.act2, tier: ModalityTier.Chip },
  [ModalityKey.Social]:      { key: ModalityKey.Social,      label: "Social",      icon: <Diversity3Icon />,      color: ACT_COLORS.act2, tier: ModalityTier.Chip },
  [ModalityKey.Logic]:       { key: ModalityKey.Logic,       label: "Logic",       icon: <PsychologyIcon />,      color: ACT_COLORS.act3, tier: ModalityTier.Plus },
  [ModalityKey.Associative]: { key: ModalityKey.Associative, label: "Semiotic",    icon: <HubIcon />,             color: ACT_COLORS.act3, tier: ModalityTier.Plus },
  [ModalityKey.Recall]:      { key: ModalityKey.Recall,      label: "Recall",      icon: <HistoryIcon />,         color: ACT_COLORS.act3, tier: ModalityTier.Chip },
  [ModalityKey.Kinesthetic]: { key: ModalityKey.Kinesthetic, label: "Kinesthetic", icon: <DirectionsRunIcon />,   color: ACT_COLORS.act4, tier: ModalityTier.Plus },
  [ModalityKey.Memory]:      { key: ModalityKey.Memory,      label: "Memory",      icon: <MemoryIcon />,          color: ACT_COLORS.act4, tier: ModalityTier.Chip },
  [ModalityKey.Contextual]:  { key: ModalityKey.Contextual,  label: "In context",    icon: <ParkOutlinedIcon />,         color: ACT_COLORS.act4, tier: ModalityTier.Chip },
  // Micro accent orbs — icon-only, tooltip reveals concept
  [ModalityKey.Attention]:   { key: ModalityKey.Attention,   label: "Attention",      icon: <CenterFocusStrongIcon />,    color: ACT_COLORS.act2, tier: ModalityTier.Micro },
  [ModalityKey.Perspectives]:{ key: ModalityKey.Perspectives,label: "Multiple Perspectives", icon: <ViewCarouselIcon />,   color: ACT_COLORS.act2, tier: ModalityTier.Micro },
  [ModalityKey.Feedback]:    { key: ModalityKey.Feedback,    label: "Feedback",       icon: <LoopIcon />,                 color: ACT_COLORS.act1, tier: ModalityTier.Micro },
  [ModalityKey.Emotion]:     { key: ModalityKey.Emotion,     label: "Emotion / Mood", icon: <MoodOutlinedIcon />,         color: ACT_COLORS.act2, tier: ModalityTier.Micro },
  [ModalityKey.Encoding]:    { key: ModalityKey.Encoding,    label: "Encoding",       icon: <SaveOutlinedIcon />,         color: ACT_COLORS.act4, tier: ModalityTier.Micro },
  [ModalityKey.Speed]:       { key: ModalityKey.Speed,       label: "Processing Speed",icon: <SpeedIcon />,               color: ACT_COLORS.act3, tier: ModalityTier.Micro },
  [ModalityKey.Executive]:   { key: ModalityKey.Executive,   label: "Executive Function",icon: <AccountTreeIcon />,        color: ACT_COLORS.act4, tier: ModalityTier.Micro },
  [ModalityKey.Pattern]:     { key: ModalityKey.Pattern,     label: "Pattern Recognition",icon: <AutoAwesomeMosaicIcon />, color: ACT_COLORS.act4, tier: ModalityTier.Micro },
};

/**
 * 5×3 diamond/cross placement for {@link ModalityPlusGrid}.
 *
 * Plus tier sits in the central + (cross), chips form the diamond points and
 * shoulder positions. Each chip is adjacent to a Plus orb of the same color
 * family so groupings read visually:
 *
 *   col:      0             1            2             3              4
 *   row 0: [  .        ] [Attention  ] [Nonverbal  ] [Perspectives] [  .       ]
 *   row 1: [Feedback   ] [Verbal     ] [Auditory   ] [Social      ] [Emotion   ]
 *   row 2: [  .        ] [Visual     ] [Semiotic   ] [Logic       ] [  .       ]
 *   row 3: [Encoding   ] [Memory     ] [Kinesthetic] [Recall      ] [Speed     ]
 *   row 4: [  .        ] [Executive  ] [In context ] [Pattern     ] [  .       ]
 */
export const MODALITY_GRID_LAYOUT: ModalityGridLayout = [
  [GridSlot.Empty,       ModalityKey.Attention,  ModalityKey.Nonverbal,   ModalityKey.Perspectives, GridSlot.Empty],
  [ModalityKey.Feedback, ModalityKey.Verbal,     ModalityKey.Auditory,    ModalityKey.Social,       ModalityKey.Emotion],
  [GridSlot.Empty,       ModalityKey.Visual,     ModalityKey.Associative, ModalityKey.Logic,        GridSlot.Empty],
  [ModalityKey.Encoding, ModalityKey.Memory,     ModalityKey.Kinesthetic, ModalityKey.Recall,       ModalityKey.Speed],
  [GridSlot.Empty,       ModalityKey.Executive,  ModalityKey.Contextual,  ModalityKey.Pattern,      GridSlot.Empty],
];
