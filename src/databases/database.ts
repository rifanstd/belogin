import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types";

import dotenv from "dotenv";
dotenv.config();

const dialect: PostgresDialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export default db;
