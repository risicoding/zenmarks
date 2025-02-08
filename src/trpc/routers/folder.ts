import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/db";
import { folders } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const folderRouter = createTRPCRouter({
  // Create Folder
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { name } = opts.input;
      const { userId } = opts.ctx;
      const res = await db.insert(folders).values({ name, userId }).returning();
      return res;
    }),

  // Get All Folders
  getAll: protectedProcedure.query(async (opts) => {
    const { userId } = opts.ctx;
    const res = await db
      .select()
      .from(folders)
      .where(eq(folders.userId, userId));
    return res;
  }),

  // Get Folder By ID
  getById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async (opts) => {
      const { id } = opts.input;
      const { userId } = opts.ctx;
      const res = await db
        .select()
        .from(folders)
        .where(and(eq(folders.id, id), eq(folders.userId, userId)))
        .limit(1);
      return res[0] ?? null;
    }),

  // Update Folder
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { id, name } = opts.input;
      const { userId } = opts.ctx;
      const res = await db
        .update(folders)
        .set({ name })
        .where(and(eq(folders.id, id), eq(folders.userId, userId)))
        .returning();
      return res[0] ?? null;
    }),

  // Delete Folder
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async (opts) => {
      const { id } = opts.input;
      const { userId } = opts.ctx;
      const res = await db
        .delete(folders)
        .where(and(eq(folders.id, id), eq(folders.userId, userId)))
        .returning();
      return res[0] ?? null;
    }),
});
