/**@desc User Routes */
import { TRPCError, } from '@trpc/server';
import { signUpSchema } from '../schemas/users/signup.schema';
import { router , trackedProcedure } from '../trpc';
import { hashSync } from 'bcryptjs';
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
        .query(async ({ ctx, input }) => {
            const { email } = input;
            const user: any = await ctx?.prisma?.user.findFirst({
                where: {email},
            });
            if(!user){
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Email: ${email} Not Found`,
                });
            }
            if(user.role !== 'USER'){
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: `Unauthorized`,
                });
            }
            return {
                status: 200,
                message: `userInfo: ${email}`,
                data: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                    plan: user.plan,
                    phone: user.phone
                }
            } 
    }),

    onboard: trackedProcedure
        .input(signUpSchema)
        .mutation(async ({ ctx, input }) => {
            const { email, password } = input;
            const alreadyExists = await ctx?.prisma?.user.findFirst({
                where: {email},
            });
            if(alreadyExists){
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Email already in use",
                });
            }

            const hashedP = hashSync(password, 13);
            input.password = hashedP;
            const result = await ctx?.prisma?.user.create({data: input});
            return {
                status: 201,
                message: "Account created successfully",
                meta: result?.email
            } 
    }),
})