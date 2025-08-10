// components/ImageIntro.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageIntro({ onComplete }) {
  const [step, setStep] = useState(0); // 0 = spread, 1 = close, 2 = fade others, 3 = expand middle
  const [percent, setPercent] = useState(1);
  const [fadingImages, setFadingImages] = useState([]); // which images are fading

  console.log("Step:", step); 
 // Timers - run once on mount
useEffect(() => {
  setTimeout(() => setStep(1), 2000);
  setTimeout(() => setStep(2), 5000);
  setTimeout(() => setStep(3), 7500);
  setTimeout(() => onComplete?.(), 9500);
}, []);

// Fade logic - run only when step becomes 2
useEffect(() => {
  if (step === 2) {
    let i = -1;
    const fadeTimer = setInterval(() => {
      setFadingImages(prev => [...prev, i < 2 ? i : i + 1]);
      i++;
      if (i > 3) clearInterval(fadeTimer);
    }, 300);
    return () => clearInterval(fadeTimer);
  }
}, [step]);


  // Percentage counter (whole animation = 9.5s)
  
  useEffect(() => {
    let counter;
    const totalDuration = 9500;
    const stepTime = totalDuration / 100;
    let current = 1;

    counter = setInterval(() => {
      if (current <= 100) {
        setPercent(current);
        current++;
      } else {
        clearInterval(counter);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, []);

  const images = [
    "/image-1.jpeg",
    "/image-2.jpg",
    "/image-3.jpg",
    "/image-4.jpeg",
    "/image-5.jpeg",
  ];

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Top left text */}
      <div className="absolute top-4 left-4 text-white text-sm font-normal z-20 uppercase">
        World Damilare Day
      </div>

      {images.map((src, index) => {
        const isMiddle = index === 2;

        return (
         <motion.div
  key={src}
  className="relative w-40 h-60"
  initial={{ x: index * 100 - 200, opacity: 1, scale: 1 }}
  animate={
    step === 0
      ? { x: (index - 2) * 30 } // close
      : step === 1
      ? { x: (index - 2) * 30 } // close
      : step >= 2
      ? fadingImages.includes(index)
        ? { opacity: 0, x: (index - 2) * 30 } // fade out, keep position
        : (step === 3 || step >= 4) && isMiddle
        ? { scale: 2, opacity: 1, zIndex: 10 } // expand middle and KEEP expanded
        : { x: (index - 2) * 30 } // keep position here
      : {}
  }
  transition={{ duration: 1.2, ease: "easeInOut" }}
  style={{ zIndex: isMiddle ? 10 : 1 }}
>
  <Image
    src={src}
    alt={`Image ${index + 1}`}
    layout="fill"
    objectFit="cover"
  />
</motion.div>
        );
      })}

      {/* Counter - bottom right */}
      <div className="absolute bottom-4 right-4 text-white z-20">
        <div className="text-6xl font-normal mb-2">
          {percent}%
        </div>
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
    <div 
      className="h-full bg-white transition-all duration-100 ease-out rounded-full"
      style={{ width: `${percent}%` }}
    />
  </div>
</div>
    </div>
  );
}
