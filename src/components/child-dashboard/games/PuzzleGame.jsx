"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import FaceEmotionTracker from "../../ai/FaceEmotionTracker";
import confetti from "canvas-confetti";
import { Star, Moon, Sun, Flower, Bug, Leaf, Gift, Heart, Puzzle, Brain, Microscope, HelpCircle, Music } from "lucide-react";

export default function PuzzleGame() {
  const { setActiveGame, completeModule, recordQuestionTelemetry } = useChildStore();
  
  const levels = [
    { target: <Star size={100} fill="currentColor" className="text-[#FFB020]" />, options: [<Star size={64} fill="currentColor" className="text-[#FFB020]" />, <Moon size={64} fill="currentColor" className="text-[#C4B5FD]" />, <Sun size={64} fill="currentColor" className="text-[#FF7E6B]" />], correct: 0, hint: "Match the bright 5-pointed star!" },
    { target: <Flower size={100} className="text-[#4A90D9]" />, options: [<Bug size={64} className="text-[#FF7E6B]" />, <Flower size={64} className="text-[#4A90D9]" />, <Leaf size={64} className="text-[#3ECFB2]" />], correct: 1, hint: "Match the blooming blue flower!" },
    { target: <Gift size={100} className="text-[#FFB020]" />, options: [<Gift size={64} className="text-[#FFB020]" />, <Heart size={64} className="text-[#FF7E6B]" />, <Music size={64} className="text-[#4A90D9]" />], correct: 0, hint: "Match the gift box with a bow!" }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [usedPrompt, setUsedPrompt] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const questionStartTime = useRef(Date.now());
  const currentEmotionRef = useRef("Focused");
  const level = levels[currentLevel];

  useEffect(() => {
    questionStartTime.current = Date.now();
    setUsedPrompt(false);
    setShowHint(false);
  }, [currentLevel]);

  const handleSelect = (idx) => {
    const solveTimeMs = Date.now() - questionStartTime.current;
    const isCorrect = idx === level.correct;

    recordQuestionTelemetry({
      gameId: 'PuzzleGame',
      questionIndex: currentLevel,
      questionText: `Pattern Match Level ${currentLevel + 1}`,
      solveTimeMs,
      isCorrect,
      usedPrompt,
      emotion: currentEmotionRef.current
    });

    if (isCorrect) {
      setFeedback("correct");
      if (currentLevel === levels.length - 1) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
          completeModule('m3');
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
    <div className="flex flex-col items-center justify-center h-full bg-[#F5F3FF] px-4 z-50 fixed inset-0 overflow-y-auto">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <button 
          onClick={() => setActiveGame(null)}
          className="min-w-[50px] min-h-[44px] px-4 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center font-nunito font-bold text-[#1B2D3E] shadow-sm border border-white hover:bg-white transition-colors"
        >
          ← Back
        </button>

        <FaceEmotionTracker 
          compact={true} 
          onEmotionUpdate={(res) => {
            currentEmotionRef.current = res.emotion;
          }} 
        />
      </div>

      <button 
        onClick={() => setShowInfo(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-[#3ECFB2]/30 hover:bg-white transition-colors z-50 text-[#1B2D3E]"
        title="Science behind this game"
      >
        <Microscope size={22} />
      </button>

      <div className="max-w-md w-full flex flex-col items-center pt-16">
        <h2 className="font-nunito font-bold text-2xl md:text-3xl text-[#1B2D3E] mb-4 text-center">
          Find the matching shape!
        </h2>

        {/* Silhouette / Target */}
        <motion.div 
          key={`target-${currentLevel}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-white/60 rounded-3xl shadow-sm border-2 border-white flex items-center justify-center text-6xl my-4 brightness-0 opacity-20"
        >
          {level.target}
        </motion.div>

        {/* Prompt Hint */}
        <div className="mb-6">
          {!showHint ? (
            <button
              onClick={() => { setUsedPrompt(true); setShowHint(true); }}
              className="px-3.5 py-1.5 bg-purple-100/80 text-purple-800 border border-purple-300 rounded-full font-nunito font-bold text-xs flex items-center gap-1.5 hover:bg-purple-200 transition-colors shadow-xs"
            >
              <HelpCircle size={14} /> Need a Hint? (Prompt Assist)
            </button>
          ) : (
            <div className="bg-purple-50 text-purple-900 border border-purple-300 px-4 py-2 rounded-xl text-xs font-dm-sans font-bold">
              💡 Hint: {level.hint}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 w-full">
          {level.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(idx)}
              disabled={feedback !== null}
              className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl border-2 transition-all ${
                feedback === "correct" && idx === level.correct ? "bg-[#3ECFB2]/20 border-[#3ECFB2] shadow-md" :
                feedback === "wrong" && idx !== level.correct ? "bg-gray-100 border-gray-200 opacity-40 scale-95" :
                "bg-white border-white/60 shadow-sm hover:border-[#3ECFB2]/50 hover:bg-white/90"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
