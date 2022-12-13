import * as z from 'zod';

/**
 * @desc Update Email/Phone Schema
 */
export const updateEmailPhoneSchema = z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    emailCode: z.string().length(6),
    access_token: z.string().min(1)
})


export type ILogin = z.infer<typeof updateEmailPhoneSchema>;