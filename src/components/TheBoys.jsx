"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import DragCarousel from "@/components/DragCarousel";

export default function TheBoysSection() {
  const items = [
    "/birthdaywish-1.mp4",
    "/birthdaywish-2.mp4",
    "/birthdaywish-3.mp4",
    "/birthdaywish-4.mp4",
    "/birthdaywish-5.mp4",
    "/theboys-7.mp4",
    "/theboys-8.mp4",
    "/theboys-9.mp4",
    "/theboys-10.mp4",
    "/theboys-11.mp4",
    "theboys-12.mp4",
    "theboys-13.mp4",
    "theboys-15.mp4",
    "/boys-1.jpg",
    "/boys-2.jpg",
    "/boys-6.mp4",
    "/boys-3.jpg",
    "/boys-4.jpg",
    "/boys-5.jpg",
  ];

  const sectionRef = useRef(null);

  // track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // tweak these offsets to control when the animation starts/ends
    // "start end" => when section top hits viewport bottom
    // "center center" => when section center hits viewport center
    offset: ["start end", "center center"],
  });

  // map progress to horizontal translation and opacity
  // tweak the input stops to control speed/timing
  const rawX = useTransform(scrollYProgress, [0, 0.3, 0.35], ["100vw", "20vw", "0vw"]);
  const x = useSpring(rawX, { stiffness: 140, damping: 24 }); // smoother
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.28], [0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto mt-40 mb-30 px-8"
      style={{ minHeight: "120vh" }} // give scroll room so animation can run
    >
      <div className="mx-auto px-8">
        {/* Header */}
        <div className="mb-12 overflow-visible">
          <motion.h2
            style={{ x, opacity }}
            className="text-5xl text-white font-semibold mb-4 text-center"
          >
            Here's what your boys had to say ...
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-sm text-white leading-relaxed max-w-2xl text-center mx-auto"
          >
            Your boyfriends have some heartfelt birthday wishes for you. Use keyboard arrows to scroll. 
          </motion.p>
        </div>

        {/* Carousel */}
        <DragCarousel items={items} />

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">← Click videos to play/pause • Use keyboard arrows to scroll →</p>
        </div>
      </div>
    </section>
  );
}
