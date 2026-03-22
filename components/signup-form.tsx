import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { X, Mail, User, EyeOff, Eye, Lock} from 'lucide-react';
import {useState} from "react";


type signupFormProps = {
  onSubmit?: ( e: React.FormEvent<HTMLFormElement>, data: { fullName: string; signUpEmail: string; signUpPassword: string; signUpConfirmPassword: string} ) => void;
  switchTo?: () => void
  closeForm?: () => void

} & Omit<React.ComponentPropsWithoutRef<"div">, "onSubmit">;



export function SignupForm({ className, onSubmit,switchTo, closeForm, ...props }: signupFormProps) {
    interface signupForm {
      fullName: string
      signUpEmail: string,
      signUpPassword: string,
      signUpConfirmPassword: string,
    }
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

      const [signupForm, setSignupForm] = useState<signupForm>({
      fullName: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpConfirmPassword: '',
    })
    
    const handleSignUpForm = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target as HTMLInputElement;
      setSignupForm((prev) => ({...prev, [name]: value}));
    }

    function switchHandler() {
      switchTo?.();
      setSignupForm({fullName: '', signUpEmail: '', signUpPassword: '', signUpConfirmPassword: '',})
      setIsPasswordVisible(false)
      setIsConfirmPasswordVisible(false);
    }
    
    const removeHandler = () => {
      closeForm?.();
      setSignupForm({fullName: '', signUpEmail: '', signUpPassword: '', signUpConfirmPassword: '',})
      setIsPasswordVisible(false)
      setIsConfirmPasswordVisible(false);
    }

  return (  

    <Card className={cn("flex flex-col gap-6 bg-[#171717] backdrop-blur-none rounded-2xl ", className)} {...props}>
            <div className="flex justify-end ">
            <Button className="cursor-pointer" onClick={() => removeHandler()}>
              <X size={30} color="white" />
            </Button>
          </div>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
          <form onSubmit={(e) => onSubmit?.(e, signupForm) } >
          <FieldGroup>
            <Field>
                <div className="relative">
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <Input id="name" type="text" placeholder="John Doe" required  className="bg-[#212121] hover:bg-[#1b1b1b] py-5 px-10" name="fullName" value={signupForm.fullName} onChange={handleSignUpForm}/>
                        <i className='absolute top-8 left-3 2xl:left-2 lg:left-3'><User size={20} color='white'/></i>

                </div>
            </Field>
            <Field>
                <div className="relative">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="m@example.com" required className="bg-[#212121] hover:bg-[#1b1b1b] px-10 py-5" name="signUpEmail" value={signupForm.signUpEmail} onChange={handleSignUpForm}/>
                       <i className='absolute top-8 left-3 2xl:left-2 lg:left-3'><Mail size={20} color='white'/></i>
                </div>
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <div className="relative">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type={isPasswordVisible ? "text" : "password"} required className="bg-[#212121] hover:bg-[#1b1b1b] py-5 px-10" name="signUpPassword" value={signupForm.signUpPassword} onChange={handleSignUpForm}/>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                      <i className='absolute top-7 left-3 2xl:left-3 lg:left-3'><Lock size={20} color='white'/></i>
                      <button className='absolute cursor-pointer top-7 right-3 lg:right-3 2xl:right-3' type='button' onClick={() => setIsPasswordVisible(prev => !prev)} title={isPasswordVisible ? "Hide Password" : "Show Password" }> {isPasswordVisible ? <EyeOff   size={20} color='white'/> : <Eye  size={20} color='white'/>}</button>
              </div>
            </Field>
            <Field>
              <div className="relative">
                   <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input id="confirm-password" type={isConfirmPasswordVisible ? "text" : "password"} required className="bg-[#212121] hover:bg-[#1b1b1b] py-5 px-10" name="signUpConfirmPassword" value={signupForm.signUpConfirmPassword} onChange={handleSignUpForm}/>
                  <FieldDescription>Please confirm your password.</FieldDescription>
                  <i className='absolute top-7 left-3 2xl:left-3 lg:left-3'><Lock size={20} color='white'/></i>
                  <button className='absolute cursor-pointer top-7 right-3 lg:right-3 2xl:right-3' type='button' onClick={() => setIsConfirmPasswordVisible(prev => !prev)} title={isConfirmPasswordVisible ? "Hide Password" : "Show Password" }> {isConfirmPasswordVisible ? <EyeOff   size={20} color='white'/> : <Eye  size={20} color='white'/>}</button>
              </div>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="bg-[#e5e5e5] text-black hover:bg-[#fffafa] cursor-pointer">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <button onClick={() => switchHandler()} className="cursor-pointer">Login in</button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
