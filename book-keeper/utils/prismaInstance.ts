/**exports common instance to be available thorughout the app */
import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

// 💭 uncomment below 👇 to see prisma query logs
// export const prisma = global.prisma || new PrismaClient({
//   log: ["query"],
// });

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production'){
    global.prisma = prisma;
} 

