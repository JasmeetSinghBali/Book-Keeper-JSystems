import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "../utils/nextauth.options";
import { prisma } from "../utils/prismaInstance";


/**@desc creates common context for all incoming protected requests */
export async function createContext(ctx: trpcNext.CreateNextContextOptions): Promise<Object | null>{
    try{

        const { req, res } = ctx;
        const session: any = await unstable_getServerSession(req,res,nextAuthOptions);

        
        const authorizedpass: Boolean | Object = await scrapeTokenPayload(req);
        
        if(!authorizedpass){
            return {
                req,
                res,
                session,
                prisma
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
        return null;
    }

}

/**
 * @desc validates jwt in authorization header
 * @returns scraped payload from jwt token
 *  */
 async function scrapeTokenPayload(req: any): Promise<Boolean | Object> {
    try{
        if(!req.headers.authorization){
            return false;
        }
        const pd: any = await verifyUserAccessToken(
            req.headers.authorization.split(' ')[1],
        );
        if(!pd){
            return false;
        }
        return pd;
        
    }catch(err: any){
        console.log(err);
        return false;
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;