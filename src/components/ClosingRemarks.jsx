import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useRef, useState, useEffect } from "react";

export default function ClosingRemarks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (isInView) {
      setStartTyping(true);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-4"
    >
      {/* Centered & wider text */}
      {startTyping && (
        <TypeAnimation
          sequence={[
            "Damilare, you are so loved and you are so special. I hope this makes your day. Happy 26th Superstar!",
            1000,
          ]}
          wrapper="span"
          speed={50}
          className="max-w-4xl text-center leading-relaxed"
          style={{
            fontSize: "1.5rem",
            display: "inline-block",
          }}
          repeat={0}
        />
      )}

      {/* Footer fixed to bottom */}
      {startTyping && (
        <motion.footer
          className="absolute bottom-6 text-[12px] text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 8,
            duration: 0.8,
          }}
        >
          Designed and developed by Raneh 🤍
        </motion.footer>
      )}
    </div>
  );
}
