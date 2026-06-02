"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import confetti from "canvas-confetti";

export default function WordMatchGame() {
  const { setActiveGame, completeModule } = useChildStore();
  
  const levels = [
    { emoji: "🍎", options: ["Apple", "Banana", "Dog"], correct: "Apple" },
    { emoji: "🐈", options: ["Bird", "Cat", "Cow"], correct: "Cat" },
    { emoji: "🚗", options: ["Car", "Bus", "Train"], correct: "Car" }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  
  const level = levels[currentLevel];

  const handleSelect = (option) => {
    if (option === level.correct) {
      setFeedback("correct");
      if (currentLevel === levels.length - 1) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
          completeModule('m2'); // Complete word match module
          setActiveGame(null);
        }, 2000);
      } else {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
          setFeedback(null);
        }, 1200);
      }
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white/40 px-4 z-50 fixed inset-0">
      <button 
        onClick={() => setActiveGame(null)}
        className="absolute top-6 left-6 md:top-8 md:left-8 min-w-[56px] min-h-[56px] bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center font-nunito font-bold text-[#1B2D3E] shadow-sm border border-white hover:bg-white transition-colors"
      >
        ← Back
      </button>

      {/* Parent Info Button */}
      <button 
        onClick={() => setShowInfo(true)}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-2xl shadow-sm border border-[#3ECFB2]/30 hover:bg-white transition-colors z-50"
        title="For Parents: Science behind this game"
      >
        🔬
      </button>

      <div className="max-w-md w-full flex flex-col items-center">
        <h2 className="font-nunito font-bold text-2xl md:text-3xl text-[#1B2D3E] mb-8 text-center">
          What is this? 🤔
        </h2>

        <motion.div 
          key={currentLevel}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl shadow-sm border-2 border-[#3ECFB2]/20 flex items-center justify-center text-6xl md:text-8xl mb-12"
        >
          {level.emoji}
        </motion.div>

        <div className="w-full space-y-4">
          {level.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              disabled={feedback !== null}
              className={`w-full py-4 md:py-5 rounded-2xl font-nunito font-bold text-xl md:text-2xl border-2 transition-colors ${
                feedback === "correct" && option === level.correct ? "bg-[#3ECFB2]/20 border-[#3ECFB2] text-[#1A9E8C]" :
                feedback === "wrong" && option !== level.correct ? "bg-gray-100 border-gray-200 text-gray-400" :
                "bg-white border-white/60 shadow-sm text-[#1B2D3E] hover:border-[#3ECFB2]/50 hover:bg-white/90"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <div className="h-12 mt-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {feedback === "wrong" && (
              <motion.div
                key="wrong"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#8FA3B1] font-dm-sans font-bold md:text-lg"
              >
                Try again 💙
              </motion.div>
            )}
            {feedback === "correct" && (
              <motion.div
                key="correct"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-[#1A9E8C] font-dm-sans font-bold text-xl md:text-2xl"
              >
                Great job! 🌟
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Science / Research Modal */}
      <AnimatePresence>
        {showInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1B2D3E]/40 backdrop-blur-sm"
              onClick={() => setShowInfo(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative z-10 shadow-2xl border-4 border-[#3ECFB2]/20"
            >
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 font-bold"
              >
                ✕
              </button>
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-nunito font-bold text-2xl text-[#1B2D3E] mb-2">
                Backed by Science
              </h3>
              <p className="font-dm-sans text-[#56728A] leading-relaxed mb-6">
                This module uses <strong>Picture-to-Word Mapping</strong>. Clinical research indicates that combining visual supports (imageability) with textual pairing is a highly effective strategy for vocabulary acquisition and reading comprehension in individuals with autism.
              </p>
              <a 
                href="https://pubmed.ncbi.nlm.nih.gov/?term=visual+supports+vocabulary+autism" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#E8FAF6] text-[#1A9E8C] px-5 py-3 rounded-xl font-bold font-dm-sans border border-[#3ECFB2]/30 hover:bg-[#3ECFB2]/20 transition-colors w-full md:w-auto"
              >
                Read NIH Research Papers ↗
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
