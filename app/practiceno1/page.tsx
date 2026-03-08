"use client";
"use strict";

import React, { ChangeEvent, useState } from 'react'
import {ThumbsUp, MessageCircle, Instagram, Send, Facebook, Menu ,  X, LogIn, User, Mail, UserCircle, Lock, Eye, EyeOff } from "lucide-react";
import { useEffect} from 'react';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowUpIcon } from "lucide-react"

  const HotelReservation = () => {
  const [topButton, setTopButton] = useState<boolean>(false);

    function scrollTo(section: string) {
    const element = document.getElementById(section);
    element?.scrollIntoView({behavior: 'smooth' });
    }

    useEffect(() => {
    const scrollHandle = () => {
        if (window.scrollY > 500) {
          setTopButton(true)
        } else {
          setTopButton(false)
        }
      }

      window.addEventListener("scroll", scrollHandle);

      return () => {
        window.removeEventListener("scroll", scrollHandle);
      };
    }, [])

    const [menu, setMenu] = useState<boolean>(false);

    interface messageProps {
      firstName: string,
      lastName: string,
      email:string
      message: string
    };

    const [message, setMessage] = useState<messageProps>({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    })

    const [loginShowPassword, setLoginShowPassword] = useState<boolean>(false);

    const handleMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {value, name} = e.target as HTMLInputElement;
      setMessage((prev) => ({...prev, [name]: value}))
    }

    const [showForm, setShowForm] = useState<boolean>(false)
    const [signUp, showSignUp] = useState<boolean>(false);


    interface loginForm {
      email: string,
      password: string,
    }

    const [loginForm, setLoginForm] = useState({
      email: '',
      password: '',
    })

    
    const handleLoginUpForm = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target as HTMLInputElement;
      setLoginForm((prev) => ({...prev, [name]: value}));
    }
    
    interface signupForm {
      signUpFirstName: string,
      signUpLastName: string,
      signUpEmail: string,
      signUpPassword: string,
      signUpConfirmPassword: string,
    }

    const [signUpPass, setSignUpPass] = useState<boolean>(false);
    const [signUpConfirmPass, setSignUpConfirmPass] = useState<boolean>(false);

    const [signupForm, setSignupForm] = useState<signupForm>({
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpConfirmPassword: '',
    })

    const handleSignUpForm = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target as HTMLInputElement;
      setSignupForm((prev) => ({...prev, [name]: value}));
    }

    const restForm = () => {
      setSignupForm({
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpConfirmPassword: '',
      })

      setLoginForm({
        email: '',
        password: '',
      })

    }

    return (
    <div className='box-border p-0 m-0 font-sans bg-[#F8FAFC] overflow-x-auto snap-x snap-mandatory scroll-smooth'>
      <header className={`flex flex-col px-0 py-5 ml-3 transition-all duration-300 ease-in-out md:mb-5 mb-5 2xl:mb-0 lg:px-10 2xl:px-40 lg:flex-row lg:items-center lg:justify-between lg:ml-0 ${menu ? 'h-70' : 'h-15'} lg:h-auto`} id='header'>
        {/* Logo Section */}
        <div className='flex items-center justify-between mt-3'>
          <h1 className='text-2xl lg:text-3xl text-[#a44a23] font-semibold mb-4'>Nova Stay</h1>
          <button className='block mb-5 mr-3 cursor-pointer lg:hidden' onClick={() => setMenu(prev => !prev)}>{menu ? <X size={28} color="black" strokeWidth={2} /> : <Menu size={28} color="black" strokeWidth={2} />}</button>
        </div>

        {/* Navigation Bar Section */}
        <nav className='text-xl font-medium'>
          <ul className='flex flex-col gap-3 lg:gap-10 lg:flex-row'>
            <li><a href="#" onClick={()=> scrollTo("heroSection")}>Home</a></li>
            <li><a href="#" onClick={()=> scrollTo("aboutUs")}>About</a></li>
            <li><a href="#" onClick={() => scrollTo("hotelRooms")}>Hotel Rooms</a></li>
            <li><a href="#" onClick={() => scrollTo("contact")}>Contact</a></li>
          </ul>
        </nav>

        {/* Login Section */}
        <button className='flex items-center justify-center w-1/3 gap-2 px-4 py-2 mt-4 mb-3 font-semibold text-white bg-black rounded-md cursor-pointer lg:w-auto' onClick={() => setShowForm(true)}><LogIn size={20} color='white'/> Login</button>
      </header>

      <section className="relative" id='heroSection'>
        <section className='flex items-center justify-center h-screen text-white bg-fixed bg-center bg-cover' style={{  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/hero.jpeg')` }}>
          <article className='flex flex-col items-center justify-center w-full min-h-screen px-4 tracking-wide text-center text-white sm:px-6 md:px-8 lg:px-16'>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl md:mb-6">
              Welcome to Nova Stay
            </h1>
            <h6 className="max-w-xl text-sm sm:text-base md:text-lg lg:text-xl">
              Step into a space designed to make every moment memorable, whether you're here to relax, explore, or celebrate. Your perfect stay begins here – let us take care of the rest.
            </h6>
            <button className='px-6 py-4 mt-6 font-semibold text-white rounded-md cursor-pointer bg-black/50' onClick={()=> scrollTo("aboutUs") }>Explore More</button>
          </article>
        </section>
      </section>

      <section className='bg-black pb-7' >
          {/* About us Section */}
              <section className='relative w-[90%] px-4 py-6 text-black -translate-x-1/2 bg-fixed bg-center bg-cover sm:px-0 md:py-0  top-1/2 left-1/2 -translate-y-15 lg:-translate-y-30 bg-white/50 md:w-auto lg:w-[90%] 2xl:w-1/2 2xl:-translate-y-27' id='aboutUs'>
                <article className='w-full p-0 text-center text-white md:p-15'>
                  <h1 className="mb-5 text-2xl font-semibold text-center md:text-5xl">
                    About Us
                  </h1>
                  <h6 className="text-xs tracking-normal md:tracking-wide md:text-sm 2xl:text-xl">
                    Our hotel is a sanctuary where comfort, elegance, and personalized service come together to create an unforgettable experience. Every room is thoughtfully designed to provide relaxation and style, while every detail—from check-in to departure—is crafted to make guests feel cared for. Whether visiting for leisure, business, or a special occasion, guests can enjoy seamless service, warm hospitality, and an atmosphere that inspires calm and enjoyment. Here, it’s more than a stay—it’s a place to make memories, celebrate life’s moments, and feel truly at home.
                  </h6>
                </article>
              </section>

            <section className='px-20 text-white '>
                <div className='mx-auto'>
                  <h1 className='my-6 text-3xl text-center md:text-5xl'>Book direct to enjoy a full 24-hour stay — guaranteed!</h1>
                  <h6 className='text-sm text-center'>All our generously appointed guest rooms offer the ultimate luxury, privacy and comfort.</h6>
                </div>

              {/*Card Container*/}
              <div className='z-0 grid grid-cols-1 gap-10 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' id='hotelRooms'>
                  {Array.from({length: 8}).map((e, index: number) => (
                    <article className='z-0 block mx-auto'>
                      <Card className="relative w-full max-w-sm pt-0 ">
                        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                        <img
                          src="https://avatar.vercel.sh/shadcn1"
                          alt="Event cover"
                          className="relative z-20 object-cover w-full aspect-video brightness-60 grayscale dark:brightness-40"
                        />
                        <CardHeader>
                          <div>
                            <Badge variant="secondary">Featured</Badge>
                          </div>
                          <CardTitle>Design systems meetup</CardTitle>
                          <CardDescription>
                            A practical talk on component APIs, accessibility, and shipping faster.
                          </CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button className="w-full cursor-pointer">View Event</Button>
                        </CardFooter>
                    </Card>
                    </article>
                  ))}
              </div>
            </section>
        <button className='block px-6 py-4 mx-auto mt-6 font-semibold text-white rounded-md cursor-pointer bg-white/50' >View More...</button>
      </section>

      <section id='contact' className='block w-full py-9 bg-[#f0dbd3] 2xl:px-80 px-5'>
              <section className='flex justify-between gap-10 pb-4 mx-auto bg-white lg:py-40 lg:px-40 sm:gap-8 md:gap-6 lg:gap-10 2xl:gap-2'>
                {/* get in touch section */}
                  <div className='hidden lg:block'>
                      <div className='flex flex-col gap-6 tracking-wide'>
                          <h1 className='text-5xl text-[#a65129] font-semibold'>Get in Touch</h1>
                          <h5 className='text-xl text-[#a65129]'>We like to hear from you!</h5>
                          <small>if you have any inquiries or just want to <br/> say hi, please use the contact form!</small>
                      </div>
                   {/* get in touch Icon */}

                      <div className='flex mt-15'>
                        <span className='flex mr-4 '><ThumbsUp size={40} /> </span>
                        <span className='flex gap-2'> 
                            <span className='flex items-center justify-center px-3 bg-black rounded-full cursor-pointer'><Instagram  size={20}  color="white"/></span> 
                            <span className='flex items-center justify-center px-3 bg-black rounded-full cursor-pointer'><Facebook  size={20}  color="white"/></span>
                            <span className='flex items-center justify-center px-3 bg-black rounded-full cursor-pointer'><Send size={20}  color="white"/></span>
                            <span className='flex items-center justify-center px-3 bg-black rounded-full cursor-pointer'><MessageCircle size={20}  color="white"/></span>
                        </span>
                      </div>
                  </div>

                {/* get in form section */}
                  <div className='block mx-auto lg:mx-0 '>
                    
                    <div className="flex-col items-center justify-center block p-4 space-y-2 lg:hidden">
                      <h1 className='text-4xl text-center '>Message us</h1>
                      <p className="text-center text-gray-700">
                        We’d love to hear your thoughts!
                      </p>
                    </div>

                    <div className='flex flex-col gap-8 lg:flex-row'>
                      <div className='flex flex-col ml-3 lg:w-full lg:ml-0'>
                        <label>First Name</label>
                        <div className='relative'>
                          <input type="text" className='py-1 border w-[90%] lg:w-full lg:ml-0 pl-10' value={message.firstName} name='firstName' onChange={handleMessageChange}/>
                          <span className='absolute top-0 left-0 p-1 '><User size={25} /></span>
                        </div>
                      </div>
                      
                      <div className='flex flex-col ml-3 lg:w-full lg:ml-0'>
                        <label>Last Name</label>
                        <div className='relative'>
                          <input type="text" className='py-1 border w-[90%] lg:w-full lg:ml-0 pl-10' value={message.lastName} name='lastName' onChange={handleMessageChange}/>
                          <span className='absolute top-0 left-0 p-1 '><User size={25} /></span>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 ml-3 lg:ml-0'>
                        <label>Email *</label>
                        <div className='relative'>
                          <input type="email"  className='py-2 border w-[90%] lg:w-full lg:ml-0 pl-10' value={message.email} name='email' onChange={handleMessageChange}/>
                          <span className='absolute p-1 left-1 top-1 '><Mail  size={25} /></span>
                        </div>
                    </div>

                    <div className='flex flex-col mt-6 ml-3 lg:ml-0'>
                      <label>Message</label>
                      <textarea rows={5} cols={40} className='border w-[90%] lg:w-full' value={message.message} name='message' onChange={handleMessageChange}></textarea>
                    </div>
                    
                    <div className='mt-3 text-center '>
                       <button className='bg-[#a44a23] cursor-pointer text-white px-11 py-2 self-center lg:self-end flex gap-2 items-center mx-auto'> <Send size={20} color='white'/> Send</button>
                    </div>
                  </div>
              </section>
      </section>

      <footer className=" bg-[#222431] w-full mt-0 pt-20  ">
        <div className={`h-full w-[60%] mx-auto text-white`}>
          <h1 className="text-2xl font-bold text-center">Nova Stay</h1>
          <section className="grid w-full h-full grid-cols-2 gap-4 pt-16 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col gap-4 text-sm lg:text2xl">
              <div>
                <h1 className="text-lg lg:text-2xl">Community</h1>
                <ul className="text-[#ccc]">
                  <li className="cursor-pointer mt-1.5">Guest Stories</li>
                  <li className="cursor-pointer mt-1.5">Travel Tips & Guides</li>
                  <li className="cursor-pointer mt-1.5">Hotel Reviews</li>
                  <li className="cursor-pointer mt-1.5">Loyalty Program</li>
                </ul>
              </div>

              <div>
                <h1 className="text-lg lg:text-2xl">Resources</h1>
                <ul className="text-[#ccc]">
                  <li className="cursor-pointer mt-1.5">Room Types & Amenities</li>
                  <li className="cursor-pointer mt-1.5">Dining & Menu Guides</li>
                  <li className="cursor-pointer mt-1.5">Spa & Wellness Services</li>
                  <li className="cursor-pointer mt-1.5">Special Offers</li>

                </ul>
              </div>

            </div>

            <div className="flex flex-col gap-4 text-sm lg:text2xl">
              <h1 className="mb-0 text-lg lg:text-2xl">Services</h1>
              <ul className="text-[#ccc] cursor-pointer">
                <li className="mb-1">Book a Stay</li>
                <li className="cursor-pointer">Event & Conference Hosting</li>
                <li className="cursor-pointer">Airport Transfers</li>
                <li className="cursor-pointer">Custom Packages</li>
                <li className="mb-2 cursor-pointer">Education</li>
                <li className="mb-2 cursor-pointer">Find an Account</li>
                <li className="cursor-pointer">Find a Partner</li>
                <li className="cursor-pointer">Become a Partner</li>

              </ul>
            </div>

            <div className="text-sm lg:text2xl">
              <h1 className="mb-0 text-lg lg:text-2xl">About us</h1>
              <ul className="text-[#ccc] cursor-pointer">
                <li className="mb-1">Our Story</li>
                <li className="cursor-pointer">Brand & Values</li>
                <li className="cursor-pointer">Contact Information</li>
                <li className="mb-2 cursor-pointer">Blog & News</li>

              </ul>
            </div>

            <div className="flex flex-col gap-4 ">
              <h1 className="mb-1 text-lg lg:text-2xl">Contact us</h1>
              <ul className="text-[#ccc] cursor-pointer">
                <li className="cursor-pointer">+69123456789</li>
                <li className="cursor-pointer">1234 Stocklytics St.</li>
              </ul>

              <h1>INQUIRES</h1>
              <p className="mb-1 text-sm cursor-pointer">theMan@gmail.com</p>

              <h1>CAREERS</h1>
              <p className="cursor-pointer">Dream@halo-lab.team</p>
            </div>

          </section>
        </div>
        <footer className="w-full h-12 bg-[#1b1c26] mt-8 flex items-center justify-center text-white">
          <h1 className="text-sm text-center"> © 2026 Nova Stay - Group-5. All rights reserved. </h1>
        </footer>
      </footer>

      <div className={`fixed flex items-center justify-center w-screen h-screen -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xs top-1/2 left-1/2 ${showForm ? "z-40" : "z-[-1]"}`}>
          <section className='text-white h-130 lg:h-150 w-90 lg:w-[90%] 2xl:w-250 z-999 perspective-[1000px] group'>
                  {/**Login form */}

                <section className={`inset-0 relative w-full h-full transition-all ease-in-out duration-600 transform-3d ${signUp ? "rotate-y-180" : "rotate-y-0"} ${showForm ? "top-0" : "-top-200" }`}>
                    <section className='absolute flex items-center justify-center w-full h-full bg-white backface-hidden'>
                      <div className="hidden w-full h-full lg:block">
                        <img className='w-full h-full bg-center bg-cover z-999' alt="LoginImage" src='/images/Login.jpg'/>
                      </div >

                      <div className="w-full h-full">
                          <form className="w-full h-full text-black" autoComplete='off'>
                            <div className='px-5 py-4 text-right'> <button className='cursor-pointer' title='close button' type='button' onClick={() => {setShowForm(false), showSignUp(false), restForm()}}><X size={32} color='black'/></button> </div>
                              <div className='flex flex-col items-center justify-center'>
                                  <UserCircle size={60} />
                                  <h1 className='mt-4 text-3xl font-semibold'>Login Your Account</h1>
                              </div>

                            <div className='relative mt-8 '>
                               <input className='block px-10 w-[80%] py-2 mx-auto border-b border-gray-300 outline-none peer' placeholder='' type="text" name="email" value={loginForm.email} onChange={handleLoginUpForm}/>
                               <label className='absolute transition-all duration-300 ease-in-out lg:left-23 top-3 left-18 2xl:left-23 peer-focus:-top-4 peer-focus:text-sm peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm' htmlFor='loginPassword'>Email</label>
                               <i className='absolute top-3 left-7 2xl:left-12 lg:left-11'><Mail size={28} color='black'/></i>
                            </div>
                              
                            <div className='relative mt-8'>
                              <input className='block px-10 w-[80%] py-2 mx-auto border-b border-gray-300 outline-none peer' placeholder='' type={loginShowPassword ? "text" : "password"} id='loginPassword' name="password" value={loginForm.password} onChange={handleLoginUpForm}/>
                              <label className='absolute transition-all duration-300 ease-in-out lg:left-23 top-3 left-18 2xl:left-23 peer-focus:-top-4 peer-focus:text-sm peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm' htmlFor='loginPassword'>Password</label>
                              <i className='absolute top-2 left-7 2xl:left-12 lg:left-11'><Lock size={28} color='black'/></i>
                              <button className='absolute cursor-pointer top-2 right-8 lg:right-13 2xl:right-12' type='button' onClick={() => setLoginShowPassword(prev => !prev)} title={loginShowPassword ? "Hide Password" : "Show Password" }> {loginShowPassword ? <EyeOff   size={28} color='black'/> : <Eye  size={28} color='black'/>}</button>
                            </div>


                            <div className='px-4 mt-8'>
                              <button type="button" className='w-[90%]  block mx-auto py-2 font-semibold text-white bg-[#0B1120] rounded-md cursor-pointer '>Login</button>
                            </div>
                            <h5 className='mt-4 font-semibold text-center'>Don't have an account? <button className='text-blue-600 cursor-pointer' type='button' onClick={() => {showSignUp(true), restForm()}}>Sign up</button></h5>
                          </form>
                      </div>
                    </section>
                  
                  {/**Sign up form */}
                    <section className='absolute w-full bg-blue-400 h-150 rotate-y-180 backface-hidden'>
                      <section className='absolute flex items-center justify-center w-full h-full bg-white backface-hidden'>
                        <div className="hidden w-full h-full lg:block">
                            <div className="relative w-full h-full"> 
                                  <img className="object-cover w-full h-full" alt="LoginImage" src="/images/upscalemedia-transformed.jpeg" />
                                   <div className="absolute inset-0 bg-black/50"></div> 
                            </div>
                        </div >

                        <div className="w-full h-full">
                            <form className="w-full h-full text-black" autoComplete='off'>
                              <div className='px-5 text-right translate-y-5'> <button className='cursor-pointer' title='close button' type='button' onClick={() => {setShowForm(false), showSignUp(false), restForm()}}><X size={32} color='black'/></button> </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <UserCircle size={60} />
                                    <h1 className='mt-4 text-3xl font-semibold'>Sign In</h1>
                                </div>

                              <div className='relative mt-5 '>
                                <input className='block px-10 w-[80%] py-2 mx-auto border-b border-gray-300 outline-none peer' placeholder='' type="text" id='signUpFirstName' name="signUpFirstName" value={signupForm.signUpFirstName} onChange={handleSignUpForm}/>
                                <label className='absolute transition-all duration-300 ease-in-out lg:left-23 top-3 left-18 2xl:left-23 peer-focus:-top-4 peer-focus:text-sm peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm' htmlFor='signUpFirstName'>First name</label>
                                <i className='absolute top-3 left-7 2xl:left-12 lg:left-11'><User size={28} color='black'/></i>
                              </div>
                              
                              <div className='relative mt-5 '>
                                <input className='block px-10 w-[80%] py-2 mx-auto border-b border-gray-300 outline-none peer' placeholder='' type="text" id='signUpLastName' name="signUpLastName" value={signupForm.signUpLastName} onChange={handleSignUpForm}/>
                                <label className='absolute transition-all duration-300 ease-in-out lg:left-23 top-3 left-18 2xl:left-23 peer-focus:-top-4 peer-focus:text-sm peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm' htmlFor='signUpLastName'>Last Name</label>
                                <i className='absolute top-3 left-7 2xl:left-12 lg:left-11'><User size={28} color='black'/></i>
                              </div>

                              <div className='relative mt-5 '>
                                <input className='block px-10 w-[80%] py-2 mx-auto border-b border-gray-300 outline-none peer' placeholder='' type="text" id="signUpEmail" name="signUpEmail" value={signupForm.signUpEmail} onChange={handleSignUpForm}/>
                                <label className='absolute transition-all duration-300 ease-in-out lg:left-23 top-3 left-18 2xl:left-23 peer-focus:-top-4 peer-focus:text-sm peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm' htmlFor='signUpEmail'>Email</label>
                                <i className='absolute top-3 left-7 2xl:left-12 lg:left-11'><Mail size={28} color='black'/></i>
                              </div>

                              <div className='relative mt-5'>
                                <input className='block px-10 w-[80%] py-2 mx-auto border-b border-gray-300 outline-none peer' placeholder='' type={signUpPass ? "text" : "password"} id='signUpPassword' name="signUpPassword" value={signupForm.signUpPassword} onChange={handleSignUpForm}/>
                                <label className='absolute transition-all duration-300 ease-in-out lg:left-25 top-3 left-18 2xl:left-23 peer-focus:-top-4 peer-focus:text-sm peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm' htmlFor='signUpPassword'>Password</label>
                                <i className='absolute top-2 left-7 2xl:left-12 lg:left-11'><Lock size={28} color='black'/></i>
                                <button className='absolute cursor-pointer top-2 right-8 lg:right-13 2xl:right-12' type='button' onClick={() => setSignUpPass(prev => !prev)} title={signUpPass ? "Hide Password" : "Show Password" }> {signUpPass ? <EyeOff   size={28} color='black'/> : <Eye  size={28} color='black'/>}</button>
                              </div>

                              <div className='relative mt-5'>
                                <input className='block px-10 w-[80%] py-2 mx-auto border-b border-gray-300 outline-none peer' placeholder='' type={signUpConfirmPass ? "text" : "password"} id='signUpConfirmPassword' name="signUpConfirmPassword" value={signupForm.signUpConfirmPassword} onChange={handleSignUpForm}/>
                                <label className='absolute transition-all duration-300 ease-in-out lg:left-25 top-3 left-18 2xl:left-23 peer-focus:-top-4 peer-focus:text-sm peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm' htmlFor='signUpConfirmPassword'>Confirm Password</label>
                                <i className='absolute top-2 left-7 2xl:left-12 lg:left-11'><Lock size={28} color='black'/></i>
                                <button className='absolute cursor-pointer top-2 right-8 lg:right-13 2xl:right-12' type='button' onClick={() => setSignUpConfirmPass(prev => !prev)} title={signUpConfirmPass ? "Hide Password" : "Show Password" }> {signUpConfirmPass ? <EyeOff   size={28} color='black'/> : <Eye  size={28} color='black'/>}</button>
                              </div>

                              <div className='px-4 mt-5'>
                                <button type="button" className='w-[90%]  block mx-auto py-2 font-semibold text-white bg-[#0B1120] rounded-md cursor-pointer '>Sign up</button>
                              </div>
                              <h5 className='mt-4 font-semibold text-center'>Already have an account? <button className='text-blue-600 cursor-pointer' type='button' onClick={() => {showSignUp(false), restForm()}}>Login</button></h5>
                            </form>
                        </div>
                      </section>
                    </section>
                </section>
          </section>
      </div>

      <div className={`fixed z-9999999999 cursor-pointer right-12 bottom-6 md:h-12.5 h-8.5 w-8.5 md:w-12.5 flex justify-center items-center rounded-full  duration-300 ease-in-out ${topButton ? "block" : "hidden" }`} onClick={()=> scrollTo("header")}>
      <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
        <ArrowUpIcon />
      </Button>
      </div>
    </div>
    )
  }

  export default HotelReservation;