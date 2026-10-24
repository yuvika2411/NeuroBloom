"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";

export default function Research() {
  const methodologies = [
    "Applied Behavior Analysis (ABA)",
    "Discrete Trial Training (DTT)",
    "Picture Exchange Communication System (PECS)",
    "Social Emotional Learning (SEL)",
    "Natural Environment Teaching (NET)"
  ];

  return (
    <section id="research" className="py-24 bg-[#F4F6FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="font-dm-sans text-[#4F46E5] font-semibold mb-3 block text-lg bg-indigo-50 px-4 py-1.5 rounded-full inline-block border border-indigo-100">
              Clinical Foundation
            </span>
            <h2 className="font-nunito font-bold text-3xl md:text-[38px] text-[#0F172A]">
              Grounded in Decades of Clinical Research
            </h2>
          </motion.div>

          {/* Marquee Pills */}
          <motion.div variants={fadeUp} className="relative w-full overflow-hidden mb-20 py-4">
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#F4F6FC] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#F4F6FC] to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max space-x-6 animate-[scroll_20s_linear_infinite]">
              {[...methodologies, ...methodologies].map((method, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-full px-6 py-3 text-sm md:text-base font-medium text-[#4F46E5] shadow-xs flex items-center whitespace-nowrap"
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                    backgroundSize: "200% 100%"
                  }}
                >
                  <span className="text-[#6366F1] mr-2">✦</span> {method}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div variants={fadeUp} className="clay-card p-10 border-l-4 border-l-[#6366F1] border-t-white/60 border-r-white/60 border-b-white/60 flex flex-col justify-center">
              <div className="font-sora text-5xl md:text-6xl font-bold text-[#6366F1] mb-4">47%</div>
              <p className="font-dm-sans text-lg text-[#0F172A] font-medium leading-relaxed">
                improvement in communication outcomes in children receiving early ABA-based digital intervention
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="clay-card p-10 border-l-4 border-l-[#06B6D4] border-t-white/60 border-r-white/60 border-b-white/60 flex flex-col justify-center">
              <div className="font-sora text-5xl md:text-6xl font-bold text-[#06B6D4] mb-4">95%+</div>
              <p className="font-dm-sans text-lg text-[#0F172A] font-medium leading-relaxed">
                treatment adherence in digital therapeutic programs vs. 60% in traditional clinic settings
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <p className="font-dm-sans font-medium text-xl text-[#0F172A] leading-relaxed px-6">
              SynaptiX combines behavioral science with computational logic — the next generation of evidence-based digital therapy.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
