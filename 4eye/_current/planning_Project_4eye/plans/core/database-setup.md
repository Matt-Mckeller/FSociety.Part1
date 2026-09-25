# C1 — Database Setup

> MySQL setup, TypeORM configuration, migrations, Docker database container.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Technology Stack

| Component | Choice | Notes |
|-----------|--------|-------|
| Database | MySQL 8.0 | Production + local dev |
| ORM | TypeORM | Nest.js integration, decorator-based entities |
| Migrations | TypeORM CLI | Version-controlled schema changes |
| Local dev | Docker Compose | MySQL container |
| Production | Google Cloud SQL | Managed MySQL |

---

## Project Structure

```
backend/
├── src/
│   ├── database/
│   │   ├── database.module.ts      # TypeORM module config
│   │   ├── data-source.ts          # CLI data source for migrations
│   │   └── migrations/             # Migration files
│   │       ├── 1711000000000-CreateUserTables.ts
│   │       ├── 1711000000001-CreateOrganizationTables.ts
│   │       └── ...
│   └── modules/
│       ├── auth/
│       │   └── entities/
│       │       ├── user.entity.ts
│       │       ├── consent-log.entity.ts
│       │       └── organization-user.entity.ts
│       ├── rooms/
│       │   └── entities/
│       │       ├── organization.entity.ts
│       │       ├── room.entity.ts
│       │       └── organization-room.entity.ts
│       └── ...
├── docker-compose.yml
└── .env.example
```

---

## TypeORM Configuration

### database.module.ts
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false, // Never true in production
        logging: config.get('NODE_ENV') === 'development',
        charset: 'utf8mb4', // Emoji support
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
```

### data-source.ts (CLI migrations)
```typescript
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  charset: 'utf8mb4',
});
```

---

## Docker Configuration

### docker-compose.yml
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: 4eye-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD:-rootpassword}
      MYSQL_DATABASE: ${DB_DATABASE:-4eye}
      MYSQL_USER: ${DB_USERNAME:-4eye_user}
      MYSQL_PASSWORD: ${DB_PASSWORD:-4eye_password}
    ports:
      - '3306:3306'
    volumes:
      - mysql_data:/var/lib/mysql
      - ./docker/mysql/init:/docker-entrypoint-initdb.d
    command: --default-authentication-plugin=mysql_native_password --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    healthcheck:
      test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost']
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mysql_data:
```

### .env.example
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=4eye_user
DB_PASSWORD=4eye_password
DB_DATABASE=4eye
DB_ROOT_PASSWORD=rootpassword

# Environment
NODE_ENV=development
```

---

## Entity Base Classes

### base.entity.ts
```typescript
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### soft-deletable.entity.ts
```typescript
import { DeleteDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class SoftDeletableEntity extends BaseEntity {
  @DeleteDateColumn()
  deletedAt: Date | null;
}
```

---

## Example Entity

### user.entity.ts
```typescript
import { Entity, Column, Index, OneToMany } from 'typeorm';
import { SoftDeletableEntity } from '../../database/soft-deletable.entity';
import { ConsentLog } from './consent-log.entity';
import { OrganizationUser } from './organization-user.entity';

export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export enum ReadingLevel {
  CHILD = 'CHILD',
  STANDARD = 'STANDARD',
  ACADEMIC = 'ACADEMIC',
}

@Entity('users')
export class User extends SoftDeletableEntity {
  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;

  @Column({ default: 'en' })
  preferredLanguage: string;

  @Column({ type: 'enum', enum: ReadingLevel, default: ReadingLevel.STANDARD })
  readingLevel: ReadingLevel;

  @OneToMany(() => ConsentLog, (consent) => consent.user)
  consentLogs: ConsentLog[];

  @OneToMany(() => OrganizationUser, (orgUser) => orgUser.user)
  organizationMemberships: OrganizationUser[];
}
```

---

## Migration Strategy

### Commands
```bash
# Generate migration from entity changes
npm run migration:generate -- src/database/migrations/MigrationName

# Create empty migration
npm run migration:create -- src/database/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

### package.json scripts
```json
{
  "scripts": {
    "migration:generate": "typeorm-ts-node-commonjs migration:generate -d src/database/data-source.ts",
    "migration:create": "typeorm-ts-node-commonjs migration:create",
    "migration:run": "typeorm-ts-node-commonjs migration:run -d src/database/data-source.ts",
    "migration:revert": "typeorm-ts-node-commonjs migration:revert -d src/database/data-source.ts",
    "migration:show": "typeorm-ts-node-commonjs migration:show -d src/database/data-source.ts"
  }
}
```

### Migration Order
1. `CreateUserTables` — User, ConsentLog
2. `CreateOrganizationTables` — Organization, OrganizationUser
3. `CreateRoomTables` — Room, OrganizationRoom, Location
4. `CreateSessionTables` — Session, SessionUser, Speaker, Recording
5. `CreateTranscriptTables` — Transcript, TranscriptSegment, Translation
6. `CreateAIContentTables` — Summary, Recap, RecapHighlight, GeneratedVisual, etc.
7. `CreateBillingTables` — Subscription, UsageRecord, PaymentEvent
8. `CreateCommunicationTables` — ChatMessage, Notification

---

## Connection Pooling

```typescript
TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    // ... other config
    extra: {
      connectionLimit: config.get('DB_POOL_SIZE', 10),
      waitForConnections: true,
      queueLimit: 0,
    },
  }),
});
```

---

## Environment-Specific Config

| Environment | Host | Pool Size | Logging |
|-------------|------|-----------|---------|
| Development | localhost (Docker) | 5 | true |
| Staging | Cloud SQL | 10 | true |
| Production | Cloud SQL | 25 | false |

---

## Dependencies

- `@nestjs/typeorm`
- `typeorm`
- `mysql2`
- `@nestjs/config`

---

## Acceptance Criteria

- [ ] Docker Compose starts MySQL container successfully
- [ ] TypeORM connects to database on app start
- [ ] Migration CLI commands work (generate, run, revert)
- [ ] Base entity classes created (BaseEntity, SoftDeletableEntity)
- [ ] User entity created as reference implementation
- [ ] Environment variables documented in .env.example
- [ ] Connection pooling configured
- [ ] UTF-8 (utf8mb4) charset for emoji support
