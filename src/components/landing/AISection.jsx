"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { Target, Smile, MessageCircle, Eye, Brain } from "lucide-react";

export default function AISection() {
  const aiFeatures = [
    {
      icon: <Target />,
      title: "Adaptive Learning Engine",
      desc: "Adjusts difficulty in real time based on your child's response patterns & reaction speed"
    },
    {
      icon: <Smile />,
      title: "Emotion Detection",
      desc: "On-device camera ML analyzes mood & attention during sessions with 100% private processing"
    },
    {
      icon: <MessageCircle />,
      title: "NLP Speech Analysis",
      desc: "Tracks AAC verbal communication milestones and spontaneous speech over time"
    },
    {
      icon: <Eye />,
      title: "Attention Monitoring",
      desc: "Focus state detection via subtle interaction rhythms and responsiveness heatmaps"
    }
  ];

  const labels = ["SynaptiX Engine", "Emotion ML", "NLP Speech", "Attention AI", "Progress Engine"];

  return (
    <section className="pt-24 pb-18 bg-[#0F172A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-dm-sans text-[#818CF8] font-semibold mb-3 block text-lg uppercase tracking-wider">
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
                <div className="bg-[#6366F1]/20 p-4 rounded-2xl flex-shrink-0 border border-[#6366F1]/40 shadow-[0_4px_12px_rgba(99,102,241,0.2)]">
                  <span className="flex items-center text-[#818CF8]">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="font-nunito font-bold text-xl text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-dm-sans text-[#94A3B8] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Animated Diagram */}
          <div className="w-full md:w-[55%] relative h-[450px] md:h-[600px] flex items-center justify-center mt-12 md:mt-0">
            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#6366F1]/30 rounded-full blur-[60px]"></div>

            {/* Center Brain */}
            <div className="relative z-10 w-32 h-32 bg-[#0F172A] border-2 border-[#6366F1] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.5)]">
              <Brain size={64} className="text-[#818CF8]" />
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
                  <div className="bg-white/10 backdrop-blur-md border border-indigo-400/30 text-white font-dm-sans font-medium text-sm md:text-base px-6 py-3 rounded-full shadow-lg whitespace-nowrap">
                    {label}
                  </div>
                </motion.div>
              );
            })}

            {/* Connecting Lines Context */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
              <circle cx="50%" cy="50%" r="180" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
