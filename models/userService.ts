import { prisma } from "../hello-prisma/lib/prisma";
import { getServerSession } from "next-auth";
type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: string[];
};

export class UserService {
    static async getUserId(value: unknown): Promise<number | void>{

    if (value === null) return;

    const user = await prisma.users.findUnique({
        where: {
            Email: String(value) ?? undefined,
        },

        select: {
            UserId: true,
        },
    });

    if (user === null) return;

        const { UserId } = user; 
        
        return UserId;
    }
}