import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import { ACT_COLORS } from "@4eye/web/lib/theme/actColors";

/** Single uniform color for all "where" pills — avoids assigning random
 * meanings to individual locations. */
export const PLACE_COLOR = ACT_COLORS.act2;

// Trimmed to the three core contexts to avoid information overload on the
// Wherever-you-are surface. The remaining contexts (On the Go, In Therapy,
// In Community) live on deeper pages once the user opts in.
export const PLACES = [
  {
    key: "schools",
    label: "In Schools",
    Icon: SchoolIcon,
    color: PLACE_COLOR,
    description: "Homework help, focus, growth.",
    example: "Walk through tough math one step at a time.",
  },
  {
    key: "work",
    label: "At Work",
    Icon: WorkIcon,
    color: PLACE_COLOR,
    description: "Stay sharp, calm, on-task.",
    example: "Reset between meetings in 60 seconds.",
  },
  {
    key: "home",
    label: "At Home",
    Icon: HomeIcon,
    color: PLACE_COLOR,
    description: "Family time, daily wins.",
    example: "Bedtime stories tuned to your kids.",
  },
] as const;

export type PlaceItem = (typeof PLACES)[number];
