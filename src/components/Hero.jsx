import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import BestFitSection from "./BestFitSection";
import TheBoysSection from "./TheBoys";
import Raneh from "./Raneh";
import ClosingRemarks from "./ClosingRemarks";

function AnimatedArrow({ pathLength }) {
  return (
    <svg
      width="147"
      height="60"
      viewBox="0 0 147 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M2.00006 15.7433C32.91 6.18903 94.9102 -2.56983 103.39 37.3403C109.18 64.5886 76.1758 66.1097 70.9966 36.0527C65.8174 5.99574 111.34 -19.5875 144.039 30.3363M144.039 30.3363L131.993 29.6217M144.039 30.3363L144.568 14.2631"
        stroke="#424242"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0"
        strokeDashoffset="0"
        style={{ pathLength }}
      />
    </svg>
  );
}

function FloatingTags() {
  const tags = [
    { text: "baby damilare 🥹", top: "-100%", left: "40%", color: "pink" },
    { text: "throwback monday🥳", top: "-200%", left: "60%", color: "orange" },
    { text: "lmao it definitely was you 😂", top: "150%", left: "40%", color: "blue" },
  ];

  const colorClasses = {
    pink: {
      bg: "bg-pink-300",
      text: "text-pink-900",
    },
    orange: {
      bg: "bg-orange-300",
      text: "text-orange-900",
    },
    blue: {
      bg: "bg-blue-300",
      text: "text-blue-900",
    },
  };

  return (
    <>
      {tags.map(({ text, top, left, color }, i) => {
        const classes = colorClasses[color] || colorClasses.pink;
        return (
          <motion.div
            key={i}
            className={`absolute px-3 py-1 rounded-full font-semibold text-sm shadow-lg ${classes.bg} ${classes.text}`}
            style={{ top, left, zIndex: 15, pointerEvents: "none" }}
            animate={{
              y: ["0%", "5%", "0%"], // float up and down
              rotate: [0, 3, 0],      // subtle rotation
            }}
            transition={{
              duration: 4 + i,        // stagger durations for each tag
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.div>
        );
      })}
    </>
  );
}


export default function Hero() {
  // ref for entire container (if still needed)
  const containerRef = useRef(null);

  // ref for second section only
  const secondSectionRef = useRef(null);

  const thirdSectionRef = useRef(null);

  // Scroll progress for hero (optional)
  const { scrollYProgress: heroScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll progress for second section only
  const { scrollYProgress: secondScroll } = useScroll({
    target: secondSectionRef,
    offset: ["start end", "end start"], // triggers while section is in viewport
  });

  const { scrollYProgress: thirdScroll } = useScroll({
    target: thirdSectionRef,
    offset: ["start start", "end end"],
  });

  // The total horizontal scroll distance of the cards:
  // For example, 6 cards * (card width + margin) - viewport width
  // Here cards are 288px wide (w-72 = 18rem), margin 24px (space-x-6 = 1.5rem)
  // So approx: (288 + 24) * 6 = 1872px - viewport width (~100vw)
  // For simplicity, use a fixed pixel value or calculate dynamically.

  const totalScrollDistance = 1800; // adjust to fit your layout

  const cardWidth = 288; // w-72 = 18rem = 288px
  const gap = 24; // space-x-6 = 1.5rem = 24px
  const totalCards = 6;
  const totalScrollWidth = totalCards * (cardWidth + gap);

  // Animate from +100% viewport width (offscreen right) to -total scroll width
  const scrollX = useTransform(
    thirdScroll,
    [0, 1],
    [`100vw`, `-${totalScrollWidth}px`]
  );

  // Hero animations (if you want to keep)
  const textX = useTransform(heroScroll, [0, 0.2, 0.5], [400, 400, 0]);
  const textOpacity = useTransform(heroScroll, [0, 0.2, 0.5], [0, 0, 1]);
  const imageOpacity = useTransform(heroScroll, [0.3, 0.5, 0.7], [0, 0.8, 1]);
  const imageScale = useTransform(heroScroll, [0.3, 0.5, 0.7], [0.8, 0.8, 1]);

  // Animations for second section, controlled independently
  const secondTextOpacity = useTransform(
    secondScroll,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const secondTextX = useTransform(secondScroll, [0, 0.5, 1], [100, 0, 0]);
  const secondImageOpacity = useTransform(
    secondScroll,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
  const secondImageScale = useTransform(
    secondScroll,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  const arrowPathLength = useTransform(thirdScroll, [0, 0.15], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ cursor: "url('/cake.svg') 0 0, auto" }}
    >
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute top-4 left-4 z-20 text-black text-sm font-normal uppercase">
          World Damilare Day
        </div>

        {/* Background that transitions from black to white */}
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundColor: "#000000" }}
          animate={{ backgroundColor: "#ffffff" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Hero Image */}
        <motion.div
          className="absolute w-40 h-60 overflow-hidden z-10"
          initial={{
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
            scale: 2,
          }}
          animate={{
            right: "20%",
            top: "50%",
            left: "auto",
            x: "0%",
            y: "-50%",
            scale: 2,
          }}
          transition={{
            duration: 1.2,
            delay: 2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Image
            src="/image-3.jpg"
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="relative h-screen flex items-center">
          <div className="w-full max-w-7xl mx-auto pl-32 flex items-center justify-between">
            <motion.div
              className="flex-1 max-w-xl pr-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
            >
              <motion.h1
                className="text-8xl font-semibold leading-normal mb-6 tracking-tight"
                initial={{ opacity: 0, y: 30, color: "#ffffff" }}
                animate={{ opacity: 1, y: 0, color: "#000000" }}
                transition={{
                  opacity: { duration: 1, delay: 1.8 },
                  y: { duration: 1, delay: 1.8 },
                  color: { duration: 1.5, delay: 0.5 },
                  ease: "easeOut",
                }}
              >
                HAPPY
                <br />
                BIRTHDAY
                <br />
                ESHO!
              </motion.h1>
            </motion.div>

            <div className="w-1/2"></div>
          </div>
        </div>

        <motion.div
          className="absolute top-0 right-0 w-1/3 h-full opacity-50"
          initial={{
            opacity: 0,
            background: "linear-gradient(to left, #1f2937, transparent)",
          }}
          animate={{
            opacity: 0.3,
            background: "linear-gradient(to left, #f3f4f6, transparent)",
          }}
          transition={{
            duration: 2,
            delay: 1.5,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Second Section - Birth Story */}
      <div
        ref={secondSectionRef}
        className="relative min-h-screen bg-white flex flex-col items-center"
      >
        <div className="w-full max-w-7xl mx-auto pt-20 px-8 flex flex-col items-center justify-between">
          {/* Text that flows in from the right */}
          <motion.div
            className=""
            style={{
              x: secondTextX,
              opacity: secondTextOpacity,
            }}
          >
            <motion.p className="text-3xl font-light leading-tight mb-8">
              Friday, the 11th of August '99 -- the day God's reward, Damilare
              was born.
            </motion.p>
          </motion.div>

          {/* Image container with hover side images */}
          <motion.div
            className="relative w-80 h-110 overflow-visible group"
            style={{
              opacity: secondImageOpacity,
              scale: secondImageScale,
            }}
          >
            {/* Left side image - appears on hover */}
            <div className="absolute right-full top-0 mr-8 w-80 h-110 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-x-8 group-hover:translate-x-0">
              <Image
                src="/damilare-20.png"
                alt="Left side image"
                width={493}
                height={511}
                className="object-cover"
              />
            </div>

            {/* Main center image */}
            <Image
              src="/damilare1.png"
              alt="Baby Damilare in formal wear"
              width={493}
              height={511}
              className="object-cover relative z-10"
              priority
            />

            {/* Right side image - appears on hover */}
            <div className="absolute left-full top-0 ml-8 w-80 h-110 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform -translate-x-8 group-hover:translate-x-0">
              <Image
                src="/damilare-100.png"
                alt="Right side image"
                width={350}
                height={300}
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Third-Section Gallery */}
      <div
        ref={thirdSectionRef}
        className="relative bg-white pb-30"
        style={{ height: "200vh" }} // Enough height to scroll
      >
        {/* Sticky wrapper: sticks the carousel to viewport while scrolling */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            className="flex items-center space-x-6 px-8"
            style={{ x: scrollX }}
          >
            {/* Text and Arrow - part of the horizontal flex row */}
            <div className="flex items-center space-x-6 flex-shrink-0">
              {/* Relative wrapper for text + ellipse */}
              <div className="relative inline-block">
                {/* Ellipse positioned absolutely underneath */}
                <motion.div
                  className="absolute -left-20 -top-40 z-0"
                  style={{ width: 400, height: 500 }}
                >
                  <Image
                    src="/ellipse-4.svg"
                    alt="Ellipse"
                    width={400}
                    height={500}
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>

                
                {/* Floating Tags */}
                <FloatingTags />
                

                {/* Text with higher z-index */}
                <h2 className="text-4xl font-light whitespace-nowrap relative z-10">
                  Let's take a walk down memory lane
                </h2>
              </div>

              {/* Animated arrow next to the text + ellipse */}
              <AnimatedArrow pathLength={arrowPathLength} />
            </div>

            {/* Gallery Cards */}
            {[1, 2, 3, 4, 5, 6].map((index) => (
  <div
    key={index}
    className="flex-shrink-0 w-72 bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-black"
  >
    <div className="relative w-full" style={{ paddingTop: "111%" /* 10/9 ratio approx */ }}>
      <Image
        src={`/damilar_${index}.jpg`}
        alt={`Gallery Image ${index}`}
        fill
        className="object-cover absolute top-0 left-0 w-full h-full"
      />
    </div>
  </div>
))}
          </motion.div>
        </div>
      </div>

        {/* Best Fit Section */}
        <BestFitSection />

        {/* Birthday Wishes From the Boys */}
        <TheBoysSection />


        {/* And then there's me */}
        <Raneh />

        {/* Closing Remarks */}
        <ClosingRemarks />
    </div>
  );
}
