"use client";
"use strict";
import React from "react";

type buttonProps = {
    label: React.ReactNode,
    background: string,
    color: string,
    onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({label, background, color, onclick} : buttonProps) => {
    return <button className={`text-md md:text-lg font-[600] p-[0.8rem] border-none cursor-pointer duration-300 ease-in-out ${background} ${color} hover:bg-[#495057] text-left`} onClick={onclick} style={{fontFamily: "Arial, sans-serif"}}>{label}</button>
}

export default Button;