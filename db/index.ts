import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

declare global {
  var _postgresClient: postgres.Sql | undefined;
}

let client: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  client = postgres(connectionString, { prepare: false });
} else {
  if (!globalThis._postgresClient) {
    globalThis._postgresClient = postgres(connectionString, { prepare: false });
  }
  client = globalThis._postgresClient;
}

export const db = drizzle(client, { schema });
export * from "./schema";
