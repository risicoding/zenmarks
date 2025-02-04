import { prisma } from "@/lib/db";
import type { Bookmark, Folder, Tag } from "@prisma/client";

const handlePrismaError = (error: unknown) => {
  console.error(error);
  throw new Error("Database operation failed");
};

/**
 * Create a new bookmark.
 * @param data - The bookmark data.
 * @returns The created bookmark.
 */
export async function createBookmark(
  data: Omit<Bookmark, "id" | "createdAt" | "updatedAt">,
) {
  try {
    return await prisma.bookmark.create({ data });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Get all bookmarks for a user.
 * @param userId - The ID of the user.
 * @returns A list of bookmarks.
 */
export async function getUserBookmarks(userId: string) {
  try {
    return await prisma.bookmark.findMany({ where: { userId } });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Update a bookmark by ID.
 * @param id - The bookmark ID.
 * @param data - The fields to update.
 * @returns The updated bookmark.
 */
export async function updateBookmark({
  id,
  data,
  userId,
}: {
  id: string;
  data: Partial<Bookmark>;
  userId: string;
}) {
  try {
    return await prisma.bookmark.update({ where: { id, userId }, data });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Delete a bookmark by ID.
 * @param id - The bookmark ID.
 * @returns The deleted bookmark.
 */
export async function deleteBookmark(id: string) {
  try {
    return await prisma.bookmark.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Create a new folder.
 * @param data - The folder data.
 * @returns The created folder.
 */
export async function createFolder(
  data: Omit<Folder, "id" | "createdAt" | "updatedAt">,
) {
  try {
    return await prisma.folder.create({ data });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Get all folders for a user.
 * @param userId - The ID of the user.
 * @returns A list of folders.
 */
export async function getUserFolders(userId: string) {
  try {
    return await prisma.folder.findMany({ where: { userId } });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Update a folder by ID.
 * @param id - The folder ID.
 * @param data - The fields to update.
 * @returns The updated folder.
 */
export async function updateFolder(id: string, data: Partial<Folder>) {
  try {
    return await prisma.folder.update({ where: { id }, data });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Delete a folder by ID.
 * @param id - The folder ID.
 * @returns The deleted folder.
 */
export async function deleteFolder(id: string) {
  try {
    return await prisma.folder.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Create a new tag.
 * @param data - The tag data.
 * @returns The created tag.
 */
export async function createTag(
  data: Omit<Tag, "id" | "createdAt" | "updatedAt">,
) {
  try {
    return await prisma.tag.create({ data });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Get all tags for a user.
 * @param userId - The ID of the user.
 * @returns A list of tags.
 */
export async function getUserTags(userId: string) {
  try {
    return await prisma.tag.findMany({ where: { userId } });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Update a tag by ID.
 * @param id - The tag ID.
 * @param data - The fields to update.
 * @returns The updated tag.
 */
export async function updateTag(id: string, data: Partial<Tag>) {
  try {
    return await prisma.tag.update({ where: { id }, data });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Delete a tag by ID.
 * @param id - The tag ID.
 * @returns The deleted tag.
 */
export async function deleteTag(id: string) {
  try {
    return await prisma.tag.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Get all bookmarks in a folder.
 * @param folderId - The ID of the folder.
 * @returns A list of bookmarks in the folder.
 */
export async function getBookmarksByFolder(folderId: string) {
  try {
    return await prisma.bookmark.findMany({ where: { folderId } });
  } catch (error) {
    handlePrismaError(error);
  }
}

/**
 * Get all bookmarks with a specific tag.
 * @param tagId - The ID of the tag.
 * @returns A list of bookmarks with the tag.
 */
export async function getBookmarksByTag(tagId: string) {
  try {
    return await prisma.bookmark.findMany({
      where: { tags: { some: { tagId } } },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}
