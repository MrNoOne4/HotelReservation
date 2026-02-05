"use client";
"use strict";

import RGBSmooth from '../../../public/images/RGBSmooth.jpg';
import { User, AlertCircle, Mail, Lock, Eye, EyeOff, Facebook, Instagram  } from "lucide-react";
import {useState} from 'react';
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  return (
    <div className="m-0 p-0 box-border h-screen flex justify-center items-center font-sans bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${RGBSmooth.src})`, }}>
      <div className='h-auto w-xs lg:w-auto rounded-md border flex bg-white/30 backdrop-blur-md p-10 flex-col'>
      <form>
         <h1 className='text-2xl text-center'>We’re glad you’re here</h1>
        <p className='text-center m-4'>👋Sign up to join us and start exploring everything we have to offer.</p>

        <div className='flex lg:flex-row flex-col lg:gap-10 mt-0 lg:mt-10'>
            <div className='mb-8'>
            <div className='relative w-full'>
              <input type="text" placeholder='' className="w-full py-1 pl-8  border-b-black outline-none border-b peer focus:border-black not-placeholder-shown:border-black " id='firstName' required/>
              <label htmlFor='firstName' className='absolute left-8 top-1.5 peer-focus:-top-6 font-semibold transition-all duration-300 ease-in-out peer-not-placeholder-shown:-top-6'>First Name</label>
              <div className='absolute top-1 left-1'><User size={20} /></div>
            </div>
            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>

          <div className='mb-8'>
            <div className='relative w-full'>
              <input type="text" placeholder='' className="w-full py-1 pl-8  border-b-black outline-none border-b peer focus:border-black not-placeholder-shown:border-black " id='lastName' required/>
              <label htmlFor='lastName' className='absolute left-8 top-1.5 peer-focus:-top-6 font-semibold transition-all duration-300 ease-in-out peer-not-placeholder-shown:-top-6'>Last Name</label>
              <div className='absolute top-1 left-1'><User size={20} /></div>
            </div>
            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>
        </div>
        
        <div className='flex lg:flex-row flex-col justify-between'>
          <div className='mb-8'>
            <div className='relative w-full'>
              <input type="date" placeholder='birthdate' className="w-full py-1 pr-25 outline-none border-b peer not-placeholder-shown:border-black " id='lastName' required/>
            </div>

            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>


          <div className='mb-8'>
            <div className='relative w-full'>
              <select className='w-full lg:px-11 outline-none border-b border-black mt-2.5'>
                <option className="text-black" value="">Gender</option>
                <option className="text-black" value="male">Male</option>
                <option className="text-black" value="female">Female</option>
                <option className="text-black" value="non_binary">Non-binary</option>
                <option className="text-black" value="transgender_male">Transgender Male</option>
                <option className="text-black" value="transgender_female">Transgender Female</option>
                <option className="text-black" value="genderqueer">Genderqueer</option>
                <option className="text-black" value="genderfluid">Genderfluid</option>
                <option className="text-black" value="agender">Agender</option>
                <option className="text-black" value="bigender">Bigender</option>
                <option className="text-black" value="intersex">Intersex</option>
                <option className="text-black" value="others">Others</option>
              </select>
            </div>
            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>
        </div>

 
        <div className='flex lg:flex-row flex-col lg:gap-10 '>
            <div className='mb-8'>
            <div className='relative w-full'>
              <input type="email" placeholder='' className="w-full py-1 pl-8  border-b-black outline-none border-b peer focus:border-black not-placeholder-shown:border-black " id='firstName' required/>
              <label htmlFor='firstName' className='absolute left-8 top-1.5 peer-focus:-top-6 font-semibold transition-all duration-300 ease-in-out peer-not-placeholder-shown:-top-6'>Email</label>
              <div className='absolute top-1 left-1'><Mail size={20} /></div>
            </div>
            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>

          <div className='mb-8'>
            <div className='relative w-full '>
               <div className='absolute top-1 left-1'>
                <Lock size={20} color="white" />
              </div>
              <input type={showPassword ? "password" : "text"} placeholder=' ' className='w-full py-1 pl-8  border-b-black outline-none border-b peer focus:border-black not-placeholder-shown:border-black  ' />
              <label htmlFor='firstName' className='absolute left-8 top-1.5 peer-focus:-top-6 font-semibold transition-all duration-300 ease-in-out peer-not-placeholder-shown:-top-6'>Password</label>
              {showPassword ?
                  <button className='cursor-pointer absolute right-2 top-1' onClick={() => setShowPassword(prev => !prev)} type='button'><Eye size={20} color="white" /></button>
                  :<button className='cursor-pointer absolute right-2 top-1' onClick={() => setShowPassword(prev => !prev)} type='button'><EyeOff size={20} color="white" /></button>}
            </div>
            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center items-center'>
            <button type='submit' className='w-full lg:w-1/2 mx-auto bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer'>Sign Up</button>
        </div>

          <div className='flex align-center text-center items-center'>
              <hr  className='flex-1 border-none h-[1px] bg-black mr-2'/> 
              <span  className='px-0 py-2.5'>OR</span>
              <hr  className='flex-1 border-none h-[1px] bg-black ml-2'/>
          </div>

            <div className='flex lg:flex-row flex-col justify-between items-center'>

              <div className='flex justify-center items gap-6 mb-6'>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Mail size={20} color="black"/></div>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Facebook size={20} color="black"/></div>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Instagram size={20} color="black" /></div>
              </div>


                  <Link href="/practiceno6/login" className='w-50 mr-0 mx-auto bg-gray-400 text-white p-2 rounded-md hover:bg-gray-600 transition-colors cursor-pointer  text-center'>Login</Link>

            </div>
          
            
      </form>
       
      </div>
    </div>
  )
}

export default LoginPage