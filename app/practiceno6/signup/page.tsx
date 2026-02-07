"use client";

import RGBSmooth from '../../../public/images/RGBSmooth.jpg';
import { User, AlertCircle, Mail, Lock, Eye, EyeOff, Facebook, Instagram  } from "lucide-react";
import { useState } from 'react';
import Link from "next/link";
import Toast from "@/components/Toast";
import { useRouter } from 'next/navigation';



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [sucessToast, setSucessToast] = useState<boolean>(false);
  const [failedToast, setFailedToast] = useState<boolean>(false);
  const router = useRouter();

   interface accountInterface {
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    password: string,
    birthDate: string 
  }

  const [account, setAccount] = useState<accountInterface> ({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    birthDate: '' 
  })

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const {name, value} = e.target;
  setAccount(prev => ({...prev, [name]: value,
  }));
 }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      const response = await fetch ('/api/Account/signup', {
        method: "POST",
        headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(account),
    })

    const result = await response.json();

   if (result.success) {
     setAccount({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      password: '',
      birthDate: '' 
    });

     setSucessToast(result.success);
     setTimeout(() => setSucessToast(false), 3000);
     router.push("/practiceno6/dashboard");
     return;

   }

     setFailedToast(true);
     setTimeout(() => setFailedToast(false), 3000);


  }

  return (
    <div className="m-0 p-0 box-border h-screen flex justify-center items-center font-sans bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${RGBSmooth.src})` }}>
      <div className='h-auto w-xs lg:w-auto rounded-md border flex bg-white/30 backdrop-blur-md p-10 flex-col'>
      <form onSubmit={handleSubmit} method='POST'>
         <h1 className='text-2xl text-center '>We’re glad you’re here</h1>
         <p className='text-center m-4 hidden md:block'>👋Sign up to join us and start exploring everything we have to offer.</p>

        <div className='flex lg:flex-row flex-col lg:gap-10 mt-0 lg:mt-10'>
            <div className='md:mb-8 mb-5'>
            <div className='relative w-full'>
              <input type="text" placeholder='' name="firstName" value={account.firstName} className="bg-transparent  w-full py-1 pl-8  border-b-black outline-none border-b peer focus:border-black not-placeholder-shown:border-black " id='firstName' required onChange={handleChange}/>
              <label htmlFor='firstName' className='absolute left-8 top-1.5 md:peer-focus:-top-6 peer-focus:-top-3 font-semibold transition-all duration-300 ease-in-out peer-not-placeholder-shown:-top-3 md:peer-not-placeholder-shown:-top-6'>First Name</label>
              <div className='absolute top-1 left-1'><User size={20} /></div>
            </div>
            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>

          <div className='md:mb-8 mb-5'>
            <div className='relative w-full'>
              <input type="text" placeholder='' name="lastName" value={account.lastName} className="w-full py-1 pl-8  border-b-black outline-none border-b peer focus:border-black not-placeholder-shown:border-black " id='lastName' required onChange={handleChange}/>
              <label htmlFor='lastName' className='absolute left-8 top-1.5 md:peer-focus:-top-6 peer-focus:-top-3 font-semibold transition-all duration-300 ease-in-out md:peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:-top-3'>Last Name</label>
              <div className='absolute top-1 left-1'><User size={20} /></div>
            </div>
            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>
        </div>
        
        <div className='flex lg:flex-row flex-col justify-between'>
          <div className='md:mb-8 mb-5'>
            <div className='relative w-full'>
              <input type="date" placeholder='birthdate' name="birthDate" value={account.birthDate} className="w-full py-1 pr-25 outline-none border-b peer not-placeholder-shown:border-black " id='birthDate' required onChange={handleChange}/>
            </div>

            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>


          <div className='md:mb-8 mb-5'>
            <div className='relative w-full'>
              <select className='w-full lg:px-11 outline-none border-b border-black mt-2.5' value={account.gender} onChange={handleChange} name="gender">
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
            <div className='md:mb-8 mb-5'>
            <div className='relative w-full'>
              <input type="email" placeholder='' name="email" value={account.email} className="w-full py-1 pl-8  border-b-black outline-none border-b peer focus:border-black not-placeholder-shown:border-black " id='email' required onChange={handleChange}/>
              <label htmlFor='email' className='absolute left-8 top-1.5 md:peer-focus:-top-6 peer-focus:-top-3 font-semibold transition-all duration-300 ease-in-out md:peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:-top-3'>Email</label>
              <div className='absolute top-1 left-1'><Mail size={20} /></div>
            </div>
            <div className='mt-2 hidden'>
              <AlertCircle size={24} />
            </div>
          </div>

          <div className='md:mb-8 mb-5'>
            <div className='relative w-full '>
               <div className='absolute top-1 left-1'>
                <Lock size={20} color="white" />
              </div>
              <input type={showPassword ? "password" : "text"} name="password" value={account.password}  placeholder=' ' className='w-full py-1 pl-8  border-b-black outline-none border-b peer focus:border-black not-placeholder-shown:border-black' id="password" required onChange={handleChange}/>
              <label htmlFor='password' className='absolute left-8 top-1.5 peer-focus:-top-6 font-semibold transition-all duration-300 ease-in-out peer-not-placeholder-shown:-top-6'>Password</label>
              {showPassword ?
                  <button className='cursor-pointer absolute right-2 top-1' onClick={() => setShowPassword(prev => !prev)} type='button'><Eye size={20} color="white" /></button>
                  :<button className='cursor-pointer absolute right-2 top-1' onClick={() => setShowPassword(prev => !prev)} type='button'><EyeOff size={20} color="white" /></button>}
            </div>
            <div className='mt-2 flex gap-2' title='Password: 8+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special'>
              <AlertCircle size={15} /> <span className='text-xs'>Password Requirement</span>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center items-center'>
            <button type='submit' className='w-full lg:w-1/2 mx-auto bg-blue-500 text-white p-0 md:p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer'>Sign Up</button>
        </div>

          <div className='flex align-center text-center items-center'>
              <hr  className='flex-1 border-none h-px bg-black mr-2'/> 
              <span  className='px-0 py-2.5'>OR</span>
              <hr  className='flex-1 border-none h-px bg-black ml-2'/>
          </div>

            <div className='flex lg:flex-row flex-col justify-between items-center'>
              <div className='flex justify-center items gap-6 mb-6'>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Mail size={20} color="black"/></div>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Facebook size={20} color="black"/></div>
                <div className='rounded-full bg-white h-10 w-10 flex justify-center items-center cursor-pointer'><Instagram size={20} color="black" /></div>
              </div>
                <Link href="/practiceno6/login" className='block w-50 p-0 md:p-2 mr-0 mx-auto bg-gray-400 text-white  rounded-md hover:bg-gray-600 transition-colors cursor-pointer  text-center'>Login</Link>

            </div>
      </form>

      </div>
        <Toast label={"The account was successfully created" } background= "bg-[#4CAF50]"  padding='py-[0.8rem] px-[2rem]' condition={sucessToast} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
        <Toast label={"Account creation was unsuccessful. Please check your details and try again"} background="bg-[#FF0000]" padding='py-[0.8rem] px-[2rem]' condition={failedToast} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>

    </div>
  )
}

export default LoginPage