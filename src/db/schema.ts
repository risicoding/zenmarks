import type { InferSelectModel } from "drizzle-orm";
import {
  timestamp,
  text,
  pgTable,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const bookmarks = pgTable("bookmarks", {
  id: text().primaryKey(),
  userId: text().notNull(),
  folderId: text().references(() => folders.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  url: text().notNull(),
  image: text(),
  isFavourite: boolean().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const folders = pgTable("folders", {
  id: text().primaryKey(),
  name: text().notNull(),
  slug: text().notNull(),
  userId: text().notNull(),
  icon: text().default("FolderIcon"),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const bookmarkInputSchema = createSelectSchema(bookmarks);

export type BookmarkType = InferSelectModel<typeof bookmarks>;
