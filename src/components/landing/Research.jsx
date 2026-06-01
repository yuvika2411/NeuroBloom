"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";

export default function Research() {
  const methodologies = [
    "ABA Therapy", "Discrete Trial Training", "Natural Environment Teaching", 
    "ATEC Tracking", "SRS Measurement", "Prompt Fading"
  ];

  return (
    <section className="py-24 bg-[#E8FAF6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="font-dm-sans text-[#1A9E8C] font-semibold mb-3 block text-lg bg-white/50 px-4 py-1.5 rounded-full inline-block border border-white/60">
              Evidence-Based
            </span>
            <h2 className="font-nunito font-bold text-3xl md:text-[38px] text-[#1B2D3E]">
              Not Just Fun — Clinically Grounded
            </h2>
          </motion.div>

          {/* Marquee Pills */}
          <motion.div variants={fadeUp} className="relative w-full overflow-hidden mb-20 py-4">
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#E8FAF6] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#E8FAF6] to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex w-max space-x-6 animate-[scroll_20s_linear_infinite]">
              {[...methodologies, ...methodologies].map((method, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-full px-6 py-3 text-sm md:text-base font-medium text-[#1A9E8C] shadow-sm flex items-center whitespace-nowrap"
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                    backgroundSize: "200% 100%"
                  }}
                >
                  <span className="text-[#3ECFB2] mr-2">✦</span> {method}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div variants={fadeUp} className="clay-card p-10 border-l-4 border-l-[#3ECFB2] border-t-white/60 border-r-white/60 border-b-white/60 flex flex-col justify-center">
              <div className="font-sora text-5xl md:text-6xl font-bold text-[#3ECFB2] mb-4">47%</div>
              <p className="font-dm-sans text-lg text-[#1B2D3E] font-medium leading-relaxed">
                improvement in communication outcomes in children receiving early ABA-based digital intervention
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="clay-card p-10 border-l-4 border-l-[#4A90D9] border-t-white/60 border-r-white/60 border-b-white/60 flex flex-col justify-center">
              <div className="font-sora text-5xl md:text-6xl font-bold text-[#4A90D9] mb-4">95%+</div>
              <p className="font-dm-sans text-lg text-[#1B2D3E] font-medium leading-relaxed">
                treatment adherence in digital therapeutic programs vs. 60% in traditional clinic settings
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <p className="font-dm-sans font-medium text-xl text-[#1B2D3E] leading-relaxed px-6">
              NeuroBloom combines behavioral science with computational logic — the next generation of evidence-based digital therapy.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
