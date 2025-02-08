import type { InferSelectModel } from "drizzle-orm";
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
  folderId: integer().references(() => folders.id),
  title: varchar({ length: 255 }).notNull(),
  url: text().notNull(),
  image: text(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const folders = pgTable("folders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  userId: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const bookmarkInputSchema = createSelectSchema(bookmarks);

export type BookmarkType = InferSelectModel<typeof bookmarks>;
