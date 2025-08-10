'use client';

import { motion } from 'framer-motion';

export default function IntroSection({ sectionVariants }) {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-800"
    >
      <div className="text-center px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
          variants={sectionVariants}
        >
          The world got slightly better
          <br />
          <motion.span 
            className="text-yellow-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            on Friday, the 11th of August, 1999
          </motion.span>
        </motion.h1>

        <motion.div 
          className="mt-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center mx-auto">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
