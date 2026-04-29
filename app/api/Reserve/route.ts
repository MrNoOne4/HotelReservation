import  { prisma }  from "../../../hello-prisma/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    roomId,
    checkIn,   
    checkOut,  
    firstName,
    lastName,
    phone,
    address,
  } = body;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkInDate >= checkOutDate) {
    return NextResponse.json(
      { message: "Check-out must be after check-in." },
      { status: 400 }
    );
  }

  const conflict = await prisma.reservationrooms.findFirst({
    where: {
      RoomId: roomId,
      reservation: {
        Status: { in: ["Pending", "Confirmed"] },
        CheckInDate:  { lt: checkOutDate }, 
        CheckOutDate: { gt: checkInDate }, 
      },
    },
  });

  if (conflict) {
    return NextResponse.json(
      { message: "This room is already been booked for the selected dates." },
      { status: 409 }
    );
  }

  const blocked = await prisma.roomblocks.findFirst({
    where: {
      RoomId: roomId,
      BlockedFrom: { lt: checkOutDate },
      BlockedTo:   { gt: checkInDate },
    },
  });

  if (blocked) {
    return NextResponse.json(
      { message: `Room is unavailable: ${blocked.Reason}` },
      { status: 409 }
    );
  }

  const room = await prisma.rooms.findUnique({ where: { RoomId: roomId } });
  if (!room) {
    return NextResponse.json({ message: "Room not found." }, { status: 404 });
  }

  const user = await prisma.users.findUnique({
    where: { Email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  const reservation = await prisma.$transaction(async (tx) => {
    const newReservation = await tx.reservations.create({
      data: {
        UserId:        user.UserId,
        GuestFirstName: firstName,
        GuestLastName:  lastName,
        GuestPhone:     phone,
        GuestAddress:   address,
        CheckInDate:    checkInDate,
        CheckOutDate:   checkOutDate,
        Status:         "Pending",
      },
    });

    await tx.reservationrooms.create({
      data: {
        ReservationId:  newReservation.ReservationId,
        RoomId: roomId,
        PriceAtBooking: room.BasePrice,
      },
    });

    return newReservation;
  });

  return NextResponse.json({
    message: "Reservation created successfully!",
    reservationId: reservation.ReservationId,
  });
}