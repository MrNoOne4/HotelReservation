"use strict";
"use client";
import { useState } from "react";

const practiceNo3 = () => {
  const [divs, setDivs] = useState ([
    { id: 1, text: "1", color: "bg-pink-500" },
    { id: 2, text: "2", color: "bg-blue-500" },
    { id: 3, text: "3", color: "bg-indigo-300" },
  ]);

  function move(index: number, direction: "up" | "down") {
    setDivs(prevDiv => {
      const children = [...prevDiv];
      if (direction === "up" && index > 0) {
        [children[index - 1], children[index]] = [children[index], children[index - 1]];
      } else if (direction === "down" && index < children.length - 1) {
        [children[index + 1], children[index]] = [children[index], children[index + 1]];
      }

      return children;
    })
  }
  return(
    <div className="m-0 p-0 box-border bg-white h-screen flex items-center justify-center">
       <div>
          {divs.map((_, index) => (
            <div key={index} className={`w-32 h-32 m-4 flex gap-[1rem] items-center justify-center text-white text-2xl font-bold ${divs[index].color} transition-all transtion-duration-500 transition`}>
              {divs[index].text}
              <button className="cursor-pointer" onClick={e => {
                e.preventDefault();
                move(index, "up");
              }}> ↑ </button>
              <button className="cursor-pointer" onClick={e => {
                e.preventDefault();
                move(index, "down");
              }}> ↓ </button>
            </div>
        ))}
       </div>
    </div>
  )
}

export default practiceNo3;