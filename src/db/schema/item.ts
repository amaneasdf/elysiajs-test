import * as t from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";
import { appSchema } from "./base.helpers";

export const categories = appSchema.table(
  "categories",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 100 }).notNull(),
  },
  (table) => [t.uniqueIndex("cat_name_unique_idx").on(table.name)]
);

export const items = appSchema.table(
  "items",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 100 }).notNull(),
    description: t.varchar({ length: 100 }).notNull(),
    price: t.integer().notNull(),
    image: t.varchar({ length: 100 }).notNull(),
    category_id: t
      .integer()
      .notNull()
      .references(() => categories.id),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("item_name_unique_idx").on(table.name),
    t.index("item_category_idx").on(table.category_id),
  ]
);

export type Item = typeof items.$inferSelect;
export type CreateItem = typeof items.$inferInsert;
