import * as z from 'zod';

/**
 * @desc validates mfa codes
 */
export const validateMfaCodeSchema = z.object({
    email: z.string().email(),
    mfaCode: z.string().length(6),
    access_token: z.string().min(1)
})


export type validateMfaCodeSchema = z.infer<typeof validateMfaCodeSchema>;