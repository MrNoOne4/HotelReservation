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
    <div className="m-0 p-0 box-border h-screen flex justify-center items-center font-sans bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${RGBSmooth.src})`, }}>
      <div className='h-auto w-xs lg:w-200 rounded-md border flex bg-white/30 backdrop-blur-md '>

        <div className='text-black w-full h-full  align-center flex-col p-10 justify-center hidden lg:flex'>
            <div>
            <Image src={userProfile} alt='user profile' width={180} height={150} className='mx-auto' />
            </div>
          <h1 className='text-3xl text-center  font-semibold'>Welcome</h1>
          <p className='text-center mt-3 text-lg'>We're excited to see you again. Please log in to continue your journey with us.</p>
        </div>

        <div className='w-full'>

          <form className='flex flex-col p-10 justify-center h-full' onSubmit={handleSubmit}>
            <h1 className='font-semibold text-center text-4xl mb-5'>Sign in </h1>
            <div className='flex justify-center gap-8 mb-6'>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Mail size={24} color="black"/></div>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Facebook size={24} color="black"/></div>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Instagram size={24} color="black" /></div>
            </div>

            <div className='relative w-full'>
              <div className='absolute top-2 left-2'>
                <Mail size={24} color="black" />
              </div>
                <input type="email" id="email" placeholder=" " className="w-full mb-4 pl-10 p-2 border-b outline-none peer focus:border-black not-placeholder-shown:border-black " value={account.email} name="email" onChange={handleChange}/>
                <label htmlFor="email" className="absolute left-10 top-2 font-semibold text-gray-200 text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black transition-all duration-300 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-black " > Email </label>
            </div>
            
            <div className='relative w-full mt-3'>
               <div className='absolute top-2 left-2'>
                <Lock size={24} color="black" />
              </div>
              <input type={showPassword ? "password" : "text"} placeholder=' ' className='w-full mb-4 pl-10 p-2 pr-11 border-b  outline-none peer focus:border-black not-placeholder-shown:border-black ' value={account.password} name="password" onChange={handleChange}/>
              <label htmlFor="email" className="absolute left-10 top-2 font-semibold text-gray-200 text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black transition-all duration-300 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-black " > Password </label>
              {showPassword ?
                  <button className='cursor-pointer absolute right-2 top-1' onClick={() => setShowPassword(prev => !prev)} type='button'><Eye size={24} color="black" /></button>
                  :<button className='cursor-pointer absolute right-2 top-1' onClick={() => setShowPassword(prev => !prev)} type='button'><EyeOff size={24} color="black" /></button>}
            </div>
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer'>Log In</button>

            <div className='flex align-center text-center items-center'>
              <hr  className='flex-1 border-none h-[1px] bg-black mr-2'/> 
              <span  className='px-0 py-2.5'>OR</span>
              <hr  className='flex-1 border-none h-[1px] bg-black ml-2'/>
            </div>
              
          <div className='flex justify-center items-center gap-22 '>
              <button className='p-2 rounded-md cursor-pointer text-blue-300'>Forgot Password?</button>
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