import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


const AnimatedSquiggly1 = () => (
  <motion.div
    className="absolute top-10 left-10" // Position wherever you want
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
      src="/squiggly1.svg" 
      alt="squiggly decoration"
      className="w-32 h-32" // Adjust size as needed
    />
  </motion.div>
);

export default function DragCarousel({ items }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isOverCarousel, setIsOverCarousel] = useState(false);
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % items.length);
    playSound();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
    playSound();
  };

  const playSound = () => {
    const audio = new Audio("/swipe.mp3");
    audio.play().catch((err) => console.log("Audio play blocked:", err));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        prevSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

 

  const handleVideoClick = (e, videoElement) => {
    e.stopPropagation();
    
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  return (
    <div className="relative w-full flex justify-center pt-20">
     

      {/* Squiggly Line */}
      <AnimatedSquiggly1 />

       {/* Shape Underlay */}
      <Image src="/blob-red.svg" alt="Red blob shape" width={420} height={370} className="absolute bottom-0 right-0 "/>

      {/* Card Stack Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsOverCarousel(true)}
        onMouseLeave={() => {
          setIsOverCarousel(false);
          setIsDragging(false);
        }}
      >
        <AnimatePresence mode="popLayout">
          {items.map((src, index) => {
            const isVideo = src.toLowerCase().endsWith(".mp4");
            
            // Calculate position relative to current index with proper wrapping
            let position = (index - current + items.length) % items.length;

            let x = 0;
            let scale = 1;
            let zIndex = items.length - position;
            let rotate = 0;
            let opacity = 1;

            // Position cards based on their relative position to current
            // Only show current card + 2 cards on each side (total of 5 visible cards)
            if (position === 1) {
              x = 120; // First right side card
              scale = 0.9;
              rotate = 3;
              opacity = 0.8;
            } else if (position === 2) {
              x = 180; // Second right side card
              scale = 0.8;
              rotate = 6;
              opacity = 0.6;
            } else if (position === items.length - 1) {
              x = -120; // First left side card
              scale = 0.9;
              rotate = -3;
              opacity = 0.8;
            } else if (position === items.length - 2) {
              x = -180; // Second left side card
              scale = 0.8;
              rotate = -6;
              opacity = 0.6;
            } else if (position > 2) {
              // Hide cards that are too far to the right
              opacity = 0;
              x = 300;
              scale = 0.5;
            }

            const isCurrent = position === 0;

            return (
              <motion.div
                key={`${src}-${index}`}
                initial={{ opacity: 0, x: x, scale: scale }}
                animate={{ 
                  opacity: opacity, 
                  x: x, 
                  scale: scale,
                  rotate: rotate
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className="absolute w-80 h-[500px] overflow-hidden shadow-2xl bg-gray-900"
                style={{ 
                  zIndex,
                  
                }}
              >
                {isVideo ? (
                  <VideoCard 
                    src={src} 
                    index={index}
                    isCurrent={isCurrent}
                    onVideoClick={handleVideoClick}
                  />
                ) : (
                  <ImageCard 
                    src={src} 
                    index={index}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Keyboard Instructions */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-black bg-opacity-60 text-white text-sm px-4 py-2 rounded-lg">
          Use ← → arrow keys or A/D keys to navigate
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === current 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

// Video Card Component
function VideoCard({ src, index, isCurrent, onVideoClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Auto-play/pause based on whether card is current
    if (isCurrent) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isCurrent]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        className="w-full h-full object-cover border-4 border-white rounded-2xl"
        onClick={isCurrent ? (e) => onVideoClick(e, videoRef.current) : undefined}
        style={{ pointerEvents: isCurrent ? 'auto' : 'none' }}
      />
      
      {/* Play/Pause Overlay - Only show on current card */}
      {isCurrent && (
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-20"
          onClick={(e) => onVideoClick(e, videoRef.current)}
        >
          <div className="bg-black bg-opacity-60 rounded-full p-4">
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Video indicator badge */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
        VIDEO
      </div>
    </>
  );
}

// Image Card Component
function ImageCard({ src, index }) {
  return (
    <>
      <Image
        src={src}
        alt={`Memory ${index + 1}`}
        fill
        className="object-cover border-4 border-white rounded-2xl"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      
      {/* Image indicator badge */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
        IMAGE
      </div>
    </>
  );
}