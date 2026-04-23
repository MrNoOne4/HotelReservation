import { NextResponse, NextRequest } from "next/server"; 
import  { prisma }  from "../../../hello-prisma/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST (req: NextRequest) {
    const session = await getServerSession();

    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}
