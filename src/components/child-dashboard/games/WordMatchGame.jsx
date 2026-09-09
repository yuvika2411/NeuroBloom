"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import FaceEmotionTracker from "../../ai/FaceEmotionTracker";
import confetti from "canvas-confetti";
import { Apple, Cat, Car, HelpCircle, Heart, Star, Brain, Microscope, Volume2, Sparkles } from "lucide-react";

export default function WordMatchGame() {
  const { setActiveGame, completeModule, recordQuestionTelemetry } = useChildStore();
  
  const levels = [
    { icon: <Apple size={100} className="text-[#FF7E6B]" />, options: ["Apple", "Banana", "Dog"], correct: "Apple", hint: "A delicious red fruit!" },
    { icon: <Cat size={100} className="text-[#FFB020]" />, options: ["Bird", "Cat", "Cow"], correct: "Cat", hint: "A soft pet that says Meow!" },
    { icon: <Car size={100} className="text-[#4A90D9]" />, options: ["Car", "Bus", "Train"], correct: "Car", hint: "A vehicle with 4 wheels!" }
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
    speakWord(level.correct);
  }, [currentLevel]);

  const speakWord = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = (option) => {
    const solveTimeMs = Date.now() - questionStartTime.current;
    const isCorrect = option === level.correct;

    speakWord(option);

    recordQuestionTelemetry({
      gameId: 'WordMatchGame',
      questionIndex: currentLevel,
      questionText: `AAC Match: ${level.correct}`,
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
          completeModule('m2');
          setActiveGame(null);
        }, 2000);
      } else {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
          setFeedback(null);
        }, 1400);
      }
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#F0F9FF] px-4 z-50 fixed inset-0 overflow-y-auto">
      {/* Top Header Bar */}
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

      {/* Science Info Button */}
      <button 
        onClick={() => setShowInfo(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-[#3ECFB2]/30 hover:bg-white transition-colors z-50 text-[#1B2D3E]"
        title="Science behind this PECS AAC game"
      >
        <Microscope size={22} />
      </button>

      <div className="max-w-md w-full flex flex-col items-center pt-16">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="font-nunito font-bold text-2xl md:text-3xl text-[#1B2D3E] text-center">
            Match the Symbol
          </h2>
          <button 
            onClick={() => speakWord(level.correct)} 
            className="p-2 rounded-full bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition-colors"
            title="Listen to pronunciation"
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* Symbol Display */}
        <motion.div 
          key={currentLevel}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-36 h-36 bg-white rounded-3xl shadow-md border-2 border-[#3ECFB2]/30 flex items-center justify-center text-7xl my-6"
        >
          {level.icon}
        </motion.div>

        {/* ABA Prompt Hint Toggle */}
        <div className="mb-6">
          {!showHint ? (
            <button
              onClick={() => { setUsedPrompt(true); setShowHint(true); }}
              className="px-3.5 py-1.5 bg-amber-100/80 text-amber-800 border border-amber-300 rounded-full font-nunito font-bold text-xs flex items-center gap-1.5 hover:bg-amber-200 transition-colors shadow-xs"
            >
              <HelpCircle size={14} /> Need a Hint? (Prompt Assist)
            </button>
          ) : (
            <div className="bg-amber-50 text-amber-900 border border-amber-300 px-4 py-2 rounded-xl text-xs font-dm-sans font-bold">
              💡 Hint: {level.hint}
            </div>
          )}
        </div>

        {/* AAC Word Options */}
        <div className="w-full space-y-3">
          {level.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              disabled={feedback !== null}
              className={`w-full py-4 rounded-2xl font-nunito font-bold text-xl border-2 transition-colors flex items-center justify-center gap-2 ${
                feedback === "correct" && option === level.correct ? "bg-[#3ECFB2]/20 border-[#3ECFB2] text-[#1A9E8C]" :
                feedback === "wrong" && option !== level.correct ? "bg-gray-100 border-gray-200 text-gray-400" :
                "bg-white border-white/60 shadow-sm text-[#1B2D3E] hover:border-[#3ECFB2]/50 hover:bg-white/90"
              }`}
            >
              <span>{option}</span>
              <Volume2 size={16} className="text-slate-400" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Science Modal */}
      <AnimatePresence>
        {showInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1B2D3E]/40 backdrop-blur-xs"
              onClick={() => setShowInfo(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full relative z-10 shadow-2xl border-4 border-[#3ECFB2]/20 space-y-4"
            >
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
              <div className="text-[#4A90D9]"><Brain size={36} /></div>
              <h3 className="font-nunito font-bold text-2xl text-[#1B2D3E]">
                Backed by PECS & AAC Speech Research
              </h3>
              <p className="font-dm-sans text-sm text-[#56728A] leading-relaxed">
                Picture Exchange Communication System (PECS) combined with natural speech synthesis significantly accelerates functional vocabulary acquisition and unprompted expressive communication in non-verbal and verbal autistic individuals.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
