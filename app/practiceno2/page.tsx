"use client";
"use strict";
import React from "react";
import { useState, useEffect, useRef} from "react";
import { RefObject } from "react";
export default function PracticeNo2() {
  const [showBtn, setShowButton] = useState<boolean>(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > window.innerHeight / 2) {
        setShowButton(true);
      } else {
        setShowButton(false);
      } 
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }


  const scrollToExperiment = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
      <div className="box-border p-0 m-0 bg-white">
        <header>
          <nav className="flex justify-center pt-[2rem]">
            <ul className="text-black font-sans flex gap-[3rem]">
              <li><a href="#" onClick={e => {e.preventDefault(); scrollToExperiment(0);}}>Home</a></li>
              <li><a href="#" onClick={e => {e.preventDefault(); scrollToExperiment(1);}}>About</a></li>
              <li><a href="#" onClick={e => {e.preventDefault(); scrollToExperiment(2);}}>Service</a></li>
              <li><a href="#" onClick={e => {e.preventDefault(); scrollToExperiment(3);}}>Contact</a></li>
            </ul>
          </nav>

          <button className={`text-5xl cursor-pointer fixed bottom-3 right-[1rem] ${showBtn ? 'block' : 'hidden'}`} onClick={scrollToTop} >
            ⬆️
          </button>

         {[0,1,2,3].map((_, index) => (
          <div key={index}
            ref={el => { itemRefs.current[index] = el; }} className={`h-screen ${["bg-white", "bg-pink-50", "bg-lime-50", "bg-purple-50"][index]}` }> </div>
         ))}

        </header>
      </div>
  )
}