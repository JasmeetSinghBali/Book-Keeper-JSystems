import * as z from 'zod';

/**
 * @desc add new contact to db
 */
export const addNewContactSchema = z.object({
    name: z.string().min(1).optional(),
    image: z.string().min(1).optional(),
    email: z.string().email(),
    phone: z.string().min(1),
    cardtype: z.string().min(1),
    cardno: z.string().length(16),
    access_token: z.string().min(1)
})


export type AddNewContactSchema = z.infer<typeof addNewContactSchema>;