import React, { useRef } from "react";
import {
  FaHeadset,
  FaChalkboardTeacher,
  FaAward,
  FaArrowRight,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);





const reasons = [
  {
    id: 1,
    icon: <FaHeadset className="text-4xl text-white" />,
    title: "24/7 Support",
    desc: "We’re available round the clock to help you with any queries or issues that might come up.",
  },
  {
    id: 2,
    icon: <FaChalkboardTeacher className="text-4xl text-white" />,
    title: "Top Instructors",
    desc: "Our courses are led by industry experts and top professionals with years of hands-on experience.",
  },
  {
    id: 3,
    icon: <FaAward className="text-4xl text-white" />,
    title: "Certified Courses",
    desc: "Get globally recognized certifications after completing your course to boost your career profile.",
  },
];

const Reasons = () => {

   const sectionRef = useRef(null);

  useGSAP(() => {
    // Border shimmer loop
    gsap.to(".animated-border", {
      backgroundPosition: "200% center",
      repeat: -1,
      ease: "none",
      duration: 6,
    });

    // Unified animation for all cards
    gsap.utils.toArray(".reason-card").forEach((card, i) => {
      gsap.to(card, {
        opacity: 0.6 + 0.1,
        rotateY: i===0?-15:-20 - i * 2,
        rotateX: i===0?4:10 - i * 3,
        scale: 0.85 + 0.05,
        transformOrigin: "center center",
        duration: 1.5 + i * 0.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.3 * i,
      });
    });

    // Heading reveal with slight depth pop
    gsap.from(".fadetext", {
      opacity: 0,
      y: 50,
      z: -100,
      rotateX: -30,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fadetext",
        start: "top 90%",
      },
    });

    // Parallax tilt effect on scroll
    gsap.to(".reason-sec", {
      rotate: "-2deg",
      scale: 0.9,
      borderRadius: "40px",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".reason-sec",
        start: "top top",
        scrub: true,
      },
    });


    gsap.to(".shimmer-effect", {
    x: "100%",
    duration: 2,
    repeat: -1,
    delay: 1, // Delay between each shimmer
    ease: "power2.inOut",
  });

});

  // 🧭 Mousemove parallax tilt for section
  const handleMouseMove = (e) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(".reason-card", {
      rotateY: x * 12,
      rotateX: -y * 12,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".reason-card", {
      rotateY: 0,
      rotateX: 0,
      ease: "power3.out",
      duration: 0.8,
    });
  };


  return (
    <section
      className="h-full w-full bg-gradient-to-br from-[#004F4F] to-[#031a1a] reason-sec py-24 px-6 md:px-20 flex flex-col items-center relative overflow-hidden"
    >
      {/* Dynamic background glows */}
      <div className="bg-glow absolute w-[400px] h-[400px] bg-[#00FFC633] blur-[150px] rounded-full top-10 left-10 z-0"></div>
      <div className="bg-glow absolute w-[300px] h-[300px] bg-[#004f4f22] blur-[120px] rounded-full bottom-10 right-10 z-0"></div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#E0E0E0] text-center mb-12 z-10">
        Why Choose Us?
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl z-10 relative">
        {reasons.map((item) => (
          <div
            key={item.id}
            className={`reason-card relative bg-gradient-to-br from-[#1e3c72] to-[#2a5298] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-[2px] group`}
          >
            {/* Shimmer border */}
            <div className="absolute inset-0 rounded-3xl animated-border"></div>

            {/* Card Content */}
            <div className="relative z-10 bg-[#0f2027] rounded-3xl p-8 flex flex-col items-start gap-6 border border-transparent overflow-hidden">
              <div className="shimmer-effect"></div>
              {/* Icon */}
              <div className="w-16 h-16 bg-[#00FFC6] rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-poppins font-semibold text-[#E0E0E0] mt-2 transition-all duration-300 group-hover:text-[#00FFC6]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#B0B0B0] text-sm leading-relaxed group-hover:text-[#E0E0E0] transition-all duration-300">
                {item.desc}
              </p>

              {/* Button */}
              <button className="mt-4 flex items-center gap-2 text-[#00FFC6] font-medium text-sm hover:translate-x-1 transition-all">
                Learn More <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Animated border gradient CSS */}
      <style>{`
        .animated-border {
  border-radius: 1.5rem;
  background: linear-gradient(
    90deg,
    #00ff99,
    #00cc66,
    #009966,
    #006644,
    #00b377,
    #00ff99
  );
  background-size: 300% 300%;
  
  z-index: 0;
  opacity: 0.9;
}



.shimmer-effect {
    position: absolute;
    top: 0;
    left: -150%;
    width: 150%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%);
    transform: skewX(-25deg);
    pointer-events: none;
    mix-blend-mode: overlay;
  }
      `}</style>
    </section>
  );
};

export default Reasons;







