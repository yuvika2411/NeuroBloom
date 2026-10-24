"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, clayHover } from "../../lib/animations";
import { MessageCircle, Brain, Heart, ClipboardList } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <MessageCircle size={32} className="text-[#6366F1]" />,
      gradient: "from-[#6366F1]/15 to-[#06B6D4]/10",
      title: "Communication Tools",
      body: "AAC symbol boards, speech-to-text, picture exchange — all in one adaptive, sensory-friendly interface."
    },
    {
      icon: <Brain size={32} className="text-[#06B6D4]" />,
      gradient: "from-[#06B6D4]/15 to-[#A855F7]/15",
      title: "Cognitive Development",
      body: "Matching games, pattern puzzles, vocabulary builders — graded by SynaptiX AI to the child's precise level."
    },
    {
      icon: <Heart size={32} className="text-[#F43F5E]" />,
      gradient: "from-[#FEF3C7] to-[#F43F5E]/10",
      title: "Social & Emotional Learning",
      body: "Emotion recognition games, social story builder, real-time empathy simulation activities."
    },
    {
      icon: <ClipboardList size={32} className="text-[#A855F7]" />,
      gradient: "from-[#A855F7]/15 to-[#6366F1]/10",
      title: "Executive Function",
      body: "Visual schedules, First-Then routine boards, countdown timers — reduces transition anxiety, builds routine."
    }
  ];

  return (
    <section className="bg-[#F4F6FC] relative">
      {/* Wavy Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#F8FAFC]"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="font-dm-sans text-[#4F46E5] font-semibold mb-3 block text-lg bg-indigo-50 px-4 py-1.5 rounded-full inline-block border border-indigo-200">
              Built for Every Need
            </span>
            <h2 className="font-nunito font-bold text-3xl md:text-[38px] text-[#0F172A]">
              Four Pillars of SynaptiX Therapy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={clayHover}
                className={`clay-card p-8 bg-gradient-to-br ${feature.gradient} border-2 border-white/80 group cursor-default`}
              >
                <motion.div
                  className="text-5xl mb-6 bg-white/80 w-20 h-20 rounded-2xl flex items-center justify-center shadow-xs"
                  whileHover={{ rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 0.5 } }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="font-nunito font-bold text-2xl text-[#0F172A] mb-3">
                  {feature.title}
                </h3>

                <p className="font-dm-sans text-[#64748B] text-lg leading-relaxed">
                  {feature.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
