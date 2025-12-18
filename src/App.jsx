import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Hero from "./components/Hero";
import Reasons from "./components/Reasons";
import StepsSection from "./components/StepsSection";
import CoursesSection from "./components/Course";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const [mpoveY, setMoveY] = useState(0);
  const [vectorDir, setVectorDir] = useState("+");

useGSAP(() => {
    const sections = gsap.utils.toArray(".panel");

    sections.forEach((section, i) => {
      const next = sections[i + 1];

      if (next) {
        // Create a layered scroll effect
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
            pinSpacing: false, // overlap instead of pushing down
          },
        })
        .fromTo(
          next,
          { clipPath: "inset(100% 0% 0% 0%)", zIndex: i + 2, opacity: 0.9 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.5,height:'100vh', ease: "power4.out" },
          0.1
        )
        .to(
          section,
          { opacity: 0, duration: 0.5, ease: "power2.inOut" },
          "-=1"
        );
      }
    });
  },);

  
  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Each section wrapped as a “panel” for ScrollTrigger */}
      <section className="panel relative z-0">
       
        <Hero />
      </section>

      <section className="panel relative z-[2]">
        <Reasons />
      </section>

      <section className="panel relative z-[3]">
        <StepsSection />
      </section>

      <section className="panel relative z-[4]">
        <CoursesSection />
      </section>

      {/* <section className="panel relative z-[5]">
      <Testimonials/>
      </section> */}

      <section className="panel relative z-[6]">
        <CTABanner />
      </section>

      <section className="relative z-[7] -top-1">
        <Footer />
      </section>
    </div>
  );
}

export default App;

