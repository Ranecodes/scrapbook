import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Squiggly = () => (
  <motion.div
    className="absolute top-10 right-10" // Position wherever you want
    animate={{
      rotate: [0, 5, -5, 0], // Wiggle rotation
      scale: [1, 1.1, 0.9, 1], // Pulse scale
      y: [0, -10, 0, 10, 0], // Float up and down
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <img 
      src="/squiggly-3.svg" 
      alt="squiggly decoration"
      className="w-32 h-32" // Adjust size as needed
    />
  </motion.div>
);
export default function Raneh() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [playAnimation, setPlayAnimation] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isInView) setPlayAnimation(true);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="pt-20 px-6">
      {/* Animated Heading */}
      <motion.h2
        className="text-5xl font-bold mb-8 text-center text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={playAnimation ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        And then there’s me...
      </motion.h2>

      {/* Flex container for image and audio/text */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 max-w-5xl mx-auto">
        {/* Left: Image */}
        <div className="flex-shrink-0">
          <Image
            src="/raneh3.png"
            alt="Raneh and Esho"
            width={300}
            height={300}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Right: Audio + Text */}
        <div className="flex-1 flex flex-col items-center md:items-start pl-20 pt-25">
          <AudioPlayer
            ref={audioRef}
            src="/Esho.m4a"
            onPlay={() => console.log("Playing")}
            showJumpControls={false}
            customAdditionalControls={[]}
            layout="stacked"
            style={{
              width: "400px",
              borderRadius: "15px",
              backgroundColor: "#DDD22D",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />

          {/* Text Under */}
          <p className="mt-4 text-sm text-white leading-relaxed max-w-md text-center md:text-left">
            This digital scrapbook is a celebration of your life and a collection of all the beautiful memories you have with some of your loved ones.
          </p>
        </div>

        {/* Squiggly Line */}
        {<Squiggly />}
      </div>
    </section>
  );
}
