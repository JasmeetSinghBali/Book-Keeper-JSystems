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

        let accessToken: string = '';

        if(req.method === 'GET'){
            const parsedQuery: any = JSON.parse(req.query.input);
            accessToken = parsedQuery['0'].access_token;
        }
        
        if(req.body && req.method === 'POST'){
            accessToken = req?.body['0']?.access_token;
        }

        if(!accessToken || accessToken.length < 1){
            console.log("Failed to parse access token from query or body....");
            return new Promise<Boolean | verifyJWTInterface>((resolve)=>{
                resolve(false)
            });
        }
        // console.log("=========logged token payload in scrape token payload function ==========");
        
        console.log(accessToken)
        
        const pd: any = await verifyJwt(
            accessToken,
        );
        if(!pd){
            console.log("jwt verification failed");
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