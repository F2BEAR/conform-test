"use server";

import db from "@src/server/db";
import { user, userInsertSchema } from "@src/server/schemas";

type User = {
  email: string;
  name: string;
};

export default async function addUser(data: User) {
  const { email, name } = data;
  const validateData = userInsertSchema.parse({ email, name });
  if (validateData) {
    await db.insert(user).values({ email, name });
  }
  return;
}
