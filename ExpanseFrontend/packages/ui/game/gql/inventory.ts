import { gql } from "@apollo/client"

export const GET_INVENTORY = gql`
  query getInventory(
    $page: Int!
    $pageSize: Int!
    $filters: EventFiltersInput
  ) {
    # Define input types if needed
    events(page: $page, pageSize: $pageSize, filters: $filters) {
      nodes {
        # Use "nodes" if your API returns a Relay-style connection
        id
        # ...
      }
      totalCount # For pagination
      totalPages
    }
  }

  input EventFiltersInput { # Example filter input type - adjust as needed
    status: String
    # ... other filters
  }
`

export const NEW_INVENTORY_ITEM_SUBSCRIPTION = gql`
  subscription NewInventoryItem {
    newInventoryItem {
      id
      status
      # ...
    }
  }
`
