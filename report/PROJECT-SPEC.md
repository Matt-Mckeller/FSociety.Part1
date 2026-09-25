# Data Visualization App - Project Specification

## Overview & Goal

Build a detective-style static web application for exploring incident data through timelines, events, data, connections, locations, items, and people profiles. The app should present information through multiple interpretive perspectives (Criminal Organization, Business/Investor, Government Entity) to help understand the likelihood and meaning of each event.

**Primary Goals:**
- Present investigation data in clear, navigable format
- Support multiple interpretive perspectives on events
- Enable pattern recognition across events, people, locations, items

**Secondary Goals:**
- Provide feedback and thoughts on government systems and existing technology
- Explore opportunities for new app/business creation (e.g., TransitPros if legitimate)
- Document alternative perspectives and AI-generated interpretations

**Target:** Generic audience - anyone who needs to understand the information clearly.

---

## Technical Stack & Constraints

### Core Technologies
- **React** + **TypeScript**
- **MUI (Material-UI)** - use older version compatible with bundling
- **D3.js** - for data visualizations
- **JSON** - The data is stored in JSON files which will be returned to the frontend, encrypted in production, and plain text for development
- Other packages as needed/suggested but first verify, especially for visualizations
- All packages must be bundled/included (no external CDN requests at runtime)

### Data Source
- **Single source of truth:** All JSON data files and TypeScript types live in `/src/data/` (root level)
- The app imports from `../../../src/data/` to reference the root data directory
- **Do NOT create duplicate data in `/app/src/data/`** - this was removed to prevent sync issues
- **Do NOT create duplicate types in `/app/src/types/`** - types are in `/src/data/types.ts`
- Any data or type changes should be made to the files in `/src/data/`

### Deployment
- Static site (Vercel, or zippable for local viewing)
- No backend required
- No external HTTP requests from the running app

### Security (Production Only)
- Client-side AES encryption with single password
- All JSON data encrypted in production build
- Decryption happens in browser on password entry
- **Development mode:** Encryption disabled for easy iteration and updating the data manually

### Technical Design Pattern
- Utilize frontend models for the entities
- Ids should be CONST strings with clear labels so that I can easily manually reference

### Visual Design Patterns
- Use a red theme for MUI: highSaturation: "#B71C1C", // Deep crimson, high saturation, main: "#be3030", // Slightly lighter crimson, dark: "#880E4F", // Darker crimson, light: "#E57373", // Light crimson
- Include the Expanse Logo in the header, Title the App Expanse 72, and make it the primary color. The svg logo file is logoBlack.svg

---

## Data Model (TypeScript Types)

### Core Entities

