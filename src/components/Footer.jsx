import React from "react";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#002E2E] text-[#D0D0D0] pt-20 pb-10 px-6 md:px-20">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Logo + Tagline */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-poppins font-bold text-white">Learn@House</h2>
          <p className="text-sm text-[#CFCFCF] leading-relaxed max-w-xs">
            Empowering learners across the globe with top-quality online education, anytime and anywhere.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-poppins font-semibold text-white">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm text-[#D0D0D0]">
            {["Home", "About", "Services", "Pricing", "Resources"].map((link) => (
              <li
                key={link}
                className="hover:text-[#00C896] cursor-pointer transition-all duration-200"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social Icons */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-poppins font-semibold text-white">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#004F4F] flex items-center justify-center text-white hover:bg-[#00C896] transition-all"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#004F4F] flex items-center justify-center text-white hover:bg-[#00C896] transition-all"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#004F4F] flex items-center justify-center text-white hover:bg-[#00C896] transition-all"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full border-t border-[#004F4F] mt-10 pt-6 text-center">
        <p className="text-sm text-[#888888]">
          © {new Date().getFullYear()} Learn@House. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
