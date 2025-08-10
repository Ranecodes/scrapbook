import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Squiggly = () => (
  <motion.div
    className="absolute top-10 right-10"
    animate={{
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 0.9, 1],
      y: [0, -10, 0, 10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <img src="/squiggly-3.svg" alt="squiggly decoration" className="w-32 h-32" />
  </motion.div>
);

export default function Raneh() {
  const sectionRef = useRef(null);

  // scroll-based heading animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const rawX = useTransform(scrollYProgress, [0, 0.3, 0.35], ["100vw", "20vw", "0vw"]);
  const x = useSpring(rawX, { stiffness: 140, damping: 24 });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.28], [0, 1, 1]);

  return (
    <section ref={sectionRef} className="pt-20 px-6">
      {/* Animated Heading same as TheBoysSection */}
      <motion.h2
        style={{ x, opacity }}
        className="text-5xl font-bold mb-8 text-center text-white"
      >
        And then there’s me...
      </motion.h2>

      {/* Flex container */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 max-w-5xl mx-auto">
        <div className="flex-shrink-0">
          <Image
            src="/raneh3.png"
            alt="Raneh and Esho"
            width={300}
            height={300}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start pl-20 pt-25">
          <AudioPlayer
            src="/Esho.m4a"
            showJumpControls={false}
            customAdditionalControls={[]}
            layout="stacked"
            style={{
              width: "400px",
              borderRadius: "15px",
              backgroundColor: "#FFF",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />

          <p className="mt-4 text-sm text-white leading-relaxed max-w-md text-center md:text-left">
            This digital scrapbook is a celebration of your life and a collection of all the beautiful memories you have with some of your loved ones.
          </p>
        </div>

        {<Squiggly />}
      </div>
    </section>
  );
}