```typescript
// Unique identifiers
type PersonId = string;
type LocationId = string;
type EventId = string;

// Perspective types for interpretive lens
type PerspectiveType = 'criminal' | 'business' | 'government' | 'random';

interface Perspective {
  type: PerspectiveType;
  interpretation: string;      // What this event means from this perspective
  likelihood: 'low' | 'medium' | 'high';  // How likely is this interpretation
  reasoning?: string;          // Why this interpretation
}

interface Event {
  id: EventId;
  date: string;                // ISO date or date range
  dateUncertain: boolean;      // Flag if date is approximate
  title: string;               // Short summary
  description: string;         // Full details
  locationId?: LocationId;
  organizationIds?: OrganizationId[]; // Organizations involved
  onCamera?: 'unknown' | 'no' | 'partial' | 'fully'; // Was there a camera for the event or not
  evidenceStrength?: 'none' | 'circumstantial' | 'documented' | 'on_camera' | 'multiple_sources';
  peopleIds: PersonId[];       // People involved
  itemIds?: ItemId[];          // Items involved in this event
  evidence?: string[];         // Photos, camera references, etc.
  perspectives: Perspective[]; // Multiple interpretations
  confidenceRating?: number;   // 1-10 how certain about this event (minor feature)
  importanceRating?: number;   // 1-10 how important is this event
  relatedEventIds?: EventId[]; // Links to related events
  tags?: string[];             // For filtering (casino, apartment, etc.)
}

interface Person {
  id: PersonId;
  name: string;                // Can be nickname/descriptor
  aliases?: string[];          // Other names/identifiers
  role?: string;               // e.g., "Dealer", "Banker", "Unknown"
  description: string;         // Physical description, behavior notes
  profileImage?: string;       // Placeholder or actual image path
  notes?: string[];            // Additional observations
  eventIds: EventId[];         // Events this person appears in
  connectionIds?: PersonId[];  // Known connections to other people
  tags?: string[];             // Labels for filtering
}

interface Location {
  id: LocationId;
  name: string;                // e.g., "Harrahs Casino"
  type: 'casino' | 'apartment' | 'coffee_shop' | 'club' | 'business' | 'other';
  address?: string;
  description?: string;
  images: string[];            // Placeholder paths for now
  staticMapImage?: string;     // Placeholder for static map screenshot
  websiteUrl?: string;         // For reference (not loaded in app)
  eventIds: EventId[];         // Events at this location
  notes?: string[];
}

type ItemId = string;

interface Item {
  id: ItemId;
  name: string;                // e.g., "Mac Properties Ticket", "$20 Bill with Green Tape"
  type: 'document' | 'money' | 'object' | 'electronic' | 'clothing' | 'other';
  description: string;         // Physical description, condition, markings
  images: string[];            // Placeholder paths for now
  significance?: string;       // Why this item matters
  currentStatus?: 'in_possession' | 'left_behind' | 'given_away' | 'missing' | 'unknown';
  locationFoundId?: LocationId;  // Where item was found/appeared
  locationLeftId?: LocationId;   // Where item was left
  eventIds: EventId[];         // Events involving this item
  personIds?: PersonId[];      // People associated with this item
  perspectives: Perspective[]; // What this item means from different angles
  notes?: string[];
  tags?: string[];
}

type OrganizationId = string;

interface Organization {
  id: OrganizationId;
  name: string;                // e.g., "Mac Properties", "TransitPros"
  type: 'employer' | 'property_management' | 'casino' | 'medical' | 'retail' | 'unknown';
  description: string;
  concerns?: string[];         // Security/legitimacy concerns
  knownLocationIds?: LocationId[]; // Locations they own/operate
  knownPersonIds?: PersonId[]; // People associated
  eventIds: EventId[];
  perspectives: Perspective[];
  websites?: string[];         // For reference (not loaded)
  notes?: string[];
}

type TheoryId = string;

interface Theory {
  id: TheoryId;
  title: string;               // e.g., "Casino Money Laundering System"
  summary: string;             // Brief description
  fullDescription: string;     // Detailed explanation
  supportingEventIds: EventId[];  // Events that support this theory
  supportingItemIds?: ItemId[];
  contradictingEventIds?: EventId[];
  confidenceLevel: 'speculation' | 'possible' | 'likely' | 'confident';
  perspectiveType: PerspectiveType;
  relatedTheoryIds?: TheoryId[];
}

type SymbolId = string;

interface SymbolOccurrence {
  eventId: EventId;
  context: string;             // How/where it appeared
}

interface SymbolInterpretation {
  perspectiveType: PerspectiveType;
  meaning: string;
}

interface Symbol {
  id: SymbolId;
  name: string;                // e.g., "Blue Color", "Coins", "Name Matthew"
  type: 'color' | 'object' | 'number' | 'name' | 'phrase' | 'gesture';
  description?: string;
  occurrences: SymbolOccurrence[];
  interpretations: SymbolInterpretation[];
}

type CommunicationId = string;

interface Communication {
  id: CommunicationId;
  type: 'text' | 'email' | 'phone' | 'in_person';
  date: string;
  fromEntityId?: PersonId | OrganizationId;
  fromEntityType?: 'person' | 'organization' | 'unknown';
  toEntityId?: PersonId;
  content: string;
  significance?: string;
  perspectives: Perspective[];
  relatedEventIds?: EventId[];
}

interface Connection {
  id: string;
  fromEntityId: string;        // Person, Location, Item, or Organization ID
  fromEntityType: 'person' | 'location' | 'item' | 'organization';
  toEntityId: string;
  toEntityType: 'person' | 'location' | 'item' | 'organization';
  relationshipType: string;    // e.g., "appeared together", "works at", "owns", "gave", "received", "left at"
  strength?: 'weak' | 'moderate' | 'strong';
  confirmed?: boolean;         // Is this connection verified?
  description?: string;
  eventIds?: EventId[];        // Events that establish this connection
}

interface DataStore {
  events: Event[];
  people: Person[];
  locations: Location[];
  items: Item[];
  organizations: Organization[];
  theories: Theory[];
  symbols: Symbol[];
  communications: Communication[];
  connections: Connection[];
  metadata: {
    lastUpdated: string;
    version: string;
  };
}
```

---

## Locations to Track

