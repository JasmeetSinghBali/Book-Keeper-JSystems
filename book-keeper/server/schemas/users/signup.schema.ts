import * as z from "zod";
import { GenericCardNoConstraint, GenericEmailConstraint, GenericNameConstraint, GenericPhoneConstraint, GenericStringConstraint } from "../helpers";

/**
 * @desc signup schema
 */
export const signUpSchema = z.object({
    email: GenericEmailConstraint,
    username: GenericNameConstraint,  
    password: z.string().min(16),   
    phone: GenericPhoneConstraint, 
    Contact: z.object({
        name: GenericNameConstraint,
        email: GenericEmailConstraint,
        phone: GenericPhoneConstraint,
        cardtype: GenericStringConstraint, 
        cardno: GenericCardNoConstraint
    }),
    Card: z.object({
        cardtype: GenericStringConstraint,
        cardno: GenericCardNoConstraint
    })                
})

export type ISignUp = z.infer<typeof signUpSchema>;