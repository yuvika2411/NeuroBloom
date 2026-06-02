"use client";

import { motion } from "framer-motion";
import { useParentStore } from "../../stores/useParentStore";
import { Trophy, Flame, Puzzle, Smile, MessageCircle, Star, Palette, Lock } from "lucide-react";

export default function Achievements() {
  const { achievements, child } = useParentStore();

  const badgeIconMap = {
    '🔥': <Flame size={32} className="text-[#FF7E6B]" />,
    '🧩': <Puzzle size={32} className="text-[#4A90D9]" />,
    '😊': <Smile size={32} className="text-[#3ECFB2]" />,
    '🗣️': <MessageCircle size={32} className="text-[#C4B5FD]" />,
    '⭐': <Star size={32} className="text-[#FFB020]" fill="currentColor" />,
    '🌟': <Star size={32} className="text-[#FFB020]" />,
    '🏅': <Trophy size={32} className="text-[#FFB020]" />,
    '🎭': <Palette size={32} className="text-[#4A90D9]" />,
  };

  return (
    <div className="bg-white/55 backdrop-blur-lg border border-white/60 rounded-3xl p-6 shadow-[0_8px_32px_rgba(62,207,178,0.12),0_2px_8px_rgba(0,0,0,0.05)] h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-nunito font-bold text-xl text-[#1B2D3E] flex items-center">{child.name}'s Achievements <Trophy size={20} className="text-[#FFB020] ml-2" /></h2>
        <a href="#" className="font-dm-sans text-xs text-[#3ECFB2] font-bold hover:text-[#1A9E8C] transition-colors">
          View All &rarr;
        </a>
      </div>

      <div className="grid grid-cols-4 gap-3 flex-1 content-start">
        {achievements.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={badge.unlocked ? { scale: 0.8, opacity: 0 } : { opacity: 0 }}
            whileInView={badge.unlocked ? { scale: 1, opacity: 1 } : { opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={badge.unlocked ? { type: "spring", stiffness: 200, damping: 15, delay: index * 0.08 } : { delay: index * 0.05 }}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 relative ${
              badge.unlocked 
                ? "bg-white/80 backdrop-blur-md border border-white shadow-[0_4px_12px_rgba(62,207,178,0.15)]" 
                : "bg-white/30 border border-white/50 opacity-50 grayscale"
            }`}
          >
            <div className="mb-1">{badgeIconMap[badge.emoji] || badge.emoji}</div>
            <div className="font-dm-sans text-[10px] font-bold text-center leading-tight text-[#1B2D3E]">
              {badge.label}
            </div>
            
            {!badge.unlocked && (
              <div className="absolute bottom-1 right-1 opacity-70">
                <Lock size={12} className="text-[#1B2D3E]" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
