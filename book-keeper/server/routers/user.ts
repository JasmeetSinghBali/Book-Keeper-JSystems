/**@desc User Routes */
import { router , publicProcedure, trackedProcedure } from '../trpc';
import { z } from 'zod';

/**
 * @desc GenericUserConstraints
 * 
*/
const GenericStringConstraint = z.string().min(1); 
const GenericNameConstraint = z.string().min(10).max(36).optional();
const GenericEmailConstraint = z.string().email();
const GenericPhoneConstraint = z.string().min(7).max(15);//international phone numbering plan (ITU-T E. 164), phone numbers cannot contain more than 15 digits. The shortest international phone numbers in use contain seven digits.
const GenericCardNoConstraint = z.string().length(16);


export const userRouter = router({
    
    /** 📝 public facing routes Section */
    
    /**@desc signup for new user */
    onboard: publicProcedure
        .input(
            z.object({
                email: GenericEmailConstraint,
                name: GenericNameConstraint,     
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
        )
        .mutation(({ ctx, input }) => {
            // 🎈
            // signup new user ,
            // & redirect new user to loginPage[email-pass] via UI to login through next/auth credentials form
        }),
    
    /** 📝 tracked routes Section */
    
    
    /** 🚧 this is for future versions to make programatic calls of getting a timestamped token to access book keeper api by other developers programatically */
    checkIn: publicProcedure
        .input(
            z.object({
                email: GenericEmailConstraint,
                clientID: z.string().uuid(),
                clientSecret: z.string()
            })
        )
        .mutation(({ ctx, input })=>{
            // 🚧
            // generates access token for api programattic access
        })
})