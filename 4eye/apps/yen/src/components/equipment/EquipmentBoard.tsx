"use client";

import { Box, Chip, Typography } from "@mui/material";
import {
  EQUIPMENT_LIBRARY,
  RARITY_BG,
  RARITY_COLOR,
  SLOT_GROUPS,
  SLOT_LABEL,
  type EquipmentItem,
  type EquipmentRarity,
} from "@yen/content/equipment";
import { GearGlyph } from "./GearGlyph";

const RARITY_ORDER: EquipmentRarity[] = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythic",
];

function ItemCard({ item }: { item: EquipmentItem }) {
  const rarity = RARITY_COLOR[item.rarity];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 2.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: `${rarity}44`,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "hidden",
        // Rarity reads from the top edge, leaving the item's own colour for the glyph.
        "&::before": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 3,
          bgcolor: rarity,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.75 }}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 52,
            height: 52,
            flexShrink: 0,
            borderRadius: 1.5,
            color: item.color,
            bgcolor: RARITY_BG[item.rarity],
            border: "1px solid",
            borderColor: `${rarity}33`,
            overflow: "hidden",
          }}
        >
          {item.imageSrc ? (
            <Box
              component="img"
              src={item.imageSrc}
              alt={item.name}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <GearGlyph slot={item.slot} />
          )}
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 650, lineHeight: 1.3 }}>
              {item.name}
            </Typography>
            {item.equipped && (
              <Chip
                size="small"
                label="Equipped"
                sx={{
                  height: 19,
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#16a34a",
                  bgcolor: "#16a34a18",
                }}
              />
            )}
          </Box>

          <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.25 }}>
            {SLOT_LABEL[item.slot]}
            {" · "}
            <Box component="span" sx={{ color: rarity, fontWeight: 600, textTransform: "capitalize" }}>
              {item.rarity}
            </Box>
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ fontSize: 13.5, lineHeight: 1.55, color: "text.secondary" }}>
        {item.description}
      </Typography>

      {item.attributeBonuses && item.attributeBonuses.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {item.attributeBonuses.map((bonus) => (
            <Chip
              key={bonus.attributeId}
              size="small"
              label={`${bonus.label} ${bonus.delta > 0 ? "+" : ""}${bonus.delta}`}
              sx={{
                height: 22,
                fontSize: 11.5,
                fontWeight: 600,
                color: bonus.delta >= 0 ? "#15803d" : "#b91c1c",
                bgcolor: bonus.delta >= 0 ? "#16a34a14" : "#ef444414",
              }}
            />
          ))}
        </Box>
      )}

      {item.perkBonuses?.map((perk) => (
        <Box
          key={perk.perkId}
          sx={{ pl: 1.25, borderLeft: "2px solid", borderColor: `${rarity}55` }}
        >
          <Typography sx={{ fontSize: 12.5, fontWeight: 650 }}>{perk.label}</Typography>
          <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.5 }}>
            {perk.description}
          </Typography>
        </Box>
      ))}

      {item.traits && item.traits.length > 0 && (
        <Typography sx={{ fontSize: 11.5, color: "text.disabled", mt: "auto", pt: 0.5 }}>
          {item.traits.join(" · ")}
        </Typography>
      )}
    </Box>
  );
}

export function EquipmentBoard() {
  const groups = SLOT_GROUPS.map((group) => ({
    ...group,
    items: EQUIPMENT_LIBRARY.filter((item) => group.slots.includes(item.slot)),
  })).filter((group) => group.items.length > 0);

  const present = RARITY_ORDER.filter((r) =>
    EQUIPMENT_LIBRARY.some((item) => item.rarity === r),
  );

  const mattShots = [
    { src: "/media/matt/portrait.jpg", label: "Portrait" },
    { src: "/media/matt/standing.png", label: "Standing" },
    { src: "/media/matt/portrait-gray.jpg", label: "Study" },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "text.secondary", mb: 1.5 }}>
          Matthew — reference stills
        </Typography>
        <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 2, maxWidth: "68ch" }}>
          Photos on the board even when slots are unequipped. Drop more into{" "}
          <code style={{ fontSize: 12 }}>public/media/matt/</code> and wire{" "}
          <code style={{ fontSize: 12 }}>imageSrc</code> on items.
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {mattShots.map((shot) => (
            <Box
              key={shot.src}
              sx={{
                width: 112,
                borderRadius: 1.5,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Box component="img" src={shot.src} alt={shot.label} sx={{ display: "block", width: "100%", height: 140, objectFit: "cover" }} />
              <Typography sx={{ fontSize: 11.5, fontWeight: 650, px: 1, py: 0.75 }}>{shot.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", mb: 4 }}>
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", mr: 0.5 }}>
          {EQUIPMENT_LIBRARY.length} items across {groups.length} slot groups
        </Typography>
        {present.map((rarity) => (
          <Chip
            key={rarity}
            size="small"
            label={rarity}
            sx={{
              height: 21,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "capitalize",
              color: RARITY_COLOR[rarity],
              bgcolor: RARITY_BG[rarity],
              border: "1px solid",
              borderColor: `${RARITY_COLOR[rarity]}33`,
            }}
          />
        ))}
      </Box>

      {groups.map((group) => (
        <Box key={group.label} component="section" sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: 1.1,
              textTransform: "uppercase",
              color: "text.secondary",
              mb: 1.75,
            }}
          >
            {group.label}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                zero: "1fr",
                tablet: "repeat(2, minmax(0, 1fr))",
                laptopL: "repeat(3, minmax(0, 1fr))",
              },
            }}
          >
            {group.items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
