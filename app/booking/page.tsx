import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import { prisma } from "../../hello-prisma/lib/prisma";
import { UserService } from "models/userService";

const Booking = async () => {
    const session = await getServerSession();

    if (!session?.user?.email) {
        redirect("/");
    }

    const userId = await UserService.getUserId(session.user.email);

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
                            include: {
                                roomtype: true,
                            },
                    },
                },
            },
        },
    });
    

    return (
        <div>
            <header>
                <Header />
            </header>

                <section className="max-w-5xl mx-auto px-4 py-10 h-screen">
                <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                    <p className="text-xl font-semibold">No reservations yet.</p>
                    <p className="text-sm mt-1">Your bookings will appear here once you make a reservation.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm max-h-100">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-5 py-3">Booking ID</th>
                                <th className="px-5 py-3">Room</th>
                                <th className="px-5 py-3">Guest Name</th>
                                <th className="px-5 py-3">Check-in</th>
                                <th className="px-5 py-3">Check-out</th>
                                <th className="px-5 py-3">Total</th>
                                <th className="px-5 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">

                            {bookings.map((b: any) => {
                                const room = b.reservationrooms[0]
                                const days = Math.ceil(
                                (new Date(b.CheckOutDate).getTime() - new Date(b.CheckInDate).getTime())
                                / (1000 * 60 * 60 * 24)
                                )
                                const total = room
                                ? Number(room.PriceAtBooking) * days
                                : 0

                                const statusColor: Record<string, string> = {
                                    Pending:   "bg-yellow-100 text-yellow-700",
                                    Confirmed: "bg-green-100 text-green-700",
                                    Cancelled: "bg-red-100 text-red-700",
                                    Completed: "bg-blue-100 text-blue-700",
                                }

                                return (
                                <tr key={b.ReservationId} className="hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 font-mono text-gray-400">#{b.ReservationId}</td>

                                    <td className="px-5 py-4 font-medium">
                                        {room?.room?.roomtype?.TypeName ?? "N/A"}
                                    <span className="block text-xs text-gray-400">
                                        Room {room?.room?.RoomNumber}
                                    </span>

                                    </td>

                                    <td className="px-5 py-4">
                                        {b.GuestFirstName} {b.GuestLastName}
                                    </td>

                                    <td className="px-5 py-4">
                                        {new Date(b.CheckInDate).toLocaleDateString("en-PH", {
                                            month: "short", day: "numeric", year: "numeric"
                                        })}
                                    </td>

                                    <td className="px-5 py-4">
                                        {new Date(b.CheckOutDate).toLocaleDateString("en-PH", {
                                            month: "short", day: "numeric", year: "numeric"
                                        })}
                                    </td>

                                    <td className="px-5 py-4 font-semibold text-yellow-600">
                                        ₱{total.toLocaleString()}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[b.Status!] ?? "bg-gray-100 text-gray-600"}`}>
                                            {b.Status}
                                        </span>
                                    </td>
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
                </section>
        </div>
    );
};

export default Booking;