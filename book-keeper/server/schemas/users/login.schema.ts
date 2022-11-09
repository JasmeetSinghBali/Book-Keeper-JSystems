import { GenericEmailConstraint } from "../helpers";
import * as z from 'zod';

/**
 * @desc login schema
 */
export const loginSchema = z.object({
    email: GenericEmailConstraint,
    password: z.string().min(16)
})


export type ILogin = z.infer<typeof loginSchema>;