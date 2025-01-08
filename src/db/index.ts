import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users } from "./schema/user";

const pool = new Pool({
  connectionString: process.env.DB_URL!,
});

export const db = drizzle<{
  users: typeof users;
}>({
  client: pool,
  schema: {
    users,
  },
});
