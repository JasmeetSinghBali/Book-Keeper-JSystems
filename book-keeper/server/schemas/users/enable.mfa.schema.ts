import * as z from 'zod';

/**
 * @desc Enables user mfa, user account actions now requires additional mfa code to be entered
 */
export const enableMfaSchema = z.object({
    email: z.string().email(),
    mfaCode: z.string().length(6),
    access_token: z.string().min(1)
})


export type ILogin = z.infer<typeof enableMfaSchema>;