# C4 — Real-Time Infrastructure

> WebSocket gateway, GraphQL subscriptions, connection lifecycle, room-scoped broadcasting.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Technology Stack

| Component | Choice | Notes |
|-----------|--------|-------|
| WebSocket | graphql-ws | Modern GraphQL subscriptions |
| Pub/Sub | In-memory (Phase 1) | Redis pub/sub for scaling later |
| Connection auth | JWT in connection params | Validated on connect |

---

## Project Structure

```
backend/
├── src/
│   ├── realtime/
│   │   ├── realtime.module.ts
│   │   ├── pubsub.provider.ts
│   │   └── connection.guard.ts
│   └── modules/
│       ├── sessions/
│       │   └── sessions.resolver.ts    # Subscriptions here
│       └── chat/
│           └── chat.resolver.ts        # Subscriptions here
```

---

## GraphQL Subscriptions Setup

### PubSub Provider
```typescript
import { PubSub } from 'graphql-subscriptions';
import { Global, Module, Provider } from '@nestjs/common';

export const PUB_SUB = 'PUB_SUB';

const pubSubProvider: Provider = {
  provide: PUB_SUB,
  useValue: new PubSub(),
};

@Global()
@Module({
  providers: [pubSubProvider],
  exports: [pubSubProvider],
})
export class RealtimeModule {}
```

### Subscription Configuration (in app.module.ts)
```typescript
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  subscriptions: {
    'graphql-ws': {
      onConnect: (context: Context) => {
        const { connectionParams, extra } = context;
        // Validate JWT from connection params
        const token = connectionParams?.Authorization;
        if (token) {
          const user = validateToken(token);
          extra.user = user;
        }
      },
      onDisconnect: (context: Context) => {
        // Cleanup on disconnect
        console.log('Client disconnected');
      },
    },
  },
  context: ({ req, extra }) => ({
    req,
    user: extra?.user,
  }),
}),
```

---

## Subscription Patterns

### Room-Scoped Subscription
```typescript
import { Resolver, Subscription, Args, ID } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../../realtime/pubsub.provider';

@Resolver()
export class SessionsResolver {
  constructor(@Inject(PUB_SUB) private pubSub: PubSub) {}

  @Subscription(() => TranscriptSegment, {
    filter: (payload, variables) => 
      payload.onTranscriptUpdate.sessionId === variables.sessionId,
  })
  onTranscriptUpdate(@Args('sessionId', { type: () => ID }) sessionId: string) {
    return this.pubSub.asyncIterator(`transcript.${sessionId}`);
  }
}
```

### Publishing Events
```typescript
@Injectable()
export class TranscriptService {
  constructor(@Inject(PUB_SUB) private pubSub: PubSub) {}

  async addSegment(sessionId: string, segment: TranscriptSegment) {
    // Save to database
    const saved = await this.segmentRepo.save(segment);
    
    // Publish to subscribers
    await this.pubSub.publish(`transcript.${sessionId}`, {
      onTranscriptUpdate: saved,
    });
    
    return saved;
  }
}
```

---

## Real-Time Events

| Event | Channel Pattern | Payload | Use Case |
|-------|-----------------|---------|----------|
| `onTranscriptUpdate` | `transcript.{sessionId}` | TranscriptSegment | Live transcript |
| `onTranslationReady` | `translation.{sessionId}` | Translation | Translated segment |
| `onVisualGenerated` | `visual.{sessionId}` | GeneratedVisual | New image |
| `onChatMessage` | `chat.{sessionId}` | ChatMessage | Chat messages |
| `onSessionStatus` | `session.{sessionId}` | SessionStatus | Start/end/pause |
| `onNotification` | `notification.{userId}` | Notification | User notifications |

---

## Connection Lifecycle

### Connect
1. Client sends `connection_init` with `{ Authorization: "Bearer <token>" }`
2. Server validates JWT
3. If valid, connection established
4. If invalid, connection rejected with error

### Subscribe
1. Client sends subscription query with variables
2. Server validates user can access resource (e.g., session)
3. Server adds client to channel
4. Events streamed to client

### Disconnect
1. Client closes connection or timeout
2. Server removes client from all channels
3. Cleanup resources (update presence, etc.)

---

## Client Implementation

### React Hook
```typescript
import { useSubscription, gql } from '@apollo/client';

const TRANSCRIPT_SUBSCRIPTION = gql`
  subscription OnTranscriptUpdate($sessionId: ID!) {
    onTranscriptUpdate(sessionId: $sessionId) {
      id
      text
      speakerId
      diarizationLabel
      startTime
      endTime
    }
  }
`;

export function useLiveTranscript(sessionId: string) {
  const { data, loading, error } = useSubscription(TRANSCRIPT_SUBSCRIPTION, {
    variables: { sessionId },
  });

  return {
    segment: data?.onTranscriptUpdate,
    loading,
    error,
  };
}
```

### Apollo Client Setup
```typescript
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_WS_URL,
    connectionParams: () => ({
      Authorization: `Bearer ${getAccessToken()}`,
    }),
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
```

---

## Connection Management

### Max Connections per User
```typescript
const connectionCount = new Map<string, number>();
const MAX_CONNECTIONS = 5;

onConnect: (context) => {
  const userId = context.extra.user?.id;
  if (userId) {
    const count = connectionCount.get(userId) || 0;
    if (count >= MAX_CONNECTIONS) {
      throw new Error('Too many connections');
    }
    connectionCount.set(userId, count + 1);
  }
},

onDisconnect: (context) => {
  const userId = context.extra.user?.id;
  if (userId) {
    const count = connectionCount.get(userId) || 1;
    connectionCount.set(userId, count - 1);
  }
},
```

---

## Scaling (Future: Redis Pub/Sub)

When scaling to multiple server instances:

```typescript
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const options = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
};

const pubSubProvider: Provider = {
  provide: PUB_SUB,
  useValue: new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  }),
};
```

---

## Dependencies

- C1 (Database)
- C2 (Auth) — JWT validation
- C3 (GraphQL) — Subscription resolver pattern
- `graphql-ws`
- `graphql-subscriptions`
- `graphql-redis-subscriptions` (future)

---

## Acceptance Criteria

- [ ] WebSocket connections established via graphql-ws
- [ ] JWT validated on connection
- [ ] Subscriptions filter by sessionId/userId
- [ ] Events published when transcript segments added
- [ ] Chat messages broadcast to session subscribers
- [ ] Connection count limited per user
- [ ] Graceful disconnect handling
- [ ] React hooks work with Apollo Client
