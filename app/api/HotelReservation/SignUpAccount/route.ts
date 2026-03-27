import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../hello-prisma/lib/prisma";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { userFullName, userEmail, userPassword } = await req.json();
        if (!userFullName || !userEmail || !userPassword) {
            return NextResponse.json({message: "All fields are required to fill up"}, {status: 400})
        }

        const hashPassword = await bcryptjs.hash(userPassword, 10);

        const userAccount = await prisma.users.create({
            data: {
                GuestFullName: userFullName,
                GuestEmail: userEmail,
                GuestPassword: hashPassword,
                isVerified: true,
            }
        })

        return NextResponse.json({message: "Account successully create"}, {status: 200});


    } catch (e) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}