import { type ComponentType, type SVGProps } from "react";
import { WHENS } from "../primitives/whens";
import { PLACES } from "../primitives/places";

export const DOMAINS_SELECTORS = {
  eyebrow: ".reach-eyebrow",
  headline: ".reach-headline",
  whenBand: ".reach-when-band",
  whenPill: ".reach-when-pill",
  whereBand: ".reach-where-band",
  wherePill: ".reach-where-pill",
  whereCard: ".reach-where-card",
  whereCell: ".reach-where-cell",
} as const;

export type ReachIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const DOMAINS_WHENS = WHENS.map(({ key, label, Icon, color }) => ({
  key,
  label,
  Icon: Icon as ReachIcon,
  color,
}));

export const DOMAINS_PLACES = PLACES.map(({ key, label, Icon, color, description, example }) => ({
  key,
  label,
  Icon: Icon as ReachIcon,
  color,
  description,
  example,
}));
