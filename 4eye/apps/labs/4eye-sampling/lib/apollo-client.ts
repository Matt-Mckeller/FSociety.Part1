import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Observable, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { fromPromise } from '@apollo/client/link/utils';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// ==============================================
// HTTP Link (for queries and mutations)
// ==============================================
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql',
  credentials: 'include', // Important: sends cookies with requests
});

// ==============================================
// WebSocket Link (for subscriptions)
// ==============================================
// Only create WebSocket link in browser environment
const wsLink = typeof window !== 'undefined'
  ? new GraphQLWsLink(
      createClient({
        url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/graphql',
        connectionParams: () => {
          // Cookies are sent automatically for same-origin
          // For cross-origin, we'd need to pass tokens here
          return {};
        },
        // Reconnection settings
        retryAttempts: 5,
        shouldRetry: () => true,
      })
    )
  : null;

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((callback) => callback());
  pendingRequests = [];
};

/**
 * Refresh access token using refresh token cookie
 */
async function refreshAccessToken(): Promise<void> {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies (including refreshToken)
    body: JSON.stringify({
      query: `
        mutation RefreshToken {
          refreshToken {
            user {
              id
              email
              name
              role
            }
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const result = await response.json();
  if (result.errors) {
    throw new Error('Token refresh failed');
  }
}

// Handle errors and token refresh
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Handle unauthorized errors - attempt token refresh
      if (err.extensions?.code === 'UNAUTHENTICATED' || 
          err.message.includes('Unauthorized') ||
          err.message.includes('jwt expired')) {
        
        // Don't refresh on login/signup/refresh mutations
        const operationName = operation.operationName;
        if (operationName === 'Login' || operationName === 'Signup' || operationName === 'RefreshToken') {
          return;
        }

        if (!isRefreshing) {
          isRefreshing = true;
          
          return fromPromise(
            refreshAccessToken()
              .then(() => {
                resolvePendingRequests();
                return true;
              })
              .catch(() => {
                pendingRequests = [];
                // Redirect to login on refresh failure
                if (typeof window !== 'undefined') {
                  window.location.href = '/login';
                }
                return false;
              })
              .finally(() => {
                isRefreshing = false;
              })
          ).flatMap((success) => {
            if (success) {
              // Retry the failed operation
              return forward(operation);
            }
            return Observable.of();
          });
        } else {
          // Wait for refresh to complete
          return fromPromise(
            new Promise<void>((resolve) => {
              pendingRequests.push(() => resolve());
            })
          ).flatMap(() => forward(operation));
        }
      }

      // Handle other errors
      console.error(`[GraphQL error]: ${err.message}`, err);
    }
  }
  
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// ==============================================
// Split Link (route subscriptions to WebSocket)
// ==============================================
// Use split to route subscriptions to WebSocket, queries/mutations to HTTP
const splitLink = typeof window !== 'undefined' && wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      ApolloLink.from([errorLink, httpLink])
    )
  : ApolloLink.from([errorLink, httpLink]);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add cache policies as needed
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
