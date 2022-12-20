import * as z from 'zod';

/**
 * @desc edit exisiting contact in db
 */
export const editContactSchema = z.object({
    id: z.string().min(1),
    name: z.string().optional(),
    image: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    cardtype: z.string().optional(),
    cardno: z.string().optional(),
    access_token: z.string().min(1)
})


export type AddNewContactSchema = z.infer<typeof editContactSchema>;