| # | Name | Type |
|---|------|------|
| 1 | Panera | coffee_shop |
| 2 | Starbucks | coffee_shop |
| 3 | Mac Properties Apartment (Unit) | apartment |
| 4 | Mac Properties Lobby | apartment |
| 5 | Mac Properties Gym | apartment |
| 6 | Mac Properties Mailroom | apartment |
| 7 | Levis | club |
| 8 | Tin Roof | club |
| 9 | Harrahs Casino | casino |
| 10 | Hollywood Casino | casino |
| 11 | Keystone Colab | business |
| 12 | Aura | club |
| 13 | Mosaic | club |
| 14 | Crow Coffee | coffee_shop |
| 15 | The Landing | club |
| 16 | Q Bar | club |
| 17 | Lee Plaza Dental | business |
| 18 | Crisp Cuts | business |
| 19 | Sheraton Four Points Hotel | other |
| 20 | Microcenter | business |
| 21 | Whole Foods Market | business |
| 22 | Book and Record Store (Westport) | business |
| 23 | Tattoo Shop (Westport) | business |

---

## People to Track

| # | Name/Descriptor | Role |
|---|-----------------|------|
| 1 | Matthew McKeller | Main Character |
| 2 | Casino Day 1 Diamond Man | Unknown - VIP? |
| 3 | Casino Day 1 Dealer | Dealer (mentioned father) |
| 4 | Casino Dealer - Matthew | Dealer |
| 5 | Casino Dealer - Shane | Dealer |
| 6 | The Banker | Unknown - Investment offer |
| 7 | Real Estate Guy (Asian) | Unknown |
| 8 | Starbucks Blue Painter | Unknown - Signal? |
| 9 | Lee Plaza Male | Unknown |
| 10 | Haircut Black Male | Unknown |
| 11 | Panera Gray Suit Male | Unknown - Threat? |
| 12 | Crows Coffee Black Male | Unknown - Observer? |
| 13 | Apartment Lobby Driver | Driver role mentioned |
| 14 | Natalie | Mailroom employee |
| 15 | Logan | Keystone contact |
| 16 | Rey | Club contact |
| 17 | Playter | Microcenter employee |
| 18 | Trent | Microcenter GM |
| 19 | Talcove | External contact |
| 20 | TransitPros contacts | Employer |

---

## Items to Track

| # | Name | Type | Status |
|---|------|------|--------|
| 1 | Mac Properties Ticket | document | left_behind |
| 2 | $20 Bill with Green Tape | money | in_possession |
| 3 | $20 in Ones (nightstand) | money | left_behind |
| 4 | Penny (shield design) | money | left_behind |
| 5 | Quarter with "Hope" | money | left_behind |
| 6 | Updown Coin | money | left_behind |
| 7 | Green Folder (education) | document | left_behind |
| 8 | IRS Form (fake, with SSN) | document | unknown |
| 9 | Lysol Bottle | object | left_behind |
| 10 | "Reincarnated as Slime" Mug | object | left_behind |
| 11 | Dawn Dish Soap (x4) | object | left_behind |
| 12 | Steam Cleaner | object | left_behind |
| 13 | Bag of Marbles | object | left_behind |
| 14 | USB Drive (dropped at barbershop) | electronic | unknown |
| 15 | Faraday Bag | electronic | in_possession |
| 16 | Large Speaker (lobby) | electronic | unknown |
| 17 | NDA Papers (Logan) | document | unknown |
| 18 | Notebook with Leafs (Starbucks) | object | unknown |
| 19 | Yellow Earbuds Case | electronic | unknown |
| 20 | Mailroom Pen | object | left_behind |

---

## Organizations to Track

| # | Name | Type | Concern Level |
|---|------|------|---------------|
| 1 | Mac Properties | property_management | High - potential casino/club ownership |
| 2 | TransitPros | employer | Medium - security issues, legitimacy questions |
| 3 | Copart | retail | Low - TransitPros client |
| 4 | Scenic City Medical | medical | High - fake website, suspicious texts |
| 5 | Harrahs (Parent Company) | casino | Medium - money laundering theory |
| 6 | Hollywood Casino (Parent) | casino | Medium - money laundering theory |

---

## Theories to Track

| # | Title | Confidence | Perspective |
|---|-------|------------|-------------|
| 1 | Casino Money Laundering System | likely | criminal |
| 2 | Nonverbal Chip Signaling System | likely | criminal |
| 3 | Mac Properties Owns Clubs/Casinos | possible | criminal |
| 4 | Apartment Surveillance/Tapping | likely | criminal/government |
| 5 | Mistaken Identity as Criminal | possible | criminal |
| 6 | Business Interest/Investment Scouting | possible | business |
| 7 | Government Observation | speculation | government |

