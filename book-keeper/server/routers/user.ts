/**@desc User Routes */
import { TRPCError, } from '@trpc/server';
import { router , trackedProcedure } from '../trpc';
import { userInfoSchema } from '../schemas/users/userinfo.schema';
import { updateEmailPhoneSchema } from '../schemas/users/update.phone-email.schema.ts';
import validateOTP, { validationTOTPResultInterface } from '../../utils/otpValidator';
import { CardType, Contact, User } from '@prisma/client';
import { CustMutationResultInterface, CustQueryResultInterface } from './rpcaccess';
import * as z from 'zod';
import generateOTP, { generateOTPInterface } from '../../utils/otpGenerator';
import { sendEmailOTP } from '../../utils/customMailDispatcher';
import { generateMfaSchema } from '../schemas/users/generate.mfa.schema';
import speakeasy from 'speakeasy';
import { encrypt } from '../../utils/cryptoUtils';
import QRCode  from 'qrcode';
import { enableMfaSchema } from '../schemas/users/enable.mfa.schema';
import isValidMfaCodes from '../../utils/validate.mfaCodes';
import { validateMfaCodeSchema } from '../schemas/users/validate.mfacodes.schema';
import { addNewContactSchema } from '../schemas/users/add.contact.schema';


/**
 * @desc user level router for both public/untracked & protected/tracked procedures(query/mutations)
 */
