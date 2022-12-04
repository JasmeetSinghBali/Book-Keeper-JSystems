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
    
    /**@desc- get JWT cum JWE access token for trpc-client to make protected/tracked procedures call to trpc-server*/
    // 🎈 flow end-to-end: 
    // 1. if trpc server protected call fails like userInfo i.e invalid access from trpc/server due to missing jwt auth header or expired auth header then, show user a simplistic ui expecting a OTP sent at their mail to enter it, showing message we appreciate your patience but security is our topmost priority please verify that you have access to your mail associated to this keeper. account
    // 2. send an OTP to user's email address which will then be verified & the jwt cum jwe access token will be generated and returned

    /**@desc- all user related public or private Procedures[query/mutations]  */
    user: userRouter,

});

// export type definition of API to be exposed to client for type inferences
export type AppRouter = typeof appRouter;