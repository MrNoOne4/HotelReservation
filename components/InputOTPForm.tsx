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
  onSubmit?: (otp: string) => void;
  email?: string;
}

export function InputOTPForm({onSubmit, email}: InputOTPFormProps) {
    const [otp, setOtp] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(otp);
    }

  return (
    <Card className="max-w-xs mx-auto   bg-[#171717]">
      <CardHeader>
        <CardTitle className="font-semibold">Verify your login</CardTitle>
        <CardDescription className="text-gray-400 ">
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium text-gray-400">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button variant="outline" size="xs">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
                <form onSubmit={handleSubmit}>
                    
                <InputOTP maxLength={6} id="otp-verification" required value={otp} onChange={setOtp}> 
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    
                    <InputOTPSeparator className="mx-2" />
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <CardFooter>
                        <Field>
                        <Button type="submit" className="w-full bg-[#e5e5e5] hover:bg-[#ffffff] text-black cursor-pointer">
                            Verify
                        </Button>
                        <div className="text-sm text-muted-foreground">
                            Having trouble signing in?{" "}
                            <a
                            href="#"
                            className="= transition-colors underline-offset-4 hover:text-primary"
                            >
                            Contact support
                            </a>
                        </div>
                        </Field>
                </CardFooter>


                </form>

        </Field>
      </CardContent>

    </Card>
  )
}
