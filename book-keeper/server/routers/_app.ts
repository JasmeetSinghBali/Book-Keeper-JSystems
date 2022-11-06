import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { userRouter } from './user';

/**@desc- app level router init */
export const appRouter = router({
    /**@desc- test hello publicProcedure */
    hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    }),
    /**@desc- all user related public or private Procedures[query/mutations]  */
    user: userRouter,
});

// export type definition of API to be exposed to client for type inferences
export type AppRouter = typeof appRouter;