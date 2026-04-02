import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { RefreshCwIcon } from "lucide-react"
import { useState } from "react";

type InputOTPFormProps = {
  onSubmit?: ( e: React.FormEvent<HTMLFormElement>, otp: string ) => void | Promise<void>;
  resendOTP?: () => Promise<void | boolean>;
  resendBtn: boolean;
  time: string;
  email?: string;
}

export function InputOTPForm({onSubmit, resendOTP,resendBtn,time, email}: InputOTPFormProps) {
    const [otp, setOtp] = useState<string>("");
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e, otp);
    }

  return (
    <Card className=" mx-auto p-5  bg-[#171717]">
      <CardHeader>
        <CardTitle className="font-semibold text-white">Verify your login</CardTitle>
        <CardDescription className="text-gray-400 ">
          Enter the verification code we sent to your Email address:{" "}
          <span className="font-medium text-gray-400">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification" className="text-white">
              Verification code
            </FieldLabel>
            <Button variant="outline" size="xs" className={`${resendBtn ? 'cursor-not-allowed' : "cursor-pointer"} `} onClick={resendOTP} disabled={resendBtn}>
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
                <form onSubmit={handleSubmit}>
                    
                <InputOTP maxLength={6} id="otp-verification" required value={otp} onChange={setOtp}> 
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 text-white *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    
                    <InputOTPSeparator className="mx-2 text-white" />
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 text-white *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                  <br/>
                <CardFooter>
                        <Field>
                        <Button type="submit" className="w-full bg-[#e5e5e5] hover:bg-[#ffffff] text-black cursor-pointer" >
                            Verify
                        </Button>
                        <div className="text-sm text-white">
                           Time Remaining{" "}
                           <span><strong>{time}</strong></span>
                        </div>
                        </Field>
                </CardFooter>


                </form>

        </Field>
      </CardContent>

    </Card>
  )
}
