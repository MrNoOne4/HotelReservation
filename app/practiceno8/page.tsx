"use client";
"use strict";
import {useState} from "react";
const finalProject = () => {
    const [visibility, setVisibility] = useState<boolean>(false);
    return (
        <div className="m-0 p-0 box-border flex h-screen bg-[linear-gradient(135deg,#301414,#383557,#40693d)] text-base font-sans" style={{fontSize: "16px", fontFamily: "Arial, sans-serif, Helvetica"}}>
            <div className={`mx-auto my-auto w-[12rem] ${visibility ? 'h-[23rem]' : 'h-[18rem]'} relative bg-white overflow-hidden transition-all duration-700 transform scale-[2]`} style={{ perspective: '1000px' }}>
                    <div className="w-full h-full relative transition-transform duration-700" style={{  transformStyle: 'preserve-3d', transform: visibility ? 'rotateY(180deg)' : 'rotateY(0deg)',}}>
                        <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                                    <div className="w-full h-full duration-[0.8s] transition-all ease-out [backface-visibility:hidden] "  >
                                            <form action="login.php" method="POST" name="LoginForm" className="text-black">
                                                <h1 className="text-center mt-[2rem] mb-[1.25rem] font-bold" style={{fontSize: "1.5625rem"}}>Login</h1>
                                                <div className="block mt-[1.5625rem]  ">
                                                    <input type="text" id="name" name="name" placeholder=" " required className="peer pt-[0.3125rem] pr-[1.875rem] pb-[0.3125rem] pl-[0.3125rem] w-[90%] ml-[0.625rem] border-b border-black bg-transparent outline-none" style={{ fontSize: "0.8em" }}></input>
                                                    <label  className="transition-all duration-[0.8s] ease-out absolute left-[0.5rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-translate-y-2 -translate-y-2 translate-x-[5px] text-[10px]  " htmlFor="name" style={{fontSize: "0.625rem", color: "black"}}>Name</label>
                                                </div>

                                                <div className="block mt-[1.5625rem]">
                                                    <input type="password" id="loginPassword" name="loginPassword" placeholder=" " required className="peer pt-[0.3125rem] pr-[1.875rem] pb-[0.3125rem] pl-[0.3125rem] w-[90%] ml-[0.625rem] border-b border-black bg-transparent outline-none" style={{ fontSize: "0.8em" }}></input>
                                                    <label  className="transition-all duration-[0.8s] ease-out absolute left-[0.5rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-translate-y-2 -translate-y-2 translate-x-[5px] text-[10px]  " htmlFor="loginPassword" style={{fontSize: "0.625rem", color: "black"}}>Password</label>
                                                </div>

                                                <button type="submit" name="buttonType" value="Login" className="w-[80%] block mx-auto mt-[1.25rem] pb-[1.50rem] bg-red-500 border border-black h-[1rem] cursor-pointer text-white font-bold">Login</button>
                                                <div className="text-center mt-[0.625rem]">
                                                    <p className="cursor-pointer bg-transparent border-none " style={{fontSize: "0.625rem"}} >Not a member? <span><button  className="cursor-pointer bg-transparent border-none text-[#ccc]" style={{fontSize: "0.625rem"}} onClick={e => {e.preventDefault(), setVisibility(!visibility)}} type="button" >Sign up</button></span></p>
                                                </div>
                                            </form>
                                    </div>
                                </div>
                                <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} >
                                        <div className={`h-full w-full transition-all ease-out transform rotateY-[180deg] [backface-visibility:hidden] ${visibility ? 'transform rotateY-[180deg]' : 'transform rotateY-[0deg]'}`} >
                                            <form action="login.php" method="POST" name="SignUpForm" className="text-black">
                                                <h1 className="text-center mt-[2rem] mb-[1.25rem]" style={{fontSize: "1.5625rem"}}>Register</h1>
                                                <div className="block mt-[1.5625rem] text-black">
                                                    <input type="text" id="SignUpName" name="SignUpName" placeholder=" " required className="peer pt-[0.3125rem] pr-[1.875rem] pb-[0.3125rem] pl-[0.3125rem] w-[90%] ml-[0.625rem] border-b border-black bg-transparent outline-none" style={{ fontSize: "0.8em" }} ></input>
                                                    <label  className="transition-all duration-[0.8s] ease-out absolute left-[0.5rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-translate-y-2 -translate-y-2 translate-x-[5px] text-[10px]  " htmlFor="SignUpName"  style={{fontSize: "0.625rem"}}>Name</label>
                                                </div>

                                                <div className="block mt-[1.5625rem] text-black">
                                                    <input type="email" id="email" name="Email" placeholder=" " required className="peer pt-[0.3125rem] pr-[1.875rem] pb-[0.3125rem] pl-[0.3125rem] w-[90%] ml-[0.625rem] border-b border-black bg-transparent outline-none" style={{ fontSize: "0.8em" }}></input>
                                                    <label  className="transition-all duration-[0.8s] ease-out absolute left-[0.5rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-translate-y-2 -translate-y-2 translate-x-[5px] text-[10px]  " htmlFor="email"  style={{fontSize: "0.625rem"}}>Email</label>
                                                </div>

                                                <div className="block mt-[1.5625rem]  text-black">
                                                    <input type="password" id="SignUpPassword" name="SignUpPassword" placeholder=" " required
                                                        className="peer pt-[0.3125rem] pr-[1.875rem] pb-[0.3125rem] pl-[0.3125rem] w-[90%] ml-[0.625rem] border-b border-black bg-transparent outline-none" style={{ fontSize: "0.8em" }}></input>
                                                    <label className="transition-all duration-[0.8s] ease-out absolute left-[0.5rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-translate-y-2 -translate-y-2 translate-x-[5px] text-[10px]  " htmlFor="loginPassword" style={{fontSize: "0.625rem"}}>Password</label>
                                                </div>
                                                <div className="block mt-[1.5625rem] text-black">
                                                    <input type="password" id="SignUpPasswordOne" name="SignUpPasswordOne" placeholder=" " required className="peer pt-[0.3125rem] pr-[1.875rem] pb-[0.3125rem] pl-[0.3125rem] w-[90%] ml-[0.625rem] border-b border-black bg-transparent outline-none" style={{ fontSize: "0.8em" }}></input>
                                                    <label  className="transition-all duration-[0.8s] ease-out absolute left-[0.5rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-translate-y-2 -translate-y-2 translate-x-[5px] text-[10px]  " htmlFor="loginPassword" style={{fontSize: "0.625rem"}}>Confirm Password</label>
                                                    <p className="ml-[1.6rem] text-red-500 text-[0.5em] transform translate-y-[5px]" style={{fontFamily: "Times New Roman, Times, serif"}}></p>
                                                </div>
                                                <button type="submit" name="buttonType" value="Signup" className="cursor-pointer w-[80%] block mx-auto mt-[1.25rem] pb-[1.50rem] bg-red-500 border border-black h-[1.25rem] text-white font-bold">Sign up</button>
                                                <div className="text-center mt-[0.625rem]">
                                                    <p  className="cursor-pointer bg-transparent border-none "style={{fontSize: "0.625rem"}} >Have an Account? <span><button className="cursor-pointer bg-transparent border-none text-[#ccc]" style={{fontSize: "0.625rem"}} onClick={e => {e.preventDefault(), setVisibility(!visibility)}} type="button" >Sign up</button></span></p>
                                                </div>
                                            </form>
                                    </div>
                                </div>
                         </div>
                </div>
        </div>
    )
}


export default finalProject;

