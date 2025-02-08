import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { bookmarkRouter } from "./bookmark";
export const appRouter = createTRPCRouter({
  hello:protectedProcedure.query(()=>'hello'),
  bookmark: bookmarkRouter,
});
export type AppRouter = typeof appRouter;
