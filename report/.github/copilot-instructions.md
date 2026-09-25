# Copilot Instructions

## Project Overview

**Expanse 72** - A detective-style React data visualization app for tracking investigation data: events, people, locations, items, organizations, theories, symbols, communications, and connections. Built to present evidence through multiple interpretive perspectives (criminal, business, government, random).

## Tech Stack

- React 19 + TypeScript
- MUI 7 (Material-UI)
- D3.js for visualizations
- Vite for bundling
- React Router for navigation

## Critical Rules

### Single Source of Truth

**All data lives in `/src/data/` (root level)**

- JSON data files: `events.json`, `people.json`, `locations.json`, etc.
- Type definitions: `types.ts`
- App imports from `../../../src/data/`

**NEVER create duplicate data or types in `/app/src/`**

### ID Conventions

Use CONST-style string IDs with clear labels:
- People: `PERSON_CASINO_DEALER_MATTHEW`, `PERSON_BANKER`
- Locations: `LOCATION_HARRAHS_CASINO`, `LOCATION_MAC_PROPERTIES_APT`
- Events: `EVENT_CASINO_DAY1_DIAMOND_MAN`
- Items: `ITEM_20_BILL_GREEN_TAPE`

### File Structure

```
/report
├── src/data/           # ALL data + types (single source)
│   ├── *.json          # Entity data files
│   └── types.ts        # TypeScript interfaces
├── app/                # React application
│   └── src/
│       ├── components/ # Reusable components
│       ├── pages/      # Route pages
│       ├── theme/      # MUI theme (red crimson)
│       └── utils/      # dataService.ts (imports from /src/data)
├── transitPros/        # TransitPros documentation
└── *.md                # Source markdown notes
```

### Adding Data

1. Edit JSON file in `/src/data/`
2. Follow existing entity structure
3. Use proper ID conventions
4. Cross-reference IDs (eventIds, personIds, etc.)
5. Add perspectives where applicable

### Adding Pages

1. Create page in `/app/src/pages/`
2. Add route in `/app/src/App.tsx`
3. Import data from `../utils/dataService`
4. Follow existing page patterns

## Entity Relationships

```
Event → peopleIds, locationId, itemIds, organizationIds
Person → eventIds, connectionIds
Location → eventIds
Item → eventIds, personIds, locationFoundId
Organization → eventIds, knownLocationIds, knownPersonIds
Theory → supportingEventIds, supportingItemIds
Symbol → occurrences[].eventId
Communication → relatedEventIds, fromEntityId, toEntityId
Connection → fromEntityId, toEntityId, eventIds
```

## Perspectives System

Each entity can have multiple perspectives with:
- `type`: criminal | business | government | random | objective | ai
- `interpretation`: What this means from that perspective
- `likelihood`: low | medium | high
- `reasoning`: Why this interpretation

## Common Tasks

### Update event data
Edit `/src/data/events.json`, ensure peopleIds/locationId/itemIds reference valid IDs

### Add new person
Add to `/src/data/people.json`, use `PERSON_` prefix for ID

### Link entities
Use ID arrays: `eventIds`, `personIds`, `relatedEventIds`, etc.

### Run dev server
```bash
cd app && npm run dev
```

## Theme

Red crimson palette:
- Primary: `#be3030`
- Dark: `#880E4F`
- High saturation: `#B71C1C`
- Light: `#E57373`

## Don't

- Create data files in `/app/src/data/`
- Create type files in `/app/src/types/`
- Use vague IDs like `person1` or `event_12`
- Make external HTTP requests from the app
- Duplicate data between files
