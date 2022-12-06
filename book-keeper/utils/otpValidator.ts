import { totp } from "otplib";
import {otpSecretInterface} from './otpGenerator';

interface validateOTPInterface {
    token: string;
    secret: string; 
}

/**@desc isValid is false when invalid otp was provided, isVerified will be false when wrong /expired otp is provided */
export interface validationTOTPResultInterface {
    isValid: boolean;
    isVerified: boolean;
}

/**@desc validate time based OTP's */
const validateOTP = async (OTP: string): Promise<validationTOTPResultInterface> => {
    
    const otpSecret: otpSecretInterface = Object.freeze({
        sec: process.env.OTP_SECRET as string
    })
    
    let valid: boolean = true
    let verified: boolean = true;

    const isValidOTP = totp.check(OTP, otpSecret.sec);

    const otpPayload: validateOTPInterface = { 
        token: OTP,
        secret: otpSecret.sec
    };
    const isVerifyOTP = totp.verify(otpPayload);

    if (!isValidOTP) {
        valid = false;
    }
    if(!isVerifyOTP){
        verified = false;
    }
    
    return new Promise<validationTOTPResultInterface>((resolve)=>{
        resolve(Object.freeze({
            isValid: valid,
            isVerified: verified
        }))
    })
    
}

export default validateOTP;