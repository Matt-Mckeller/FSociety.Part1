import { gql } from "@apollo/client"

export const GET_EVENTS = gql`
  query GetEvents($page: Int!, $pageSize: Int!, $filters: EventFiltersInput) {
    # Define input types if needed
    events(page: $page, pageSize: $pageSize, filters: $filters) {
      nodes {
        # Use "nodes" if your API returns a Relay-style connection
        id
        # ... other event fields
        name
        type
        timestamp
        rewardStatus
        # ...
      }
      totalCount # For pagination
      totalPages
    }
  }

  input EventFiltersInput { # Example filter input type - adjust as needed
    eventType: String
    dateFrom: String
    dateTo: String
    eventStatus: String
    # ... other filters
  }
`

export const NEW_EVENT_SUBSCRIPTION = gql`
  subscription NewEvent {
    newEvent {
      # Name of your subscription operation
      id
      # ... other event fields
      eventType
      timestamp
      # ...
    }
  }
`
