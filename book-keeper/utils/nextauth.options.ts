import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider  from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prismaInstance';
import Handlebars from 'handlebars';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import mailTransporter from './reusableMailTransporter';


/**pick up Sign-in-email template template from project dir in email-templates dir */
const templateDir: string = path.resolve(process.cwd(), 'email-templates');

/**@desc grab email template & compile with handlebars and dispatched confirm email with dynamic data to user */
const sendVerificationRequest = ({ identifier, url }: any) => {
  const emailFile = readFileSync(path.join(templateDir, 'Sign-in-email.html'), {
    encoding: 'utf8',
  });
  const emailTemplate: any = Handlebars.compile(emailFile);
  mailTransporter.sendMail({
    from: `"📔 Keeper." ${process.env.EMAIL_FROM as string}`,
    to: identifier,
    subject: 'Your sign-in link for Keeper.',
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL as string,
      signin_url: url,
      email: identifier,
    }),
  });
};

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
    pages: {
        signIn: '/user/login',
        verifyRequest: '/user/checkemail',
    },
}