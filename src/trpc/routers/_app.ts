import { createTRPCRouter } from "../init";
import { bookmarkRouter } from "./bookmark";
import { folderRouter } from "./folder";
export const appRouter = createTRPCRouter({
  bookmark: bookmarkRouter,
  folder: folderRouter,
});
export type AppRouter = typeof appRouter;
