import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { userRouter } from './user';

/**@desc- app level router init */
export const appRouter = router({
    /**@desc- test hello publicProcedure */
    message: publicProcedure
    .input(
      z.object({
        name: z.string().nullish(),
      }),
    )
    .query(({ ctx, input }) => {
      // console.log(ctx);
      return {
        greeting: `hello ${input?.name ?? 'world'}`,
        from: 'this message is from trpc server',
      };
    }),
    /**@desc- all user related public or private Procedures[query/mutations]  */
    user: userRouter,
});

// export type definition of API to be exposed to client for type inferences
export type AppRouter = typeof appRouter;