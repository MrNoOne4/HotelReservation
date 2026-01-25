"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimationExample = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",  // when image top hits 80% of viewport
        end: "top 20%",    // when image top hits 20% of viewport
        scrub: true,       // smooth scrolling effect
        markers: true,     // debug markers to see scroll positions
      },
    })
      .to(imageRef.current, {
        y: 500,           // move image down
        x: 200,           // move image to left
        scale: 1.5,       // slightly scale the image
        duration: 2,
      })
      .to(imageRef.current, {
        x: 0,             // move image back to center
        scale: 1,         // reset scale
        duration: 2,
      });
  }, []);

  return (
    <div style={{ height: "200vh", padding: "50px", backgroundColor: "#f0f0f0" }}>
      <div
        ref={imageRef}
        style={{
          width: "300px",
          height: "300px",
          backgroundImage: "url('https://via.placeholder.com/300')", // replace with actual image
          backgroundSize: "cover",
          transition: "transform 0.5s ease-in-out",
        }}
      ></div>
    </div>
  );
};

export default ScrollAnimationExample;
