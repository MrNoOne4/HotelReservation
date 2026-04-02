import React from 'react'

const Footer = () => {
  return (
                <footer className=" bg-[#222431] w-full mt-0 pt-20  ">
                  <div className={`h-full w-[60%] mx-auto text-white`}>
                    <h1 className="text-2xl font-bold text-center">Nova Stay</h1>
                    <section className="grid w-full h-full grid-cols-2 gap-4 pt-16 md:grid-cols-3 lg:grid-cols-4">
                      <div className="flex flex-col gap-4 text-sm lg:text2xl">
                        <div>
                          <h1 className="text-lg lg:text-2xl">Community</h1>
                          <ul className="text-[#ccc]">
                            <li className="cursor-pointer mt-1.5">Guest Stories</li>
                            <li className="cursor-pointer mt-1.5">Travel Tips & Guides</li>
                            <li className="cursor-pointer mt-1.5">Hotel Reviews</li>
                            <li className="cursor-pointer mt-1.5">Loyalty Program</li>
                          </ul>
                        </div>

                        <div>
                          <h1 className="text-lg lg:text-2xl">Resources</h1>
                          <ul className="text-[#ccc]">
                            <li className="cursor-pointer mt-1.5">Room Types & Amenities</li>
                            <li className="cursor-pointer mt-1.5">Dining & Menu Guides</li>
                            <li className="cursor-pointer mt-1.5">Spa & Wellness Services</li>
                            <li className="cursor-pointer mt-1.5">Special Offers</li>

                          </ul>
                        </div>

                      </div>

                      <div className="flex flex-col gap-4 text-sm lg:text2xl">
                        <h1 className="mb-0 text-lg lg:text-2xl">Services</h1>
                        <ul className="text-[#ccc] cursor-pointer">
                          <li className="mb-1">Book a Stay</li>
                          <li className="cursor-pointer">Event & Conference Hosting</li>
                          <li className="cursor-pointer">Airport Transfers</li>
                          <li className="cursor-pointer">Custom Packages</li>
                          <li className="mb-2 cursor-pointer">Education</li>
                          <li className="mb-2 cursor-pointer">Find an Account</li>
                          <li className="cursor-pointer">Find a Partner</li>
                          <li className="cursor-pointer">Become a Partner</li>

                        </ul>
                      </div>

                      <div className="text-sm lg:text2xl">
                        <h1 className="mb-0 text-lg lg:text-2xl">About us</h1>
                        <ul className="text-[#ccc] cursor-pointer">
                          <li className="mb-1">Our Story</li>
                          <li className="cursor-pointer">Brand & Values</li>
                          <li className="cursor-pointer">Contact Information</li>
                          <li className="mb-2 cursor-pointer">Blog & News</li>

                        </ul>
                      </div>

                      <div className="flex flex-col gap-4 ">
                        <h1 className="mb-1 text-lg lg:text-2xl">Contact us</h1>
                        <ul className="text-[#ccc] cursor-pointer">
                          <li className="cursor-pointer">+69123456789</li>
                          <li className="cursor-pointer">1234 Stocklytics St.</li>
                        </ul>

                        <h1>INQUIRES</h1>
                        <p className="mb-1 text-sm cursor-pointer">theMan@gmail.com</p>

                        <h1>CAREERS</h1>
                        <p className="cursor-pointer">Dream@halo-lab.team</p>
                      </div>

                    </section>
                  </div>
                  <footer className="w-full h-12 bg-[#1b1c26] mt-8 flex items-center justify-center text-white">
                    <h1 className="text-sm text-center"> © 2026 Nova Stay - Group-5. All rights reserved. </h1>
                  </footer>
                </footer>
  )
}

export default Footer