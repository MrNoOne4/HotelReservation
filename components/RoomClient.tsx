"use client";

import { AvatarWithBadge } from "@/components/AvatarWithBadge";
import { useSession, signOut } from "next-auth/react";
import Carousel from "@/components/Carousel";
import { redirect } from "next/navigation";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from "sonner"
import { SpinnerSize } from "@/components/SpinnerSize";


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
    RoomNumber
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



interface GuestInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

const userName = session?.user?.name ?? "";

const [guestInfo, setGuestInfo] = useState<GuestInfo>({
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
});

useEffect(() => {
  if (!userName) return;

  const split = userName.trim().split(" ");

  setGuestInfo((prev) => ({
    ...prev,
    firstName: split[0] || "",
    lastName: split.slice(1).join(" ") || "",
  }));
}, [userName]);

 
  const [bookedRanges, setBookedRanges] = useState<{ from: Date; to: Date }[]>([])

  useEffect(() => {
    const fetchBookedDates = async () => {
      const res = await fetch(`/api/HotelReservation/BookedDates?roomId=${RoomId}`)
      const data = await res.json()
      setBookedRanges(data.map((r: { from: string; to: string }) => ({
        from: new Date(r.from),
        to: new Date(r.to),
      })))
    }
    fetchBookedDates()
  }, [RoomId])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

      setGuestInfo((prev) => ({
        ...prev, [name]: value
      }))

  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleReserve = async () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      toast.warning("Please select check-in and check-out dates.", {
        position: "top-center",
      });
      return;
    }

    if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.phone || !guestInfo.address) {
        toast.warning("Please Fill up the basic information before booking.", {
          position: "top-center",
        });
      return;
    }

    setLoading(true);

    try {
      const req = await fetch("/api/Reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: RoomId,
          checkIn: selectedRange.from.toISOString().split("T")[0],
          checkOut: selectedRange.to.toISOString().split("T")[0],
          firstName: guestInfo.firstName,
          lastName: guestInfo.lastName,
          phone: guestInfo.phone,
          address: guestInfo.address,
        }),
      });

      const res = await req.json();

      setIsModalOpen(false);

      if (!req.ok) {
        toast.warning(
          res?.message || "Booking failed. Please check your details and try again.",
          { position: "top-center" }
        );
        return;
      }

      toast.success("Booking successfully completed!", {
        position: "top-center",
      });
      setGuestInfo({ firstName: "", lastName: "", phone: "", address: ""});
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

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

        <ProfileMenu avatar={<AvatarWithBadge  className="text-white  "  avatar={`${session?.user?.image}`} name={session?.user?.name?.split(",")[0]}/>} profile={() => redirect("/profile")} billing={() => redirect("/booking")} logout={() => signOut({ callbackUrl: window.location.href })}/>
        
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
                <Stat label="Room ID" value={`#${RoomNumber}`} />
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

                {isModalOpen && (
                  <section className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center p-4 z-50">

                    <section className="relative bg-white w-full max-w-lg rounded-lg p-6 sm:p-8 text-black space-y-6">

                      <button
                        onClick={() => {setIsModalOpen(false), setGuestInfo({ firstName: "", lastName: "", phone: "", address: ""})}}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                      >
                        ✕
                      </button>

                      <h1 className="text-center text-xl sm:text-2xl font-semibold">
                        Reservation Guest Info
                      </h1>

                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="First name" value={guestInfo.firstName} name="firstName" onChange={handleChange}/>
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Last name" value={guestInfo.lastName} name="lastName" onChange={handleChange}/>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="Enter phone number" value={guestInfo.phone} name="phone" onChange={handleChange}/>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="Enter address" value={guestInfo.address} name="address" onChange={handleChange}/>
                        </div>
                      </form>

                      <div className="space-y-4">
                          <DatePickerWithRange
                            onDateChangeMain={(range) => setSelectedRange(range)}
                            bookedRanges={bookedRanges}
                          />

                        <div className="h-px bg-gray-200" />

                        <div className="flex justify-between items-center bg-gray-100 border border-gray-200 rounded-md px-3 py-3">
                          <span className="text-xs font-bold uppercase text-gray-500">
                            Estimated Total
                          </span>

                          <span className="font-serif text-yellow-500 text-xl sm:text-2xl">
                            ₱{rentInfo.totalRent.toLocaleString()}
                            <sup className="text-xs text-gray-500 ml-1">
                              {rentInfo.totalDays} day{rentInfo.totalDays > 1 ? "s" : ""}
                            </sup>
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleReserve}
                        className="w-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition"
                      >
                        Reserve 
                      </button>

                    </section>
                  </section>
                )}


              <div className="my-5 h-px bg-white/6" />
                <button onClick={() => setIsModalOpen(true)} className="w-full py-3 rounded-md text-[11px] font-bold cursor-pointer uppercase tracking-widest bg-black hover:bg-[#212121] transition" > Book Now </button>

            </div>
          </div>
        </aside>
      </main>

      {loading && <section className="fixed inset-0 bg-black/70 backdrop-blur-[1px] flex justify-center items-center">
                <SpinnerSize />
      </section>}
    </div>
  );
};

export default RoomClient;