// app/rooms/[hotelId]/page.tsx

import { EmptyInputGroup } from "@/components/EmptyInputGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RoomClient from "@/components/RoomClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"


interface Params {
  params: {
    hotelId: string;
  };
}

interface RoomImage {
  ImageId: number
  RoomId: number
  ImageURL: string
}

interface Room {
  RoomId: number;
  RoomType: string;
  price: number;
  bed_type: string;
  max_occupancy: number;
  floor: number;
  availability_status: boolean;
  description: string;
  images: RoomImage[];
}

const RoomPage = async ({ params }: Params) => {
      const session = await getServerSession();
      if (!session) {
          redirect("/practiceno1/userPage");
      }
  
    const resolvedParams = await params;

  const hotelId = Number(resolvedParams.hotelId);

  if (isNaN(hotelId)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0D0C17]">
        <EmptyInputGroup />
      </div>
    );
  }

  const res = await fetch("http://localhost:3000/api/HotelReservation/HotelRoom", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch rooms");

  const hotelRooms: Room[] = await res.json();

  const hotelRoom = hotelRooms.find((r) => r.RoomId === hotelId);

  if (!hotelRoom) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0D0C17] p-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMBjOhe4rOo9ZohYJxJmFOHIC8YpJ4osByUA&s"
          alt="Not found"
          className="aspect-video w-80 rounded-2xl object-cover opacity-50"
        />
        <div className="text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a96e]">
            404 — Not Found
          </p>
          <h1 className="mb-2 text-3xl font-bold text-white">
            Room Unavailable
          </h1>
          <p className="text-sm text-[#555]">
            This room doesn&apos;t exist or has been removed.
          </p>

          <Link href="/practiceno1/userPage">
            <Button className="mt-6 rounded-lg bg-[#c9a96e] px-7 font-bold text-[#0D0C17] hover:bg-[#dfc080]">
              ← Back to Rooms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <RoomClient room={{
    ...hotelRoom,
    images: hotelRoom.images.map(img => ({
      imageId: img.ImageId,
      roomId: img.RoomId,
      imageUrl: img.ImageURL
    }))
  }}/>;

};

export default RoomPage;