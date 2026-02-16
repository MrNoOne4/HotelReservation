"use client";
"use strict";

import RGBSmooth from '../../../public/images/RGBSmooth.jpg';
import userProfile from '../../../public/images/userProfile.png';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, Facebook, Instagram } from "lucide-react";
import {useState} from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Toast from "../../../components/Toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [account, setAccount] = useState({email: "", password: ""});

  const [successToast, setSuccessToast] = useState<{show: boolean; message: string}>({show: false, message: ""});
  const [failedToast, setFailedToast] = useState<{show: boolean; message: string}>({show: false, message: ""});

  const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/Account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: account.email,
      password: account.password,
    }),
  });

  const data = await res.json();

  console.log("LOGIN RESPONSE:", data);

  if (res.ok && data.success) {
    router.push("/practiceno6/dashboard");

    setSuccessToast({show: true, message: "Login successful!"});

    setTimeout(() => {
      setSuccessToast({show: false, message: ""});
    }, 2000);

  } else {
    setFailedToast({show: true, message: data.message || "Login failed. Please try again."});
    setTimeout(() => {
      setFailedToast({show: false, message: ""});
    }, 2000);
    
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAccount(prev => ({...prev, [name]: value}))
  }
  


  return (
    <div className="box-border flex items-center justify-center h-screen p-0 m-0 font-sans bg-center bg-cover" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${RGBSmooth.src})`, }}>
      <div className='flex h-auto border rounded-md w-xs lg:w-200 bg-white/30 backdrop-blur-md '>

        <div className='flex-col justify-center hidden w-full h-full p-10 text-black align-center lg:flex'>
            <div>
            <Image src={userProfile} alt='user profile' width={180} height={150} className='mx-auto' />
            </div>
          <h1 className='text-3xl font-semibold text-center'>Welcome</h1>
          <p className='mt-3 text-lg text-center'>We're excited to see you again. Please log in to continue your journey with us.</p>
        </div>

        <div className='w-full'>

          <form className='flex flex-col justify-center h-full p-10' onSubmit={handleSubmit}>
            <h1 className='mb-5 text-4xl font-semibold text-center'>Sign in </h1>
            <div className='flex justify-center gap-8 mb-6'>
                <div className='flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer'><Mail size={24} color="black"/></div>
                <div className='flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer'><Facebook size={24} color="black"/></div>
                <div className='flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer'><Instagram size={24} color="black" /></div>
            </div>

            <div className='relative w-full'>
              <div className='absolute top-2 left-2'>
                <Mail size={24} color="black" />
              </div>
                <input type="email" id="email" placeholder=" " className="w-full p-2 pl-10 mb-4 border-b outline-none peer focus:border-black not-placeholder-shown:border-black " value={account.email} name="email" onChange={handleChange} required/>
                <label htmlFor="email" className="absolute text-base font-semibold text-gray-200 transition-all duration-300 left-10 top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-black " > Email </label>
            </div>
            
            <div className='relative w-full mt-3'>
               <div className='absolute top-2 left-2'>
                <Lock size={24} color="black" />
              </div>
              <input type={showPassword ? "password" : "text"} placeholder=' ' className='w-full p-2 pl-10 mb-4 border-b outline-none pr-11 peer focus:border-black not-placeholder-shown:border-black ' value={account.password} name="password" onChange={handleChange} required/>
              <label htmlFor="email" className="absolute text-base font-semibold text-gray-200 transition-all duration-300 left-10 top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-black " > Password </label>
              {showPassword ?
                  <button className='absolute cursor-pointer right-2 top-1' onClick={() => setShowPassword(prev => !prev)} type='button'><Eye size={24} color="black" /></button>
                  :<button className='absolute cursor-pointer right-2 top-1' onClick={() => setShowPassword(prev => !prev)} type='button'><EyeOff size={24} color="black" /></button>}
            </div>
            <button type='submit' className='p-2 text-white transition-colors bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600'>Log In</button>

            <div className='flex items-center text-center align-center'>
              <hr  className='flex-1 border-none h-[1px] bg-black mr-2'/> 
              <span  className='px-0 py-2.5'>OR</span>
              <hr  className='flex-1 border-none h-[1px] bg-black ml-2'/>
            </div>
              
          <div className='flex items-center justify-center gap-22 '>
              <button className='p-2 text-blue-300 rounded-md cursor-pointer'>Forgot Password?</button>
              <Link href="/practiceno6/signup" className='rounded-md cursor-pointer'>Sign up</Link>
            </div>
          </form>
        </div>           
      </div>
          <Toast label={successToast.message} background= "bg-[#4CAF50]"  padding='py-[0.8rem] px-[2rem]' condition={successToast.show} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
          <Toast label={failedToast.message} background="bg-[#FF0000]" padding='py-[0.8rem] px-[2rem]' condition={failedToast.show} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
    </div>
  )   
}

export default LoginPage