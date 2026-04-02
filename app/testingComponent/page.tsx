"use client";
import { useState } from "react";
import { LoginForm } from "@/components/login-form"
import { InputOTPForm } from "@/components/InputOTPForm"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import {SkeletonCard} from "@/components/SkeletonCard";
import { SpinnerSize } from "@/components/SpinnerSize";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import  Carousel  from "@/components/Carousel"
import { DropdownMenuIcons } from "@/components/DropdownMenuIcons";
import {AvatarWithBadge} from "@/components/AvatarWithBadge";

import { CarouselDemo } from "@/components/CarouselDemo";
import  CalendarRangeCalendarMultiMonthDemo  from "@/components/CalendarRangeCalendarMultiMonthDemo";
import { Separator } from "@/components/ui/separator"

import {AlertDialogBasic} from "@/components/AlertDialogBasic";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    // <div className="h-screen bg-white">
    //   {/* <input
    //     type="file"
    //     accept="image/*"
    //     onChange={(e) => setFile(e.target.files?.[0] || null)}
    //   />
    //   <button onClick={handleUpload}>Upload</button> */}

    //     {/* <InputOTPForm/> */}

    //   <Button variant="outline" onClick={() => toast("Event has been created")}>
    //     Default
    //   </Button>

    // </div>

     <div className="flex items-center justify-center w-screen h-screen gap-2 text-black bg-white">
      {/* <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Be at the area 10 minutes before the event time")
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Event start time cannot be earlier than 8am")
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Event has not been created")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",
            }
          )
        }}
      >
        Promise
      </Button>

          <div className="relative w-full h-10 bg-black">
            <Toaster />
          </div> */}


                  {/* div className="w-1/2 bg-red-500 h-1/2">
                    <SkeletonCard/>
                    <SpinnerSize/>
                  </div> */}
            {/* <Card className="relative mx-auto w-full max-w-sm pt-0">
                  <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                        
                  <CardHeader>
                    <CardAction>
                      <Badge variant="secondary">Featured</Badge>
                    </CardAction>
                    <CardTitle>Design systems meetup</CardTitle>
                    <CardDescription>
                      A practical talk on component APIs, accessibility, and shipping
                      faster.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">View Event</Button>
                  </CardFooter>
                </Card> */}
            
            {/* <CalendarRangeCalendarMultiMonthDemo/> */}

         <CalendarRangeCalendarMultiMonthDemo/>
    </div>
  
  );
}