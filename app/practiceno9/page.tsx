"use client";
import Card from "../../components/Card";
import Button from "@/components/Buttons";
import React from "react";
export default function PracticeNo9() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-1/2 w-1/2 grid grid-rows-1 grid-cols-3 gap-4">

          <div className="bg-red-200 rounded-lg border border-gray-300 flex flex-col sm:block">
            <Card
              title="Mountain View"
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTDZ4vKMuO2qKcn9xPfq25DEonRWcKiDt0cw&s"
              description="A beautiful mountain landscape."
              />
              <div className="flex justify-center w-full ">
                  <Button label="Button 1" background="bg-[#000000]" color="text-[#ccc]"></Button>
              </div>            
          </div>

          <div className="bg-red-200 rounded-lg border border-gray-300 flex flex-col">
            <Card
              title="Beach Paradise"
              img="https://images.stockcake.com/public/1/d/2/1d2c7dfe-3a62-485c-8447-bd0c51928b36_large/tropical-beach-paradise-stockcake.jpg"
              description="Relax at the sunny beach."
            />

            <div className="flex justify-center w-full">
                  <Button label="Button 2" background="bg-[#FF0000]" color="text-[#ccc]"></Button>
            </div>

          </div>

          <div className="bg-red-200 rounded-lg border border-gray-300 flex flex-col">
                  <Card
                    title="City Lights"
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3pMOUlDlVNzR19vcTlMQlbba25WbpDAsrQ&s"
                    description="The city that never sleeps."
                  />

            <div className="flex justify-center w-full">
                <Button label="Button 3" background="bg-[#E6E6FA]" color="text-[#ccc]"></Button>
            </div>

          </div>

      </div>
    </div>
  );
}
