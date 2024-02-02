import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@src/server/env.mjs";
import { user } from "@src/server/schemas";

const queryClient = postgres(env.DATABASE_URL);
const db = drizzle(queryClient, { schema: { user } });

export default db;
