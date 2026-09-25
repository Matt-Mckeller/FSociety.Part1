# C3 — GraphQL API Gateway

> Nest.js code-first GraphQL scaffold, module registration, error handling, rate limiting, request validation.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Technology Stack

| Component | Choice | Notes |
|-----------|--------|-------|
| Framework | Nest.js | Modular architecture |
| GraphQL | @nestjs/graphql + Apollo | Code-first approach |
| Validation | class-validator | DTO validation |
| Rate limiting | @nestjs/throttler | Per-IP/user limits |

---

## Project Structure

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   │   └── graphql-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts
│   │   └── scalars/
│   │       └── date.scalar.ts
│   ├── database/
│   │   └── ...
│   └── modules/
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.resolver.ts
│       │   └── ...
│       ├── rooms/
│       │   ├── rooms.module.ts
│       │   ├── rooms.resolver.ts
│       │   └── ...
│       └── sessions/
│           └── ...
├── schema.gql              # Auto-generated schema
└── nest-cli.json
```

---

## GraphQL Module Configuration

### app.module.ts
```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV === 'development',
      introspection: process.env.NODE_ENV === 'development',
      context: ({ req, res }) => ({ req, res }),
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': false,
      },
      formatError: (error) => {
        // Custom error formatting
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_ERROR',
          path: error.path,
        };
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,  // 1 minute
      limit: 100,  // 100 requests per minute
    }]),
    DatabaseModule,
    AuthModule,
    RoomsModule,
    SessionsModule,
    // ... other modules
  ],
})
export class AppModule {}
```

---

## Code-First Schema Pattern

### Resolver Example
```typescript
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateRoomInput } from './dto/create-room.input';

@Resolver(() => Room)
@UseGuards(GqlAuthGuard)
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @Query(() => [Room])
  async rooms(@CurrentUser() user: User) {
    return this.roomsService.findByUser(user.id);
  }

  @Query(() => Room, { nullable: true })
  async room(@Args('id', { type: () => ID }) id: string) {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room)
  @Roles('HOST', 'ADMIN')
  @UseGuards(RolesGuard)
  async createRoom(
    @Args('input') input: CreateRoomInput,
    @CurrentUser() user: User,
  ) {
    return this.roomsService.create(input, user.id);
  }
}
```

### Object Type (Entity as GraphQL Type)
```typescript
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('rooms')
export class Room {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  inviteCode: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
```

### Input Type
```typescript
import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field()
  organizationId: string;

  @Field({ defaultValue: true })
  isRecordingEnabled: boolean;

  @Field({ defaultValue: true })
  isChatEnabled: boolean;
}
```

---

## Error Handling

### Custom Exception Filter
```typescript
import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    
    // Log error
    console.error('GraphQL Error:', exception);

    // Return formatted error
    return new GraphQLError(exception.message, {
      extensions: {
        code: this.getErrorCode(exception),
        timestamp: new Date().toISOString(),
      },
    });
  }

  private getErrorCode(exception: any): string {
    if (exception.status === 401) return 'UNAUTHENTICATED';
    if (exception.status === 403) return 'FORBIDDEN';
    if (exception.status === 404) return 'NOT_FOUND';
    if (exception.status === 400) return 'BAD_REQUEST';
    return 'INTERNAL_ERROR';
  }
}
```

### Error Codes
| Code | HTTP Equivalent | Use Case |
|------|----------------|----------|
| UNAUTHENTICATED | 401 | Missing/invalid token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource doesn't exist |
| BAD_REQUEST | 400 | Validation errors |
| CONFLICT | 409 | Duplicate resource |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Unexpected errors |

---

## Rate Limiting

### Per-Endpoint Limits
```typescript
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@Resolver()
export class AuthResolver {
  // Stricter limit for login attempts
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Mutation(() => AuthPayload)
  async login() { ... }

  // Skip throttling for read operations
  @SkipThrottle()
  @Query(() => User)
  async me() { ... }
}
```

### Rate Limit Tiers
| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Login/Signup | 5 | 1 min |
| Mutations | 30 | 1 min |
| Queries | 100 | 1 min |
| Subscriptions | 10 connections | — |

---

## Validation

### Global Validation Pipe
```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,           // Strip unknown properties
    forbidNonWhitelisted: true, // Throw on unknown properties
    transform: true,           // Auto-transform types
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

---

## Custom Scalars

### Date Scalar
```typescript
import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime')
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = 'DateTime custom scalar type';

  parseValue(value: string): Date {
    return new Date(value);
  }

  serialize(value: Date): string {
    return value.toISOString();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
}
```

---

## Module Registration Pattern

Each feature module exports its own resolver:

```typescript
// rooms.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Room, OrganizationRoom])],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
```

Import all feature modules in AppModule:
```typescript
@Module({
  imports: [
    GraphQLModule.forRoot(...),
    DatabaseModule,
    AuthModule,
    RoomsModule,
    SessionsModule,
    TranscriptsModule,
    RecordingsModule,
    // ...
  ],
})
export class AppModule {}
```

---

## Dependencies

- C1 (Database) — TypeORM entities
- `@nestjs/graphql`
- `@apollo/server`
- `graphql`
- `graphql-ws`
- `class-validator`
- `class-transformer`
- `@nestjs/throttler`

---

## Acceptance Criteria

- [ ] GraphQL playground accessible in development
- [ ] Code-first schema auto-generates schema.gql
- [ ] All resolvers protected by default (public opt-in)
- [ ] Rate limiting enforced on all mutations
- [ ] Validation errors return clear messages
- [ ] Custom error codes match specification
- [ ] DateTime scalar works correctly
- [ ] Subscriptions endpoint configured (for C4)
