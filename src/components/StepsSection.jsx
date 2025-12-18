import React, { useRef, useState } from "react";
import stepImage from "../assets/male.png"; // replace with your image path
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const steps = [
  {
    id: 1,
    title: "Choose the Best Course for You",
    desc: "Browse through our diverse catalog and pick the course that fits your goals and schedule.",
  },
  {
    id: 2,
    title: "Engage in Active Learning",
    desc: "Attend live classes, participate in discussions, and access hands-on projects.",
  },
  {
    id: 3,
    title: "Join with Ease",
    desc: "Simple registration process and instant access after signup.",
  },
];

const StepsSection = () => {
  const [clicked, setClicked] = useState(false);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(() => {
   const heading = new SplitText(".steps-heading", { type: "chars" });


    
// Reset visibility before animation
gsap.set(".steps-heading", { opacity: 1 });

gsap.from(heading.chars, {
  opacity: 0,
  x: -10,                // slight left slide
  ease: "power3.out",
  stagger: {
    each: 0.05,          // typing speed
    onComplete: function() {
    
    },
  },
  delay:1,
  repeat:-1,
  yoyo:true,
  duration: 0.05,    
  repeatDelay:2,    // per-character duration
});





    gsap.from(".step-item", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".steps",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    
//   const stepLevels= gsap.utils.toArray('.step-item')

// stepLevels.forEach((level,index)=>{
//   const val = index===1?1:index===0?-1:1.5
//    gsap.to(level,{
//     x:100*val,
//     rotate:val*15,
//     y:0,
//     scrollTrigger:{
//       trigger:level,
//       start:'top 20%',
//       scrub:true,
//     }
//    })
//   })
    

    gsap.from(imageRef.current, {
      scale: 0.8,
      rotate: -10,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.6)",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 85%",
      },
    });

    
const imageLine = gsap.timeline({
  repeat:-1,
  yoyo:true,
  repeatDelay:0.4,
  ease: "power3.out",
})

imageLine.to('.hero-image', {
  
  rotate: 15,                // slight left slide
  
  stagger: {
    each: 0.05,          // typing speed
    onComplete: function() {
    
    },
  },
}).to('.hero-image', {
  
  rotate: 0,                // slight left slide
  
  stagger: {
    each: 0.05,          // typing speed
    onComplete: function() {
    
    },
  },
}).to(".hero-image", {
  transformPerspective: 600,   // Adds 3D depth perception
  rotateY: 20,                 // Tilt horizontally
  rotateX: 5,                  // Slight vertical tilt
  scale: 1.05,                  // Bulge out toward viewer
  transformOrigin: "center center",
  filter: "drop-shadow(0px 10px 25px rgba(0, 200, 150, 0.4))",
});

    gsap.to(glowRef.current, {
      scale: 0.5,
      opacity: 0.7,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });

    gsap.to(".steps", { scale: 0.9, borderRadius: "40px", rotate:'-2deg', duration: 1, ease: "power1.inOut", scrollTrigger: { trigger: ".steps", start: "top top", end: "bottom top", scrub: true, }, });
  }, []);

  useGSAP(() => {
    if (clicked) {
      const tl = gsap.timeline();
      tl.to(".translate-card-1", { x: -150, y: 50, rotation: -10, scale: 1.1, duration: 0.6, ease: "back.out(1.7)" })
        .to(".translate-card-2", { x: -80, y: 100, rotation: 5, scale: 1.1, duration: 0.6 }, "<")
        .to(".translate-card-3", { x: 120, y: -60, rotation: 10, scale: 1.1, duration: 0.6 }, "<")
        .to(".translate-card-4", { x: 150, y: 50, rotation: -5, scale: 1.1, duration: 0.6 }, "<")
        .to(".hero-image", { scale: 1.05, duration: 0.5, ease: "power1.inOut" }, "<")
        .to(".hero-image", { scale: 1, duration: 0.5 });
    } else {
      gsap.to([".translate-card-1", ".translate-card-2", ".translate-card-3", ".translate-card-4"], {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [clicked]);

  return (
    <div className="relative h-full steps bg-gradient-to-br w-full from-[#E8FFFA] via-[#F5FFFD] to-[#E0F7F5] overflow-hidden">
      <h2 className="steps-heading text-5xl mt-8 text-center font-poppins font-bold text-[#004C4C] leading-snug ">
          Follow These 3 Simple<br/>
          Steps to Join Our Class! 
        </h2>
         <div className="absolute top-10 left-20 w-72 h-72 bg-[#00C896]/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-16 w-96 h-96 bg-[#00FFD1]/10 rounded-full blur-[120px]"></div>

    <section className="relative w-full   py-8 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-16 ">
      {/* Decorative Background Blur Lights */}
       
     
      {/* Left Column */}
      <div className="flex flex-col gap-10 md:w-1/2 relative z-10">
       

        <div className="flex relative -top-8 flex-col gap-8 mt-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="step-item w-full flex items-center gap-5 p-5 rounded-2xl bg-white/30 backdrop-blur-md border border-white/20 shadow-[inset_0_0_15px_rgba(0,255,200,0.15),0_8px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="flex-shrink-0 w-12 h-12 min-w-[3rem] min-h-[3rem] bg-gradient-to-br from-[#00C896] to-[#007F66] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_#00C896]">
                {step.id}
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-poppins font-semibold text-[#004F4F] drop-shadow-sm">
                  {step.title}
                </h3>
                <p className="text-[#333] text-sm md:text-base leading-relaxed opacity-80 mt-1">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div
        onClick={() => setClicked(!clicked)}
        className="relative md:w-1/2 flex justify-center items-center cursor-pointer group"
      >
        


        <img
          ref={imageRef}
          src={stepImage}
          alt="Learning Process"
          className="hero-image w-80 h-80 rounded-full border-[10px] border-white/60 shadow-[0_10px_30px_rgba(0,200,150,0.4)] object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
        />

        {/* Floating Badges */}
        <div className="absolute translate-card-1 top-0 left-6 bg-white/50 backdrop-blur-lg border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.1)] rounded-2xl p-4 text-center">
          <p className="text-xl font-bold text-[#004F4F]">160+</p>
          <p className="text-xs text-[#333] opacity-70">Teachers</p>
        </div>

        <div className="absolute translate-card-2 bottom-4 left-0 bg-white/50 backdrop-blur-lg border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.1)] rounded-2xl p-4 text-center">
          <p className="text-xl font-bold text-[#004F4F]">24L+</p>
          <p className="text-xs text-[#333] opacity-70">Students</p>
        </div>

        <div className="absolute translate-card-3 top-8 right-0 bg-white/50 backdrop-blur-lg border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.1)] rounded-2xl p-4 text-center">
          <p className="text-xl font-bold text-[#004F4F]">500+</p>
          <p className="text-xs text-[#333] opacity-70">Courses</p>
        </div>

        <div className="absolute translate-card-4 bottom-10 right-6 bg-white/50 backdrop-blur-lg border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.1)] rounded-2xl p-4 text-center">
          <p className="text-xl font-bold text-[#004F4F]">12K+</p>
          <p className="text-xs text-[#333] opacity-70">Reviews</p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default StepsSection;
