import { decrypt, GEncryptedKey } from "./cryptoUtils";
import speakeasy from 'speakeasy';

/**
 * @desc validates mfa code 
 * @param mfaCode
 * @param userEncryptedKey (same used while generating mfa qr code auth url)
 * @returns Promise Boolean
 * */
const isValidMfaCodes = async (mfaCode: string, userKey: GEncryptedKey): Promise<Boolean> => {
	try {
		// decrypt the secret
		const decryptedSecret = decrypt(
			userKey,
			process.env.MFA_AUTH_SECRET as string,
		);
		const tokenValidated = speakeasy.totp.verify({
			secret: decryptedSecret,
			token: mfaCode,
			window: 100,
		});
		if (!tokenValidated) {
			return new Promise<Boolean>((resolve)=>{
                resolve(false)
            });
		}
		return new Promise<Boolean>((resolve)=>{
            resolve(true)
        })
	} catch (err: any) {
		console.log(err);
		return new Promise<Boolean>((resolve)=>{
            resolve(false)
        });
	}
};

export default isValidMfaCodes;