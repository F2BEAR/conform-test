import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
});

export const userInsertSchema = createInsertSchema(user, {
  email: z.string().email(),
});
export const userSelectSchema = createSelectSchema(user);
