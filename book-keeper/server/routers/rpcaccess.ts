/**@desc RPC access routes */
import { TRPCError, } from '@trpc/server';
import { router , sessionedProcedure } from '../trpc';
import * as z from 'zod';
import generateOTP, { generateOTPInterface } from '../../utils/otpGenerator';
import { sendEmailOTP } from '../../utils/customMailDispatcher';
import validateOTP, { validationTOTPResultInterface } from '../../utils/otpValidator';
import { encrypt, GEncryptedKey } from '../../utils/cryptoUtils';
import { accessTokenPayload, signJwt, verifyJwt } from '../../utils/jwtUtils';
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
    
    /**📝 sessioned routes section, enables/activates rpc access for the user */

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
      console.log("rpcAccess sessioned procedure email OTP dispatched....");
      console.log(emailDispatched);
      return new Promise<CustQueryResultInterface>((resolve)=>{
        resolve(Object.freeze({
          success: true,
          message: `otp was dispatched to ${input.email}`,
          data: {}
        }))
      });
    }),

    /**
     * @desc verifies email otp code & activates rpc access (rpcAccess: true)
     * attaches token in response cookie 
     * */
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

      const updatedrpcAccess: User | any = await ctx.prisma?.user.update({
        where:{
          email: ctx.userAttachedData.email
        },
        data: {
          rpcAccess: true
        },
      }) 
      
      if(!updatedrpcAccess || !updatedrpcAccess.rpcAccess){
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `failed to activate rpc access for the user: ${ctx.userAttachedData.email}`
        });
      }
      
      return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
        resolve(Object.freeze({
          message: `email otp was verified successfully & rpc access was granted!`,
          data: {
              userEmail: updatedrpcAccess.email
          }
        }))
      });      
    }),

    /**@desc- dispatch jwe for rpc tracked/protected procedures access */
    fetchRpcToken: sessionedProcedure
    .input(
      z.object({
        email: z.string().min(1).email(),
      }),
    )
    .query(async({ctx,input}) : Promise< CustQueryResultInterface | TRPCError > => {
      if(ctx.authorizedpass !== null || !ctx.session){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      
      if(!ctx.userAttachedData.rpcAccess){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      
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

      return new Promise<CustQueryResultInterface | TRPCError>((resolve)=>{
        resolve(Object.freeze({
          success: true,
          message: `rpc access token was generated successfully!`,
          data: {
              rpc_token: rpcAT
          }
        }))
      });

    }),

    /**@desc- check current user has rpc access or not */
    checkRpcAccess: sessionedProcedure
    .input(
      z.object({
        email: z.string().min(1).email(),
      }),
    )
    .query(async({ctx,input}) : Promise< CustQueryResultInterface | TRPCError > => {
      if(!ctx.session){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      
      if(!ctx.userAttachedData.rpcAccess){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      
      return new Promise<CustQueryResultInterface | TRPCError>((resolve)=>{
        resolve(Object.freeze({
          success: true,
          message: `rpc access for user: ${input.email} is active`,
          data: {}
        }))
      });
    }),

    /** @desc- check current user jwt token validity on initial pageload, utilized in token rotation */
    checkRpcTokenValidity: sessionedProcedure
    .input(
      z.object({
        rpc_token: z.string().min(1),
      }),
    )
    .query(async({ctx,input}) : Promise< CustQueryResultInterface | TRPCError > => {
      if(!ctx.session){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      
      if(!ctx.userAttachedData.rpcAccess){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }

      // check rpcTokenValidity
      const pd: any = await verifyJwt(input.rpc_token);
      if(!pd){
        console.log("jwt verification failed, rpc access session route");
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "rpc token validity expired!"
        });
      }

      return new Promise<CustQueryResultInterface | TRPCError>((resolve)=>{
        resolve(Object.freeze({
          success: true,
          message: `rpc token validity is still good!`,
          data: {
            valid: true
          }
        }))
      });

    }),

    // here goes next mutation & query
    
})