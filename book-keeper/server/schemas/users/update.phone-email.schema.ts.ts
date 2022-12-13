import * as z from 'zod';

/**
 * @desc Update Email/Phone Schema
 */
export const updateEmailPhoneSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    emailCode: z.string().length(6)
})


export type ILogin = z.infer<typeof updateEmailPhoneSchema>;