import {
  integer,
  timestamp,
  text,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const bookmarks = pgTable("bookmarks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text().notNull(),
  title: varchar({ length: 255 }),
  url: text().notNull(),
  image: text(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const bookmarkInputSchema = createSelectSchema(bookmarks);
