import * as z from "zod";
import {  GenericEmailConstraint } from "../helpers";

/**
 * @desc user info schema
 */
export const userInfoSchema = z.object({
    email: z.string().email(),
    access_token: z.string().min(1)               
})

export type ISignUp = z.infer<typeof userInfoSchema>;