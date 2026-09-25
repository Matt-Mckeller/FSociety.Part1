# F8 — Locations

> Physical location management for organizations and rooms.

**Status:** Not yet planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

## To Define
- Location as a property of Organization or Room
- Address, coordinates, timezone
- Location-based room discovery (future consideration)
- Data model: Location (name, address, lat, lng, timezone, organizationId)
- Backend module: location resolver
- Frontend components: LocationForm, LocationDisplay
- API surface: mutations (createLocation, updateLocation), queries (getLocations)
- Dependencies: C1 (database), W4 (rooms/organizations)
- Acceptance criteria
