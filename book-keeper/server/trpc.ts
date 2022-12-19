/**@desc Instantiate the trpc server & export common  router & procedure as publicProcedure & trackedProcedure */

import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';


// Avoid exporting the entire t-object since it's not very
// descriptive and can be confusing to newcomers used to t
// meaning translation in i18n libraries.

/**@desc instantiate trpc instance with common context */
const t = initTRPC.context<Context>().create();

/**
 * 🎈 not yet completed
 * @desc middleware that tracks incoming requests to trpc server from trpc client
 * @functions check session,jwt verified payload,log IP's/accesspoints/deviceinfo & geolocation
 **/
 const requestTracker = t.middleware(async({ next, ctx }) => {
  
  /** Check: 1 Unauthorized error in case session not exist , to protect trpc calls only for next-auth session logged in users */
  if( !ctx.session || !ctx.session.user || !ctx.session?.user?.email){
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'invalid session'
    });
  }  

  /** Check: 2 check for attached jwt verified payload*/
  if(ctx.authorizedpass === null || !ctx.authorizedpass){
    console.log("============CULPRIT========");
    console.log(ctx.authorizedpass);
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'invalid access'
    })
  }

  /** Check: 3 check for user existance */
  const userExists: any = await ctx.prisma?.user.findFirst({
    where: {
      email: ctx.session.user.email
    }
  });

  if(!userExists){
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Not found`
    });
  }
  if(!userExists.active){
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `account: ${userExists.email} is disabled/inactive, please contact support`
    })
  }

  if(!userExists.rpcAccess){
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `account: ${userExists.email} rpc access is not active`
    })
  }

  // Check: 4 🎈 tracks incoming request and log IP's , access points & device info, geolocation
  console.log("----HIT MADE THROUGH TRACKED PROCEDURE----")
  // 💭 here events via event-emitters setup can be emitted that handles the logging of IP, access points, device info & geolocation & storing into db 

  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.req,
      userAttachedData: userExists
    },
  });
});

/**
 * @desc middleware that tracks incoming requests to trpc server from trpc client
 * @functions only checks for existing session
 **/
const sessionTracker = t.middleware(async( { next, ctx } )=>{
  if( !ctx.session || !ctx.session.user || !ctx.session?.user?.email){
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'invalid session'
    });
  }
  const userExists: any = await ctx.prisma?.user.findFirst({
    where: {
      email: ctx.session.user.email
    }
  });

  if(!userExists){
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Not found`
    });
  }
  if(!userExists.active){
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `account: ${userExists.email} is disabled/inactive, please contact support`
    })
  }
  return next({
    ctx: {
      session: ctx.req,
      userAttachedData: userExists
    },
  });
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedures for logged in users with session + trpc client access to trpc server with auth token 
export const trackedProcedure = t.procedure.use(requestTracker);

// Sessioned procedures for logged in user with session only but no trpc client access to trpc server
export const sessionedProcedure = t.procedure.use(sessionTracker);