'use client';
import { motion } from 'framer-motion';

export default function HeroSection({ sectionVariants }) {
    return(
        <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-600"
      >
        <div className="text-center px-4">
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            Happy Esho Day! 🎉
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl opacity-90"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Celebrating 25 years of making the world brighter
          </motion.p>
        </div>
      </motion.section>
    )
};