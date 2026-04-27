
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "../../../hello-prisma/lib/prisma";

// POST — User submits payment
// ===========================
export async function POST(req: NextRequest) {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { reservationId, paymentMethod } = await req.json()

  if (!reservationId || !paymentMethod) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
  }

  const allowed = ["Cash", "GCash", "CreditCard", "DebitCard"]
  if (!allowed.includes(paymentMethod)) {
    return NextResponse.json({ message: "Invalid payment method" }, { status: 400 })
  }

  const user = await prisma.users.findUnique({
    where: { Email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  const reservation = await prisma.reservations.findFirst({
    where: {
      ReservationId: Number(reservationId),
      UserId:        user.UserId,
      Status:        "Confirmed"
    },
    include: {
      reservationrooms: true
    }
  })

  if (!reservation) {
    return NextResponse.json(
      { message: "Reservation not found or not yet confirmed by admin" },
      { status: 404 }
    )
  }

  const existing = await prisma.payments.findFirst({
    where: { ReservationId: Number(reservationId) }
  })

  if (existing) {
    return NextResponse.json(
      { message: "Payment already submitted for this booking" },
      { status: 409 }
    )
  }

  const days = Math.ceil(
    (new Date(reservation.CheckOutDate).getTime() - new Date(reservation.CheckInDate).getTime())
    / (1000 * 60 * 60 * 24)
  )
  const total = reservation.reservationrooms.reduce(
    (sum, r) => sum + Number(r.PriceAtBooking) * days,
    0
  )

  const referenceCode = `NS-${reservationId}-${Date.now().toString().slice(-6)}`

  await prisma.payments.create({
    data: {
      ReservationId: Number(reservationId),
      Amount:        total,
      PaymentMethod: paymentMethod as any,
      PaymentStatus: "AwaitingVerification" as any,
      ReferenceCode: referenceCode,
    }
  })

  return NextResponse.json({
    message:       "Payment submitted! Please show your reference code at the front desk.",
    referenceCode: referenceCode,
    amount:        total,
    paymentMethod: paymentMethod,
  })
}


export async function GET(req: NextRequest) {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const reservationId = Number(searchParams.get("reservationId"))

  if (!reservationId) {
    return NextResponse.json({ message: "reservationId is required" }, { status: 400 })
  }

  const payment = await prisma.payments.findFirst({
    where: { ReservationId: reservationId }
  })

  return NextResponse.json({ payment })
}