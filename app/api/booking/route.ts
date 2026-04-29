import { prisma } from "../../../hello-prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  }

  const bookings = await prisma.reservations.findMany({
    where: { UserId: Number(id)! },
    orderBy: { CreatedAt: "desc" },
    include: {
      reservationrooms: {
        include: {
          room: {
            include: {
              roomtype: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({ bookingHistory: bookings }, { status: 200 });
}
