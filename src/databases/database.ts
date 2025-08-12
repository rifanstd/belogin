import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types";
import { ENV } from "../config/env";

const dialect: PostgresDialect = new PostgresDialect({
  pool: new Pool({
    host: ENV.DB.HOST,
    port: ENV.DB.PORT,
    database: ENV.DB.NAME,
    user: ENV.DB.USER,
    password: ENV.DB.PASSWORD,
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export default db;
