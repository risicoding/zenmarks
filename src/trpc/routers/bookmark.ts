import { bookmarks } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { convertToHttps } from "@/lib/url";
import { getOgData, scrapeTitle } from "@/lib/opengraph";
import { z } from "zod";
import { nanoid } from "nanoid";

const googleFavicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;

const bookmarkSchema = z.object({
  id: z.string(),
  url: z.string().optional(),
  title: z.string().optional(),
  image: z.string().optional(),
  isFavourite: z.boolean().optional(),
});

export const bookmarkRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        url: z.string(),
        folderId: z.string().optional(),
        isFavourite: z.boolean().optional(),
      }),
    )
    .mutation(async (opts) => {
      const { url, folderId, isFavourite } = opts.input;
      const { userId } = opts.ctx;
      const formattedUrl = convertToHttps(url);

      const ogData = await getOgData(formattedUrl);

      const res = await db
        .insert(bookmarks)
        .values({
          id: nanoid(),
          url: formattedUrl,
          isFavourite,
          title: ogData?.title ?? url,
          favicon: ogData?.favicon ?? googleFavicon(url),
          image: ogData?.image,
          folderId,
          userId,
        })
        .returning();
      // console.log(res);
      return res;
    }),

  query: protectedProcedure.query(async (opts) => {
    const { userId } = opts.ctx;

    const res = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId));
    console.log(res);
    return { res: res ?? [] };
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { id } = opts.input;
      const { userId } = opts.ctx;

      const res = await db
        .delete(bookmarks)
        .where(and(eq(bookmarks.id, id), eq(bookmarks.userId, userId)))
        .returning();
      return res;
    }),
  update: protectedProcedure.input(bookmarkSchema).mutation(async (opts) => {
    const data = opts.input;
    const { userId } = opts.ctx;
    const res = await db
      .update(bookmarks)
      .set(data)
      .where(and(eq(bookmarks.id, data.id), eq(bookmarks.userId, userId)))
      .returning();
    console.log(res);
    return res;
  }),
  getByFolder: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { id } = opts.input;
      const { userId } = opts.ctx;

      const res = await db
        .select()
        .from(bookmarks)
        .where(and(eq(bookmarks.folderId, id), eq(bookmarks.userId, userId)));
      return res;
    }),
  getFavourites: protectedProcedure.query(async (opts) => {
    const { userId } = opts.ctx;
    const res = await db
      .select()
      .from(bookmarks)
      .where(
        and(eq(bookmarks.isFavourite, true), eq(bookmarks.userId, userId)),
      );
    return res;
  }),
});
