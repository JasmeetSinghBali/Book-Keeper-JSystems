/**@desc User Routes */
import { TRPCError, } from '@trpc/server';
import { router , trackedProcedure } from '../trpc';
import { userInfoSchema } from '../schemas/users/userinfo.schema';
import { updateEmailPhoneSchema } from '../schemas/users/update.phone-email.schema.ts';
import validateOTP, { validationTOTPResultInterface } from '../../utils/otpValidator';
import { User } from '@prisma/client';
import { CustMutationResultInterface } from './rpcaccess';

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

    /**
     * @desc verifies OTP & update's user email/phone [general setting flow]
     * @returns mutationResultInterface | TRPCerror
     */
    updateEmailPhone: trackedProcedure
    .input(updateEmailPhoneSchema)
    .mutation(async({ctx,input}): Promise<CustMutationResultInterface | TRPCError> =>{
        const { email, phone, emailCode } = input;
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
        if(email === 'null' && phone !== '0'){
            updatedUser = await ctx.prisma?.user.update({
                where: {
                    email: input.email
                },
                data: {
                    phone: input.phone
                }
            });
        }

        // Case2: Only update user email
        if(email !== 'null' && phone === '0'){
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
        if(email !== 'null' && phone !== '0'){
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