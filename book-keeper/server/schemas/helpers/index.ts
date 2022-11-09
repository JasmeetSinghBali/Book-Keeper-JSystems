import * as z from 'zod';

/**generic constraints */
export const GenericStringConstraint = z.string().min(1); 
export const GenericNameConstraint = z.string().min(10).max(36).optional();
export const GenericEmailConstraint = z.string().email();
export const GenericPhoneConstraint = z.string().min(7).max(15);//international phone numbering plan (ITU-T E. 164), phone numbers cannot contain more than 15 digits. The shortest international phone numbers in use contain seven digits.
export const GenericCardNoConstraint = z.string().length(16);
