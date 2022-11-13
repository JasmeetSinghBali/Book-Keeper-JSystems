import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

/**
 * @desc app level next-auth options/config
 *  */
 export const nextAuthOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // add more providers here
    ],
    theme: {
        colorScheme: "light",
    },
}