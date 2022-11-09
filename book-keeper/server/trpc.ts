/**@desc Instantiate the trpc server & export common  router & procedure as publicProcedure & protectedProcedure */

import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';

// Avoid exporting the entire t-object since it's not very
// descriptive and can be confusing to newcomers used to t
// meaning translation in i18n libraries.

/**@desc instantiate trpc instance with common context */
const t = initTRPC.context<Context>().create();

/**
 * @desc middleware that tracks incoming requests
 **/
 const requestTracker = t.middleware(({ next, ctx }) => {
  // if (!ctx.session?.user?.email) {
  //   throw new TRPCError({
  //     code: 'UNAUTHORIZED',
  //   });
  // }

  // 🎈 tracks incoming request and log IP's , access points & device info, geolocation
  console.log(ctx.req)
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.req,
    },
  });
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedures for logged in users only
export const trackedProcedure = t.procedure.use(requestTracker);