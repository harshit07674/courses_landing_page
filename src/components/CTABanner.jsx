import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const CTABanner = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRefs = useRef([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // Banner scaling on scroll
    gsap.to(".ctaBanner", {
      scale: 0.9,
      borderRadius: "40px",
      rotate:'-2deg',
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".ctaBanner",
        start: "top 50%",
        end: "bottom top",
        scrub: true,
      },
    });
      // === Text Split ===
      const splitHeading = new SplitText(headingRef.current, {
        type: "words,chars",
      });
      gsap.set(headingRef.current, { perspective: 400 });
     
      // === Initial State ===
      gsap.set(splitHeading.chars, { y: 100, opacity: 0, rotateX: 90 });
      gsap.set(subtextRef.current, { y: 40, opacity: 0 });
      

      // === Scroll-triggered timeline ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

     tl.to(splitHeading.chars, {
        y: 0,
        scale:1.2,
        letterSpacing:2,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.03,
      })

      // Subtext fade-up
      tl.to(
        subtextRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay:2,
          stagger:0.04,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Buttons bounce in
      tl.to(
      '.btn-2',
        {
          scale: 0.8,
          opacity: 0.5,
          duration: 1,
          stagger: 0.01,
          repeatDelay:1,
          repeat:-1,
          yoyo:true  
        },
       
      );

      tl.to(
      '.btn-1',
        {
          scale: 0.9,
          opacity: 0.5,
          duration: 1,
          stagger: 0.01,
          repeatDelay:1,
          repeat:-1,
          delay:1,
          yoyo:true  
        },
       
      );

      // Background parallax gradient movement
      gsap.to(sectionRef.current, {
        backgroundPosition: "200% center",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating glowing orb
      gsap.to(".glow-orb", {
        x: "random(-100, 100)",
        y: "random(-50, 50)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",

      });

      gsap.to(".glow-orb", {
  x: "random(-200,200)",
  y: "random(-100,100)",
  duration: "random(6,10)",
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});


 gsap.to(sectionRef.current, {
        backgroundPosition: "200% center",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

     
    
      document.addEventListener("mousemove", (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 30;
        const y = (e.clientY / innerHeight - 0.5) * 20;
        gsap.to(".parallax", {
          x,
          y,
          duration: 1,
          ease: "power2.out",
        });
      });
   
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // === Button Ripple Hover Effect ===
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
    <section
      ref={sectionRef}
      className="relative h-full ctaBanner w-full bg-gradient-to-r from-[#004F4F] via-[#005F5F] to-[#003A3A] bg-[length:200%_200%] py-28 px-6 flex flex-col items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Floating Glow Orb */}
      <div className="glow-orb absolute top-10 left-1/3 w-64 h-64 bg-[#00C896]/30 blur-3xl rounded-full opacity-70"></div>

      {/* Content */}
      <div className="max-w-3xl flex flex-col items-center gap-6 relative z-10">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-poppins font-bold leading-snug"
        >
          Ready to Start Your Learning Journey?
        </h2>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-[#E0E0E0] text-base md:text-lg leading-relaxed max-w-xl"
        >
          Join thousands of students upgrading their skills with{" "}
          <span className="text-[#00C896] font-semibold">Learn@House</span>.  
          Enroll today and take the first step toward your dream career!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-6">
          <button
            ref={(el) => (buttonRefs.current[0] = el)}
            onMouseEnter={handleHover}
            className="btn-1 border-2 border-transparent relative scale-100 bg-[#FF9F00] text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2  hover:bg-[#E68A00] transition-all duration-300 overflow-hidden"
          >
            Get Started <FaArrowRight />
          </button>

          <button
            ref={(el) => (buttonRefs.current[1] = el)}
            onMouseEnter={handleHover}
            className="btn-2 relative border-2 scale-100 border-[#00C896] text-[#00C896] px-8 py-3 rounded-lg font-semibold hover:bg-[#00C896] hover:text-black transition-all duration-300 overflow-hidden"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Ripple effect styling */}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          background: rgba(255, 255, 255, 0.4);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CTABanner;
