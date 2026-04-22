"use client";
"use strict";

import React, { ChangeEvent, useRef, useState, useEffect } from 'react'
import { ThumbsUp, MessageCircle, Instagram, Send, Facebook, Menu, X, LogIn, User, Mail, UserCircle, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { InputOTPForm } from "@/components/InputOTPForm"
import crypto from "crypto";
import { signIn, useSession, signOut } from "next-auth/react";
import { ArrowUpIcon, Home, Info, Bed, Phone } from "lucide-react"
import { SkeletonCard } from "@/components/SkeletonCard";
import { SpinnerSize } from "@/components/SpinnerSize";
import { AvatarWithBadge } from "@/components/AvatarWithBadge";
import { useRouter } from "next/navigation";
import { ProfileMenu } from "@/components/ProfileMenu";
import ResetPasswordForm from "@/components/ResetPasswordForm";



const HotelReservation = () => {
  const [topButton, setTopButton] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  function scrollTo(section: string) {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
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

  function generateOTP(length = 6): string {
    const digits = "0123456789";
    let otp = "";
    const randomBytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
      otp += digits[randomBytes[i] % 10];
    }

    return otp;
  }

  interface messageProps {
    firstName: string,
    lastName: string,
    email: string
    message: string
  };

  const [message, setMessage] = useState<messageProps>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  interface OTP {
    date: number,
    otp: number
  }

  const [saveOTP, setSaveOTP] = useState<OTP>({
    date: 0,
    otp: 0
  })

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    setMessage((prev) => ({ ...prev, [name]: value }))
  }

interface BedType {
  BedTypeId: number;
  BedName: string;
}

interface RoomType {
  RoomTypeId: number;
  TypeName: string;
  Description: string;
}

interface Amenity {
  AmenityId: number;
  AmenityName: string;
}

interface RoomAmenity {
  RoomAmenityId: number;
  RoomId: number;
  AmenityId: number;
  amenity: Amenity;
}

interface RoomImage {
  ImageId: number;
  RoomId: number;
  ImageURL: string;
}

interface Room {
  RoomId: number;
  RoomNumber: string;
  RoomTypeId: number;
  BedTypeId: number;
  BasePrice: string;
  MaxOccupancy: number;
  Floor: number;
  Description: string;

  bedtype: BedType;
  roomtype: RoomType;
  images: RoomImage[];

  roomamenities: RoomAmenity[];

  amenities: string[];
}


  const [hotelRooms, setHotelRooms] = useState<Room[]>([])

  console.log(hotelRooms);

  const [formForgotPassword, setFormForgotPassword] = useState<boolean>(false);

  hotelRooms.forEach((element, index) => {
    console.log(element);
  })
  

  const [forgotStep, setForgotStep] = useState<"email" | "otp" | "password">("email");
  const [forgotEmail, setForgotEmail] = useState<string>("");
  const [forgotRemainingTime, setForgotRemainingTime] = useState<string>("");
  const [forgotResendOTPBtn, setForgotResendOTPBtn] = useState<boolean>(true);
  const forgotTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getHotelRoom = async () => {
      try {
        const res = await fetch('/api/HotelReservation/HotelRoom', {
          method: 'GET'
        })
        const data: Room[] = await res.json()

        if (!res.ok) {
          toast.warning("Failed to fetch rooms", { position: "top-center" });
          return;
        }

        setHotelRooms(data);
      } catch (e) {
        console.error("Something went wrong");
      }
    }
    getHotelRoom();
  }, [])

  const [showLoginForm, setLoginShowForm] = useState<boolean>(false)
  const [signUp, showSignUp] = useState<boolean>(false);

  interface SignupData {
    fullName: string;
    signUpEmail: string;
    signUpPassword: string;
    signUpConfirmPassword: string;
  }

  const [signupData, setSignupData] = useState<SignupData>({
    fullName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpConfirmPassword: ''
  })

  const [remainingTime, setRemainingTime] = useState<string>("")
  const [resendOTPBtn, setResendOTPBtn] = useState<boolean>(true);
  let timerRef = useRef<NodeJS.Timeout | null>(null);

  function setCountDown(length: number, isForSignup: boolean = true) {
    const storageKey = isForSignup ? "localSaveOtp" : "localForgotSaveOtp";
    const raw = localStorage.getItem(storageKey);
    const localSaveOtp: OTP | null = raw ? JSON.parse(raw) : null;

    // Clear any existing timer
    const ref = isForSignup ? timerRef : forgotTimerRef;
    if (ref.current) {
      clearInterval(ref.current);
    }

    const endTime = localSaveOtp !== null ? localSaveOtp.date : Date.now() + length;

    ref.current = setInterval(() => {
      const remaining = endTime - Date.now();
      const minutes = Math.floor(remaining / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      if (isForSignup) {
        setRemainingTime(timeString);
      } else {
        setForgotRemainingTime(timeString);
      }

      if (remaining <= 0) {
        if (ref.current) {
          clearInterval(ref.current);
        }
        if (isForSignup) {
          setRemainingTime("00:00");
          setResendOTPBtn(false);
        } else {
          setForgotRemainingTime("00:00");
          setForgotResendOTPBtn(false);
        }
      }
    }, 1000);
  }

  let success: boolean | null;

  interface signupForm {
    fullName: string
    signUpEmail: string,
    signUpPassword: string,
    signUpConfirmPassword: string,
  }

  const [signupForm, setSignupForm] = useState<signupForm>({
    fullName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpConfirmPassword: '',
  })

  const signUpReferences = useRef<HTMLDivElement>(null);
  const [otpForm, showOtpForm] = useState<boolean>(true);

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>, data: SignupData) => {
    e.preventDefault();
    setSignupForm(data);

    const req = await fetch('/api/HotelReservation/ValidateEmail', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.signUpEmail, action: "validateEmail" }),
    })

    const result = await req.json();

    if (!result.user) {
      toast.warning(result.message, { position: "top-center" })
      return;
    }

    if (!validateForm(data)) {
      return;
    }

    sendUserVerificationCode(data);

    if (!success) {
      return;
    }
  }

  async function sendUserVerificationCode(data: SignupData) {
    const otp = generateOTP();
    const duration = 2 * 60 * 1000;

    setSaveOTP({
      date: Date.now() + duration,
      otp: Number(otp)
    });

    localStorage.setItem("localSaveOtp", JSON.stringify({ date: Date.now() + duration, otp: Number(otp) }));

    setSignupData(data)
    showOtpForm(false);
    setResendOTPBtn(true);
    setCountDown(duration, true);
    success = await sendOTP(data, otp);
  }

  const sendOTP = async (data: SignupData, otp: string) => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.signUpEmail,
        message: `${otp}`,
      }),
    });

    toast.info("OTP has been sent to your email", { position: "top-center" });

    let userData;

    try {
      userData = await res.json();
    } catch {
      userData = { message: "Invalid server response" };
    }

    if (!res.ok) {
      toast.warning(userData.message, { position: "top-center" });
      return false;
    }

    return true;
  };

  async function sendUserForgotOtp(email: string) {
    const otp = generateOTP();
    const duration = 2 * 60 * 1000;

    localStorage.setItem(
      "localForgotSaveOtp",
      JSON.stringify({ date: Date.now() + duration, otp: Number(otp) })
    );

    setForgotResendOTPBtn(true);
    setCountDown(duration, false);

    const res = await fetch("/api/sendForgotOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: "mathewdemesa1@gmail.com", 
        message: `${otp}` 
      }),
    });


    let userData;
    try {
      userData = await res.json();
    } catch {
      userData = { message: "Invalid server response" };
    }

    if (!res.ok) {
      toast.warning(userData.message,  { position: "top-center" });
      return false;
    }

      toast.info("OTP has been sent to your email", { position: "top-center" });

    return true;
  }

  const handleForgotEmailSubmit = async (email: string) => {
    if (!email) {
      toast.warning("Please enter your email address.", { position: "top-center" });
      return;
    }

    const findUser = await fetch (`/api/Validator?email=${encodeURIComponent(email)}`)
    
    const data = await findUser.json();

    if (!data.found) {
         toast.warning(data.message || "Failed to reset password.", { position: "top-center" });
         return;
    }
    

    setForgotEmail(email);
    const sent = await sendUserForgotOtp(email);
    if (sent) {
      setForgotStep("otp");
    }
  };

  const handleForgotOTPSubmit = (enteredOtp: string) => {
    const raw = localStorage.getItem("localForgotSaveOtp");
    const localSaveOtp: OTP | null = raw ? JSON.parse(raw) : null;
    const currentTime = Date.now();

    if (!localSaveOtp) {
      toast.warning("No OTP found. Please request a new one.", { position: "top-center" });
      return;
    }

    if (currentTime > localSaveOtp.date) {
      toast.warning("This verification code has expired. Please resend.", { position: "top-center" });
      return;
    }

    if (Number(enteredOtp) !== localSaveOtp.otp) {
      toast.warning("Incorrect OTP. Please try again.", { position: "top-center" });
      return;
    }

    if (forgotTimerRef.current) clearInterval(forgotTimerRef.current);
    localStorage.removeItem("localForgotSaveOtp");
    toast.success("OTP verified! Please set your new password.", { position: "top-center" });
    setForgotStep("password");
  };

  const handleForgotPasswordSubmit = async (newPassword: string, confirmPassword: string) => {
    if (!newPassword || !confirmPassword) {
      toast.warning("Please fill in both password fields.", { position: "top-center" });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match!", { position: "top-center" });
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      toast.warning(
        "Password must contain at least 8 characters, 1 uppercase, 1 number, and 1 special character.",
        { position: "top-center" }
      );
      return;
    }



    const res = await fetch('/api/ResetPassword', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: forgotEmail,
        newPassword: newPassword,
        confirmNewPassword: confirmPassword
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.warning(result.message || "Failed to reset password.", { position: "top-center" });
      return;
    }

    toast.success("Password reset successfully! Please log in.", { position: "top-center" });

    setFormForgotPassword(false);
    setForgotStep("email");
    setForgotEmail("");
    setForgotRemainingTime("");
    setLoginShowForm(true);
  };
  
  const [spinAnimation, setSpinAnimation] = useState<boolean>(false);

  const handleClick = (element: Room) => {
    if (!session) {
      setLoginShowForm(true);
    } else {
      router.push(`/rooms/${element.RoomId}`);
    }
  };

  const sendMessages = async (e: React.FormEvent<HTMLFormElement>, data: messageProps) => {
    e.preventDefault();
    setSpinAnimation(true);

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const userData = await res.json();

      if (!res.ok) {
        toast.warning(userData.message || "Something went wrong", { position: "top-center" });
        return;
      }

      setMessage({ firstName: '', lastName: '', email: '', message: '' });
      toast.success("Message has been successfully sent!", { position: "top-center" });

    } catch (error) {
      toast.error("Server error. Please try again.", { position: "top-center" });

    } finally {
      setSpinAnimation(false);
    }
  };

  const validateForm = (data: SignupData): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (data.signUpPassword !== data.signUpConfirmPassword) {
      toast.warning("Passwords do not match!", { position: "top-center" });
      return false;
    }

    if (data.signUpPassword.length < 8 || data.signUpConfirmPassword.length < 8) {
      toast.warning("Password must contain at least 8 letters", { position: "top-center" });
      return false;
    }

    if (!passwordRegex.test(data.signUpPassword)) {
      toast.warning("Password must contain at least 8 letters, 1 number, 1 special character, 1 uppercase, and 1 lowercase letter", { position: "top-center" });
      return false;
    }

    return true;
  }

  const OTPhandleSubmit = async (e: React.FormEvent<HTMLFormElement>, data: string) => {
    e.preventDefault();
    const raw = localStorage.getItem("localSaveOtp");
    const localSaveOtp: OTP | null = raw ? JSON.parse(raw) : null;
    const getCurrentTime = Date.now();

    if (!localSaveOtp) {
      toast.warning("No OTP found. Please request a new one.");
      return;
    }
    if (getCurrentTime > localSaveOtp.date) {
      toast.warning("This verification code has expired. Please resend.");
      return;
    }
    if (Number(data) !== localSaveOtp.otp) {
      toast.warning("Incorrect OTP. Please try again.");
      return;
    }

    toast.info("Verification successful! Creating your account...", { position: "top-center" });
    localStorage.clear();
    setLoginShowForm(false);
    showOtpForm(true);
    showSignUp(false);
    setRemainingTime("00:00");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const insert = await fetch('/api/HotelReservation/SignUpAccount', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userFullName: signupForm.fullName,
        userEmail: signupForm.signUpEmail,
        userPassword: signupForm.signUpPassword
      })
    })

    const result = await insert.json();
    if (!insert.ok) {
      toast.warning(result.message, { position: "top-center" });
      return;
    }

    await signIn("credentials", {
      email: signupForm.signUpEmail,
      password: signupForm.signUpPassword,
      callbackUrl: window.location.href
    })
  }

  // loading state
  if (status === "loading") {
    return (
      <div className='flex justify-center items-center h-screen'>
        <SkeletonCard />
      </div>
    )
  }

  return (
    <div className='box-border p-0 m-0 font-sans bg-[#F8FAFC] overflow-x-auto snap-x snap-mandatory scroll-smooth'>

      <header className={`flex flex-col mt-4 text-let px-0 py-5 ml-3 transition-all duration-300 ease-in-out md:mb-5 mb-5  2xl:mb-0 lg:px-10 2xl:px-40 lg:flex-row lg:items-center lg:justify-evenly lg:ml-0 pb- ${menu ? 'h-70' : 'h-15'} lg:h-auto`} id='header'>
        {/* Logo Section */}
        <div className='flex items-center justify-between mt-3'>
          <h1 className='text-2xl lg:text-3xl text-[#a44a23] font-semibold mb-4'>Nova Stay</h1>
          <button className='block mb-5 mr-3 cursor-pointer lg:hidden' onClick={() => setMenu(prev => !prev)}>{menu ? <X size={28} color="black" strokeWidth={2} /> : <Menu size={28} color="black" strokeWidth={2} />}</button>
        </div>

        {/* Navigation Bar Section */}
        <nav className='font-medium lg:text-xl text-md'>
          <ul className='flex flex-col gap-3 text-left text-black lg:gap-10 lg:flex-row'>
            <li><a className='flex items-center justify-start gap-1 mt-2 lg:mt-0 lg:justify-center cursor-pointer' onClick={() => scrollTo("heroSection")}><Home size={20} />Home</a></li>
            <li><a className='flex items-center justify-start gap-1 mt-2 lg:mt-0 lg:justify-center cursor-pointer' onClick={() => scrollTo("aboutUs")}><Info size={20} />About</a></li>
            <li><a className='flex items-center justify-start gap-1 mt-2 lg:mt-0 lg:justify-center cursor-pointer' onClick={() => scrollTo("hotelRooms")}><Bed size={20} />Hotel Rooms</a></li>
            <li><a className='flex items-center justify-start gap-1 mt-2 lg:mt-0 lg:justify-center cursor-pointer' onClick={() => scrollTo("contact")}><Phone size={20} />Contact</a></li>
          </ul>
        </nav>

        {/* Login Section */}
        {session ?
          <span className='-translate-x-3 mt-4'>
            <ProfileMenu avatar={<AvatarWithBadge avatar={`${session?.user?.image}`} className='text-black' name={session?.user?.name?.split(",")[0]} />} profile={() => router.push("/profile")} billing={() => router.push("/booking")}  logout={() => signOut({ callbackUrl: window.location.href })} />
          </span>
          :
          <button className='flex  items-center justify-center w-1/3 gap-2 px-4 py-1 mt-4 mb-3 font-semibold text-white bg-black rounded-md cursor-pointer lg:py-2 lg:w-auto' onClick={() => setLoginShowForm(true)}><LogIn size={20} color='white' /> Login</button>
        }
      </header>

      <section className="relative" id='heroSection'>
        <section className='flex items-center justify-center h-screen text-white bg-fixed bg-center bg-cover backdrop-blur-xs' style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url('/images/hero.jpeg')` }}>
          <article className='flex flex-col items-center justify-center w-full min-h-screen px-4 tracking-wide text-center text-white sm:px-6 md:px-8 lg:px-16'>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl md:mb-6">
              Welcome to Nova Stay
            </h1>
            <h6 className="max-w-xl text-sm sm:text-base md:text-lg lg:text-xl">
              Step into a space designed to make every moment memorable, whether you're here to relax, explore, or celebrate. Your perfect stay begins here – let us take care of the rest.
            </h6>
            <button className='px-6 py-4 mt-6 font-semibold text-white rounded-md cursor-pointer bg-black/50' onClick={() => scrollTo("aboutUs")}>Explore More</button>
          </article>
        </section>
      </section>

      <section className='bg-[#171717]'>
        {/* About us Section */}
        <section className='relative w-[90%] px-4 py-6 text-black -translate-x-1/2 bg-fixed bg-center bg-cover sm:px-0 md:py-0  top-1/2 left-1/2 -translate-y-15 lg:-translate-y-30 bg-white/50 md:w-auto lg:w-[90%] 2xl:w-1/2 2xl:-translate-y-27' id='aboutUs'>
          <article className='w-full p-0 text-center text-white md:p-15'>
            <h1 className="mb-5 text-2xl font-semibold text-center md:text-5xl">
              About Us
            </h1>
            <h6 className="text-xs tracking-normal md:tracking-wide md:text-sm 2xl:text-xl">
              Our hotel is a sanctuary where comfort, elegance, and personalized service come together to create an unforgettable experience. Every room is thoughtfully designed to provide relaxation and style, while every detail—from check-in to departure—is crafted to make guests feel cared for. Whether visiting for leisure, business, or a special occasion, guests can enjoy seamless service, warm hospitality, and an atmosphere that inspires calm and enjoyment. Here, it's more than a stay—it's a place to make memories, celebrate life's moments, and feel truly at home.
            </h6>
          </article>
        </section>

        <section className='md:px-20 px-10 text-white'>
          <div className='mx-auto'>
            <h1 className='my-6 text-3xl text-center md:text-5xl'>Book direct to enjoy a full 24-hour stay — guaranteed!</h1>
            <h6 className='text-sm text-center'>All our generously appointed guest rooms offer the ultimate luxury, privacy and comfort.</h6>
          </div>

          {/* Card Container */}
          <div
            className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            id="hotelRooms"
          >
            {
              hotelRooms.map((element: Room, index: number) => (
                <article key={`${element.RoomId}_${index}`}>
                  <Card className="sm:max-w-md w-full pt-0 h-full">
                    <CardContent className="px-0 overflow-hidden">
                      <img
                        src={element.images?.[0]?.ImageURL || "/images/fallback.jpg"}
                        alt="Banner"
                        className="object-cover aspect-video h-70 rounded-t-xl transition-all duration-600 ease-in-out hover:scale-[1] scale-[1.2] shadow-2xl"
                      />
                    </CardContent>
                    <CardHeader>
                      <CardTitle>
                        <strong className='text-lg md:text-2xl font-semibold'>{element.roomtype?.TypeName}</strong>
                      </CardTitle>
                      <CardDescription className='text-sm'>{element.Description}</CardDescription>
                    </CardHeader>
                    <hr className="bg-black" />
                    <CardFooter className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
                      <CardTitle className="mt-2 text-lg font-bold">
                        {element.BasePrice} PHP/night
                      </CardTitle>
                      <Button variant={"outline"} className="cursor-pointer" onClick={() => handleClick(element)}>
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </article>
              ))
            }
          </div>
        </section>
      </section>

      <section id='contact' className='block w-full py-9 bg-[#f0dbd3] 2xl:px-80 px-5'>
        <section className='flex justify-between gap-10 pb-4 mx-auto text-black bg-white lg:py-40 lg:px-40 sm:gap-8 md:gap-6 lg:gap-10 2xl:gap-2'>
          {/* get in touch section */}
          <div className='hidden lg:block'>
            <div className='flex flex-col gap-6 tracking-wide'>
              <h1 className='text-5xl text-[#a65129] font-semibold'>Get in Touch</h1>
              <h5 className='text-xl text-[#a65129]'>We like to hear from you!</h5>
              <small>if you have any inquiries or just want to <br /> say hi, please use the contact form!</small>
            </div>
            <div className='flex mt-15'>
              <span className='flex mr-4'><ThumbsUp size={40} /></span>
              <span className='flex gap-2'>
                <span className='flex items-center justify-center px-3 bg-black rounded-full cursor-pointer'><Instagram size={20} color="white" /></span>
                <span className='flex items-center justify-center px-3 bg-black rounded-full cursor-pointer'><Facebook size={20} color="white" /></span>
                <span className='flex items-center justify-center px-3 bg-black rounded-full cursor-pointer'><Send size={20} color="white" /></span>
                <span className='flex items-center justify-center px-3 bg-black rounded-full cursor-pointer'><MessageCircle size={20} color="white" /></span>
              </span>
            </div>
          </div>

          {/* get in form section */}
          <div className='block mx-auto lg:mx-0'>
            <div className="flex-col items-center justify-center block p-4 space-y-2 lg:hidden">
              <h1 className='text-4xl text-center'>Message us</h1>
              <p className="text-center text-gray-700">We'd love to hear your thoughts!</p>
            </div>

            <form method='POST' onSubmit={(e) => sendMessages(e, message)}>
              <div className='flex flex-col gap-8 lg:flex-row'>
                <div className='flex flex-col ml-3 lg:w-full lg:ml-0'>
                  <label>First Name</label>
                  <div className='relative'>
                    <input type="text" className='py-1 border w-[90%] lg:w-full lg:ml-0 pl-10' value={message.firstName} name='firstName' onChange={handleMessageChange} />
                    <span className='absolute top-0 left-0 p-1'><User size={25} /></span>
                  </div>
                </div>

                <div className='flex flex-col ml-3 lg:w-full lg:ml-0'>
                  <label>Last Name</label>
                  <div className='relative'>
                    <input type="text" className='py-1 border w-[90%] lg:w-full lg:ml-0 pl-10' value={message.lastName} name='lastName' onChange={handleMessageChange} />
                    <span className='absolute top-0 left-0 p-1'><User size={25} /></span>
                  </div>
                </div>
              </div>

              <div className='mt-6 ml-3 lg:ml-0'>
                <label>Email *</label>
                <div className='relative'>
                  <input type="email" className='py-2 border w-[90%] lg:w-full lg:ml-0 pl-10' value={message.email} name='email' onChange={handleMessageChange} />
                  <span className='absolute p-1 left-1 top-1'><Mail size={25} /></span>
                </div>
              </div>

              <div className='flex flex-col mt-6 ml-3 lg:ml-0'>
                <label>Message</label>
                <textarea rows={5} cols={40} className='border w-[90%] lg:w-full' value={message.message} name='message' onChange={handleMessageChange}></textarea>
              </div>

              <div className='mt-3 text-center'>
                <button className='bg-[#a44a23] cursor-pointer text-white px-11 py-2 self-center lg:self-end flex gap-2 items-center mx-auto' type='submit'><Send size={20} color='white' /> Send</button>
              </div>
            </form>
          </div>
        </section>
      </section>


      <div className={`fixed flex items-center justify-center h-screen w-full bg-black/50 backdrop-blur-xs inset-0 ${showLoginForm ? "z-40" : "z-[-1]"}`}>
        <section className='lg:w-[90%] will-change-transform 2xl:w-250 z-9999999 perspective-[1000px] group w-full'>
          <section className={`inset-0 relative w-full h-full transition-all ease-in-out duration-600 transform-3d ${signUp ? "rotate-y-180" : "rotate-y-0"} ${showLoginForm ? "top-0" : "-top-200"}`}>
            <section className='absolute flex items-center justify-center w-full h-full backface-hidden'>
              <div className="sm:max-w-sm">
                <LoginForm
                  onSubmit={async (e, data) => {
                    e.preventDefault();
                    const res = await signIn("credentials", { email: data.email, password: data.password, redirect: false })
                    if (res?.error) {
                      toast.warning(res.error || "Something went wrong", { position: "top-center" });
                      return;
                    } else {
                      toast.success("Logged in successfully!", { position: "top-center" })
                      setLoginShowForm(false);
                    }
                  }}
                  switchTo={() => { showSignUp(true) }}
                  closeForm={() => { setLoginShowForm(false); showSignUp(false); }}
                  loginFacebook={() => signIn("facebook", { callbackUrl: window.location.href, redirect: true })}
                  loginGoogle={() => signIn("google", { callbackUrl: window.location.href, redirect: true })}
                  forgotPassword={() => { setFormForgotPassword(true); setLoginShowForm(false); }}
                />
              </div>
            </section>

            {/* Sign up form */}
            <section className={`w-full inset-0 rotate-y-180 backface-hidden flex items-center justify-center h-full`} ref={signUpReferences}>
              <section className='flex items-center justify-center w-full h-full backface-hidden'>
                <div className="w-full h-full sm:max-w-sm">
                  {otpForm ?
                    <SignupForm
                      onSubmit={(e, data) => handleSignupSubmit(e, data)}
                      closeForm={() => { setLoginShowForm(false); showSignUp(false); }}
                      switchTo={() => { showSignUp(false) }}
                    />
                    :
                    <div className='fixed inset-0 flex items-center justify-center'>
                      <InputOTPForm
                        onSubmit={(e, data) => OTPhandleSubmit(e, data)}
                        resendOTP={() => sendUserVerificationCode(signupData)}
                        cancel={() =>  {
                          showOtpForm(true);
                        }}
                        email={signupData.signUpEmail}
                        time={remainingTime}
                        resendBtn={resendOTPBtn}
                      />
                    </div>
                  }
                </div>
              </section>
            </section>
          </section>
        </section>
      </div>

      <div className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs ${spinAnimation ? 'z-999999999999999999999' : 'z-[-1]'}`}>
        <SpinnerSize />
      </div>

      <div className={`fixed z-99999 cursor-pointer right-12 bottom-6 md:h-12.5 h-8.5 w-8.5 md:w-12.5 flex justify-center items-center rounded-full duration-300 ease-in-out ${topButton ? "block" : "hidden"}`} onClick={() => scrollTo("header")}>
        <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
          <ArrowUpIcon />
        </Button>
      </div>

      {formForgotPassword && (
        <div className='w-full h-screen flex justify-center items-center fixed inset-0 bg-black/50 backdrop-blur-xs z-0'>

          {forgotStep === "email" && (
              <ResetPasswordForm
                onSubmit={(e, data) => {
                  e.preventDefault();
                  handleForgotEmailSubmit(data.email);
                }}

                closeForm={() => {
                  setFormForgotPassword(false);
                  setForgotStep("email");
                  setForgotEmail("");
                }}

                switchTo={() => {
                  setFormForgotPassword(false);
                  setLoginShowForm(true);
                }}
              />
            )
          }

          {forgotStep === "otp" && (
            <div className='fixed inset-0 flex items-center justify-center'>
              <InputOTPForm
                onSubmit={(e, otp) => {handleForgotOTPSubmit(otp);}}
                cancel={() =>  {
                  setFormForgotPassword(false);
                  setForgotStep("email");
                  setForgotEmail("");
                }}
                resendOTP={() => sendUserForgotOtp(forgotEmail)}
                email={forgotEmail}
                time={forgotRemainingTime}
                resendBtn={forgotResendOTPBtn}
              />
            </div>
          )}

          {forgotStep === "password" && (
            <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-sm flex flex-col gap-5'>
              <h2 className='text-2xl font-semibold text-center text-[#a44a23]'>Set New Password</h2>
              <p className='text-sm text-center text-gray-500'>Enter and confirm your new password below.</p>

              <NewPasswordForm
                onSubmit={handleForgotPasswordSubmit}
                onCancel={() => {
                  setFormForgotPassword(false);
                  setForgotStep("email");
                  setForgotEmail("");
                }}
              />
            </div>
          )}

        </div>
      )}
    </div>
  )
}


