import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config(); // Load variables from .env

export const ExpanseEduBackendDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MAIN_DB_HOST,
  port: parseInt(process.env.MAIN_DB_PORT, 10),
  username: process.env.MAIN_DB_MIGRATION_USER,
  password: process.env.MAIN_DB_MIGRATION_PASSWORD,
  database: process.env.MAIN_DB_NAME,
  entities: [
    'apps/expanse-edu-backend/src/entities/*.entity.ts',
    'apps/expanse-edu-backend/src/entities/*.ts',
  ],
  migrations: ['apps/expanse-edu-backend/src/migrations/*.ts'],
  synchronize: false, // Always disable sync in production!
});
