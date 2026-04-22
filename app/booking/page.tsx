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
    });


    return (
        <div>
            <header>
                <Header />
            </header>

            <section className="h-screen ">
                {bookings.length === 0 ? (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-6">
                        <p className="text-center font-semibold mt-6 text-xl sm:text-2xl md:text-3xl lg:text-5xl  text-gray-600">
                            No hotel reservations found.
                        </p>

                        <p className="text-center text-gray-400">
                            Your bookings will appear here once you make a reservation.
                        </p>
                    </div>
                ) : (
                    bookings.map((b) => (
                        <div key={b.ReservationId}>
                            <p>{b.GuestFirstName} {b.GuestLastName}</p>
                            <p>{b.CheckInDate.toString()}</p>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default Booking;