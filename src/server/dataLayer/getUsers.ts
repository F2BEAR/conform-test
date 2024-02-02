"use server";
import db from "@src/server/db";

export default async function getUsers() {
  const users = await db.query.user.findMany();
  return users;
}
