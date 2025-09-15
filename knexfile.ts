import type { Knex } from "knex";
import * as dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'sistema_login_dois',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '1511'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
      extension: 'ts', // ← IMPORTANTE: adicione esta linha
      loadExtensions: ['.ts'] // ← E esta também
    },
    seeds: {
      directory: './src/database/seeds',
      extension: 'ts', // ← E aqui também
      loadExtensions: ['.ts']
    }
  }
};

export default config;