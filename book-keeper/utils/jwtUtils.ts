import { JwtPayload, sign, verify } from "jsonwebtoken";
import { decrypt, GEncryptedKey } from "./cryptoUtils";

/**
 * 
 * @param meta_data [encrypted payload] needed for signing jwt
 * @returns encrypted jwe cum jwt access token
 */
export const signJwt = async (meta_data: GEncryptedKey): Promise<string> => {
    try{
        const token: string = sign(
            {
                meta_data,
            },
            process.env.JWT_SIGNING_SECRET as string,
            { expiresIn: process.env.accessTokenTtl as string },
        );
        return new Promise<string>((resolve)=>{
            resolve(token)
        });
    }catch(err: any){
        console.log(err);
        return new Promise<string>((resolve)=>{
            resolve('');
        })
    }
};

export interface verifyJWTInterface {
    valid: Boolean,
    expired: Boolean,
    decoded: accessTokenPayload | null
}

/**
 * @desc verify iron sessioned jwe cum encrypted jwt payload
 * @returns decrypted & decoded payload with valid & expired boolean flags
 *  */
export const verifyJwt = async (token: string) : Promise<verifyJWTInterface|null> => {
    try {
		const decodedFPD: JwtPayload = verify(
			token,
			process.env.JWT_SIGNING_SECRET as string,
		) as JwtPayload;
		const decoded: accessTokenPayload = await reattachDecMetaData(decodedFPD);
		return new Promise<verifyJWTInterface|null>((resolve)=>{
            resolve({
                valid: true,
                expired: false,
                decoded,
            })
        });
	} catch (e: any) {
		console.log(e);
		return new Promise<verifyJWTInterface|null>((resolve)=>{
            resolve({
                valid: false,
                expired: true,
                decoded: null,
            })
        });
	}
};

export interface accessTokenPayload {
    userID: String;
    userEmail: String;
    role: String;
    tokenVersion: Number;    
}

/**
 * @desc decrypts encrypted jwe cum jwt payload pd 
 * @returns attached decrypted data with actual payload 
 * */
const reattachDecMetaData = async (decodedEncData: any): Promise<accessTokenPayload> => {
    
	const decMetaData: any = decrypt(
		decodedEncData.meta_data,
		process.env.ENC_ACCESS_TOKEN_SECRET as string,
	);
	const parsedDecData: accessTokenPayload = JSON.parse(decMetaData);

	decodedEncData.userID = parsedDecData.userID;
	decodedEncData.userEmail = parsedDecData.userEmail;
	decodedEncData.role = parsedDecData.role;
	decodedEncData.tokenVersion = parsedDecData.tokenVersion;
    
    return new Promise<accessTokenPayload>((resolve)=>{
        resolve(decodedEncData);
    })
};
