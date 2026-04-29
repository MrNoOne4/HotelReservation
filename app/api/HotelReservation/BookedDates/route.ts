import { prisma } from "../../../../hello-prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = Number(searchParams.get("roomId"));

  if (!roomId) {
    return NextResponse.json({ message: "roomId is required" }, { status: 400 });
  }

  const reservations = await prisma.reservationrooms.findMany({
    where: {
      RoomId: roomId,
      reservation: {
        Status: { in: ["Pending", "Confirmed"] },
      },
    },
    include: {
      reservation: {
        select: {
          CheckInDate: true,
          CheckOutDate: true,
        },
      },
    },
  });

  const reservationRanges = reservations.map((b) => ({
    from: b.reservation.CheckInDate,
    to: b.reservation.CheckOutDate,
    type: "reservation",
  }));

  const roomBlocks = await prisma.roomblocks.findMany({
    where: {
      RoomId: roomId,
    },
    select: {
      BlockedFrom: true,
      BlockedTo: true,
      Reason: true,
    },
  });

  const blockRanges = roomBlocks.map((b) => ({
    from: b.BlockedFrom,
    to: b.BlockedTo,
    reason: b.Reason,
    type: "admin-block",
  }));

  const ranges = [...reservationRanges, ...blockRanges];

  return NextResponse.json(ranges);
}