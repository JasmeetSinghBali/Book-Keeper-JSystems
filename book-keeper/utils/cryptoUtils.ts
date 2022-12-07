import crypto from 'node:crypto';

/**encrypted key interface , can be used to store in db if required */
export interface GEncryptedKey {
	iv: string;
	content: string;
}

/**
 * Encrypts Text
 * @param text -  Text to be Encrypted
 * @param secretKey -  Secret Key used for Encryption
 * @returns
 */
 export const encrypt = (
	text: string,
	secretKey: string,
): GEncryptedKey => {
    const iv = crypto.randomBytes(16);
	const key = crypto
		.createHash('sha256')
		.update(String(secretKey))
		.digest('base64')
		.substring(0, 32);

	const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);

	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	};
};

/**
 * Decrypts Text
 * @param encryptedText -  Encrypted Text
 * @param secretKey -  Secret Key used for Decryption
 * @returns
 */
 export const decrypt = (
	encryptedText: GEncryptedKey,
	secretKey: string,
): string => {
	const key = crypto
		.createHash('sha256')
		.update(String(secretKey))
		.digest('base64')
		.substring(0, 32);

	const decipher = crypto.createDecipheriv(
		'aes-256-ctr',
		key,
		Buffer.from(encryptedText.iv, 'hex'),
	);

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(encryptedText.content, 'hex')),
		decipher.final(),
	]);

	return decrpyted.toString();
};