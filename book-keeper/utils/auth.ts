import { compareSync } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '../server/schemas/users/login.schema';
import { prisma } from './prismaInstance';


/**
 * @desc app level next-auth options/config
 *  */
export const nextAuthOptions:NextAuthOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "johnwick@marv#l.fun",
                },
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials,request) => {
                const parseCreds = await loginSchema.parseAsync(credentials);
                const user: any = await prisma.users.findFirst({
                    where: { email:credentials?.email },
                });
                if(!user){
                    return null;
                } 
                const isValidPass = compareSync(user.password,parseCreds.password);
                if(!isValidPass){
                    return null;
                }
                return {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            if(user){
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if(token) {
                session.user = token;
            }
            return session;
        },
    },
    secret: process.env.JWT_SIGN_SECRET,
    session: {
        maxAge: 60 * 60
    },
    pages: {
        signIn: "/check-in",
        newUser: "/hop-in"
    }
};
