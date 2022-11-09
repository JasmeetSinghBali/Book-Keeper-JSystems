/**@desc User Routes */
import { TRPCError, } from '@trpc/server';
import { signUpSchema } from '../schemas/users/signup.schema';
import { router , publicProcedure, trackedProcedure } from '../trpc';
import { hashSync } from 'bcryptjs';


export const userRouter = router({
    
    /** 📝 public facing routes Section */
    
    /**@desc signup for new user */
    onboard: publicProcedure
        .input(signUpSchema)
        .mutation(async ({ ctx, input }) => {
            const { email, password } = input;
            const alreadyExists = await ctx.prisma.users.findFirst({
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
            const result = await ctx.prisma.users.create({data: input});
            return {
                status: 201,
                message: "Account created successfully",
                meta: result.email
            } 
            // 🎈
            // signup new user ,
            // & redirect new user to loginPage[email-pass] via UI to login through next/auth credentials form
        }),
    
    /** 📝 tracked routes Section */
    
})