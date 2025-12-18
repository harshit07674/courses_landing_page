// TestimonialsSection.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { FaQuoteLeft, } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * TestimonialsSection
 * - Glassy 3D cards with parallax tilt & bulge
 * - Carousel with autoplay, pause-on-hover
 * - Entrance stagger + SplitText for quote reveal
 * - Ambient light blobs + shimmer
 *
 * Colors: #00C896, #004F4F, #F5F7F8
 */

const testimonials = [
  {
    id: 1,
    name: "Aisha Khan",
    role: "Product Designer • UX Lead",
    quote:
      "This course transformed how I design. The projects were practical and the mentors are top-notch.",
    avatar: "https://i.pravatar.cc/300?img=47",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohit Sharma",
    role: "Frontend Engineer",
    quote:
      "Hands-on, focused and real-world. My dev velocity improved tremendously after joining.",
    avatar: "https://i.pravatar.cc/300?img=12",
    rating: 5,
  },
  {
    id: 3,
    name: "Neha Patel",
    role: "Data Scientist",
    quote:
      "The community & projects pushed me to build a portfolio that got me interviews at great companies.",
    avatar: "https://i.pravatar.cc/300?img=32",
    rating: 5,
  },
  {
    id: 4,
    name: "Arjun Mehta",
    role: "Student",
    quote:
      "Clear teachers, fast feedback and a learning path that actually made sense — got me motivated.",
    avatar: "https://i.pravatar.cc/300?img=65",
    rating: 4.5,
  },
];





