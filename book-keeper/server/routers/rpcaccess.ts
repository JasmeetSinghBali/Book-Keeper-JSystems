/**@desc RPC access routes */
import { TRPCError, } from '@trpc/server';
import { router , sessionedProcedure } from '../trpc';
import * as z from 'zod';

/**
 * @desc public procedure for enabling trpc client access to trpc server for tracked/protected procedures
 */
export const rpcServerAccessRouter = router({
    
    /**📝 sessioned routes section */

    // 🎈 flow end-to-end: 
    // 1. if trpc server protected call fails like userInfo i.e invalid access from trpc/server due to missing jwt auth header or expired auth header then, show user a simplistic ui expecting a OTP sent at their mail to enter it, showing message we appreciate your patience but security is our topmost priority please verify that you have access to your mail associated to this keeper. account
    // 2. send an OTP to user's email address which will then be verified & the jwt cum jwe access token will be generated and returned
    // 3. on client side then update the recieved token in zustand store
    // 4. pick up the token from zustand store and place it as Authorization header value in the Clientrpc.ts config file 

    /**@desc- get JWT cum JWE access token for trpc-client to make protected/tracked procedures call to trpc-server*/
    dispatchEmailCode: sessionedProcedure
    .input(
      z.object({
        email: z.string().min(1).email(),
      }),
    )
    .query(({ ctx, input }) => {
      if(ctx.authorizedpass !== null || !ctx.session){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      // 🎈 dispatch an OTP to email with restricted time validity
    }),

    verifyEmailCode: sessionedProcedure
    .input(
      z.object({
        email_code: z.string().length(6),
      }),
    )
    .mutation(({ctx,input})=>{
      if(ctx.authorizedpass !== null || !ctx.session){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      if(!input.email_code){
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: `bad request was rejected.`,
          });
      }
      console.log(input.email_code);
      return{
        status: 200,
        message: `userInfo: ${input.email_code}`,
        data: {
            success: true
        }
      };
      // 🎈 verify OTP & send back jwe cum jwt back to client trpc to make protected/tracked procedures call with this token as Auth header to trpc server now
    }),
    
})