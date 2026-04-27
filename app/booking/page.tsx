import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import Header from "@/components/Header"
import { prisma } from "../../hello-prisma/lib/prisma"
import { UserService } from "models/userService"
import BookingClient from "@/components/BookingClient"; 

const Booking = async () => {
    const session = await getServerSession()

    if (!session?.user?.email) {
        redirect("/")
    }

    const userId = await UserService.getUserId(session.user.email)

    const bookings = await prisma.reservations.findMany({
        where: {
            UserId: userId!,
        },
        orderBy: {
            CreatedAt: "desc",
        },

        include: {
            reservationrooms: {
                include: {
                    room: {
                        include: { roomtype: true }
                    }
                }
            },

            payments: {
                select: {
                    PaymentId:     true,
                    ReservationId: true,
                    Amount:        true,
                    PaymentMethod: true,
                    PaymentStatus: true,
                    ReferenceCode: true,
                    PaymentDate:   true,
                }
            }
        },
    })

    const serialized = bookings.map(b => ({
    ...b,
    CheckInDate:  b.CheckInDate.toISOString(),
    CheckOutDate: b.CheckOutDate.toISOString(),
    CreatedAt:    b.CreatedAt?.toISOString() ?? null,

    reservationrooms: b.reservationrooms.map(r => ({
        ...r,
        PriceAtBooking: Number(r.PriceAtBooking),

        room: r.room
        ? {
            ...r.room,
            BasePrice: Number(r.room.BasePrice),
            roomtype: r.room.roomtype
                ? {
                    ...r.room.roomtype,
                }
                : undefined,
            }
        : undefined,
    })),

    payments: b.payments.map(p => ({
        ...p,
            Amount: Number(p.Amount),
            PaymentDate: p.PaymentDate?.toISOString() ?? null,
        })),
    }))

    return (
        <div>
            <header>
                <Header />
            </header>

            <section className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

                <BookingClient bookings={serialized as any} />
            </section>
        </div>
    )
}

export default Booking