---

## Symbols to Track

| # | Symbol | Type | Occurrences |
|---|--------|------|-------------|
| 1 | Coins | object | Casino vending, tips, left in apartment |
| 2 | Blue Color | color | Painter fingertips, Expanse company color |
| 3 | Green Color | color | Folders, tape, chips, money |
| 4 | Yellow Color | color | Earbuds case, shirt (wire warning?) |
| 5 | Name "Matthew" | name | Dealer name matching narrator |
| 6 | Name "Shane" | name | Dealer name matching middle name |
| 7 | 911 | number | Bill serial number |
| 8 | Lysol | phrase | Random mention at Keystone |
| 9 | Chip movements | gesture | Rotating, flipping at poker table |

---

## Modules & Features

### 1. Timeline View (Primary)
- Timeline Visualization View with the ability to select events for inspection
- List of all events displayed on **expandable cards**
- Filter by date range, location, person, tags, confidence rating, importance ratings
- Sort Chronologically or by Confidence Rating, Importance Rating. Default = Chronological sort
- Priority View
- **Perspective toggle:** View events through Criminal/Business/Government lens
- Visual indicators for confidence/certainty, camera status
- Color-coded perspective likelihood (border/accent colors)
- Quick filter chips below search: `Casino` `Apartment` `High Importance` `On Camera`

#### Event Cards (Collapsed State)
- Date, title, importance badge
- Top/most likely perspective with likelihood
- Camera icon (🎥) if on camera
- Location name (clickable)
- Tags as small chips

#### Event Cards (Expanded State)
- Full description text
- All perspectives with likelihood ratings
- Linked people (clickable chips → profiles)
- Linked location (clickable → location detail)
- Related events (clickable links)
- Evidence notes
- **"View Full Details →"** link to Event Detail page

### 2. Event Detail View (`/events/:id`)
Dedicated page for deep-dive into a single event:
- Full event description with all context
- **All perspectives with likelihood ratings and reasoning**
- Linked people with mini profile cards (clickable → full profiles)
- Linked location with address/description preview
- Related events list with dates
- Evidence gallery (image placeholders)
- Edit notes section (if needed)
- Back to Timeline button
- Next/Previous event navigation

### 3. People Directory
- List/grid of all tracked people
- Click for full profile
- Profile shows: description, events involved, connections, notes
- Placeholder profile images

### 4. Location Directory
- List of all locations by type
- Click for location detail
- Detail shows: address, description, events at location
- Image placeholders (no live maps)

### 5. Items Directory
- List/grid of all tracked items by type
- Click for item detail
- Item detail shows:
  - Description and significance
  - Current status (in possession, left behind, missing, etc.)
  - Where found / where left (linked locations)
  - Events involving this item
  - Associated people
  - Perspectives on item meaning
  - Image placeholders
- Filter by type, status, location

### 6. Connection Graph (D3 Visualization)
- Network diagram showing relationships
- Nodes = People + Locations + Items
- Edges = Connections/shared events
- Click node → navigate to profile
- Filter by perspective
- Toggle node types on/off (show/hide items, locations, etc.)

### 7. Perspective Switcher
- Global toggle to filter/highlight events by interpretation type
- Summary view: "X events likely Criminal, Y likely Business..."

### 8. Search & Filter
- Global search across events, people, locations, items, organizations
- Tag-based filtering
- Date range filtering

### 9. Organizations Directory
- List of all tracked organizations
- Click for organization detail
- Detail shows:
  - Description and type
  - Concerns/red flags
  - Known locations (linked)
  - Known people (linked)
  - Events involving organization
  - Perspectives on organization

### 10. Theories View
- List of documented theories/hypotheses
- Grouped by perspective type
- Each theory shows:
  - Title and summary
  - Confidence level badge
  - Supporting events (linked)
  - Supporting items (linked)
  - Contradicting evidence
  - Full reasoning

### 11. Symbols View
- Grid of recurring symbols/signals
- Each symbol shows:
  - Name and type
  - All occurrences with event links
  - Interpretations by perspective
  - Frequency count

### 12. Dashboard (Home Page)
- Summary stats cards: X events, Y people, Z locations, etc.
- Perspective breakdown chart (pie/bar)
- Top 5 most important events
- Open questions count
- Quick navigation cards to main sections
- "What If" toggle to show only high-confidence data

