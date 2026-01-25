"use client";
"use strict";

import {useState} from "react";
const PracticeNo10 = () => {
const [theme, setTheme] = useState(false);

const [input, setInput] = useState<number | string>('');

const append = (e: string) => {
    if ((e === "+" || e === "-" || e === "*" || e === "/" || e === "=") ) {
        return;
    }

    if (e === "CE") {
        setInput('');
        return;
    }

    if (e === "C" || e === "X") {
        removeLast();
        return;
    }

    if (e === "+/-" && input.toString().length !== 0 ) {
    setInput(pre => {
        const preStr = pre.toString();
        if (preStr.startsWith("-")) {
            return preStr.slice(1);
        } else {
            return "-" + preStr;
        }
    });
    return;
}
    if (e === "=") {
        try {
            setInput(eval(input.toString()).toString());
        } catch (error: unknown ) {
            setInput("Error");
        }
        return;
    }

    setInput(pre => pre + e);
}

function removeLast() {
    setInput((input.toString().slice(0, input.toString().length - 1)));
}

    return (
        <div className={`${theme ? 'bg-white' : 'bg-black'} min-h-screen m-0 p-0 box-border relative transition-all duration-500 ease-in-out`}>
            <header className="w-full flex justify-end items-center gap-3 font-sans pt-[1rem]">
                <p className={`${theme ? 'text-black' : 'text-white'}`}>{theme ? "Dark" : "Light"}</p>
                <label className="relative w-20 mr-10 border border-black rounded-2xl h-9">
                    <input type="checkbox" className="w-0 h-0 opacity-0 peer" onChange={() => setTheme(!theme)}/>
                    <span className={`absolute left-1 top-1 h-7 w-7 ${theme ? 'bg-black' : 'bg-white'} rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-8`}></span>
                </label>
            </header>

            <main className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 h-1/2 w- border border-black ${theme ? 'bg-black' : 'bg-white'} scale-[1.3] grid grid-rows-[50px_1fr] grid-cols-1`}>
                <div className="w-full h-full ">
                    <input type="text" disabled placeholder="0" className={`${theme ? "text-white" : "text-black" } w-full h-full text-right pr-[1rem] text-3xl border-b border-black`} value={input}/>
                </div>

                <section className="grid grid-cols-4 grid-rows-5 ">
                    {['%','CE','C', 'X', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '='].map((element: string, index: number) => (
                        <button key={index} className={`${theme ? "text-white" : "text-black"} cursor-pointer ${theme ? 'hover:bg-[#333333]' : 'hover:bg-[#ccc]'} ${index === 19 ? 'bg-blue-100' : ''}` } onClick={() => append(element)}>{element}</button>
                    ))}
                </section>
            </main>

        </div>
    )
}

export default PracticeNo10;