import React from "react";

type CardProps = {
  title: React.ReactNode;
  img: string;
  description: string;
};

export default function Card({ title, img, description }: CardProps) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-white tracking-wide shadow-sm w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
      
      <img
        src={img}
        alt={typeof title === "string" ? title : "card image"}
        className="
          w-full 
          h-40 
          sm:h-48 
          md:h-56 
          lg:h-64 
          object-contain
        "
      />

      <div className="flex flex-col items-center justify-between p-4 sm:p-5 md:p-6 flex-1">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-center text-black">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-black text-center leading-relaxed">
            {description}
          </p>
        </div>
        

        <button
          className="
            mt-4 sm:mt-6
            px-4 sm:px-5
            py-2
            text-sm sm:text-base
            bg-blue-500
            text-white
            rounded
            hover:bg-blue-600
            transition-colors cursor-pointer
          "
        >
          Buy
        </button>
      </div>
    </div>
  );
}
