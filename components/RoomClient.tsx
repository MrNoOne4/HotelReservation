"use client";

import { AvatarWithBadge } from "@/components/AvatarWithBadge";
import { useSession, signOut } from "next-auth/react";
import Carousel from "@/components/Carousel";
import { redirect } from "next/navigation";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import DatePickerWithRange from "@/components/DatePickerWithRange";

interface BedType {
  BedTypeId: number;
  BedName: string;
}

interface RoomType {
  RoomTypeId: number;
  TypeName: string;
  Description: string;
}

interface RoomImage {
  ImageId: number;
  RoomId: number;
  ImageURL: string;
}

interface Room {
  RoomId: number;
  RoomNumber: string;
  RoomTypeId: number;
  BedTypeId: number;
  BasePrice: string;
  MaxOccupancy: number;
  Floor: number;
  Description: string;

  bedtype?: BedType;
  roomtype?: RoomType;

  images: RoomImage[];
  amenities: string[];
}

interface RoomInformation {
  totalRent: number;
  totalDays: number;
}

const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  "Air Conditioning": "❄️",
  Television: "📺",
  Toiletries: "🧴",
  "Daily Housekeeping": "🧹",
  Breakfast: "🍳",
  "Room Service": "🛎️",
  "Laundry Service": "🧺",
  "Airport Shuttle": "🚐",
  "Extra Bed": "🛏️",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-900 border border-white/6 rounded-md p-2.5">
      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-[13px] font-medium text-white">{value}</p>
    </div>
  );
}

const RoomClient = ({ room }: { room: Room }) => {
  const { data: session } = useSession();

  const {
    RoomId,
    Floor,
    MaxOccupancy,
    BasePrice,
    images,
    amenities,
    bedtype,
    roomtype,
  } = room;

  const price = Number(BasePrice);

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const [rentInfo, setRentInfo] = useState<RoomInformation>({
    totalRent: price,
    totalDays: 1,
  });

  useEffect(() => {
    const days =
      selectedRange?.from && selectedRange?.to
        ? Math.max(
            Math.ceil(
              (selectedRange.to.getTime() -
                selectedRange.from.getTime()) /
                (1000 * 60 * 60 * 24)
            ),
            1
          )
        : 1;

    setRentInfo({
      totalRent: days * price,
      totalDays: days,
    });
  }, [selectedRange, price]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <header className="sticky top-0 z-50 flex justify-evenly items-center px-0 md:px-10 h-16 bg-gray-950/75 backdrop-blur-xl border-b border-white/6">
        <div className="flex items-center gap-6">
            <button
              onClick={() => {
                redirect("/");
                
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/6 text-gray-400 text-[12px] font-medium cursor-pointer transition"
            >
              ← All Rooms
            </button>
          <div className="text-yellow-400 font-serif text-2xl font-light tracking-wide">
            Nova <span className="italic">Stay</span>
          </div>
        </div>

        <ProfileMenu avatar={<AvatarWithBadge  className="text-white  "  avatar={`${session?.user?.image}`} name={session?.user?.name?.split(",")[0]}/>} profile={() => redirect("/profile")} logout={() => signOut({ callbackUrl: window.location.href })}/>
        
      </header>

      <main className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10 p-8">

        <div>
          <Carousel images={images} />

          <div className="mt-6">
            <h2 className="text-sm uppercase text-gray-400 mb-3">
              Included Amenities
            </h2>

            <div className="flex flex-wrap gap-2">
              {amenities.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-md text-xs"
                >
                  <span>{amenityIcons[a] ?? "✔"}</span>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div className="sticky top-20 bg-gray-900 border border-white/6 rounded-xl overflow-hidden">
            <div className="p-7">

              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                Room Type
              </p>

              <h1 className="font-serif text-4xl font-light text-white mb-2">
                {roomtype?.TypeName}
              </h1>

              <div className="my-5 h-px bg-white/6" />

              <div className="grid grid-cols-2 gap-3">
                <Stat
                  label="Bed type"
                  value={bedtype?.BedName ?? "N/A"}
                />
                <Stat
                  label="Occupancy"
                  value={`${MaxOccupancy} guests`}
                />
                <Stat label="Floor" value={`Level ${Floor}`} />
                <Stat label="Room ID" value={`#${RoomId}`} />
              </div>

              <div className="my-5 h-px bg-white/6" />

              <div className="flex items-baseline gap-1">
                <span className="font-serif text-yellow-400 text-xl">
                  ₱
                </span>
                <span className="font-serif text-6xl font-light">
                  {price.toLocaleString()}
                </span>
                <span className="text-[11px] text-gray-500">
                  / night
                </span>
              </div>

              <p className="text-[10px] text-gray-500 mt-1">
                Taxes & fees included
              </p>

              <div className="my-5 h-px bg-white/6" />

              <DatePickerWithRange
                onDateChangeMain={(range) =>
                  setSelectedRange(range)
                }
              />

              <div className="my-5 h-px bg-white/6" />

              <div className="flex justify-between items-center bg-gray-800 border border-white/6 rounded-md px-3 py-2 mb-3">
                <span className="text-[10px] font-bold uppercase text-gray-500">
                  Estimated Total
                </span>

                <span className="font-serif text-yellow-400 text-2xl">
                  ₱{rentInfo.totalRent.toLocaleString()}
                  <sup>{rentInfo.totalDays} day</sup>
                </span>
              </div>

              <button className="w-full py-3 rounded-md text-[11px] font-bold uppercase tracking-widest bg-black hover:bg-[#212121] transition">
                Reserve Now
              </button>

            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RoomClient;