"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";

function AnimatedStat({ value, prefix = "", suffix = "", label, icon }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract the first number from the value string to animate
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const originalString = value;

  useEffect(() => {
    if (isInView && targetNumber > 0) {
      let startTimestamp = null;
      const duration = 2000; // 2 seconds

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function: easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOut * targetNumber);
        
        setDisplayValue(current);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(targetNumber);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, targetNumber]);

  // Reconstruct the string with the animated number
  const renderValue = () => {
    if (!targetNumber) return value;
    return originalString.replace(/\d+/, displayValue);
  };

  return (
    <motion.div variants={fadeUp} className="clay-card p-8 flex flex-col items-center text-center">
      <div className="text-4xl mb-4 bg-white/50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div ref={ref} className="font-sora font-bold text-[40px] text-[#3ECFB2] leading-tight mb-2 flex items-center">
        {prefix}{renderValue()}{suffix}
      </div>
      <p className="font-dm-sans text-[#1B2D3E] font-medium leading-relaxed">
        {label}
      </p>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section className="py-24 bg-[#D4F5EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="uppercase tracking-[0.2em] font-dm-sans text-[#1A9E8C] text-sm font-bold block mb-4">
              The Challenge
            </span>
            <h2 className="font-nunito font-bold text-3xl md:text-[38px] text-[#1B2D3E] max-w-3xl mx-auto leading-tight">
              Millions of families are waiting — for specialists, for slots, for answers.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
            <AnimatedStat 
              icon="🕐"
              value="1 in 36" 
              label="children diagnosed with ASD globally"
            />
            <AnimatedStat 
              icon="💸"
              value="60,000"
              prefix="$"
              suffix="+"
              label="average annual therapy cost per child"
            />
            <AnimatedStat 
              icon="⏳"
              value="18–24" 
              suffix=" months"
              label="average wait for specialist appointment"
            />
          </div>

          <motion.div variants={fadeUp} className="text-center">
            <p className="font-dm-sans font-medium text-xl text-[#1A9E8C] bg-white/40 px-6 py-3 rounded-full inline-block backdrop-blur-sm border border-white/60 shadow-sm">
              NeuroBloom bridges this gap with always-on, adaptive digital therapy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