export const userRouter = router({
    
    /** 📝 Protected/tracked routes Section for logged in user only i.e with session + trpc client access to trpc server with Auth token */
    
    /**
     * @desc fetches information of the user by email from DB &
     * @returns mutationResultInterface | TRPCError 
     * */
    whoami: trackedProcedure
        .input(userInfoSchema)
        .mutation(async ({ ctx, input }): Promise<CustMutationResultInterface | TRPCError> => {
            const { email } = input;
            if(ctx.userAttachedData.role !== 'USER'){
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: `Unauthorized`,
                });
            }
            
            return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
                resolve(Object.freeze({
                    message: `userInfo: ${email}`,
                    data: {
                        name: ctx.userAttachedData.name,
                        email: ctx.userAttachedData.email,
                        image: ctx.userAttachedData.image,
                        role: ctx.userAttachedData.role,
                        plan: ctx.userAttachedData.plan,
                        phone: ctx.userAttachedData.phone,
                        mfa_isEnabled: ctx.userAttachedData.mfa_isEnabled
                    }
                }))
            }) 
    }),

    /**@desc- dispatches email code to user with restricted time validity */
    dispatchEmailOtp: trackedProcedure
    .input(
      z.object({
        email: z.string().min(1).email(),
        access_token: z.string().min(1)
      }),
    )
    .mutation(async({ ctx, input }) : Promise<CustMutationResultInterface | TRPCError> => {
      if(!ctx.session){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `request was rejected.`,
        });
      }
      // generate an OTP 
      const emailOTP: generateOTPInterface =  await generateOTP(120); // 2 min validity otp 

      // dispatch it to user email
      const emailDispatched: Boolean = await sendEmailOTP(input.email, emailOTP.otpToken );
      
      if(!emailDispatched){
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `failed to dispatch email otp for ${input.email}`,
        })
      }
      console.log("user protected/tracked procedure email OTP dispatched....");
      console.log(emailDispatched);
      return new Promise<CustMutationResultInterface| TRPCError>((resolve)=>{
        resolve(Object.freeze({
          message: `otp was dispatched to ${input.email}`,
          data: {}
        }))
      });
    }),

    /**
     * @desc verifies OTP & update's user email/phone [general setting flow]
     * @returns mutationResultInterface | TRPCerror
     */
    updateEmailPhone: trackedProcedure
    .input(updateEmailPhoneSchema)
    .mutation(async({ctx,input}): Promise<CustMutationResultInterface | TRPCError> =>{
        const { email, phone, emailCode } = input;
        console.log("reached update email phone route");
        if(ctx.userAttachedData.role !== 'USER'){
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: `Unauhtorized`,
            });
        }
        if(!email || !phone || !emailCode){
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `Please make sure you provide email,phone,emailCode!`
            })
        }
        if(email === 'null' && phone === 'null'){
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `Please make sure at least email or phone is provided!`
            })
        }
        // check OTP
        const validationResult:validationTOTPResultInterface = await validateOTP(emailCode);

        if(!validationResult.isValid){
            throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Invalid OTP was supplied`
            })
        }

        if(!validationResult.isVerified){
            throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Incorrect/Expired OTP was supplied`
            })
        }
        // update user's email and phone
        let updatedUser: User | any = undefined;

        // Case1: Only update user phone
        if(email === 'null' && phone !== 'null'){
            updatedUser = await ctx.prisma?.user.update({
                where: {
                    email: ctx.userAttachedData.email
                },
                data: {
                    phone: input.phone
                }
            });
        }

        // Case2: Only update user email
        if(email !== 'null' && phone === 'null'){
            updatedUser = await ctx.prisma?.user.update({
                where: {
                    id: ctx.userAttachedData.id
                },
                data: {
                    email: input.email
                }
            })
        }

        // Case3: Update both email & phone
        if(email !== 'null' && phone !== 'null'){
            updatedUser = await ctx.prisma?.user.update({
                where: {
                    id: ctx.userAttachedData.id
                },
                data: {
                    email: input.email,
                    phone: input.phone
                }
            });
        }

        if(!updatedUser){
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `failed to update email/phone of the user: ${ctx.userAttachedData.email}`
            });
          }
        
        // return success with updated user data to populate in zustand store and sync data
        return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
            resolve(Object.freeze({
                message: `userInfo: ${email} email/phone was successfully updated`,
                data: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    image: updatedUser.image,
                    role: updatedUser.role,
                    plan: updatedUser.plan,
                    phone: updatedUser.phone
                }
            }))
        });

    }),

    /**@desc generates qr code for enabling mfa for user's account that effects account related settings update plan, delete acccount etc... */
    generateQrForMfa: trackedProcedure
    .input(generateMfaSchema)
    .mutation(async({ctx,input}): Promise<CustMutationResultInterface | TRPCError> =>{
        const { email } = input; 
        if(ctx.userAttachedData.role !== 'USER'){
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: `Unauhtorized`,
            });
        }
        if(!email){
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `Please make sure you provide account email!`
            })
        }
        if(ctx.userAttachedData.mfa_isEnabled){
            throw new TRPCError({
                code: "FORBIDDEN",
                message: `Account: ${email} has mfa already enabled!`
            })
        }

        // generate a secret
        const secret = speakeasy.generateSecret();

        // encrypt the secret
        const encryptedText = encrypt(secret.ascii, process.env.MFA_AUTH_SECRET as string);

        const secretPD = Object.freeze({
            iv: encryptedText.iv,
            content: encryptedText.content
        }); 

        // store secret in db secret_mfa as iv,secret GEncrypted interface as json
        await ctx.prisma?.user.update({
            where: {
                email: input.email
            },
            data: {
                secret_mfa: secretPD
            }
        });

        // custom otpauthurl
        const otpAuthUrl = speakeasy.otpauthURL(Object.freeze({
            secret: secret.ascii,
            label: 'Keeper"s Account MFA',
            issuer: 'keeper',
            algorithm: 'sha512'
        }));
        
        // create qr code img src url with custom otpauthurl
        const img_src = await QRCode.toDataURL(otpAuthUrl);

        if(!img_src){
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: `failed to generate qr code!`
            })
        }
        
        // send qr code data url back to client
        return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
            resolve(Object.freeze({
                message: `show this url in img tag to user`,
                data: {
                    show_url: img_src
                }
            }))
        });

    }),

    /**@desc validates pin from authenticator app & enables user account mfa*/
    enableAccountMfa: trackedProcedure
    .input(enableMfaSchema)
    .mutation(async({ctx,input}): Promise<CustMutationResultInterface | TRPCError> =>{
        
        if(ctx.userAttachedData.role !== 'USER'){
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: `Unauhtorized`,
            });
        }

        const { email, mfaCode } = input;
        
        if(!email || !mfaCode || mfaCode.length !==6){
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: `make sure you pass account email & 6 digit mfa code user entered!`
            });
        }
        
        if(ctx.userAttachedData.mfa_isEnabled){
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: `${ctx.userAttachedData.email} account has already enabled mfa!`
            })
        }

        const verifiedMFA = await isValidMfaCodes(mfaCode,ctx.userAttachedData.secret_mfa);
        
        if(!verifiedMFA){
            throw new TRPCError({
                code: `BAD_REQUEST`,
                message: `failed to verify mfa code for user!`
            })
        }

        const updatedUserMfa = await ctx.prisma?.user.update({
            where: {
                email: input.email
            },
            data: {
                mfa_isEnabled: true
            }
        });

        if(!updatedUserMfa){
            throw new TRPCError({
                code: `INTERNAL_SERVER_ERROR`,
                message: `failed to enable Mfa for user: ${input.email}`
            })
        }

        return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
            resolve(Object.freeze({
                message: `userInfo: ${email}`,
                data: {
                    name: updatedUserMfa.name,
                    email: updatedUserMfa.email,
                    image: updatedUserMfa.image,
                    role: updatedUserMfa.role,
                    plan: updatedUserMfa.plan,
                    phone: updatedUserMfa.phone,
                    mfa_isEnabled: updatedUserMfa.mfa_isEnabled
                }
            }))
        });

    }),

    /**@desc validates mfa codes , utilized for accessing account related actions like update plan, delete account */
    validatemfaCodes: trackedProcedure
    .input(validateMfaCodeSchema)
    .mutation(async({ctx,input}): Promise<CustMutationResultInterface | TRPCError> =>{
        
        if(ctx.userAttachedData.role !== 'USER'){
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: `Unauthorized`,
            });
        }

        const {email,mfaCode} = input;

        if(!email || !mfaCode || mfaCode.length !== 6){
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `mfaCode & email must be provided`
            })
        }

        const validateMFA = await isValidMfaCodes(mfaCode,ctx.userAttachedData.secret_mfa);

        if(!validateMFA){
            return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
                resolve(Object.freeze({
                    message: `userInfo: ${email}`,
                    data: {
                        validated: false
                    }
                }))
            });
        }
        return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
            resolve(Object.freeze({
                message: `userInfo: ${email}`,
                data: {
                    validated: true
                }
            }))
        });

    }),

    /**@desc maps to user & adds new contact in DB */
    addNewContact: trackedProcedure
    .input(addNewContactSchema)
    .mutation(async({ctx,input}): Promise<CustMutationResultInterface | TRPCError> =>{
        
        if(ctx.userAttachedData.role !== 'USER'){
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: `Unauthorized`,
            });
        }

        const newContact = await ctx.prisma?.contact.create({
            data: {
                name:  input.name,     
                image: input.image,   
                email: input.email,  
                phone: input.phone, 
                cardtype: input.cardtype as CardType,
                cardno: input.cardno,
                userId: ctx.userAttachedData.id   
            }
        });

        if(!newContact){
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `failed to add new contact!!`
            })
        }
        
        return new Promise<CustMutationResultInterface | TRPCError>((resolve)=>{
            resolve(Object.freeze({
                message: `New contact was successfully added by user-account: ${ctx.userAttachedData.email}`,
                data: {
                    name:  newContact.name,     
                    image: newContact.image,   
                    email: newContact.email,  
                    phone: newContact.phone, 
                    cardtype: newContact.cardtype as CardType,
                    cardno: newContact.cardno,
                    userId: ctx.userAttachedData.id
                }
            }))
        });

    }),

    // fetches fresh contact list from DB in most recent orderby
    fetchFreshContactList: trackedProcedure
    .input(z.object({
        access_token: z.string().min(1)
    }))
    .query(async({ctx,input}): Promise<CustQueryResultInterface | TRPCError> =>{
        console.log("=====REACHED FETCH FRESH CONTACT LIST PROCEDURE QUERY=====")
        
        if(ctx.userAttachedData.role !== 'USER'){
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: `Unauthorized`,
            });
        }

        

        /**
         * reff: https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting
         * reff: https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
         * @type relational queries
         * @desc returns single user with id and its related/mapped all contacts 
         * */
        const userMappedContacts = await ctx.prisma?.user.findUnique({
            where: {
                id: ctx.userAttachedData.id
            },
            select: {
                email: true,
                contacts: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        email: true,
                        phone: true,
                        cardtype: true,
                        cardno: true,
                    },
                },
            },
        });

        return new Promise<CustQueryResultInterface | TRPCError>((resolve)=>{
            resolve(Object.freeze({
                success: true ,
                message: `successfully fetched fresh contacts of user-account: ${ctx.userAttachedData.email}`,
                data: {
                    contact_list: userMappedContacts?.contacts
                } 
            }))
        });

    }),  

    // ---- here goes more user mutations/query procedures ----
})