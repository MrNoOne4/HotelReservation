"use client";
import { useState } from "react";
import { LoginForm } from "@/components/login-form"
import { InputOTPForm } from "@/components/InputOTPForm"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

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

     <div className="flex flex-wrap h-screen gap-2 text-black bg-white">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
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
          </div>

    </div>
  
  );
}