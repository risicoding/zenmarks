import { bookmarkInputSchema, bookmarks } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/db";

export const bookmarkRouter = createTRPCRouter({
  add: protectedProcedure
    .input(bookmarkInputSchema.pick({ url: true }))
    .mutation(async (opts) => {
      const { url } = opts.input;

      const { userId } = opts.ctx;
      if (!userId) return;

      const res = await db
        .insert(bookmarks)
        .values({ url, userId })
        .returning();
      console.log(res);
    }),
});
