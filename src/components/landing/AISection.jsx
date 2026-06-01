"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";

export default function AISection() {
  const aiFeatures = [
    {
      icon: "🎯",
      title: "Adaptive Learning Engine",
      desc: "Adjusts difficulty in real time based on your child's response patterns"
    },
    {
      icon: "😊",
      title: "Emotion Detection",
      desc: "Front-camera ML reads mood & attention during sessions (with parental consent)"
    },
    {
      icon: "🗣️",
      title: "NLP Speech Analysis",
      desc: "Tracks verbal communication growth over time"
    },
    {
      icon: "👁️",
      title: "Attention Monitoring",
      desc: "Eye-tracking proxy via interaction heatmaps"
    }
  ];

  const labels = ["ABA Engine", "Emotion ML", "NLP Speech", "Eye Tracking", "Progress AI"];

  return (
    <section className="pt-24 pb-18 bg-[#1B2D3E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-dm-sans text-[#3ECFB2] font-semibold mb-3 block text-lg uppercase tracking-wider">
            Powered by Intelligence
          </span>
          <h2 className="font-nunito font-bold text-3xl md:text-[38px] text-white">
            An AI That Understands Your Child
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          {/* Left Column - Feature List */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full md:w-[45%] flex flex-col gap-10"
          >
            {aiFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeUp} className="flex gap-6 items-start">
                <div className="bg-[#3ECFB2]/20 p-4 rounded-2xl flex-shrink-0 border border-[#3ECFB2]/30 shadow-[0_4px_12px_rgba(62,207,178,0.1)]">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="font-nunito font-bold text-xl text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-dm-sans text-[#8FA3B1] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Animated Diagram */}
          <div className="w-full md:w-[55%] relative h-[450px] md:h-[600px] flex items-center justify-center mt-12 md:mt-0">
            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#3ECFB2]/20 rounded-full blur-[50px]"></div>
            
            {/* Center Brain */}
            <div className="relative z-10 w-32 h-32 bg-[#1B2D3E] border-2 border-[#3ECFB2] rounded-full flex items-center justify-center text-[64px] shadow-[0_0_40px_rgba(62,207,178,0.4)]">
              🧠
            </div>

            {/* Orbiting Elements */}
            {labels.map((label, index) => {
              const angle = index * (360 / labels.length);
              
              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(180px) rotate(-${angle}deg)`
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.4, ease: "easeInOut" }}
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-dm-sans font-medium text-sm md:text-base px-6 py-3 rounded-full shadow-lg whitespace-nowrap">
                    {label}
                  </div>
                </motion.div>
              );
            })}
            
            {/* Connecting Lines Context */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
               <circle cx="50%" cy="50%" r="180" fill="none" stroke="#3ECFB2" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
