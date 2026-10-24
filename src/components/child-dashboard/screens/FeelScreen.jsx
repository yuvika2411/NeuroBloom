"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import { Wind, Flower, Sparkles, Heart, Smile, Meh, Frown, Moon } from "lucide-react";

function CalmingScreen({ onClose }) {
  const [phase, setPhase] = useState('inhale');

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(p => p === 'inhale' ? 'exhale' : 'inhale');
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-[#6366F1]/40 to-[#06B6D4]/20 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 px-4 py-2 bg-white/70 backdrop-blur-md rounded-2xl font-nunito font-bold text-[#0F172A] shadow-sm flex items-center gap-2 border border-white"
      >
        <span>←</span> Back
      </button>

      <motion.div
        className="w-48 h-48 rounded-full border-4 flex items-center justify-center mb-8"
        animate={{ 
          scale: [1, 1.4, 1], 
          backgroundColor: ['rgba(99,102,241,0.25)', 'rgba(6,182,212,0.3)', 'rgba(99,102,241,0.25)'],
          borderColor: ['rgba(99,102,241,0.5)', 'rgba(6,182,212,0.5)', 'rgba(99,102,241,0.5)']
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Wind size={64} className="text-[#6366F1]" />
      </motion.div>

      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="h-10 flex items-center justify-center mb-12"
      >
        <p className="font-nunito font-medium text-2xl text-[#0F172A]">
          {phase === 'inhale' ? <>Breathe in... <Sparkles size={24} className="inline-block text-[#A855F7] ml-2 mb-1" /></> : <>Breathe out... <Sparkles size={24} className="inline-block text-[#6366F1] ml-2 mb-1" /></>}
        </p>
      </motion.div>

      <p className="font-dm-sans text-[16px] text-[#0F172A]/70 absolute bottom-12">
        You're safe. Take your time. <Heart size={16} className="inline-block text-[#6366F1] ml-1 mb-0.5" />
      </p>
    </motion.div>
  );
}

export default function FeelScreen() {
  const { currentMood, setMood, child } = useChildStore();
  const [showCalm, setShowCalm] = useState(false);
  const [justSelected, setJustSelected] = useState(false);

  const moodIconMap = {
    '😄': <Smile size={36} className="text-[#F59E0B]" />,
    '😊': <Smile size={36} className="text-[#6366F1]" />,
    '😐': <Meh size={36} className="text-[#06B6D4]" />,
    '😕': <Frown size={36} className="text-[#F43F5E]" />,
    '😢': <Frown size={36} className="text-[#A855F7]" />,
  };

  const moods = [
    { id: 'great', emoji: '😄', label: 'Great!', bg: 'bg-[#FFF9C4]', border: 'border-[#FFF59D]', activeBg: 'bg-[#FFF9C4]', screenBg: '#FFF9C4' },
    { id: 'good', emoji: '😊', label: 'Good', bg: 'bg-[#EEF2FF]', border: 'border-[#6366F1]/50', activeBg: 'bg-[#EEF2FF]', screenBg: '#EEF2FF' },
    { id: 'ok', emoji: '😐', label: 'OK', bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]', activeBg: 'bg-[#EFF6FF]', screenBg: '#EFF6FF' },
    { id: 'notgreat', emoji: '😕', label: 'Not great', bg: 'bg-[#FFF3E0]', border: 'border-[#FFCC80]', activeBg: 'bg-[#FFF3E0]', screenBg: '#FFF3E0' },
    { id: 'sad', emoji: '😢', label: 'Sad', bg: 'bg-[#F3F0FF]', border: 'border-[#A855F7]', activeBg: 'bg-[#F3F0FF]', screenBg: '#F3F0FF' },
  ];

  const handleSelect = (m) => {
    setMood(m.id);
    setJustSelected(true);
    setTimeout(() => setJustSelected(false), 3000);
  };

  const activeMoodObj = moods.find(m => m.id === currentMood);

  return (
    <>
      <AnimatePresence>
        {showCalm && <CalmingScreen onClose={() => setShowCalm(false)} />}
      </AnimatePresence>

      <motion.div 
        className="flex flex-col items-center max-w-xl mx-auto h-full px-4 pb-8"
        animate={{ backgroundColor: activeMoodObj ? activeMoodObj.screenBg : 'transparent' }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-nunito font-bold text-[26px] text-[#0F172A] text-center pt-8 mb-8 leading-tight">
          How are you feeling right now?
        </h1>

        <div className="grid grid-cols-5 gap-2 w-full max-w-md mb-8">
          {moods.map((m) => {
            const isSelected = currentMood === m.id;
            
            return (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleSelect(m)}
                animate={isSelected ? { scale: 1.15 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-3xl p-2 flex flex-col items-center justify-center gap-2 border-2 min-h-[90px] w-full transition-colors relative z-10 ${
                  isSelected ? `${m.activeBg} ${m.border}` : 'bg-white/60 border-white/80'
                }`}
                style={isSelected ? { filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.4))' } : {}}
              >
                <div className="mb-1">{moodIconMap[m.emoji] || m.emoji}</div>
                <span className="font-dm-sans text-[11px] font-bold text-[#0F172A] text-center leading-none">
                  {m.label}
                </span>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {justSelected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 border border-indigo-100 shadow-sm"
            >
              <p className="font-nunito font-bold text-[20px] text-[#6366F1]">
                Thanks for telling us, {child.name}! <Heart size={20} className="inline-block text-[#6366F1] ml-1 mb-1" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setShowCalm(true)}
          className="mt-auto mb-4 bg-indigo-50 border-2 border-indigo-200 text-[#0F172A] font-nunito font-bold text-[18px] px-8 py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform w-full max-w-xs shadow-sm backdrop-blur-sm"
        >
          <span>Need a break?</span>
          <Moon size={24} className="text-[#6366F1]" />
        </button>
      </motion.div>
    </>
  );
}