### 13. Background Context Page
- Matthew's background information
- Relevant personal history
- Why certain things may have been misinterpreted

### 14. Communications View
- List of communication chains (texts, emails)
- Each shows date, parties, content
- Perspectives on meaning
- Linked to related events

### 15. Security Concerns Page
- Documented security issues
- Apartment tapping evidence
- Mailbox tampering
- Identity changes observed
- Defensive measures taken

### 16. TransitPros Page
- Employer details and timeline
- Security concerns observed (gift cards, poor code quality, accounting separation)
- Perspectives on legitimacy (shell company vs poorly run org)
- What was learned during employment
- Connection to main events (if any)

### 17. Current Status Page
- Current location/safety status
- Mental/physical/financial status
- Open questions remaining
- Active concerns with supporting evidence
- Actions being taken
- Requests and needs (immediate, short-term, long-term)

### 18. Feedback & Proposals Page
- **Government Systems Feedback:** Law enforcement gaps, surveillance oversight, identity protection
- **TransitPros Opportunity:** Towing app improvements if legitimate
- **New App Ideas:** Security monitoring, pattern recognition, investigation documentation
- **General Observations:** Privacy vs security, casino oversight, mental health in law enforcement

---

## Navigation Architecture

```
/ (Home)                        # Dashboard with summary stats
├── /login                      # Password entry (decryption)
│
├── /timeline                   # Main timeline view
├── /events/:id                 # Event detail
│
├── /entities/                  # Entity Hub
│   ├── /people                 # People directory
│   ├── /people/:id             # Person profile
│   ├── /locations              # Location directory
│   ├── /locations/:id          # Location detail
│   ├── /organizations          # Organization directory
│   ├── /organizations/:id      # Organization detail
│   ├── /items                  # Items directory
│   └── /items/:id              # Item detail
│
├── /analysis/                  # Analysis Hub
│   ├── /perspectives           # Overview by perspective type
│   ├── /theories               # Documented theories/hypotheses
│   ├── /theories/:id           # Theory detail
│   ├── /symbols                # Recurring symbols analysis
│   └── /connections            # Connection graph visualization
│
├── /context/                   # Background Context Hub
│   ├── /background             # Matthew's background info
│   ├── /transitpros            # TransitPros employer details & concerns
│   ├── /observations           # General observations/insights
│   ├── /security-concerns      # Security issues documented
│   └── /communications         # Communication chains
│
├── /status/                    # Current Status Hub
│   ├── /                       # Current status overview (requests-and-status.md)
│   ├── /questions              # Open questions remaining
│   ├── /concerns               # Concerns list with evidence
│   └── /actions                # Actions being taken
│
└── /feedback/                  # Feedback & Proposals Hub
    ├── /                       # Overview of all proposals
    ├── /government             # Government systems feedback
    ├── /app-ideas              # New app/business ideas
    └── /general                # General thoughts & observations
```

**Navigation Component:**
- Sidebar or top nav with links to main sections
- Breadcrumbs for drill-down views
- Back buttons / cross-linking between related entities

---

## Build Strategy & Phases

### Phase 1: Data Consolidation ✅ (In Progress - ~90% Complete)
1. ✅ Extract ALL events from all markdown files → `events.json`
2. ✅ Extract ALL people → `people.json`
3. ✅ Create `locations.json` with known locations
4. ✅ Create `items.json` with tracked items
5. ✅ Create `organizations.json` with tracked organizations
6. ✅ Create `theories.json` with documented theories
7. ✅ Create `symbols.json` with recurring symbols
8. ✅ Create `communications.json` with communication chains
9. ✅ Create `connections.json` for entity relationships
10. ⏳ Create `background.json` for context information
11. ✅ Add perspective interpretations to entities based on existing data
12. ⏳ User will review and update data with the help of AI
13. ✅ Create `requests-and-status.md` consolidated document

**Pending Data Items (need clarification):**
- Levis ticket returning to pocket (date, details)
- TransitPros culture email about laughter/smiley faces
- Doorway repairs / crane / white marble work timing
- Ceiling crack / drywall spot timing
- A few other minor events from story.md (see data review notes)

### Phase 2: App Scaffolding
1. Create React + TypeScript + MUI project
2. Bundle all dependencies
3. Set up routing structure (see Navigation Architecture)
4. Create placeholder components for each module
5. Set up red theme with Expanse branding

### Phase 3: Core Views
1. Dashboard home page with summary stats
2. Timeline view with event cards
3. Event detail page
4. People directory and profiles
5. Location directory and details
6. Items directory and details
7. Organizations directory and details
8. Cross-linking between entities

