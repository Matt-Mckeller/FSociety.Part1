// Import from root src/data - single source of truth
import eventsData from '../../../src/data/events.json';
import peopleData from '../../../src/data/people.json';
import locationsData from '../../../src/data/locations.json';
import itemsData from '../../../src/data/items.json';
import organizationsData from '../../../src/data/organizations.json';
import theoriesData from '../../../src/data/theories.json';
import symbolsData from '../../../src/data/symbols.json';
import communicationsData from '../../../src/data/communications.json';
import communicationChainsData from '../../../src/data/communication-chains.json';
import connectionsData from '../../../src/data/connections.json';
import uncategorizedData from '../../../src/data/uncategorized-events.json';

// Import types from root src/data - single source of truth
import type {
  Event,
  Person,
  Location,
  Item,
  Organization,
  Theory,
  Symbol,
  Communication,
  CommunicationChain,
  Connection,
  UncategorizedEvent,
} from '../../../src/data/types';

// Re-export types for use in other parts of the app
export type { Event, Person, Location, Item, Organization, Theory, Symbol, Communication, CommunicationChain, Connection, UncategorizedEvent };

// Export typed data
export const events: Event[] = eventsData.events;
export const people: Person[] = peopleData.people;
export const locations: Location[] = locationsData.locations;
export const items: Item[] = itemsData.items;
export const organizations: Organization[] = organizationsData.organizations;
export const theories: Theory[] = theoriesData.theories;
export const symbols: Symbol[] = symbolsData.symbols;
export const communications: Communication[] = communicationsData.communications;
export const communicationChains: CommunicationChain[] = communicationChainsData.communicationChains;
export const connections: Connection[] = connectionsData.connections;
export const uncategorizedEvents: UncategorizedEvent[] = uncategorizedData.uncategorizedEvents;

// Helper functions
export function getEventById(id: string): Event | undefined {
  return events.find(e => e.id === id);
}

export function getPersonById(id: string): Person | undefined {
  return people.find(p => p.id === id);
}

export function getLocationById(id: string): Location | undefined {
  return locations.find(l => l.id === id);
}

export function getItemById(id: string): Item | undefined {
  return items.find(i => i.id === id);
}

export function getOrganizationById(id: string): Organization | undefined {
  return organizations.find(o => o.id === id);
}

export function getTheoryById(id: string): Theory | undefined {
  return theories.find(t => t.id === id);
}

export function getEventsByLocationId(locationId: string): Event[] {
  return events.filter(e => e.locationId === locationId);
}

export function getEventsByPersonId(personId: string): Event[] {
  return events.filter(e => e.peopleIds.includes(personId));
}

export function getEventsByTag(tag: string): Event[] {
  return events.filter(e => e.tags?.includes(tag));
}

export function getPeopleByEventId(eventId: string): Person[] {
  const event = getEventById(eventId);
  if (!event) return [];
  return event.peopleIds.map(id => getPersonById(id)).filter(Boolean) as Person[];
}

export function getItemsByEventId(eventId: string): Item[] {
  const event = getEventById(eventId);
  if (!event || !event.itemIds) return [];
  return event.itemIds.map(id => getItemById(id)).filter(Boolean) as Item[];
}

// Stats
export function getStats() {
  return {
    totalEvents: events.length,
    totalPeople: people.length,
    totalLocations: locations.length,
    totalItems: items.length,
    totalOrganizations: organizations.length,
    totalTheories: theories.length,
    totalSymbols: symbols.length,
    totalCommunications: communications.length,
    uncategorizedCount: uncategorizedEvents.length,
    highImportanceEvents: events.filter(e => (e.importanceRating || 0) >= 8).length,
    onCameraEvents: events.filter(e => e.onCamera === 'fully' || e.onCamera === 'partial').length,
  };
}

// Get all unique tags
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  events.forEach(e => e.tags?.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

// Sort events by date
export function getEventsSortedByDate(): Event[] {
  return [...events].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

// Sort events by importance
export function getEventsSortedByImportance(): Event[] {
  return [...events].sort((a, b) => (b.importanceRating || 0) - (a.importanceRating || 0));
}

// Get communications by event ID
export function getCommunicationsByEventId(eventId: string): Communication[] {
  return communications.filter(c => c.relatedEventIds?.includes(eventId));
}

// Get symbol by ID
export function getSymbolById(id: string): Symbol | undefined {
  return symbols.find(s => s.id === id);
}

// Get connection by ID
export function getConnectionById(id: string): Connection | undefined {
  return connections.find(c => c.id === id);
}

// Get symbols by event ID (reverse lookup from symbols.associatedEventIds)
export function getSymbolsByEventId(eventId: string): Symbol[] {
  return symbols.filter(s => s.associatedEventIds?.includes(eventId));
}

// Get theories by event ID (reverse lookup from theories.supportingEvidenceIds)
export function getTheoriesByEventId(eventId: string): Theory[] {
  return theories.filter(t => t.supportingEvidenceIds?.includes(eventId));
}

// Get connections by event ID (checks supportingEvidence for event references)
export function getConnectionsByEventId(eventId: string): Connection[] {
  return connections.filter(c => 
    c.supportingEvidence?.some(e => e.includes(eventId)) ||
    c.notes?.includes(eventId)
  );
}

// Get all symbols, theories, connections for an event (combines explicit + reverse lookup)
export function getAllSymbolsForEvent(event: Event): Symbol[] {
  const explicitSymbols = (event as { relatedSymbolIds?: string[] }).relatedSymbolIds
    ?.map(id => getSymbolById(id))
    .filter(Boolean) as Symbol[] || [];
  const reverseSymbols = getSymbolsByEventId(event.id);
  // Combine and dedupe
  const allSymbols = [...explicitSymbols];
  reverseSymbols.forEach(s => {
    if (!allSymbols.find(es => es.id === s.id)) {
      allSymbols.push(s);
    }
  });
  return allSymbols;
}

export function getAllTheoriesForEvent(event: Event): Theory[] {
  const explicitTheories = (event as { relatedTheoryIds?: string[] }).relatedTheoryIds
    ?.map(id => getTheoryById(id))
    .filter(Boolean) as Theory[] || [];
  const reverseTheories = getTheoriesByEventId(event.id);
  // Combine and dedupe
  const allTheories = [...explicitTheories];
  reverseTheories.forEach(t => {
    if (!allTheories.find(et => et.id === t.id)) {
      allTheories.push(t);
    }
  });
  return allTheories;
}

export function getAllConnectionsForEvent(event: Event): Connection[] {
  const explicitConnections = (event as { relatedConnectionIds?: string[] }).relatedConnectionIds
    ?.map(id => getConnectionById(id))
    .filter(Boolean) as Connection[] || [];
  const reverseConnections = getConnectionsByEventId(event.id);
  // Combine and dedupe
  const allConnections = [...explicitConnections];
  reverseConnections.forEach(c => {
    if (!allConnections.find(ec => ec.id === c.id)) {
      allConnections.push(c);
    }
  });
  return allConnections;
}
