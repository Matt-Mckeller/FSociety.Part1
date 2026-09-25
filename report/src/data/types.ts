// Investigation Visualization App - Data Types
// Single source of truth for all type definitions
// Uses flexible string unions to accommodate JSON data variations

// =============================================================================
// Unique Identifiers
// =============================================================================

export type PersonId = string;
export type LocationId = string;
export type EventId = string;
export type ItemId = string;
export type OrganizationId = string;
export type TheoryId = string;
export type SymbolId = string;
export type CommunicationId = string;
export type ConnectionId = string;

// =============================================================================
// Perspective Types
// =============================================================================

export type PerspectiveType = 'criminal' | 'business' | 'government' | 'random' | 'objective' | 'ai' | 'user' | 'third_party' | string;

// Who provided this perspective interpretation
export type PerspectiveAuthor = 'matt' | 'ai' | 'investigator' | 'witness' | string;

export interface Perspective {
  type: PerspectiveType;
  author?: PerspectiveAuthor;  // Who provided this interpretation
  interpretation: string;      // What this event means from this perspective
  likelihood?: 'low' | 'medium' | 'high' | string;
  reasoning?: string;          // Why this interpretation
}

// =============================================================================
// Core Entities
// =============================================================================

export interface Event {
  id: EventId;
  date?: string | null;        // ISO date or date range
  dateUncertain?: boolean;     // Flag if date is approximate
  title: string;               // Short summary (displayed in lists)
  summary?: string;            // Brief 1-2 sentence summary
  description: string;         // Full detailed narrative
  locationId?: LocationId | null;
  organizationIds?: OrganizationId[];
  onCamera?: 'unknown' | 'no' | 'partial' | 'fully' | string;
  evidenceStrength?: 'none' | 'circumstantial' | 'documented' | 'on_camera' | 'multiple_sources' | string;
  peopleIds: PersonId[];       // People involved
  itemIds?: ItemId[];          // Items involved
  evidence?: string[];         // Photos, camera references, etc.
  perspectives?: Perspective[];
  confidenceRating?: number;   // 1-10 how certain about this event
  importanceRating?: number;   // 1-10 how important is this event
  relatedEventIds?: EventId[];
  relatedCommunicationIds?: CommunicationId[];  // Explicit communication links
  relatedSymbolIds?: SymbolId[];                // Explicit symbol links
  relatedTheoryIds?: TheoryId[];                // Explicit theory links
  relatedConnectionIds?: ConnectionId[];        // Explicit connection links
  tags?: string[];
  notes?: string[];
}

export interface Person {
  id: PersonId;
  name: string;
  aliases?: string[];
  role?: string;
  summary?: string;
  description: string;
  profileImage?: string;
  notes?: string[];
  eventIds?: EventId[];
  connectionIds?: PersonId[];
  perspectives?: Perspective[];
  tags?: string[];
}

export type LocationType = 'casino' | 'apartment' | 'coffee_shop' | 'club' | 'business' | 'atm' | 'other' | string;

export interface Location {
  id: LocationId;
  name: string;
  type: LocationType;
  address?: string;
  description?: string;
  images?: string[];
  staticMapImage?: string;
  websiteUrl?: string;
  eventIds?: EventId[];
  notes?: string[];
}

export type ItemType = 'document' | 'money' | 'object' | 'electronic' | 'clothing' | 'other' | string;
export type ItemStatus = 'in_possession' | 'left_behind' | 'given_away' | 'missing' | 'unknown' | 'at_location' | 'n/a' | string;

export interface Item {
  id: ItemId;
  name: string;
  type: ItemType;
  summary?: string;
  description: string;
  images?: string[];
  significance?: string;
  currentStatus?: ItemStatus;
  locationFoundId?: LocationId;
  locationLeftId?: LocationId;
  eventIds?: EventId[];
  personIds?: PersonId[];
  perspectives?: Perspective[];
  notes?: string[];
  tags?: string[];
}

export type OrganizationType = 'employer' | 'property_management' | 'casino' | 'medical' | 'retail' | 'technology' | 'education' | 'insurance' | 'rideshare' | 'government' | 'telecom' | 'coffee_shop' | 'unknown' | string;

export interface Organization {
  id: OrganizationId;
  name: string;
  type: OrganizationType;
  description: string;
  concerns?: string[];
  knownLocationIds?: LocationId[];
  knownPersonIds?: PersonId[];
  eventIds?: EventId[];
  perspectives?: Perspective[];
  websites?: string[];
  notes?: string[];
}

export type ConfidenceLevel = 'speculation' | 'possible' | 'likely' | 'confident' | string;

