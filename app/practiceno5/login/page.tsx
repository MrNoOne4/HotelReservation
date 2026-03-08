"use client";
"use strict";
import { User, Lock, Eye, EyeOff, Facebook, Github, Mail} from 'lucide-react';
import { ChangeEvent, useState,  } from "react";
import { useRouter } from 'next/navigation';
import Toast from "../../../components/Toast"
import { signOut,signIn,useSession } from 'next-auth/react'

export default function AuthPage() {
    const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
    const router = useRouter();

    interface login {
        email: string,
        password: string
    }

     interface failedToast {
        label: string,
        condition: boolean
    }

    const [failedFetch, setFailedFetch] = useState<failedToast>({label: '', condition: false});
    const [loginField, setLoginField] = useState<login>({email: '', password: ''})

    const resetField = () => {
        setLoginField({email: '', password: ''})
    }

    const goToPage = () => {
          router.push("/practiceno5/signup");
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginField(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/todo/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginField)
            })

            const result = await res.json();

            if (!res.ok) {
                setFailedFetch({label: result.error, condition: true})
                setTimeout(() => {
                    setFailedFetch({label: result.error, condition: false})
                }, 2000)
                return;
            }

            resetField();
            router.push("/practiceno5/dashboard");

            await signIn("credentials", {
                email: loginField?.email,
                password: loginField?.password,
                callbackUrl: "/practiceno5/dashboard"
            })

        } catch (error) {
            console.error("Whoops something went wrong", error);
            setFailedFetch({ label: "Unexpected error occurred", condition: true });
            setTimeout(() => {
                setFailedFetch({ label: "", condition: false });
            }, 3000);
        }
    }

    return (
        <main className="box-border flex items-center justify-center h-screen p-0 m-0 bg-[linear-gradient(135deg,#301414,#383557,#40693d)]  text-black font-sans">
            <div className='perspective-1000 peer w-90'>
                    <div className=' backface-hidden'>
                            <article className="border bg-[#fffafa] rounded-sm">
                                <h1 className="m-6 mt-6 text-3xl font-bold text-center">Login</h1>
                                <form className='flex flex-col gap-5' onSubmit={handleSubmit} method="POST">
                                    <section className='relative'>
                                        <input type='text' className='block px-10 py-2 mx-auto border border-black rounded-sm' placeholder='Username or Email' name="email" value={loginField.email} onChange={handleChange} required/>
                                        <span className='absolute top-2 left-9'><User size={24} color="black" /></span>
                                    </section>

                                    <section className='relative'>
                                        <input type={passwordToggle ? "text" : "password"} className='block px-10 py-2 mx-auto border border-black rounded-sm' placeholder='Enter your password' name="password" value={loginField.password} onChange={handleChange} required/>
                                        <span className='absolute top-2 left-9 '><Lock size={24} color="black" /></span>
                                        <span className='absolute top-2 right-9'><button type="button"  onClick={() => setPasswordToggle(prev => !prev)} className='cursor-pointer'> {passwordToggle ? <Eye size={24} color="black" /> : <EyeOff size={24} color="black" />}</button></span>
                                    </section>

                                    <section className='flex items-center justify-around mx-0'>
                                        <label  className='flex items-center justify-center gap-1'>
                                            <input type="checkbox" />
                                            Remember me
                                        </label>

                                        <button className='font-semibold text-blue-500' type="button">Forgot password?</button>
                                    </section>

                                    <button className='py-3 mx-5 text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600' type='submit'>Login</button>

                                    <article className='flex justify-center gap-2'>
                                        <p className='text-gray-600'>Don&apos;t have an account?</p>
                                        <button className='text-blue-500 cursor-pointer' type="button" onClick={() => goToPage()}>Sign up</button>
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
          <Toast label={failedFetch.label} background="bg-[#FF0000]" padding='py-[0.8rem] px-[2rem]' condition={failedFetch.condition} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
        </main>
    )
}