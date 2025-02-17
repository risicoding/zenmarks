import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/db";
import { folders } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import slugify from "@/lib/slugify";
import { nanoid } from "nanoid";
import { logger } from "@/lib/logger";

export const folderRouter = createTRPCRouter({
  // Create Folder
  create: protectedProcedure
    .input(z.object({ name: z.string(), icon: z.string() }))
    .mutation(async ({ input: { name, icon }, ctx: { userId } }) => {
      const slug = slugify(name);
      const folderData = { id: nanoid(), name, icon, slug, userId };
      const res = await db.insert(folders).values(folderData).returning();

      logger.log("Folder created:", folderData, "Result:", res);
      return res;
    }),

  // Get All Folders
  getAll: protectedProcedure.query(async ({ ctx: { userId } }) => {
    const res = await db
      .select()
      .from(folders)
      .where(eq(folders.userId, userId))
      .orderBy(folders.createdAt);

    logger.log("Fetched all folders for user:", userId, "Result:", res);
    return res;
  }),

  // Get Folder By ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx: { userId } }) => {
      const res = await db
        .select()
        .from(folders)
        .where(and(eq(folders.id, id), eq(folders.userId, userId)))
        .limit(1);

      logger.log("Fetched folder by ID:", id, "User:", userId, "Result:", res);
      return res[0] ?? null;
    }),

  // Update Folder
  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().optional(), icon: z.string().optional() }))
    .mutation(async ({ input: { id, name, icon }, ctx: { userId } }) => {
      const updateData = { ...(name && { name }), ...(icon && { icon }) };
      const res = await db
        .update(folders)
        .set(updateData)
        .where(and(eq(folders.id, id), eq(folders.userId, userId)))
        .returning();

      logger.log("Updated folder:", { id, userId, updateData }, "Result:", res);
      return res[0] ?? null;
    }),

  // Delete Folder
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx: { userId } }) => {
      const res = await db
        .delete(folders)
        .where(and(eq(folders.id, id), eq(folders.userId, userId)))
        .returning();

      logger.log("Deleted folder:", id, "User:", userId, "Result:", res);
      return res[0] ?? null;
    }),
});

