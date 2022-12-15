import * as z from 'zod';

/**
 * @desc Update Email/Phone Schema
 */
export const generateMfaSchema = z.object({
    email: z.string().email()
})


export type ILogin = z.infer<typeof generateMfaSchema>;