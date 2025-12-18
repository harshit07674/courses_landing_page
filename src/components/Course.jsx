import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { useState } from "react";
import { FaLaptopCode, FaPaintBrush, FaMobileAlt, FaArrowRight } from "react-icons/fa";
import sampleVideo from "../assets/education.mp4";

const courses = [
  {
    id: 1,
    icon: <FaLaptopCode className="text-4xl text-[#00C896]" />,
    title: "Web Development",
    desc: "Learn HTML, CSS, JavaScript, and React to build modern and responsive web applications.",
  },
  {
    id: 2,
    icon: <FaPaintBrush className="text-4xl text-[#00C896]" />,
    title: "UI/UX Design",
    desc: "Master user experience design and interface building with Figma and Adobe XD.",
  },
  {
    id: 3,
    icon: <FaMobileAlt className="text-4xl text-[#00C896]" />,
    title: "App Development",
    desc: "Create cross-platform apps using Flutter or React Native and publish them to the stores.",
  },
];

const CoursesSection = () => {

  const [clicked,setClicked]=useState(false);

 useGSAP(()=>{
  if(clicked===false){


     const first = new SplitText('.first',{
    type:'words'
  })

 



 const timeline = gsap.timeline({
   scrollTrigger:{
        trigger:'.courses',
        start:'top top',
        end:'bottom center',
        scrub:true,
      
       
      },
 });

 

    timeline.to('.courses',{
     
      scale:1.4,
      stagger:0.04,
       
      duration:1,
      delay:1,
     }).to('.courses',{
      scale:1.6,
     }).to('.course-grid',{
      height:'40%',
      x:-1000,
      opacity:0.5
     }).to('.course-grid',{
      display:'none'
     }).to('.video',{
      zIndex:1,
      opacity:0.2,
      x:1000,
     }).to('.headings',{
      opacity:0
     }).to('.video',{
       zIndex:3,
       backgroundColor:'green',
       opacity:1,
       x:0,
     }).to('.first',{
      opacity:1,
      y:-20
     }).to('.video-2',{
      zIndex:3,
       backgroundColor:'red',
       opacity:1,
       x:-1000,
       width:'0%',
     }).to('.video-2',{
       backgroundColor:'red',
       x:0,
       width:'100%',
     }).to('.second',{
      opacity:1,
      y:10,

     }).to('.video-3',{
       backgroundColor:'yellow',
       x:0,
       width:'100%',
     }).to('.third',{
      opacity:1,
      y:10,

     }).to('.video',{
      opacity:0,
      x:1100,
      duration:2,
      delay:2,
     }).to('.video-2',{
      opacity:0,
      x:-1100,
      delay:2,
     }).to('.video-3',{
      opacity:0,
      x:-1100,
      width:0,
      duration:2,
      delay:2,
     }).to(".courses", {
      scale: 0.9,
      borderRadius: "40px",
      rotate:'-2deg',
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".courses",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    }).to(".course-grid",{
      display:'grid',
      x:0
    }).to('.headings',{
      opacity:1,
    })

   const time2=gsap.timeline({
    scrollTrigger:{
        trigger:'.video',
        start:'top 10%',
        scrub:true,
        pin:true,
      },
   })
  }
  if(clicked){
    gsap.to('.background-video',{
      display:'block'
    })
  }

 },[clicked])

  return (
    <section className="w-full h-full courses bg-[#004F4F] py-24 px-6 md:px-20 flex flex-col items-center text-white relative overflow-hidden">
      
      
      <video src={sampleVideo} autoPlay muted loop className="hidden w-[20%] h-[20%] background-video absolute top-1/4"/>
      
      
      <div className="headings text-center max-w-2xl mb-16">
        <h2 className="text-3xl first md:text-4xl font-poppins font-semibold mb-3">
          Our Popular Courses For You
        </h2>
        <p className="text-[#CFCFCF] text-base">
          Explore our most sought-after courses, carefully designed to boost your skills and career.
        </p>
      </div>
      {clicked===false&&<div className="absolute text-5xl font-bold text-white flex justify-center items-center top-67 w-0 h-50 video-2 bg-transparent -z-2">
      <p className="second opacity-0 p-0">Watch Demo</p>
     </div>}
     {clicked===false&&<div className="absolute -top-51 text-5xl font-bold text-white flex justify-center items-center  w-full h-50 video bg-transparent -z-2">
     <p className="first opacity-0 p-0">Don't Believe Us</p>
     </div>}
     {clicked===false&&<div onClick={()=>setClicked(true)} className="absolute cursor-pointer top-117 text-5xl font-bold text-blue-500 flex justify-center items-center  w-0 h-50 video-3 bg-transparent -z-2">
     <p className="third opacity-0 p-0">Click Here</p>
     </div>}
     
      {/* Courses Grid */}
      {clicked===false&&<div className="course-grid grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#003D3D] rounded-2xl p-8 flex flex-col items-start gap-4 shadow-lg hover:shadow-2xl hover:bg-[#005A5A] transform hover:scale-105 transition-all duration-300"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-[#E6F9F4]/10 rounded-full flex items-center justify-center">
              {course.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-poppins font-semibold text-[#00C896] mt-2">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-[#D9D9D9] text-sm leading-relaxed">
              {course.desc}
            </p>

            {/* Button */}
            <button className="mt-auto flex items-center gap-2 text-[#FFFFFF] font-medium text-sm hover:gap-3 transition-all duration-200">
              Read More <FaArrowRight />
            </button>
          </div>
         
        ))}
         
      </div>}
    </section>
    
  );
};

export default CoursesSection;
