// import { PrismaClient } from "../generated/prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }



import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient } from "../generated/prisma/client";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    connectionLimit: 5,
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}


// import { PrismaClient } from "@prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development"
//       ? ["query", "error", "warn"]
//       : ["error"],
//   })

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma
// }



// // import "dotenv/config";
// // import { PrismaMariaDb } from '@prisma/adapter-mariadb';
// // import { PrismaClient } from '../generated/prisma/client';

// // const adapter = new PrismaMariaDb({
// //   host: process.env.DATABASE_HOST,
// //   user: process.env.DATABASE_USER,
// //   password: process.env.DATABASE_PASSWORD,
// //   database: process.env.DATABASE_NAME,
// //   connectionLimit: 5
// // });
// // const prisma = new PrismaClient({ adapter });

// // export { prisma }



// // import { PrismaClient } from '../generated/prisma/client';

// // // lib/prisma.ts


// // declare global {
// //   var prisma: PrismaClient | undefined;
// // }

// // const prisma = global.prisma || new PrismaClient();

// // if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// // export default prisma;