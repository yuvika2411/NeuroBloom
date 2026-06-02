"use client";

import { motion } from "framer-motion";
import { useChildStore } from "../../stores/useChildStore";
import { useSoundEffect } from "../../hooks/useSoundEffect";

export default function BottomNav() {
  const { activeScreen, setScreen, activeGame } = useChildStore();
  const playSound = useSoundEffect();

  const tabs = [
    { id: "home", emoji: "🏠", label: "Home" },
    { id: "play", emoji: "🎮", label: "Play" },
    { id: "stars", emoji: "⭐", label: "My Stars" },
    { id: "schedule", emoji: "📅", label: "Schedule" },
    { id: "feel", emoji: "😊", label: "Feelings" },
  ];

  // Hide nav if a game is active
  if (activeGame) return null;

  return (
    <div className="fixed bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-6 md:right-auto left-4 right-4 z-[100] flex justify-center md:flex-col h-[72px] md:h-auto md:w-auto pointer-events-none">
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 h-[72px] md:h-auto flex md:flex-col items-center justify-around md:justify-center px-2 md:px-2 md:py-6 rounded-[24px] md:rounded-[32px] shadow-[0_8px_32px_rgba(30,58,138,0.12)] md:shadow-lg w-full md:w-[90px] gap-1 md:gap-4 pointer-events-auto">
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
                className="absolute inset-0 bg-[#3ECFB2]/15 rounded-2xl border border-white"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            
            <span className={`relative z-10 transition-all ${isActive ? 'text-2xl' : 'text-xl opacity-60'}`}>
              {tab.emoji}
            </span>
            <span className={`relative z-10 font-dm-sans transition-all ${isActive ? 'text-[#1A9E8C] text-xs font-bold' : 'text-[#8FA3B1] text-xs'}`}>
              {tab.label}
            </span>
          </motion.button>
        );
      })}
      </div>
    </div>
  );
}
