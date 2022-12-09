/**@desc User Routes */
import { TRPCError, } from '@trpc/server';
import { router , trackedProcedure } from '../trpc';
import { userInfoSchema } from '../schemas/users/userinfo.schema';

/**
 * @desc user level router for both public/untracked & protected/tracked procedures(query/mutations)
 */
export const userRouter = router({
    
    /** 📝 Protected/tracked routes Section for logged in user only i.e with session + trpc client access to trpc server with Auth token */
    
    /**
     * @desc fetches information of the user by email from DB &
     * @returns user data back to trpc client call instance 
     * */
    whoami: trackedProcedure
        .input(userInfoSchema)
        .mutation(async ({ ctx, input }) => {
            const { email } = input;
            if(ctx.userAttachedData.role !== 'USER'){
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: `Unauthorized`,
                });
            }
            
            return {
                status: 200,
                message: `userInfo: ${email}`,
                data: {
                    name: ctx.userAttachedData.name,
                    email: ctx.userAttachedData.email,
                    image: ctx.userAttachedData.image,
                    role: ctx.userAttachedData.role,
                    plan: ctx.userAttachedData.plan,
                    phone: ctx.userAttachedData.phone
                }
            } 
    }),
})