interface NewPasswordFormProps {
  onSubmit: (newPassword: string, confirmPassword: string) => void;
  onCancel: () => void;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onSubmit, onCancel }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(newPassword, confirmPassword);
      }}
      className='flex flex-col gap-4'
    >
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium'>New Password</label>
        <div className='relative'>
          <span className='absolute left-2 top-1/2 -translate-y-1/2'><Lock size={18} /></span>
          <input
            type={showNew ? "text" : "password"}
            className='w-full border rounded pl-8 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#a44a23]'
            placeholder='New password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type='button'
            className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500'
            onClick={() => setShowNew(prev => !prev)}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium'>Confirm Password</label>
        <div className='relative'>
          <span className='absolute left-2 top-1/2 -translate-y-1/2'><Lock size={18} /></span>
          <input
            type={showConfirm ? "text" : "password"}
            className='w-full border rounded pl-8 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#a44a23]'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type='button'
            className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500'
            onClick={() => setShowConfirm(prev => !prev)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <p className='text-xs text-gray-400'>
        Min 8 characters · 1 uppercase · 1 number · 1 special character (!@#$%^&*)
      </p>

      <button
        type='submit'
        className='bg-[#a44a23] text-white py-2 rounded font-semibold cursor-pointer hover:bg-[#8c3d1d] transition-colors'
      >
        Reset Password
      </button>

      <button
        type='button'
        onClick={onCancel}
        className='text-sm text-gray-500 underline cursor-pointer text-center'
      >
        Cancel
      </button>
    </form>
  );
};

export default HotelReservation;