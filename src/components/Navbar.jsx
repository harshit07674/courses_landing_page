import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import Car from '../assets/sedan.png'

const Navbar = () => {

 useGSAP(()=>{
  gsap.from('.navbar',{
    height:'0%',
    opacity:0,
  })
 })

  return (
    <nav className="w-full navbar relative bg-[#004F4F] py-4 px-8 md:px-20 flex items-center justify-between">
      
        
     
      {/* Logo */} 
      <div className="text-white font-poppins font-semibold text-xl tracking-tight">
        Learn@House
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-8 text-[#E0E0E0] font-inter text-base">
        {["Home", "About", "Services", "Pricing", "Resources"].map((link) => (
          <li
            key={link}
            className="cursor-pointer transition-all duration-200 hover:text-[#00C896]"
          >
            {link}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button className="ml-6 bg-[#FF9F00] text-white font-inter font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#E68A00]">
        Contact
      </button>
    </nav>
  );
};

export default Navbar;
