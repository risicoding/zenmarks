import { z } from "zod";

// Bookmark Input Schema
export const bookmarkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  folderId: z.string().optional(),
  isFavorite: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

// Folder Input Schema
export const folderSchema = z.object({
  name: z.string().min(1),
});

// Tag Input Schema
export const tagSchema = z.object({
  name: z.string().min(1),
});

// BookmarkTag Input Schema
export const bookmarkTagSchema = z.object({
  bookmarkId: z.string(),
  tagId: z.string(),
});
