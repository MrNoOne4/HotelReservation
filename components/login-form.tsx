"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, EyeOff, Eye, Mail, X} from 'lucide-react';
import {useState} from "react";

type LoginFormProps = {
  onSubmit?: ( e: React.FormEvent<HTMLFormElement>, data: { email: string; password: string } ) => void | Promise<void>;
  switchTo?: () => void;
  closeForm?: () => void;

} & Omit<React.ComponentPropsWithoutRef<"div">, "onSubmit">;



export function LoginForm({ className, onSubmit,switchTo, closeForm, ...props }: LoginFormProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const [formData, setFormData] = useState({ email: '', password: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const {name, value} = e.target as HTMLInputElement;

      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const functionHandler = () => {
      switchTo?.();
      setFormData({ email: '', password: '' })
      setIsPasswordVisible(false);
    }

    const removeHandler = () => {
      closeForm?.();
      setFormData({ email: '', password: '' })
      setIsPasswordVisible(false)
    }
  return (
    <div className={cn("flex flex-col mix-blend-multiply gap-6 bg-[#171717] backdrop-blur-none rounded-2xl", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-end ">
            <Button className="px-1 py-6 cursor-pointer" onClick={() => removeHandler()}>
              <X size={30} color="white" />
            </Button>
          </div>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription className="text-gray-500">
            Login with your Facebook or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => onSubmit && onSubmit(e, formData) && setFormData} >
            
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full cursor-pointer bg-[#212121] hover:bg-[#1B1B1B]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                  Login with Facebook
                </Button>

                <Button variant="outline" className="w-full cursor-pointer bg-[#212121] hover:bg-[#1B1B1B]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-sm text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 px-2 bg-[#171717]  text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                    <div className='relative'>
                      <Input id="email" type="email" placeholder="m@example.com" required className="bg-[#212121] px-10 hover:bg-[#1B1B1B] py-5" name="email" value={formData.email} onChange={handleChange}/>
                       <i className='absolute top-3 left-3 2xl:left-3 lg:left-3'><Mail size={20} color='white'/></i>

                    </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                      <Input id="password" type={isPasswordVisible ? "text" : "password"} required className="bg-[#212121]  hover:bg-[#1B1B1B] px-10 py-5" name="password" value={formData.password} onChange={handleChange}/>
                      <i className='absolute top-3 left-3 '><Lock size={20} color='white'/></i>
                      <button className='absolute cursor-pointer right-3 top-3 lg:right-3 2xl:right-3' type='button' onClick={() => setIsPasswordVisible(prev => !prev)} title={isPasswordVisible ? "Hide Password" : "Show Password" }> {isPasswordVisible ? <EyeOff   size={20} color='white'/> : <Eye  size={20} color='white'/>}</button>

                  </div>
                </div>
                <Button type="submit" className="w-full bg-[#e5e5e5] text-black cursor-pointer" >
                  Login
                </Button>
              </div>
              <div className="text-sm text-center">
                Don&apos;t have an account?{" "}
                <button className="underline cursor-pointer underline-offset-4" onClick={() => functionHandler()}>
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </CardContent>

            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  text-gray500">
              By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </div>

      
      </Card>

    </div>
  )
}
