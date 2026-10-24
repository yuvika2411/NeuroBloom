"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { User, Gamepad2, BarChart3 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <User size={40} className="text-[#6366F1]" />,
      title: "Create a Profile",
      desc: "Answer a few questions about your child. SynaptiX's AI builds a personalized learning path using validated ABA frameworks.",
      tilt: "-1deg"
    },
    {
      num: "02",
      icon: <Gamepad2 size={40} className="text-[#06B6D4]" />,
      title: "Play & Learn",
      desc: "Your child engages with daily 10-min gamified modules — adaptive difficulty, sensory calm, zero frustration design.",
      tilt: "1deg"
    },
    {
      num: "03",
      icon: <BarChart3 size={40} className="text-[#F59E0B]" />,
      title: "Track Progress",
      desc: "You and your therapist get a live dashboard — real-time mood curves, skill milestones, and verified clinical reports.",
      tilt: "-0.5deg"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-20">
            <span className="font-dm-sans text-[#6366F1] font-semibold mb-3 block text-lg">
              Simple. Structured. Effective.
            </span>
            <h2 className="font-nunito font-bold text-3xl md:text-[38px] text-[#0F172A]">
              From Sign-Up to Breakthroughs in 3 Steps
            </h2>
          </motion.div>

          <div className="relative w-full">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-[#6366F1]/30 z-0">
              <motion.div
                className="absolute top-[-2px] left-0 h-0.5 border-t-2 border-dashed border-[#6366F1] w-full"
                initial={{ strokeDasharray: "0 100" }}
                whileInView={{ strokeDasharray: "100 0" }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ strokeDasharray: "10, 10" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="clay-card p-8 flex flex-col items-center text-center relative group"
                  style={{ transform: `rotate(${step.tilt})` }}
                  whileHover={{ scale: 1.02, rotate: "0deg", transition: { type: "spring", stiffness: 300 } }}
                >
                  <div className="absolute -top-6 -left-4 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-sora font-bold text-xl rounded-2xl w-14 h-14 flex items-center justify-center shadow-[0_4px_0_#3730A3] z-20">
                    {step.num}
                  </div>

                  <div className="mb-6 mt-4">{step.icon}</div>

                  <h3 className="font-nunito font-bold text-2xl text-[#0F172A] mb-4">
                    {step.title}
                  </h3>

                  <p className="font-dm-sans text-[#64748B] leading-relaxed mb-8 flex-grow">
                    {step.desc}
                  </p>

                  {/* Decorative Mockup Box */}
                  <div className="w-full h-32 bg-indigo-50/60 rounded-2xl border-2 border-white/80 overflow-hidden relative shadow-inner p-4 flex flex-col gap-2">
                    <div className="h-4 bg-white/80 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-white/80 rounded-full w-1/2 animate-pulse" style={{ animationDelay: "150ms" }}></div>
                    <div className="mt-auto flex justify-between gap-2">
                      <div className="h-8 w-8 bg-[#6366F1]/20 rounded-lg"></div>
                      <div className="h-8 w-16 bg-[#06B6D4]/20 rounded-lg"></div>
                      <div className="h-8 w-8 bg-[#F59E0B]/20 rounded-lg"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
