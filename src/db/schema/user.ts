import * as t from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";
import { appSchema } from "./base.helpers";

export const rolesEnum = appSchema.enum("roles", ["user", "admin"]);

export const users = appSchema.table(
  "users",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    display_name: t.varchar({ length: 100 }).notNull(),
    username: t.varchar({ length: 100 }).notNull(),
    email: t.varchar({ length: 160 }).notNull(),
    password: t.varchar().notNull(),
    role: rolesEnum().default("user"),
    // activated: t.boolean().notNull().default(false),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("email_unique_idx").on(table.email),
    t.uniqueIndex("username_unique_idx").on(table.username),
  ]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
