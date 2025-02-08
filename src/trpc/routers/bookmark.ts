import { bookmarkInputSchema, bookmarks } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { convertToHttps } from "@/lib/url";
import { scrapeTitle } from "@/lib/title";
import { z } from "zod";

export const bookmarkRouter = createTRPCRouter({
  create: protectedProcedure
    .input(bookmarkInputSchema.pick({ url: true }))
    .mutation(async (opts) => {
      const { url } = opts.input;
      const { userId } = opts.ctx;

      const formattedUrl = convertToHttps(url);

      const title = (await scrapeTitle(formattedUrl)) ?? url;

      const res = await db
        .insert(bookmarks)
        .values({ url: formattedUrl, title, userId })
        .returning();
      console.log(res);
      return res;
    }),
  query: protectedProcedure.query(async (opts) => {
    const { userId } = opts.ctx;

    console.log("inside query");

    const res = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId));
    console.log(res);
    return { res: res ?? [] };
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      const { id } = opts.input;

      const res = await db
        .delete(bookmarks)
        .where(eq(bookmarks.id, id))
        .returning();
      return res;
    }),
});
