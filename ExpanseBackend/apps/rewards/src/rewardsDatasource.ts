import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config(); // Load variables from .env

export const RewardsDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MAIN_DB_HOST,
  port: parseInt(process.env.MAIN_DB_PORT, 10),
  username: process.env.MAIN_DB_MIGRATION_USER,
  password: process.env.MAIN_DB_MIGRATION_PASSWORD,
  database: process.env.MAIN_DB_NAME,
  entities: ['apps/rewards/src/entities/*.entity.ts'],
  migrations: ['apps/rewards/src/migrations/*.ts'],
  synchronize: false, // Always disable sync in production!
});
