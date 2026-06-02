"use client";

import { motion } from "framer-motion";
import { useChildStore } from "../../stores/useChildStore";
import { useSoundEffect } from "../../hooks/useSoundEffect";
import { Home, Gamepad2, Star, Calendar, Smile } from "lucide-react";

export default function BottomNav() {
  const { activeScreen, setScreen, activeGame } = useChildStore();
  const playSound = useSoundEffect();

  const tabs = [
    { id: "home", icon: <Home size={24} />, label: "Home", color: "#4A90D9", bg: "bg-[#4A90D9]/15", border: "border-[#4A90D9]/30" },
    { id: "play", icon: <Gamepad2 size={24} />, label: "Play", color: "#FF7E6B", bg: "bg-[#FF7E6B]/15", border: "border-[#FF7E6B]/30" },
    { id: "stars", icon: <Star size={24} />, label: "My Stars", color: "#FFB020", bg: "bg-[#FFB020]/15", border: "border-[#FFB020]/30" },
    { id: "schedule", icon: <Calendar size={24} />, label: "Schedule", color: "#C4B5FD", bg: "bg-[#C4B5FD]/20", border: "border-[#C4B5FD]/40" },
    { id: "feel", icon: <Smile size={24} />, label: "Feelings", color: "#3ECFB2", bg: "bg-[#3ECFB2]/15", border: "border-[#3ECFB2]/30" },
  ];

  // Hide nav if a game is active
  if (activeGame) return null;

  return (
    <div className="fixed bottom-0 md:bottom-auto md:top-1/ md:left-6 md:right-auto left-0 right-0 z-[100] flex justify-center md:flex-col h-[72px] md:h-screen md:w-auto pointer-events-none pb-2 md:pb-0 px-2 md:px-0">
      <div className="bg-white/90 backdrop-blur-xl border border-white/80 h-[72px] md:h-auto flex md:flex-col items-center justify-around md:justify-center px-2 md:px-3 md:py-6 rounded-[28px] md:rounded-[32px] shadow-[0_8px_32px_rgba(30,58,138,0.12)] md:shadow-lg w-full md:w-[100px] gap-1 md:gap-4 pointer-events-auto">
        {tabs.map((tab) => {
        const isActive = activeScreen === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSound();
              setScreen(tab.id);
            }}
            className="min-w-[56px] min-h-[56px] flex flex-col items-center justify-center gap-1 rounded-2xl transition-all relative p-2"
          >
            {isActive && (
              <motion.div 
                layoutId="nav-pill"
                className={`absolute inset-0 ${tab.bg} rounded-2xl border ${tab.border}`}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            
            <span 
              className={`relative z-10 transition-all flex items-center justify-center ${isActive ? 'scale-110' : 'text-[#8FA3B1] scale-90 opacity-60 hover:scale-100 hover:opacity-100'}`}
              style={{ color: isActive ? tab.color : undefined }}
            >
              {tab.icon}
            </span>
            <span 
              className={`relative z-10 font-dm-sans transition-all ${isActive ? 'text-xs font-bold' : 'text-[#8FA3B1] text-xs'}`}
              style={{ color: isActive ? tab.color : undefined }}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
      </div>
    </div>
  );
}