export interface Theory {
  id: TheoryId;
  title: string;
  description: string;
  summary?: string;
  fullDescription?: string;
  perspective?: string;
  perspectiveType?: PerspectiveType;
  supportingEvidenceIds?: string[];
  supportingEventIds?: EventId[];
  supportingPeopleIds?: PersonId[];
  supportingLocationIds?: LocationId[];
  supportingItemIds?: ItemId[];
  contradictingEvidence?: string[];
  contradictingEventIds?: EventId[];
  confidenceRating?: number;
  confidenceLevel?: ConfidenceLevel;
  relatedTheoryIds?: TheoryId[];
  notes?: string | string[];
}

export type SymbolType = 'color' | 'object' | 'number' | 'name' | 'phrase' | 'gesture' | string;

export interface SymbolOccurrence {
  eventId: EventId;
  context: string;
}

export interface SymbolInterpretation {
  perspectiveType: PerspectiveType;
  meaning: string;
}

export interface Symbol {
  id: SymbolId;
  name: string;
  type?: SymbolType;
  description?: string;
  interpretation?: string;
  occurrences?: SymbolOccurrence[];
  interpretations?: SymbolInterpretation[];
  associatedEventIds?: EventId[];
  associatedItemIds?: ItemId[];
  associatedPeopleIds?: PersonId[];
  associatedLocationIds?: LocationId[];
  frequencyScore?: number;
  notes?: string | string[];
}

export type CommunicationType = 'text' | 'email' | 'phone' | 'in_person' | 'verbal' | 'symbolic' | 'verbal_symbolic' | 'behavioral' | string;

export interface Communication {
  id: CommunicationId;
  type: CommunicationType;
  date?: string | null;
  time?: string | null;
  from: string;
  to: string;
  subject?: string | null;
  content: string;
  claimedIdentity?: string | null;
  actualIdentity?: string | null;
  fromEntityId?: PersonId | OrganizationId;
  fromEntityType?: 'person' | 'organization' | 'unknown';
  toEntityId?: PersonId;
  relatedOrganizationId?: OrganizationId | null;
  relatedLocationId?: LocationId | null;
  relatedEventIds?: EventId[];
  significance?: string;
  perspectives?: Perspective[];
  tags?: string[];
  notes?: string | string[];
}

export type CommunicationChainId = string;

export interface CommunicationChainEntry {
  date?: string | null;
  eventId: EventId;
  action: string;
  perceivedMeaning: string;
  reality: string;
}

export interface CommunicationChain {
  id: CommunicationChainId;
  title: string;
  type: CommunicationType;
  dateRange?: {
    start?: string | null;
    end?: string | null;
  };
  description: string;
  entries: CommunicationChainEntry[];
  perspectives?: Perspective[];
  relatedEventIds?: EventId[];
  relatedItemIds?: ItemId[];
  relatedPeopleIds?: PersonId[];
  confidenceRating?: number;
  notes?: string | string[];
}

export type EntityType = 'person' | 'location' | 'item' | 'organization' | string;
export type ConnectionStrength = 'weak' | 'moderate' | 'strong' | string;

export interface Connection {
  id: ConnectionId;
  type?: string;
  fromEntityId: string;
  fromEntityType: EntityType;
  toEntityId: string;
  toEntityType: EntityType;
  relationshipType?: string;
  relationshipDescription?: string;
  strength?: ConnectionStrength;
  perspective?: string;
  confirmed?: boolean;
  description?: string;
  eventIds?: EventId[];
  supportingEvidence?: string[];
  notes?: string;
}

export interface UncategorizedEvent {
  id: string;
  title: string;
  summary: string;
  description: string;
  dateUncertain?: boolean;
  date?: string | null;
  locationId?: string | null;
  perspectives?: Perspective[];
  needsFollowUp?: boolean;
  notes?: string[];
}

// =============================================================================
// Background Context
// =============================================================================

export interface BackgroundInfo {
  personalHistory: string;
  relevantContext: string[];
  potentialMisinterpretations: string[];
  securityConcerns: string[];
  observations: string[];
}

// =============================================================================
// Data Store
// =============================================================================

export interface DataStore {
  events: Event[];
  people: Person[];
  locations: Location[];
  items: Item[];
  organizations: Organization[];
  theories: Theory[];
  symbols: Symbol[];
  communications: Communication[];
  connections: Connection[];
  uncategorizedEvents: UncategorizedEvent[];
  background: BackgroundInfo;
  metadata: {
    lastUpdated: string;
    version: string;
  };
}

// =============================================================================
// Utility function to generate UUIDs
// =============================================================================

export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
