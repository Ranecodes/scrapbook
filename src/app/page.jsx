'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageIntro from "@/components/ImageIntro";
import Hero from "@/components/Hero";

export default function Home() {
  const [showHero, setShowHero] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Small delay to let the middle image finish expanding before transitioning
    setTimeout(() => {
      setShowHero(true);
    }, 100); // Reduced delay for smoother transition
  };

  return (
    <div className="relative bg-black min-h-screen">
      <AnimatePresence>
        {!showHero && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 0.5, // Shorter, gentler fade
                ease: "easeOut",
                delay: 0.3 // Let Hero start appearing before intro fully fades
              }
            }}
          >
            <ImageIntro onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHero && (
          <motion.div
            key="hero"
          
            initial={{ 
              opacity: 0,
              scale: 0.98,
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: 0 // Start immediately
            }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}