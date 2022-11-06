/**exports common instance to be available thorughout the app */
import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

export const prisma = global.prisma || new PrismaClient({
  log: ["query"],
});

if (process.env.NODE_ENV !== 'production'){
    global.prisma = prisma;
} 

