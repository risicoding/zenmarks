"use server";
import { prisma } from "@/lib/db";
import { bookmarkSchema, folderSchema } from "@/lib/schema"; // Assuming folderSchema is defined in your schema file
import { auth } from "@clerk/nextjs/server";
import type { Bookmark, Folder, Tag } from "@prisma/client";

// Add Bookmark Action
const addBookmarkAction = async (
  data: Omit<Bookmark, "id" | "createdAt" | "updatedAt" | "userId">,
) => {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Unauthenticated" };
  }

  const parsedData = bookmarkSchema.safeParse(data);
  if (!parsedData.success) {
    return { message: "Invalid data", error: parsedData.error };
  }

  try {
    const res = await prisma.bookmark.create({
      data: { ...data, userId },
    });
    return { message: "Bookmark added successfully", data: res };
  } catch (error) {
    console.error(error);
    return { message: "Failed to add bookmark" };
  }
};

// Get Bookmark Action
const getBookmarkAction = async () => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const data = await prisma.bookmark.findMany({
      where: { userId },
    });
    return { message: "All bookmarks retrieved", data };
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch bookmarks" };
  }
};

// Update Bookmark Action
const updateBookmarkAction = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Bookmark>;
}) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const res = await prisma.bookmark.updateMany({
      where: { id, userId },
      data,
    });
    if (res.count === 0) {
      return {
        message: "Update unsuccessful: bookmark doesn't exist or unauthorized",
      };
    }
    return { message: "Update successful", data: res };
  } catch (error) {
    console.error(error);
    return { message: "Failed to update bookmark" };
  }
};

// Delete Bookmark Action
const deleteBookmarkAction = async (id: string) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const res = await prisma.bookmark.deleteMany({
      where: { id, userId },
    });
    if (res.count === 0) {
      return {
        message: "Delete unsuccessful: bookmark doesn't exist or unauthorized",
      };
    }
    return { message: "Bookmark deleted successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to delete bookmark" };
  }
};

// Create Folder Action
const createFolderAction = async (
  data: Omit<Folder, "id" | "createdAt" | "userId">,
) => {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Unauthenticated" };
  }

  const parsedData = folderSchema.safeParse(data);
  if (!parsedData.success) {
    return { message: "Invalid data", error: parsedData.error };
  }

  try {
    const res = await prisma.folder.create({
      data: { ...data, userId },
    });
    return { message: "Folder created successfully", data: res };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create folder" };
  }
};

const getUserFoldersAction = async () => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const data = await prisma.folder.findMany({
      where: { userId },
    });
    return { message: "Folders retrieved successfully", data };
  } catch (error) {
    console.error(error);
    return { message: "Failed to retrieve folders" };
  }
};

const updateFolderAction = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Folder>;
}) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const res = await prisma.folder.updateMany({
      where: { id, userId },
      data,
    });
    if (res.count === 0) {
      return {
        message: "Update unsuccessful: folder doesn't exist or unauthorized",
      };
    }
    return { message: "Folder updated successfully", data: res };
  } catch (error) {
    console.error(error);
    return { message: "Failed to update folder" };
  }
};

const deleteFolderAction = async (id: string) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const res = await prisma.folder.deleteMany({
      where: { id, userId },
    });
    if (res.count === 0) {
      return {
        message: "Delete unsuccessful: folder doesn't exist or unauthorized",
      };
    }
    return { message: "Folder deleted successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to delete folder" };
  }
};

const createTagAction = async (
  data: Omit<Tag, "id" | "createdAt" | "updatedAt" | "userId">,
) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const res = await prisma.tag.create({
      data: { ...data, userId },
    });
    return { message: "Tag created successfully", data: res };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create tag" };
  }
};

const getUserTagsAction = async () => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const data = await prisma.tag.findMany({
      where: { userId },
    });
    return { message: "Tags retrieved successfully", data };
  } catch (error) {
    console.error(error);
    return { message: "Failed to retrieve tags" };
  }
};

const updateTagAction = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Tag>;
}) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const res = await prisma.tag.updateMany({
      where: { id, userId },
      data,
    });
    if (res.count === 0) {
      return {
        message: "Update unsuccessful: tag doesn't exist or unauthorized",
      };
    }
    return { message: "Tag updated successfully", data: res };
  } catch (error) {
    console.error(error);
    return { message: "Failed to update tag" };
  }
};

const deleteTagAction = async (id: string) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const res = await prisma.tag.deleteMany({
      where: { id, userId },
    });
    if (res.count === 0) {
      return {
        message: "Delete unsuccessful: tag doesn't exist or unauthorized",
      };
    }
    return { message: "Tag deleted successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to delete tag" };
  }
};

const getBookmarksByFolderAction = async (folderId: string) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const data = await prisma.bookmark.findMany({
      where: { folderId, userId },
    });
    return { message: "Bookmarks retrieved successfully", data };
  } catch (error) {
    console.error(error);
    return { message: "Failed to retrieve bookmarks by folder" };
  }
};

const getBookmarksByTagAction = async (tagId: string) => {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthenticated" };

  try {
    const data = await prisma.bookmark.findMany({
      where: { userId, tags: { some: { tagId } } },
    });
    return { message: "Bookmarks retrieved successfully", data };
  } catch (error) {
    console.error(error);
    return { message: "Failed to retrieve bookmarks by tag" };
  }
};

export {
  addBookmarkAction,
  getBookmarkAction,
  updateBookmarkAction,
  deleteBookmarkAction,
  createFolderAction,
  getBookmarksByTagAction,
  getBookmarksByFolderAction,
  deleteTagAction,
  updateTagAction,
  getUserTagsAction,
  createTagAction,
  getUserFoldersAction,
  updateFolderAction,
  deleteFolderAction,
};
