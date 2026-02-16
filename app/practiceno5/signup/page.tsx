"use client";
"use strict";
import { User, Lock, Eye, EyeOff, AlertCircle, Mail, Facebook, Github} from 'lucide-react';
import { ChangeEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import Toast from "../../../components/Toast"
const SignUpPage = () => {
    const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
    const [confirmPasswordToggle, confirmSetPasswordToggle] = useState<boolean>(false);

    const router = useRouter();
    
    const goToPage = () => {
          router.push("/practiceno5/login");
    }

    interface account {
        firstName: string,
        lastName: string,
        gmail: string,
        password: string,
        confirmPassword: string
    }

    const [account, setAccount] = useState<account>({
        firstName: '',
        lastName: '',
        gmail: '',
        password: '',
        confirmPassword: ''
    })

    interface failedToast {
        label: string,
        condition: boolean
    }

    interface setToast {
        label: string,
        condition: boolean
    }

    const resetField = () => {
        setAccount({firstName: '', lastName: '', gmail: '', password: '', confirmPassword: ''})
    }

    const [failedFetch, setFailedFetch] = useState<failedToast>({label: '', condition: false});
    const [successToast, setSuccessToast] = useState<setToast>({label: '', condition: false});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target; 
        setAccount(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (account.password !== account.confirmPassword) {
                setFailedFetch({label: "The password and confirmation password must match. Please ensure both fields are identical.", condition: true})
                 setTimeout(() => {
                    setFailedFetch({label: "The password and confirmation password must match. Please ensure both fields are identical.", condition: false})
                }, 2000)
                
                return;
            }

            const res = await fetch('/api/todo/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(account)
            });

           const result = await res.json();

           if (!res.ok) {
            setFailedFetch({label: result.error, condition: true})
            setTimeout(() => {
                setFailedFetch({label: result.error, condition: false})
            }, 2000)
            return;
           }

           setSuccessToast({label: "Account Created Successfully", condition: true});
             setTimeout(() => {
                setSuccessToast({label: "Account Created Successfully", condition: false});
            }, 2000)
            
            resetField();

            router.push("/practiceno5/dashboard");

            
        } catch (error) {
            console.error("Whoops something went wrong", error);
            setFailedFetch({ label: "Unexpected error occurred", condition: true });
            setTimeout(() => {
                setFailedFetch({ label: "", condition: false });
            }, 3000);
        }
    }
    
  return (
    <main className='box-border flex items-center justify-center h-screen p-0 m-0 bg-[linear-gradient(135deg,#301414,#383557,#40693d)]  text-black font-sans'>
        <div className='bg-[#fffaff]'>
                <div className='p-6' >
                    <article className=" bg-[#fffafa] rounded-sm">
                            <h1 className='mb-5 text-3xl font-bold text-center'>Sign up</h1>
                            <form className='flex flex-col gap-4' onSubmit={handleSubmit} method='POST'>
                                <section className='relative'>
                                    <input type='text' className='block px-10 py-2 mx-auto border border-black rounded-sm' value={account.firstName} placeholder='First name' name="firstName" onChange={handleChange} required/>
                                    <span className='absolute top-2 left-3'><User size={24} color="black" /></span>
                                </section>

                                <section className='relative'>
                                    <input type='text' className='block px-10 py-2 mx-auto border border-black rounded-sm' value={account.lastName} placeholder='Last name' name="lastName" onChange={handleChange} required/>
                                    <span className='absolute top-2 left-3'><User size={24} color="black" /></span>
                                </section>

                                <section className='relative'>
                                    <input type="email" className='block px-10 py-2 mx-auto border border-black rounded-sm' value={account.gmail} placeholder='Gmail' name="gmail" onChange={handleChange} required/>
                                    <span className='absolute top-2 left-3'><Mail size={24} color="black" /></span>
                                </section>

                                <section className='relative'>
                                    <input type={passwordToggle ? "text" : "password"} className='block px-10 py-2 mx-auto mb-1 border border-black rounded-sm' value={account.password} placeholder='Password' name="password" onChange={handleChange} required/>
                                    <span className='absolute top-2 left-3'><Lock size={24} color="black" /></span>
                                    <span className='absolute mb-5 top-2 right-5'><button type="button"  onClick={() => setPasswordToggle(prev => !prev)} className='cursor-pointer'> {passwordToggle ? <Eye size={24} color="black" /> : <EyeOff size={24} color="black" />}</button></span>
                                    <span className='absolute left-4 top-11' title='Use 8 or more characters with at least 1 capital letter, 1 number, and 1 special character.'><AlertCircle color="gray" size="15"/></span>
                                </section>

                                <section className='relative'>
                                    <input type={confirmPasswordToggle ? "text" : "password"} className='block px-10 py-2 mx-auto border border-black rounded-sm' value={account.confirmPassword} placeholder='Confirm Password' name="confirmPassword" onChange={handleChange} required/>
                                    <span className='absolute top-2 left-3'><Lock size={24} color="black" /></span>
                                    <span className='absolute top-2 right-5'><button type="button"  onClick={() => confirmSetPasswordToggle(prev => !prev)} className='cursor-pointer'> {confirmPasswordToggle ? <Eye size={24} color="black" /> : <EyeOff size={24} color="black" />}</button></span>
                                </section>
                                    <button className='py-3 mx-5 text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600'>Sign up</button>

                                    <article className='flex justify-center gap-2'>
                                        <p className='text-gray-600'>Have an account?</p>
                                        <button className='text-blue-500 cursor-pointer' type="button" onClick={() => goToPage()}>Login</button>
                                    </article>
                                    
                                    <div className='flex items-center justify-center'>
                                        <span className="mr-2 border border-black w-23"></span>
                                        <p>or connect with</p>
                                        <span className="ml-2 border border-black w-23"></span>
                                    </div>

                                    <article className='flex items-center justify-center gap-4 mb-6'>
                                        <button type="button" className="cursor-pointer"><Facebook size={24}  /></button>
                                        <button type="button"  className='cursor-pointer'><Github size={24}  /></button>
                                        <button type="button" className='cursor-pointer'><Mail size={24}  /></button>
                                    </article>
                        </form>
                    </article>
                </div>
        </div>
          <Toast label={successToast.label} background= "bg-[#4CAF50]"  padding='py-[0.8rem] px-[2rem]' condition={successToast.condition} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
          <Toast label={failedFetch.label} background="bg-[#FF0000]" padding='py-[0.8rem] px-[2rem]' condition={failedFetch.condition} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
 
    </main>
  )
}

export default SignUpPage