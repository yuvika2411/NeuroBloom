"use client";

import { motion } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import { fadeUp, staggerContainer } from "../../../lib/animations";
import { Star, Lock, Palette, Type, Puzzle, Crosshair, Gamepad2, Flame, Calendar, Music, Users } from "lucide-react";

export default function HomeScreen() {
  const { child, todayModules, setScreen, setActiveGame } = useChildStore();

  const moduleIconMap = {
    '🎭': <Palette size={40} className="text-[#4A90D9]" />,
    '🔤': <Type size={40} className="text-[#FF7E6B]" />,
    '🧩': <Puzzle size={40} className="text-[#C4B5FD]" />,
    '📅': <Calendar size={40} className="text-[#FFB020]" />,
    '🎯': <Crosshair size={40} className="text-[#3ECFB2]" />,
    '🎵': <Music size={40} className="text-[#A78BFA]" />,
    '🎨': <Palette size={40} className="text-[#10B981]" />,
    '🤝': <Users size={40} className="text-[#3B82F6]" />,
  };

  const allComplete = todayModules.every(m => m.completed);
  const uncompleted = todayModules.filter(m => !m.completed).length;

  const handleStart = (mod) => {
    setScreen('play');
    if (mod.id === 'm1') setActiveGame('emotion-match');
    else if (mod.id === 'm2') setActiveGame('word-match');
    else if (mod.id === 'm3') setActiveGame('puzzle');
    else if (mod.id === 'm4') setActiveGame('routine');
    else if (mod.id === 'm5') setActiveGame('ball-tracker');
    else if (mod.id === 'm6') setActiveGame('sound-match');
    else if (mod.id === 'm7') setActiveGame('sensory-sort');
    else if (mod.id === 'm8') setActiveGame('social-story');
  };

  return (
    <div className="flex flex-col items-center justify-start flex-1 w-full max-w-5xl mx-auto px-4 pb-12 md:pb-8 pt-4">
      
      {/* Top Stats Widget */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full flex justify-between items-center mb-6 px-2"
      >
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-white shadow-sm">
          <div className="relative">
            <Flame size={24} className="text-[#FF7E6B]" fill="#FF7E6B" />
          </div>
          <span className="font-nunito font-bold text-lg text-[#FF7E6B]">{child.streak} Day Streak</span>
        </div>
        
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-white shadow-sm">
          <span className="font-nunito font-bold text-lg text-[#FFB020]">{child.stars}</span>
          <Star size={24} className="text-[#FFB020]" fill="#FFB020" />
        </div>
      </motion.div>

      <div className="pb-6 text-center w-full">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-nunito font-black text-[28px] md:text-[38px] text-[#1B2D3E] mb-1 tracking-tight"
        >
          Good morning, {child.name}!
        </motion.h1>
        <p className="font-dm-sans text-[16px] text-[#8FA3B1] font-medium">
          {allComplete ? "You've finished all daily learning games! 🎉" : `${uncompleted} interactive ASD activities available today`}
        </p>
      </div>

      <motion.div 
        className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 flex-1 min-h-0"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {todayModules.map((mod) => (
          <motion.div 
            key={mod.id}
            variants={fadeUp}
            className={`clay-card rounded-2xl p-3 flex flex-col items-center justify-between border-2 min-h-0 ${
              !mod.unlocked ? "opacity-70 bg-white/30 border-white/40" : "bg-white/60 border-white/80"
            }`}
          >
            <div className="flex flex-col items-center gap-2 text-center flex-1 min-h-0 justify-center">
              <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0 ${
                mod.completed ? "bg-[#3ECFB2]/20" : (!mod.unlocked ? "bg-gray-100" : "bg-white border-2 border-[#3ECFB2]/30")
              }`}>
                {moduleIconMap[mod.emoji] || <Gamepad2 size={32} className="text-[#1B2D3E]" />}
              </div>
              <div className="min-h-0">
                <h2 className="font-nunito font-bold text-[13px] md:text-[15px] text-[#1B2D3E] leading-tight line-clamp-2">{mod.title}</h2>
              </div>
            </div>
            
            <div className="shrink-0 w-full mt-3">
              {mod.completed ? (
                <div className="bg-[#E8FAF6] text-[#1A9E8C] border-2 border-[#3ECFB2]/30 px-2 py-1 rounded-xl text-xs font-bold font-nunito flex items-center gap-1 justify-center h-[38px] w-full">
                  <span>✓ Completed</span>
                </div>
              ) : !mod.unlocked ? (
                <div className="bg-[#F1F5F9] text-[#94A3B8] border-2 border-[#E2E8F0] px-2 py-1 rounded-xl text-xs font-bold font-nunito flex items-center gap-1 justify-center h-[38px] w-full">
                  <span><Lock size={14} /> Locked</span>
                </div>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStart(mod)}
                  className="bg-gradient-to-b from-[#3ECFB2] to-[#2BB89B] text-white px-2 py-1 rounded-xl text-xs font-bold font-nunito flex items-center gap-1 justify-center h-[38px] w-full shadow-[0_3px_0_#1A9E8C] active:translate-y-1 active:shadow-none transition-all"
                >
                  <span>▶ Play!</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
