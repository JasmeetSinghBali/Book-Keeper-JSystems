import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider  from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prismaInstance';
import { sendVerificationRequest, sendWelcomeEmail } from './customMailDispatcher';


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
        EmailProvider({
            maxAge: 7 * 60, // magic email link valid for 7 minutes
            sendVerificationRequest,
        }),
        // add more providers here
    ],
    adapter: PrismaAdapter(prisma),
    // next-auth events ref: https://next-auth.js.org/configuration/events
    events: { createUser: sendWelcomeEmail },
    pages: {
        signIn: '/user/login',
        verifyRequest: '/user/checkemail',
    },
}