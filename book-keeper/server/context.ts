import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession } from "next-auth";
import { verifyJwt, verifyJWTInterface } from "../utils/jwtUtils";
import { nextAuthOptions } from "../utils/nextauth.options";
import { prisma } from "../utils/prismaInstance";


/**
 * @desc creates common context for all incoming protected requests 
 * @attaches session,req,res,authorizedpass(decoded jwt payload) to common context
 * 
 * */
export async function createContext(ctx: trpcNext.CreateNextContextOptions){
    try{

        const { req, res } = ctx;
        const session: any = await unstable_getServerSession(req,res,nextAuthOptions);

        
        const authorizedpass: Boolean | verifyJWTInterface = await scrapeTokenPayload(req);

        if(!authorizedpass){
            return {
                req,
                res,
                session,
                prisma,
                authorizedpass: null
            }
            
        }
        return {
            req,
            res,
            session,
            prisma,
            authorizedpass
        }
    }catch(err: any){
        console.log(err);
        return {
            req: null,
            res: null,
            session: null,
            prisma: null,
            authorizedpass: null
        }
    }
}

/**
 * @desc validates jwt in authorization header
 * @returns scraped payload from jwt token
 *  */
 async function scrapeTokenPayload(req: any): Promise<Boolean | verifyJWTInterface> {
    try{
        if(!req.headers.authorization){
            return false;
        }
        const token: string = req.headers.authorization.split(' ')[1]; 
        const pd: any = await verifyJwt(
            token,
        );
        if(!pd){
            return new Promise<verifyJWTInterface|Boolean>((resolve)=>{
                resolve(false)
            });
        }
        return new Promise<Boolean|verifyJWTInterface>((resolve)=>{
            resolve(pd)
        });
    }catch(err: any){
        console.log(err);
        return new Promise<verifyJWTInterface|Boolean>((resolve)=>{
            resolve(false)
        });
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;