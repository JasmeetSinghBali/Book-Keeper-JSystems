/**@desc User Routes */
import { TRPCError, } from '@trpc/server';
import { router , trackedProcedure } from '../trpc';
import { userInfoSchema } from '../schemas/users/userinfo.schema';
import { updateEmailPhoneSchema } from '../schemas/users/update.phone-email.schema.ts';
import validateOTP, { validationTOTPResultInterface } from '../../utils/otpValidator';
import { User } from '@prisma/client';
import { CustMutationResultInterface } from './rpcaccess';
import * as z from 'zod';
import generateOTP, { generateOTPInterface } from '../../utils/otpGenerator';
import { sendEmailOTP } from '../../utils/customMailDispatcher';

/**
 * @desc user level router for both public/untracked & protected/tracked procedures(query/mutations)
 */
export const userRouter = router({
    
    /** 📝 Protected/tracked routes Section for logged in user only i.e with session + trpc client access to trpc server with Auth token */
    
    /**
     * @desc fetches information of the user by email from DB &
     * @returns mutationResultInterface | TRPCError 
     * */
    whoami: trackedProcedure
        .input(userInfoSchema)
        .mutation(async ({ ctx, input }): Promise<CustMutationResultInterface | TRPCError> => {
            const { email } = input;
            if(ctx.userAttachedData.role !== 'USER'){
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: `Unauthorized`,
                });
            }
            
            return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
                resolve(Object.freeze({
                    message: `userInfo: ${email}`,
                    data: {
                        name: ctx.userAttachedData.name,
                        email: ctx.userAttachedData.email,
                        image: ctx.userAttachedData.image,
                        role: ctx.userAttachedData.role,
                        plan: ctx.userAttachedData.plan,
                        phone: ctx.userAttachedData.phone
                    }
                }))
            }) 
    }),

    /**@desc- dispatches email code to user with restricted time validity */
    dispatchEmailOtp: trackedProcedure
    .input(
      z.object({
        email: z.string().min(1).email(),
        access_token: z.string().min(1)
      }),
    )
    .mutation(async({ ctx, input }) : Promise<CustMutationResultInterface | TRPCError> => {
      if(!ctx.session){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      // generate an OTP 
      const emailOTP: generateOTPInterface =  await generateOTP(120); // 2 min validity otp 

      // dispatch it to user email
      const emailDispatched: Boolean = await sendEmailOTP(input.email, emailOTP.otpToken );
      
      if(!emailDispatched){
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `failed to dispatch email otp for ${input.email}`,
        })
      }
      console.log("user protected/tracked procedure email OTP dispatched....");
      console.log(emailDispatched);
      return new Promise<CustMutationResultInterface| TRPCError>((resolve)=>{
        resolve(Object.freeze({
          message: `otp was dispatched to ${input.email}`,
          data: {}
        }))
      });
    }),

    /**
     * @desc verifies OTP & update's user email/phone [general setting flow]
     * @returns mutationResultInterface | TRPCerror
     */
    updateEmailPhone: trackedProcedure
    .input(updateEmailPhoneSchema)
    .mutation(async({ctx,input}): Promise<CustMutationResultInterface | TRPCError> =>{
        const { email, phone, emailCode } = input;
        console.log("reached update email phone route");
        if(ctx.userAttachedData.role !== 'USER'){
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: `Unauhtorized`,
            });
        }
        if(!email || !phone || !emailCode){
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `Please make sure you provide email,phone,emailCode!`
            })
        }
        if(email === 'null' && phone === 'null'){
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `Please make sure at least email or phone is provided!`
            })
        }
        // check OTP
        const validationResult:validationTOTPResultInterface = await validateOTP(emailCode);

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
        // update user's email and phone
        let updatedUser: User | any = undefined;

        // Case1: Only update user phone
        if(email === 'null' && phone !== 'null'){
            updatedUser = await ctx.prisma?.user.update({
                where: {
                    email: ctx.userAttachedData.email
                },
                data: {
                    phone: input.phone
                }
            });
        }

        // Case2: Only update user email
        if(email !== 'null' && phone === 'null'){
            updatedUser = await ctx.prisma?.user.update({
                where: {
                    id: ctx.userAttachedData.id
                },
                data: {
                    email: input.email
                }
            })
        }

        // Case3: Update both email & phone
        if(email !== 'null' && phone !== 'null'){
            updatedUser = await ctx.prisma?.user.update({
                where: {
                    id: ctx.userAttachedData.id
                },
                data: {
                    email: input.email,
                    phone: input.phone
                }
            });
        }

        if(!updatedUser){
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `failed to update email/phone of the user: ${ctx.userAttachedData.email}`
            });
          }
        
        // return success with updated user data to populate in zustand store and sync data
        return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
            resolve(Object.freeze({
                message: `userInfo: ${email} email/phone was successfully updated`,
                data: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    image: updatedUser.image,
                    role: updatedUser.role,
                    plan: updatedUser.plan,
                    phone: updatedUser.phone
                }
            }))
        });

    }),
})