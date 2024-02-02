import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const dbConnectionString = process.env.DATABASE_URL ?? "";

export default {
  schema: "./src/server/schemas/index.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: dbConnectionString,
  },
} satisfies Config;
