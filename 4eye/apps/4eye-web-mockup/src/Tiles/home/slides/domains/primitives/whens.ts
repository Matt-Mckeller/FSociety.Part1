import GroupsIcon from "@mui/icons-material/Groups";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import type { ComponentType, SVGProps } from "react";

export interface WhenPlace {
  key: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
}

/** Two-tile mirror of PLACES — used by the "Whenever you are" band that
 *  sits above the "Wherever you are" band on the home + intro flows.
 *  Live-in-person uses the MUI `Groups` icon to evoke gathered humans
 *  rather than a storefront. */
export const WHENS: WhenPlace[] = [
  { key: "live", label: "Live in Person", Icon: GroupsIcon, color: "#F59E0B" },
  { key: "online", label: "Online", Icon: LaptopMacIcon, color: "#3B82F6" },
];
