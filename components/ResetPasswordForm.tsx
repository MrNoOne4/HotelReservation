"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react"
import {useState} from "react";

interface properties {
    onSubmit?: ( e: React.FormEvent<HTMLFormElement>, data: { email: string } ) => void | Promise<void>;
    switchTo?: () => void;
    closeForm?: () => void;
    submit?: () => void | Promise<void>;
}


export default function ResetPasswordForm({ onSubmit, switchTo, closeForm }: properties) {
  const [email, setEmail] = useState({
    email: '',
  });


  return (
    <section className="flex flex-col items-center gap-14 bg-[#212121] rounded-md z-1">
      <button className="cursor-pointer text-white block ml-auto translate-y-6 -translate-x-5" onClick={closeForm}>
        {<X/>}
      </button>
      <div className="flex w-full max-w-sm flex-col gap-6 rounded  p-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Reset Password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={(e) => onSubmit && onSubmit(e, email)}>
          <div className="grid gap-2 text-white">
            <Label htmlFor="email">Email</Label>
                <Input
                    required
                    id="email"
                    type="email"
                    autoComplete="username"
                    placeholder="team@mynaui.com"
                    value={email.email}
                    onChange={e => setEmail({...email, email: e.target.value})}
                />
          </div>
          <Button type="submit" className="w-full cursor-pointer bg-[#e5e5e5] hover:bg-[#ffffff] text-black" >
            Send Reset Email
          </Button>
        </form>
        <button className="text-sm text-white cursor-pointer block" onClick={switchTo}>
          ← Back to{" "} Login

        </button>
      </div>
    </section>
  );
}
