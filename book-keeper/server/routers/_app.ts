import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { rpcServerAccessRouter } from './rpcaccess';
import { userRouter } from './user';

/**@desc- app level router init */
export const appRouter = router({
    
  /**
   * @desc- test hello 
   * @type publicProcedure
   * */
    message: publicProcedure
    .input(
      z.object({
        name: z.string().nullish(),
      }),
    )
    .query(({ ctx, input }) => {
      console.log('======== this is how ctx will look like on trpc server public procedure =========')
      console.log(ctx);
      return {
        greeting: `hello ${input?.name ?? 'world'}`,
        from: 'this message is from trpc server',
      };
    }),
    
    /**
     * @desc- trpc server access routes
     * @type sessioned procedure, 
     * @usage when user session exist but trpc client does not posses trpc server access token to make protected procedures call
     */
    rpcAccess: rpcServerAccessRouter,
    
    /**
     * @desc- specific user related routes 
     * @type protected/tracked Procedures
     * @usage user query/mutations  
     * */
    user: userRouter,

});

// export type definition of API to be exposed to client for type inferences
export type AppRouter = typeof appRouter;