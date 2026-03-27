"use client";
"use strict";


import React from 'react'
import {useEffect} from "react";

const page = () => {
  let res;
  useEffect(() => {
    const getHotelRoom = async () => {
        try {
           res = await fetch('/api/HotelReservation/getRoomHotel', {
            method: 'GET'
          })

          if (!res.ok) {
              return;
          }

          console.log(res);

        } catch (e) {
          console.error("Someting went Wrong");
        }
    getHotelRoom();

    } 
    getHotelRoom();

  }, [])



  return (
    <div>page</div>
  )
}

export default page