/**
 * Apollo Client Configuration
 *
 * Sets up Apollo Client with HTTP and WebSocket links for
 * queries, mutations, and subscriptions.
 */
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
const GRAPHQL_HTTP_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';
const GRAPHQL_WS_URL = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/graphql';
// HTTP link for queries and mutations
const httpLink = new HttpLink({
    uri: GRAPHQL_HTTP_URL,
});
// WebSocket link for subscriptions (only in browser)
const createWsLink = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    return new GraphQLWsLink(createClient({
        url: GRAPHQL_WS_URL,
        retryAttempts: 5,
        connectionParams: {},
    }));
};
// Split link - use WebSocket for subscriptions, HTTP for queries/mutations
const createSplitLink = () => {
    const wsLink = createWsLink();
    if (!wsLink) {
        return httpLink;
    }
    return split(({ query }) => {
        const definition = getMainDefinition(query);
        return (definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription');
    }, wsLink, httpLink);
};
// Create Apollo Client instance
export const apolloClient = new ApolloClient({
    link: createSplitLink(),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});
export default apolloClient;
//# sourceMappingURL=apollo-client.js.map