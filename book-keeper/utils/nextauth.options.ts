import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import jwt from 'jsonwebtoken';

/**🎈🚧 convert to iron session by encrypting this payload */
interface payloadInterface {
    aud: string;
    exp: number;
    sub: string;
    email: string|null|undefined;
    role: string;
}

/**
 * @desc app level next-auth options/config
 *  */
 export const nextAuthOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // add more providers here
    ],
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_PROJECT_URL as string,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    }),
    callbacks:{
        async session({ session, user }: any): Promise<any> {
            const signingSecret: string = process.env.SUPABASE_JWT_SECRET as string;
            if(signingSecret){
                const payload: payloadInterface = {
                    aud: "authenticated",
                    exp: Math.floor(new Date(session.expires).getTime() / 1000),
                    sub: user.id,
                    email: user.email,
                    role: "authenticated",
                }
                session.supabaseAccessToken = jwt.sign(payload,signingSecret);
            }
            return session;
        },
    },
    theme: {
        colorScheme: "light",
    },
}