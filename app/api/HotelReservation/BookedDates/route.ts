import { prisma } from "../../../../hello-prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const roomId = Number(searchParams.get("roomId"))

  if (!roomId) {
    return NextResponse.json({ message: "roomId is required" }, { status: 400 })
  }

  const bookings = await prisma.reservationrooms.findMany({
    where: {
      RoomId: roomId,
      reservation: {
        Status: { in: ["Pending", "Confirmed"] }
      }
    },
    include: {
      reservation: {
        select: { CheckInDate: true, CheckOutDate: true }
      }
    }
  })

  const ranges = bookings.map((b) => ({
    from: b.reservation.CheckInDate,
    to:   b.reservation.CheckOutDate,
  }))

  return NextResponse.json(ranges)
}