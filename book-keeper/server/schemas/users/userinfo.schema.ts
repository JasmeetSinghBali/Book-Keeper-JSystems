import * as z from "zod";


/**
 * @desc user info schema
 */
export const userInfoSchema = z.object({
    email: z.string().email(),
    access_token: z.string().min(1)               
})

export type UserInfoSchema = z.infer<typeof userInfoSchema>;