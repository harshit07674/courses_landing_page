// CircularBulgeContainer.jsx
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Car from '../assets/sedan.png'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CircularBulgeContainer({
  bg = "bg-[#004F4F]", // green
  height = 320,
  bulgeRadius = 100, // radius of the circular bulge
  children,
  isIcon=false,
  isCar=false,
}) {



  return (
    <div
      style={{
        position: "relative",
        overflow: "visible",
        width: "100%",
        height,
      }}
    >
      {/* Main container */}
      <div className={`${bg}`}
        style={{
          
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ padding: "2rem", color: "white" }}>{children}</div>
      </div>

      {/* Circular bulge at bottom center */}
      <div className={`${bg} flex items-center justify-center mb-2`}
        style={{
          position: "absolute",
          bottom: -bulgeRadius / 2,
          left: "50%",
          transform: "translateX(-50%)",
          width: bulgeRadius * 2,
          height: bulgeRadius * 2,
         
          borderRadius: "50%",
          zIndex: 1,
        }}
      >
     {isIcon&&<MdKeyboardArrowDown color="white" size={30} className="relative mt-40"/>}
    
      </div>
    </div>
  );
}
