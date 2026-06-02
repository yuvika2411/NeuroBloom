"use client";

import { motion } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import { fadeUp, staggerContainer } from "../../../lib/animations";

export default function HomeScreen() {
  const { child, todayModules, setScreen, setActiveGame } = useChildStore();

  const allComplete = todayModules.every(m => m.completed);
  const uncompleted = todayModules.filter(m => !m.completed).length;

  const handleStart = (mod) => {
    setScreen('play');
    if (mod.id === 'm1') setActiveGame('emotion-match');
    if (mod.id === 'm2') setActiveGame('word-match');
    if (mod.id === 'm3') setActiveGame('puzzle');
    if (mod.id === 'm4') setActiveGame('ball-tracker');
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl mx-auto px-4 pb-12 md:pb-8">
      <div className="pt-6 pb-6 text-center w-full">
        <h1 className="font-nunito font-bold text-[28px] md:text-[36px] text-[#1B2D3E] mb-1">
          Good morning, {child.name}! 🌟
        </h1>
        <p className="font-dm-sans text-[16px] text-[#8FA3B1]">
          {allComplete ? "You've finished everything today!" : `You have ${uncompleted} activities today`}
        </p>
      </div>

      <motion.div 
        className="w-full grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-12 flex-1 min-h-0"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {todayModules.map((mod) => (
          <motion.div 
            key={mod.id}
            variants={fadeUp}
            className={`clay-card rounded-2xl md:rounded-3xl p-3 md:p-5 flex flex-col items-center justify-between border-2 min-h-0 ${
              !mod.unlocked ? "opacity-70 bg-white/30 border-white/40" : "bg-white/60 border-white/80"
            }`}
          >
            <div className="flex flex-col items-center gap-2 md:gap-3 text-center flex-1 min-h-0 justify-center">
              <div className={`w-[56px] h-[56px] md:w-[90px] md:h-[90px] rounded-2xl flex items-center justify-center text-2xl md:text-5xl shadow-sm shrink-0 ${
                mod.completed ? "bg-[#3ECFB2]/20" : (!mod.unlocked ? "bg-gray-100" : "bg-white border-2 border-[#3ECFB2]/30")
              }`}>
                {mod.emoji}
              </div>
              <div className="min-h-0">
                <h2 className="font-nunito font-bold text-[14px] md:text-[22px] text-[#1B2D3E] md:mb-2 leading-tight line-clamp-2">{mod.title}</h2>
                <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 mt-1 hidden md:flex">
                  <span className="bg-[#E8FAF6] text-[#1A9E8C] px-1.5 md:px-2 py-0.5 rounded-md text-[10px] md:text-[12px] font-bold border border-white whitespace-nowrap">
                    ⏱ {mod.duration}
                  </span>
                  <span className="bg-[#F5FDFC] text-[#8FA3B1] px-1.5 md:px-2 py-0.5 rounded-md text-[10px] md:text-[12px] font-bold border border-white whitespace-nowrap">
                    {mod.skill}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="shrink-0 w-full mt-2 md:mt-4">
              {mod.completed ? (
                <div className="bg-[#3ECFB2]/20 text-[#1A9E8C] px-2 py-1.5 md:py-2 rounded-xl text-[12px] md:text-[14px] font-bold font-dm-sans flex items-center gap-1 justify-center h-[36px] md:h-[56px] w-full">
                  <span>✓</span> <span className="hidden md:inline">Done</span>
                </div>
              ) : !mod.unlocked ? (
                <div className="bg-[#8FA3B1]/20 text-[#8FA3B1] px-2 py-1.5 md:py-2 rounded-xl text-[12px] md:text-[14px] font-bold font-dm-sans flex items-center gap-1 justify-center h-[36px] md:h-[56px] w-full">
                  <span>🔒</span> <span className="hidden md:inline">Locked</span>
                </div>
              ) : (
                <button 
                  onClick={() => handleStart(mod)}
                  className="bg-[#3ECFB2] text-white px-2 py-1.5 md:py-2 rounded-xl text-[13px] md:text-[16px] font-bold font-dm-sans flex items-center gap-1 justify-center h-[36px] md:h-[56px] w-full shadow-[0_3px_0_#1A9E8C] md:shadow-[0_4px_0_#1A9E8C] active:translate-y-1 active:shadow-none transition-all hover:scale-[1.02]"
                >
                  <span>▶</span> Start
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {allComplete ? (
        <div className="w-full max-w-lg h-[64px] rounded-2xl bg-[#C4B5FD] flex items-center justify-center font-nunito font-bold text-white text-[18px] shadow-[0_4px_0_#A78BFA] mx-auto">
          🌟 All done! Amazing work!
        </div>
      ) : (
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const nextMod = todayModules.find(m => m.unlocked && !m.completed);
            if (nextMod) handleStart(nextMod);
            else setScreen('play');
          }}
          className="w-full max-w-lg h-[72px] rounded-2xl bg-[#3ECFB2] flex items-center justify-center font-nunito font-bold text-white text-[20px] shadow-[0_6px_0_#1A9E8C] active:translate-y-1.5 active:shadow-none transition-all mb-4 mx-auto"
        >
          ▶ Start Today's Journey
        </motion.button>
      )}

      <p className="font-dm-sans text-[13px] md:text-[15px] text-[#8FA3B1] text-center mt-6">
        Yesterday you earned 3 stars ⭐⭐⭐ · Keep going!
      </p>
    </div>
  );
}
