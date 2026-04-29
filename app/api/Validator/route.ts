import { NextResponse, NextRequest } from 'next/server';
import { prisma } from "../../../hello-prisma/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams }= new URL(req.url);
    const email = searchParams.get("email");

    const users = await prisma.users.findUnique({
        where: {
            Email: email!,
        }
    })

    if (!users) {
        return NextResponse.json({found: false}, {status: 404})
    }

    return NextResponse.json({found: true, message: "Email Not Found!"} ,{status: 200});
}