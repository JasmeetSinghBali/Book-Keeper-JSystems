import { totp } from "otplib";

export interface otpSecretInterface{
    sec: string;
}

export interface generateOTPInterface {
    otpToken: string;
    isValid: boolean; 
}

/**@desc generates time based OTP's with custom/dynamic step value */
const generateOTP = async (stepValue: number): Promise<generateOTPInterface> => {
    
    const otpSecret: otpSecretInterface = Object.freeze({
        sec: process.env.OTP_SECRET as string
    })
 
    // each otp is valid for 60 seconds from the epoch time
    totp.options = { epoch: Date.now(), step: stepValue }; 

    const otpToken: string = totp.generate(
        otpSecret.sec
    );

    const isValid: boolean = totp.check(
        otpToken,
        otpSecret.sec
    );

    if(!isValid){
        return new Promise<generateOTPInterface>((resolve)=>{
            resolve(Object.freeze( { otpToken: '', isValid } ))
        });
    }
    return new Promise<generateOTPInterface>((resolve)=>{
        resolve(Object.freeze( { otpToken, isValid } ));
    })
}

export default generateOTP;