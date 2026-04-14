"use client";

import { AvatarWithBadge } from "@/components/AvatarWithBadge";
import { useSession, signOut } from "next-auth/react";
import Carousel from "@/components/Carousel";
import { redirect } from "next/navigation";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import  DatePickerWithRange  from "@/components/DatePickerWithRange";
import { useEffect } from "react"; 

interface BedType {
  BedTypeId: number;
  BedName: string;
}

interface RoomType {
  RoomTypeId: number;
  TypeName: string;
  Description: string;
}

interface Service {
  ServiceId: number;
  ServiceName?: string;
  Description?: string;
}

interface RoomImage {
  ImageId: number;
  RoomId: number;
  ImageURL: string;
}

interface RoomService {
  RoomServiceId: number;
  RoomId: number;
  ServiceId: number;
  service: Service; 
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
  bedtypes: BedType;
  roomtypes: RoomType;
  images: RoomImage[];
  roomservices: RoomService[];
}


const amenityIcons: Record<string, string> = {
  "Daily housekeeping": "✦",
  "High-speed Wi-Fi": "◈",
  "Climate control": "❄",
  "City view": "⊹",
  "Mini bar": "◇",
};


function Pill({ label }: { label: string }) {
  const icon = amenityIcons[label];
  return (
    <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-medium rounded-lg border border-white/6 bg-white/2 text-white/70  cursor-default">
      {icon && <span className="opacity-60 text-[10px]">{icon}</span>}
      {label}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-900 border border-white/6 rounded-md p-2.5  transition">
      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-[13px] font-medium text-white">{value}</p>
    </div>
  );
}

function AvailBadge({ available }: { available: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase rounded-md ${
        available ? "bg-green-100 text-green-400" : "bg-pink-100 text-pink-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          available ? "bg-green-400" : "bg-pink-400"
        }`}
      />
      {available ? "Available" : "Unavailable"}
    </span>
  );
}





const RoomClient = ({ room }: { room: Room }) => {
  interface roomInformation {
   totalRent: number;
   totalDays: number;
  }
  const { data: session } = useSession();
  const { roomtypes, BasePrice, bedtypes, MaxOccupancy, Floor, Description, images, RoomId, } = room;
  const [rentInfo, setRentInfo] = useState<roomInformation>({ totalRent: Number(BasePrice), totalDays: 1 });

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(); 

 useEffect(() => {
  const days =
    selectedRange?.from && selectedRange?.to
      ? Math.max(
          Math.ceil(
            (selectedRange.to.getTime() - selectedRange.from.getTime()) /
              (1000 * 60 * 60 * 24)
          ),
          1
        )
      : 1;

  setRentInfo({
    totalRent: days * Number(BasePrice),
    totalDays: days,
  });
}, [selectedRange, BasePrice]);

  return (
    <div className="min-h-screen bg-gray-950 text-white relative font-sans overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed top-[-20%] left-1/2  -translate-x-1/2 rounded-full pointer-events-none z-0" />

      {/* HEADER */}
      <header className="sticky top-0 z-50 flex justify-evenly items-center px-10 h-16 bg-gray-950/75 backdrop-blur-xl border-b border-white/6">
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

      {/* MAIN */}
      <main className="relative z-10 max-w-300 mx-auto px-8 py-12 grid lg:grid-cols-[1fr_380px] gap-10">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-yellow-400">
                Room Details
              </div>
              <div className="flex-1 h-px  to-transparent"></div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/6">
              <Carousel
                images={images.map(img => ({
                  ImageId: img.ImageId,
                  RoomId: img.RoomId,
                  ImageURL: img.ImageURL,
                }))}
              />
            </div>
          </div>

          {/* <div className="bg-gray-900 border border-white/6 rounded-xl p-7  transition">
            <p className="text-[9px] font-bold uppercase tracking-widest mb-3">About This Room</p>
            <p className="text-[13.5px] text-gray-400 font-light leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              <Pill label={bed_type} />
              <Pill label={`Up to ${max_occupancy} guests`} />
              <Pill label={`Floor ${floor}`} />
              <Pill label="Daily housekeeping" />
              <Pill label="High-speed Wi-Fi" />
              <Pill label="Climate control" />
              <Pill label="City view" />
              <Pill label="Mini bar" />
            </div>
          </div> */}
          
        </div>

        {/* RIGHT — BOOKING PANEL */}
        <aside>
          <div className="sticky top-20 bg-gray-900 border border-white/6 rounded-xl overflow-hidden transition">
            <div className="p-7">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">Room Type</p>
              <h1 className="font-serif text-4xl font-light text-white leading-tight mb-2">{roomtypes.TypeName}</h1>

              <div className="my-5 h-px bg-white/6" />

              <div className="grid grid-cols-2 gap-3">
                <Stat label="Bed type" value={roomtypes.TypeName} />
                <Stat label="Occupancy" value={`${MaxOccupancy} guests`} />
                <Stat label="Floor" value={`Level ${Floor}`} />
                <Stat label="Room ID" value={`#${room.RoomId}`} />
              </div>

              <div className="my-5 h-px bg-white/6" />

              <div className="flex items-baseline gap-1">
                <span className="font-serif text-yellow-400 text-xl">₱</span>
                <span className="font-serif text-6xl font-light text-white">{Number(BasePrice).toLocaleString()}</span>
                <span className="text-[11px] text-gray-500 self-end mb-1">/ night</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Taxes & fees included</p>

              <div className="my-5 h-px bg-white/6" />

              <div>
                <DatePickerWithRange onDateChangeMain={(range) => 
                  setSelectedRange(range)
                } />

              </div>

              <div className="my-5 h-px bg-white/6" />

              <div className="flex justify-between items-center bg-gray-800 border border-white/6 rounded-md px-3 py-2 mb-3">

                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Estimated Total </span>
                <span className="font-serif text-yellow-400 text-2xl">₱{rentInfo.totalRent ? rentInfo.totalRent.toLocaleString() : BasePrice.toLocaleString()} <sup>{rentInfo.totalDays} day</sup> </span>

              </div>

              <button 
                disabled={!true}
                className={`w-full py-3 rounded-md text-[11px] font-bold uppercase tracking-widest ${
                  true
                    ? " text-white bg-black hover:bg-[#212121] cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition"
                    : "bg-gray-800 text-gray-500  border border-white/6 cursor-not-allowed"
                }`}
              >
                {true ? "Reserve Now" : "Not Available"}
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RoomClient;