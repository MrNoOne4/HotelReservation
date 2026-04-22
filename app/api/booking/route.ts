import { prisma } from "../../../hello-prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error: "Missing user id" },
            { status: 400 }
        );
    }

    const booking = await prisma.reservations.findMany({
        where: {
            UserId: Number(id),
        },
    });

    


    return NextResponse.json(
        { bookingHistory: booking },
        { status: 200 }
    );
}