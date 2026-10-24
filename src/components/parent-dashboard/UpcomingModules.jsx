"use client";

import { motion } from "framer-motion";
import { useParentStore } from "../../stores/useParentStore";
import { staggerContainer, fadeUp, clayHover } from "../../lib/animations";
import { Star, Palette, Type, Puzzle, Gamepad2 } from "lucide-react";

export default function UpcomingModules() {
  const { upcomingModules = [] } = useParentStore();

  const moduleIconMap = {
    '🎭': <Palette size={32} className="text-[#6366F1]" />,
    '🔤': <Type size={32} className="text-[#F43F5E]" />,
    '🧩': <Puzzle size={32} className="text-[#A855F7]" />,
  };

  const getBorderColor = (skill) => {
    switch(skill) {
      case 'Social': return 'border-l-[#6366F1]';
      case 'Communication': return 'border-l-[#06B6D4]';
      case 'Cognitive': return 'border-l-[#A855F7]';
      default: return 'border-l-[#6366F1]';
    }
  };

  const getDifficultyStars = (level) => {
    return Array(level).fill(0).map((_, i) => <Star key={i} size={10} fill="currentColor" className="inline-block text-[#F59E0B]" />);
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-indigo-100/80 rounded-3xl p-6 shadow-[0_8px_32px_rgba(99,102,241,0.1),0_2px_8px_rgba(15,23,42,0.04)] h-full flex flex-col">
      <h2 className="font-nunito font-bold text-xl text-[#0F172A] mb-6">Recommended for Tomorrow</h2>

      <div className="flex-1 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col sm:flex-row gap-4 h-full"
        >
          {upcomingModules.map((mod) => (
            <motion.div
              key={mod.id}
              variants={fadeUp}
              whileHover={clayHover}
              className={`bg-white/90 backdrop-blur-md border border-indigo-50 rounded-2xl p-4 shadow-xs min-w-[240px] flex-1 flex flex-col border-l-4 ${getBorderColor(mod.skill)} cursor-pointer`}
            >
              <div className="mb-2">{moduleIconMap[mod.emoji] || <Gamepad2 size={32} className="text-[#6366F1]" />}</div>
              <h3 className="font-nunito font-bold text-[#0F172A] text-sm mb-2 leading-tight">
                {mod.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-4 mt-auto pt-2">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md text-[10px] font-bold border border-indigo-100">
                  ⏱ {mod.duration}
                </span>
                <span className="bg-slate-50 text-[#64748B] px-2 py-0.5 rounded-md text-[10px] font-bold border border-slate-100">
                  {mod.skill}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="text-[10px] tracking-widest">{getDifficultyStars(mod.difficulty)}</div>
                <button className="text-[#6366F1] font-bold font-dm-sans text-xs hover:text-[#4F46E5] transition-colors bg-[#6366F1]/10 px-3 py-1.5 rounded-lg">
                  Start &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
