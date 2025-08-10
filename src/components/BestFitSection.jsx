import { useEffect, useRef } from "react";
import Image from "next/image";

// Vertical carousel component to auto scroll images/videos vertically
function VerticalCarousel({ images, height = 400 }) {
  const containerRef = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollPosition = 0;

    scrollInterval.current = setInterval(() => {
      if (!container) return;

      scrollPosition += 1;
      if (scrollPosition >= container.scrollHeight - container.clientHeight) {
        scrollPosition = 0;
      }
      container.scrollTop = scrollPosition;
    }, 30); // Adjust speed here

    return () => clearInterval(scrollInterval.current);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height, overflowY: "auto" }}
      className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
    >
      <div className="flex flex-col space-y-4">
        {images.map((src, i) => {
          const isVideo = src.toLowerCase().endsWith(".mp4");
          return (
            <div
              key={i}
              className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg"
            >
              {isVideo ? (
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={src}
                  alt={`Fit pic ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i < 2}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BestFitSection() {
  const leftCarouselImages = [
    "/fit-video.mp4",
    "/image-11.jpg",
    "/image-3.jpg",
    "/image-13.jpg",
    "/image-9.jpg",
  ];

  const rightCarouselImages = [
    "/image-12.jpg",
    "/image-6.jpeg",
    "/image-7.jpeg",
    "/image-8.jpeg",
    "/image-10.jpg",
  ];

  return (
    <section className="max-w-7xl mx-auto my-20 px-8 flex items-center space-x-16">
      {/* Left Text */}
      <div className="flex-1">
        <div className="relative inline-block">
          <Image
            src="/blobb-yellow.svg"
            width={300}
            height={300}
            alt="Yellow blob"
            className="absolute -top-14 -left-0 z-0"
          />
          <h2 className="relative z-10 text-5xl text-white font-semibold mb-6 pl-10">
            Mr puts-that-shit-on
          </h2>
        </div>
        <p className="text-sm text-white leading-relaxed max-w-lg pl-6 pt-24">
          This section is dedicated to showcasing Esho's delectable fashion sense. 
          This man might have 99 problems but we all know a fit has never been one.
        </p>
      </div>

      {/* Right Vertical Double Carousel */}
      <div className="flex space-x-8">
        <VerticalCarousel images={leftCarouselImages} />
        <VerticalCarousel images={rightCarouselImages} />
      </div>
    </section>
  );
}

export default BestFitSection;
