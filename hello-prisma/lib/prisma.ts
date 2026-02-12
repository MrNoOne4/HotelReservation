import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient as PrismaClient1 } from "../generated/prisma/client";

// ---- studentDB Connection ----
const url1 = new URL(process.env.DATABASE_URL_1!);
const adapter1 = new PrismaMariaDb({
  host: url1.hostname,
  port: Number(url1.port),
  user: url1.username,
  password: decodeURIComponent(url1.password),
  database: url1.pathname.slice(1),
});

export const prismaStudent = new PrismaClient1({ adapter: adapter1 });