### Phase 4: Analysis Views
1. Theories view with detail pages
2. Symbols view
3. D3 connection graph
4. Perspective filtering/highlighting
5. Search and filter functionality

### Phase 5: Context & Background Views
1. Background context page (Matthew's history)
2. TransitPros page (employer details, concerns, learnings)
3. Communications view
4. Security concerns page
5. Observations page

### Phase 6: Status & Feedback Views
1. Current Status overview page (from requests-and-status.md)
2. Open Questions page
3. Concerns page with evidence
4. Actions page
5. Feedback & Proposals overview
6. Government systems feedback page
7. App ideas page
8. General observations page

### Phase 7: Security (Production)
1. Add password entry screen
2. Encrypt JSON data in build process
3. Client-side decryption on password entry
4. Build production bundle
5. Test encryption/decryption flow

---

## Image Handling

- All images use placeholder paths initially
- Placeholder component shows gray box with "Image Pending" text
- Images can be added later to `/public/images/` folder
- Structure:
  - `/images/people/`
  - `/images/locations/`
  - `/images/items/`
  - `/images/organizations/`
  - `/images/evidence/`

---

## Files to Process for Data Extraction

| File | Content |
|------|---------|
| `timeline.md` | Primary event list with dates |
| `story.md` | Detailed narrative with events |
| `people.md` | People descriptions |
| `data-connections-and-perspectives.md` | Perspective interpretations |
| `important-data-points-and-groups.md` | Event categories |
| `other-notes.md` | Additional events/observations |
| `follow-up-and-continuation.md` | More context |
| `thinking.md` | Concerns and observations |
| `thoughts.md` | Additional thoughts |
| `summary-my.md` | Summary with questions |
| `summary-ai.md` | AI-generated summary || `transitPros/overview.md` | TransitPros details |
| `transitPros/towing-app-and-other.md` | TransitPros context |
| `requests-and-status.md` | **Consolidated** requests, needs, status, interpretations |

---

## Additional Notes

- Have simple and concise views along with expanded detail views
- Focus on clarity and easy navigation
- Every event should be viewable from multiple perspectives
- All data consolidated into JSON files (TypeScript imports)
- No external requests - fully self-contained static site
- Perspectives can be added/edited for any event
- Dashboard provides quick overview and entry points
- Theories section is core to "detective-style" investigation goal
- Symbols tracking helps identify patterns across events
- Background context helps explain potential misinterpretations

---

## App Proposals & Thoughts

### TransitPros Towing App Opportunity
If TransitPros is a legitimate company (not connected to criminal activity), there may be opportunity to:
- Improve the towing app architecture and security
- Address the poor code quality and security issues observed
- Build a proper payment system (vs gift cards)
- Create a professional towing management platform

### Government & Existing Systems Feedback
Observations and feedback on:
- **Unemployment Eligibility Systems** - Talcove's work area, potential improvements
- **Law Enforcement Communication** - Gaps in how police handled reports
- **Surveillance Oversight** - Questions about apartment monitoring legality
- **Identity Protection** - Issues with SSN exposure in mailbox

### New App/Business Ideas
Ideas that emerged from this experience:
- **Security Monitoring App** - Personal surveillance detection
- **Pattern Recognition Tool** - Connecting events, people, locations
- **Communication Analysis** - Tracking suspicious communications
- **Investigation Documentation** - This app itself as a template

### General Thoughts for Feedback
- How government agencies could better respond to citizens reporting unusual activity
- Privacy vs security balance in residential buildings
- Casino oversight and potential money laundering indicators
- Mental health considerations in law enforcement response

---

## Data Files Summary

| File | Entity Type | Content |
|------|-------------|---------|
| `events.json` | Event[] | All timeline events |
| `people.json` | Person[] | All tracked people |
| `locations.json` | Location[] | All locations |
| `items.json` | Item[] | All tracked items |
| `organizations.json` | Organization[] | All organizations |
| `theories.json` | Theory[] | Documented theories |
| `symbols.json` | Symbol[] | Recurring symbols |
| `communications.json` | Communication[] | Communication chains |
| `connections.json` | Connection[] | Entity relationships |
| `background.json` | Object | Context/background info |

---

## Personal Documentation

See **[requests-and-status.md](requests-and-status.md)** for:
- Current Status Updates
- Requests & Needs
- High-Level Interpretation Summaries
- Implication Potentials
- Notes & Updates Log
