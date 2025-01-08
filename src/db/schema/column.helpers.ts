import { timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow(),
  deleted_at: timestamp(),
};

export { timestamps };
