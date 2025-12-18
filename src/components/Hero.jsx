import React, { useRef } from "react";
import { FaStar } from "react-icons/fa";
import heroImage from "../assets/education.mp4";
import { FaApple, FaGlobe } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CircularBulgeContainer from "./Beizer";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const bannerRef = useRef(null);

  useGSAP(() => {
    // Text split animations
    const firstText = new SplitText(".first-heading", { type: "chars" });
    const secondText = new SplitText(".second-heading", { type: "chars" });

    gsap.from(firstText.chars, {
      y: -70,
      opacity: 0,
      rotateX: 15,
      rotateY:30,
      duration: 1,
      stagger: 0.04,
      delay:1,
      ease: "power3.out",
    });

    gsap.from(secondText.chars, {
      duration: 3,
      opacity: 0,
      color: "white20",
      delay: 3,
      stagger:0.02,
      scrollTrigger:{
        trigger:'.banner',
        start:'top top',
        end:'bottom 20%',
        scrub:true
      }
    });

    // Button pulse
    gsap.to(".app-btn, .globe-btn", {
      scale: 0.9,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      repeatDelay: 0.8,
    });

    // Scroll fade for elements
    gsap.utils.toArray(".fadeonscroll").forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: i * 0.2,
      });
    });

    // Banner reveal
    gsap.from(".banner-div", {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.6,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".banner-div",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Floating hero image
    gsap.to(".animate-img", {
      y: 20,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Banner scaling on scroll
    gsap.to(".banner-div", {
      scale: 0.9,
      borderRadius: "40px",
      rotate:'-2deg',
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".banner-div",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Stats row stagger
    gsap.from(".fadeonscroll .flex-col", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".fadeonscroll",
        start: "top 90%",
      },
    });

   
    // 🌌 Enhanced 3D Torch-like Glow Orbs Animation
    const banner = bannerRef.current;
    const balls = gsap.utils.toArray(".blurBall, .blurBall2, .blurBall3");

    banner.addEventListener("mousemove", (e) => {
      const rect = banner.getBoundingClientRect();
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
      const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

      balls.forEach((ball, i) => {
        const range = 900 + i * 100; // how far each layer can move
        const depth = 1 + i * 0.2; // depth scaling for 3D effect
        gsap.to(ball, {
          x: xPercent * range,
          y: yPercent * range,
          scale: depth,
          duration: 1.5,
          ease: "power3.out",
        });
      });
    });

    banner.addEventListener("mouseleave", () => {
      balls.forEach((ball) => {
        gsap.to(ball, {
          x: 0,
          y: 0,
          scale: 1, // reset scale
          duration: 1.5,
          ease: "power2.out",
        });
      });
    });

    // Add subtle flicker effect to the orbs
    balls.forEach((ball, i) => {
      gsap.to(ball, {
        scale: `+=${0.05 + i * 0.02}`,
        repeat: -1,
        yoyo: true,
        duration: 0.8 + i * 0.2,
        ease: "sine.inOut",
      });
    });


    // 🎥 Cinematic Hero Image Reveal on Scroll End
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".banner-div",
        start: "bottom 90%",
        end: "bottom 40%",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });

    // optional - dim glow balls for contrast
    tl.to(
      ".blurBall, .blurBall2, .blurBall3",
      {
        opacity: 0.15,
        scale: 1.1,
        duration: 1.5,
        ease: "power2.out",
      },
      0
    );

    // hero image reveal animation
    tl.to(".hero-cinematic-img", {
      opacity: 1,
      scale: 1.2,
      y:-100,
      filter: "drop-shadow(0px 20px 60px rgba(0,255,200,0.6))",
      duration: 2,
      ease: "power4.out",
    }).to(".hero-cinematic-img", {
      scale: 1.4,
      opacity: 0.9,
      y: -200,
      duration: 2,
      ease: "power3.inOut",
    });
  });


const handleHover = (e) => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    e.currentTarget.appendChild(ripple);

    const size = Math.max(e.currentTarget.offsetWidth, e.currentTarget.offsetHeight);
    ripple.style.width = ripple.style.height = `${size}px`;

    const rect = e.currentTarget.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    setTimeout(() => ripple.remove(), 600);
  };

  return (
<div className=" banner h-full">
      <section
        ref={bannerRef}
        className="custom-clip h-full banner-div relative w-full bg-[#004F4F] py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden"
      >
        {/* 💡 Floating Glow Orbs (now free to move across banner) */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blurBall w-[650px] h-[650px]  rounded-full bg-[#001812] opacity-25 mix-blend-screen"></div>
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blurBall2 w-[500px] h-[500px] rounded-full bg-[#001812]  opacity-40 mix-blend-screen"></div>
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blurBall3 w-[350px] h-[350px] rounded-full blur-[5px] opacity-75 bg-[#021c16] mix-blend-screen"></div>

        {/* Bezier background layers */}
        <div className="absolute -z-2 -bottom-10 left-0 w-full">
          <CircularBulgeContainer height={50} isIcon={true} />
        </div>
        <div className="absolute -z-4 glow-1 -bottom-13 left-0 w-full">
          <CircularBulgeContainer height={50} bg="bg-[#aad8d8]" />
        </div>
        <div className="absolute -z-6 glow-2 -bottom-17 left-0 w-full">
          <CircularBulgeContainer height={50} bg="bg-[#d8f4f4]" />
        </div>

        {/* Left Column */}
        <div className="flex fadeonscroll flex-col gap-6 md:w-1/2 z-10">
          <div className="flex items-center gap-2 text-[#FFD700] text-sm">
            <FaStar />
            <p>5.0 (1.2K+ Reviews)</p>
          </div>

          <h1 className="first-heading text-4xl md:text-5xl font-poppins font-bold text-white leading-tight max-w-lg">
            Because Email Is Complicated Enough.
          </h1>

          <p className="second-heading text-[#E0E0E0] text-base leading-relaxed max-w-md">
            Try Email Finder, build your leads database fast with Snov.io Email Finder. Start using for free.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button onClick={()=>handleHover()} className="app-btn flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg font-medium hover:opacity-90 transition-all">
              <FaApple className="text-lg" />
              App Store
            </button>
            <button onClick={()=>handleHover()} className="globe-btn flex items-center gap-2 border-2 border-[#00C896] text-[#00C896] px-5 py-3 rounded-lg font-medium hover:bg-[#00C896] hover:text-black transition-all">
              <FaGlobe className="text-lg" />
              Web Demo
            </button>
          </div>

          <div className="flex fadeonscroll flex-wrap gap-8 mt-8 text-white font-semibold">
            <div className="flex flex-col items-start">
              <span className="text-xl">20M+</span>
              <p className="text-sm text-[#D0D0D0]">Users</p>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl">120+</span>
              <p className="text-sm text-[#D0D0D0]">Countries</p>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl">80+</span>
              <p className="text-sm text-[#D0D0D0]">Partners</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative fadeonscroll md:w-1/2 flex justify-center z-10">
          <div className="w-90 h-90 rounded-full bg-transparent relative">
            <video
              src={heroImage}
              className="hero-cinematic-img h-62 w-62 rounded-2xl object-cover absolute top-48 left-1/4 opacity-0 scale-[0.6]"
              alt="Hero"
              autoPlay
              loop 
              muted
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;


