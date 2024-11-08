import { postRouter } from "~/server/api/routers/post";
import { userRouter } from "~/server/api/routers/getCredits";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { generateRouter } from "~/server/api/routers/generateRouter"
import { checkoutRouter } from "~/server/api/routers/checkout"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  credits: userRouter,
  generate: generateRouter,
  checkout: checkoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
