/**@desc RPC access routes */
import { TRPCError, } from '@trpc/server';
import { router , sessionedProcedure } from '../trpc';
import * as z from 'zod';
import generateOTP, { generateOTPInterface } from '../../utils/otpGenerator';
import { sendEmailOTP } from '../../utils/customMailDispatcher';
import validateOTP, { validationTOTPResultInterface } from '../../utils/otpValidator';
import { encrypt, GEncryptedKey } from '../../utils/cryptoUtils';
import { accessTokenPayload, signJwt } from '../../utils/jwtUtils';
import { User } from '@prisma/client';

/**@desc this is custom query success response interface */
export interface CustQueryResultInterface {
  success: boolean;
  message: string;
  data: Object;
}

/**@desc this is custom mutation success response interface */
export interface CustMutationResultInterface {
  message: string;
  data: Object;
}

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

    /**@desc- dispatches email code to user with restricted time validity */
    dispatchEmailCode: sessionedProcedure
    .input(
      z.object({
        email: z.string().min(1).email(),
      }),
    )
    .query(async({ ctx, input }) : Promise<CustQueryResultInterface | TRPCError> => {
      if(ctx.authorizedpass !== null || !ctx.session){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      // generate an OTP 
      const emailOTP: generateOTPInterface =  await generateOTP(60);

      // dispatch it to user email
      const emailDispatched: Boolean = await sendEmailOTP(input.email, emailOTP.otpToken );
      
      if(!emailDispatched){
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `failed to dispatch email otp for ${input.email}`,
        })
      }
      console.log(emailDispatched);
      return new Promise<CustQueryResultInterface>((resolve)=>{
        resolve(Object.freeze({
          success: true,
          message: `otp was dispatched to ${input.email}`,
          data: {}
        }))
      });
    }),

    /**@desc- verifies email otp code & dispatches JWT cum JWE access token for trpc-client to make protected/tracked procedures call to trpc-server*/
    verifyEmailCode: sessionedProcedure
    .input(
      z.object({
        email_code: z.string().length(6),
      }),
    )
    .mutation(async({ctx,input}) : Promise< CustMutationResultInterface | TRPCError > => {
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
      
      // verify OTP & check for validation & verification & throw appropriate errors 
      const validationResult:validationTOTPResultInterface = await validateOTP(input.email_code);

      if(!validationResult.isValid){
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid OTP was supplied`
        })
      }

      if(!validationResult.isVerified){
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Incorrect/Expired OTP was supplied`
        })
      }
      console.log(validationResult);

      // prepare the decrypted token pd & inc token version in db and sync the same in pd
      const updatedTV: User | any = await ctx.prisma?.user.update({
        where: {
          email: ctx.userAttachedData.email,
        },
        data: { 
          tokenVersion: {
            increment: 1,
          },
        },
      });

      if(!updatedTV){
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Internal server error occured`
        })
      }

      const dectokenPD: accessTokenPayload = Object.freeze({
        userID: updatedTV.id,
        userEmail: updatedTV.email,
        role: updatedTV.role,
        tokenVersion: updatedTV.tokenVersion
      });

      //  encrypt the token payload to be sent
      const enctokenPD: GEncryptedKey = encrypt(JSON.stringify(dectokenPD),process.env.ENC_ACCESS_TOKEN_SECRET as string);

      // sign the jwe token
      const rpcAT: string = await signJwt(enctokenPD);

      if(!rpcAT){
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to generate token for rpc access`
        })
      }
      

      // dispatch jwe cum jwt 
      // try to standardazie the response format https://trpc.io/docs/rpc#successful-response
      return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
        resolve(Object.freeze({
          message: `email otp was verified successfully & token for rpc access was generated!`,
          data: {
              token: rpcAT
          }
        }))
      })
    }),
})