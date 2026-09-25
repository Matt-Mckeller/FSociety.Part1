import * as React from "react";

import { BrandIcon, type BrandIconProps } from "./BrandIcon";

/**
 * Custom item icons for the Inventory surface.
 *
 * Each icon is a simple, single-color glyph painted with `currentColor` so it
 * tints with the item accent. One named export per glyph; keep them tree-shakeable.
 */

export function CoinsIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <ellipse cx="9" cy="7" rx="6" ry="3" />
      <path d="M3 7v3c0 1.66 2.69 3 6 3s6-1.34 6-3V7c0 1.66-2.69 3-6 3S3 8.66 3 7Z" />
      <ellipse cx="15" cy="15" rx="6" ry="3" opacity="0.85" />
      <path d="M9 15v3c0 1.66 2.69 3 6 3s6-1.34 6-3v-3c0 1.66-2.69 3-6 3s-6-1.34-6-3Z" opacity="0.85" />
    </BrandIcon>
  );
}

export function GemIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M6 3h12l3 5-9 13L3 8l3-5Zm.8 2L5 8h4l1.5-3H6.8Zm6.7 0L15 8h4l-1.8-3h-3.7Zm-2.2 0L9.8 8h4.4L12.7 5h-1.4ZM5.6 10l5 7.2L9.2 10H5.6Zm9.2 0-1.4 7.2 5-7.2h-3.6Zm-4.6 0 1.8 8 1.8-8h-3.6Z" />
    </BrandIcon>
  );
}

export function TokenIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M4 6a2 2 0 0 0-2 2v2a2 2 0 0 1 0 4v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V8a2 2 0 0 0-2-2H4Zm10 2 1.3 2.7 3 .4-2.1 2 .5 3-2.7-1.4-2.7 1.4.5-3-2.1-2 3-.4L14 8Z" />
    </BrandIcon>
  );
}

export function MaterialIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2l1.8 4.7L18.5 8l-3.5 3 1 5-4-2.6L8 16l1-5L5.5 8l4.7-1.3L12 2Z" />
      <circle cx="19" cy="17" r="1.5" opacity="0.8" />
      <circle cx="5" cy="18" r="1.2" opacity="0.8" />
      <circle cx="18" cy="5" r="1" opacity="0.8" />
    </BrandIcon>
  );
}

export function CosmeticIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 3c-3 0-5 2-5 6v2H5a2 2 0 0 0-2 2c0 2 4 4 9 4s9-2 9-4a2 2 0 0 0-2-2h-2V9c0-4-2-6-5-6Z" />
      <path d="M3 15c0 2 4 4 9 4s9-2 9-4v2c0 2-4 4-9 4s-9-2-9-4v-2Z" opacity="0.8" />
    </BrandIcon>
  );
}

export function BoostIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </BrandIcon>
  );
}

export function PotionIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M10 2h4v2h-1v3.2l4.4 9.1A3 3 0 0 1 14.7 20H9.3a3 3 0 0 1-2.7-3.7L11 7.2V4h-1V2Z" />
      <circle cx="10" cy="15" r="1.1" fill="#fff" opacity="0.6" />
      <circle cx="13.5" cy="17" r="0.8" fill="#fff" opacity="0.6" />
    </BrandIcon>
  );
}

export function ToolIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3.6 14.2 13 4.8l2.2-1.3 3.3 3.3-1.3 2.2-9.4 9.4-4.2 1 .0-.0 0 0 0-5.2Zm2 .8 0 2.6 2.6-.6 8-8-2-2-8.6 8Z" />
      <path d="M15.8 8.9l3.3 3.3 2.4 6.4-2.1 2.1-6.4-2.4-1.4-1.4 1.4-1.4 5.5 2-1.2-1.2 1.4-1.4Z" opacity="0.85" />
    </BrandIcon>
  );
}

export function CardIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M5 3h9l5 5v13a0 0 0 0 1 0 0H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 4 1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L12 7Z" />
    </BrandIcon>
  );
}

export function BadgeIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Zm0 4 1.5 3.1 3.4.5-2.5 2.4.6 3.4L12 18l-3 1.9.6-3.4-2.5-2.4 3.4-.5L12 6Z" />
    </BrandIcon>
  );
}

export function TrophyIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M6 3h12v2h3v3a4 4 0 0 1-4 4h-.4A6 6 0 0 1 13 15.7V18h3v3H8v-3h3v-2.3A6 6 0 0 1 7.4 12H7a4 4 0 0 1-4-4V5h3V3Zm0 4H5v1a2 2 0 0 0 1 1.7V7Zm12 0v2.7A2 2 0 0 0 19 8V7h-1Z" />
    </BrandIcon>
  );
}

export function CrystalIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M9 2h6l3 6-6 14L6 8l3-6Zm.4 2L7.2 8 12 19l4.8-11-2.2-4H9.4Z" />
      <path d="M12 4 9.5 8 12 19l2.5-11L12 4Z" opacity="0.55" />
    </BrandIcon>
  );
}

export function ScrollIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M5 4a2 2 0 0 1 2-2h9a3 3 0 0 1 3 3v1h-2V5a1 1 0 0 0-2 0v14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3 2 2 0 0 1 2-2h7v2H5.5a.5.5 0 0 0 0 1H6a1 1 0 0 0 1-1V6H5V4Zm4 4h5v2H9V8Zm0 3h5v2H9v-2Z" />
    </BrandIcon>
  );
}

export function BookIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M5 3h9a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H5V3Zm0 16h10a2 2 0 0 1 2 2v0H6a1 1 0 0 1-1-1v-1Zm3-13v2h6V6H8Z" />
    </BrandIcon>
  );
}

export function GiftIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 4a2.5 2.5 0 0 1 4.5-1.5A2.5 2.5 0 0 1 17 7h3v4h-1v9a1 1 0 0 1-1 1h-5v-9h2V9h-2V4Zm-2 0v5H8V7H5a2.5 2.5 0 0 1 .5-4.5A2.5 2.5 0 0 1 10 4Zm0 7v9H6a1 1 0 0 1-1-1v-8h5Zm-2.5-7A.5.5 0 0 0 8 5h2a1.5 1.5 0 0 0-2.5-1Zm6.5 1h2a.5.5 0 0 0-2-1 1.5 1.5 0 0 0 0 1Z" />
    </BrandIcon>
  );
}

export function MysteryIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2 3 6.5v11L12 22l9-4.5v-11L12 2Zm0 2.3 6.3 3.2L12 10.7 5.7 7.5 12 4.3Zm-7 5 6 3v8l-6-3v-8Z" />
      <path d="M14.5 13.2c0-1 .8-1.6 1.8-2.1.7-.4 1.2-.8 1.2-1.4 0-.6-.5-1-1.2-1-.7 0-1.2.4-1.4 1l-1.6-.5c.3-1.2 1.4-2 3-2 1.7 0 3 .9 3 2.4 0 1.2-.8 1.8-1.7 2.3-.6.3-1 .6-1 1.2v.3h-1.6v-.5Zm-.1 1.8h1.8v1.8h-1.8v-1.8Z" fill="#fff" opacity="0.85" />
    </BrandIcon>
  );
}
