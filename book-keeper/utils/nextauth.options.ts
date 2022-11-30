import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider  from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prismaInstance';

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
            server: {
                host: process.env.EMAIL_SERVER_HOST as string,
                port: parseInt(process.env.EMAIL_SERVER_PORT as string),
                auth: {
                    user: process.env.EMAIL_SERVER_USER as string,
                    pass: process.env.EMAIL_SERVER_PASSWORD as string,
                },
            },
            from: process.env.EMAIL_FROM as string,
            maxAge: 7 * 60, // magic email link valid for 7 minutes
        }),
        // add more providers here
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/user/login',
        verifyRequest: '/user/checkemail',
    },
    theme: {
        colorScheme: "light",
    },
}