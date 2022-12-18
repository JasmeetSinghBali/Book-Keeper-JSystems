import * as z from 'zod';

/**
 * @desc Update Email/Phone Schema
 */
export const generateMfaSchema = z.object({
    email: z.string().email(),
    access_token: z.string().min(1)
})


export type GenerateMfaSchema = z.infer<typeof generateMfaSchema>;