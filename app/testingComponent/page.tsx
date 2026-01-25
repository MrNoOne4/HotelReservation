"use client";
"use strict";
import React from 'react'
import FlipCard from "@/components/FlipCard"
import  { useState } from "react";
import NavItem from '@/components/NavItem';

const Page = () => {
  
  return (
    <div className='bg-white h-screen w-screen text-black'>
      <nav className='h-24 w-1/2 border mx-auto '>
          <ul className='flex justify-center items-center gap-10'>
              <li><NavItem href='#' label='About me' tooltip={<>
                
                <div className='flex gap-10 text-red-200'>
                  <div>
                    names gun
                  </div>

                  <div>
                    names goo
                  </div>
                </div>
                
                </>}/></li>
              <li><a href="#">Service</a></li>
              <li><a href="#">Contact</a></li>
          </ul>
      </nav>
      
    </div>
  )
}

export default Page
