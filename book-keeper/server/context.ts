import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "../utils/auth";
import { prisma } from "../utils/prismaInstance";

/**@desc creates common context for all incoming protected requests */
export async function createContext(ctx: trpcNext.CreateNextContextOptions){
    const { req, res } = ctx;
    const session = await unstable_getServerSession(req,res,nextAuthOptions);
    return {
        req,
        res,
        session,
        prisma,
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;