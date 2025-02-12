import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/db";
import { folders } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import slugify from "@/lib/slugify";
import { nanoid } from "nanoid";

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
      const slug = slugify(name);
      const res = await db
        .insert(folders)
        .values({ id: nanoid(), name, slug, userId })
        .returning();
      return res;
    }),

  getAll: protectedProcedure.query(async (opts) => {
    const { userId } = opts.ctx;
    const res = await db
      .select()
      .from(folders)
      .where(eq(folders.userId, userId))
      .orderBy(folders.createdAt);
    return res;
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
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
        id: z.string(),
        name: z.string().optional(),
        icon: z.string().optional(),
      }),
    )
    .mutation(async (opts) => {
      const { id, name, icon } = opts.input;
      const { userId } = opts.ctx;
      const res = await db
        .update(folders)
        .set({ name, icon })
        .where(and(eq(folders.id, id), eq(folders.userId, userId)))
        .returning();
    console.log(res)
      return res[0] ?? null;
    }),

  // Delete Folder
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { id } = opts.input;
      console.log(id);
      const { userId } = opts.ctx;
      const res = await db
        .delete(folders)
        .where(and(eq(folders.id, id), eq(folders.userId, userId)))
        .returning();
      return res[0] ?? null;
    }),
});