const Testimonials = () => {
      const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const quoteRefs = useRef([]);
  const autoPlayRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // reset refs
  cardRefs.current = [];
  quoteRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };
  const addQuoteRef = (el) => {
    if (el && !quoteRefs.current.includes(el)) quoteRefs.current.push(el);
  };

  // GSAP setup - entrance & autoplay carousel timeline + parallax tilt
  useEffect(() => {
    // entrance animation for whole section
    const ctx = gsap.context(() => {

     const cards= gsap.utils.toArray('.tes-card');

     cards.forEach((card,i)=>{
    gsap.to(card,{
        opacity:1,
        x:50,
        stagger:0.04,
       scale:0.8,
       repeat:-1,
       yoyo:true,
    })
     });


    })
      
      


    
    return () => ctx.revert();
  }, []);

  // card hover + mouse-follow parallax tilt per card
  useEffect(() => {
    const handlers = [];

    cardRefs.current.forEach((card) => {
      // ensure perspective on parent
      card.style.transformStyle = "preserve-3d";
      card.style.backfaceVisibility = "hidden";

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const maxTilt = 8; // degrees
        const tiltY = (dx / (rect.width / 2)) * maxTilt;
        const tiltX = -(dy / (rect.height / 2)) * maxTilt;

        gsap.to(card, {
          rotationY: tiltY,
          rotationX: tiltX,
          scale: 1.03,
          transformPerspective: 900,
          transformOrigin: "center center",
          duration: 0.5,
          ease: "power3.out",
        });

        // micro parallax for inner layers (avatar & shadow)
        const avatar = card.querySelector(".t-avatar");
        const shine = card.querySelector(".card-shine");
        if (avatar) {
          gsap.to(avatar, {
            x: dx / 12,
            y: dy / 18,
            duration: 0.6,
            ease: "power3.out",
          });
        }
        if (shine) {
          gsap.to(shine, {
            x: dx / 6,
            y: dy / 6,
            duration: 0.6,
            ease: "power3.out",
          });
        }
      };

      const onEnter = () => {
        gsap.to(card, { scale: 1.035, duration: 0.35, ease: "power2.out" });
      };

      const onLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
        const avatar = card.querySelector(".t-avatar");
        const shine = card.querySelector(".card-shine");
        if (avatar) gsap.to(avatar, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
        if (shine) gsap.to(shine, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      handlers.push({ card, onMove, onEnter, onLeave });
    });

    return () => {
      handlers.forEach((h) => {
        h.card.removeEventListener("mousemove", h.onMove);
        h.card.removeEventListener("mouseenter", h.onEnter);
        h.card.removeEventListener("mouseleave", h.onLeave);
      });
    };
  }, []);

  // Carousel autoplay logic: change focused index and animate depth
  useEffect(() => {
    // create a timeline that sets z-index-like scale/opacity for each index
    const updateVisuals = (newIndex) => {
      setIndex(newIndex);
      cardRefs.current.forEach((card, i) => {
        const delta = ((i - newIndex + testimonials.length) % testimonials.length);
        // arrange order visually: 0 = focused, 1 = next, last = prev
        // compute visual state
        let scale = 0.92;
        let x = (i - newIndex) * 220; // spacing
        let zIndex = 10 - Math.abs(i - newIndex);
        let opacity = 0.55;
        let rotateY = 0;

        if (i === newIndex) {
          scale = 1;
          x = 0;
          opacity = 1;
          rotateY = 0;
        } else if (i === (newIndex + 1) % testimonials.length) {
          scale = 0.96;
          x = 220;
          opacity = 0.85;
          rotateY = -6;
        } else if (i === (newIndex - 1 + testimonials.length) % testimonials.length) {
          scale = 0.96;
          x = -220;
          opacity = 0.85;
          rotateY = 6;
        } else {
          // far items
          scale = 0.88;
          x = (i - newIndex) * 260;
          opacity = 0.45;
          rotateY = (i < newIndex ? 12 : -12);
        }

        gsap.to(card, {
          x,
          scale,
          opacity,
          rotationY: rotateY,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true,
        });
        card.style.zIndex = String(zIndex);
      });
    };

    // autoplay timer
    function startAuto() {
      if (autoPlayRef.current) return;
      autoPlayRef.current = setInterval(() => {
        if (!paused) {
          const next = (index + 1) % testimonials.length;
          updateVisuals(next);
        }
      }, 4000);
    }
    function stopAuto() {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    // initial visuals
    updateVisuals(0);
    startAuto();

    // cleanup
    return () => {
      stopAuto();
    };
  }, [index, paused]);

  // control handlers
  const goPrev = () => {
    setIndex((s) => (s - 1 + testimonials.length) % testimonials.length);
    setPaused(true);
    setTimeout(() => setPaused(false), 3000);
  };
  const goNext = () => {
    setIndex((s) => (s + 1) % testimonials.length);
    setPaused(true);
    setTimeout(() => setPaused(false), 3000);
  };
  return (
    <section className="relative container w-full py-24 px-6 md:px-20 bg-gradient-to-br from-[#E8FFFA] via-[#F5FFFD] to-[#E0F7F5] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-[#00C896]/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-16 w-96 h-96 bg-[#00FFD1]/10 rounded-full blur-[120px]"></div>

      {/* Section Heading */}
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#004C4C] text-center mb-12">
        What Our Students Say
      </h2>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="tes-card relative bg-white/30 backdrop-blur-md border border-white/20 shadow-[inset_0_0_15px_rgba(0,255,200,0.15),0_8px_20px_rgba(0,0,0,0.08)] rounded-3xl p-8 flex flex-col items-center gap-6 transition-transform duration-300 hover:scale-[1.03]"
          >
            {/* Quote Icon */}
            <FaQuoteLeft className="text-4xl text-[#00C896]" />

            {/* Feedback */}
            <p className="text-center text-[#333] text-sm md:text-base leading-relaxed opacity-80">
              "{testimonial.feedback}"
            </p>

            {/* User Info */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full border-4 border-[#00C896] shadow-[0_4px_10px_rgba(0,200,150,0.4)]"
              />
              <h3 className="text-lg font-poppins font-semibold text-[#004F4F]">
                {testimonial.name}
              </h3>
              <p className="text-sm text-[#555555] opacity-70">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};




export default Testimonials;
