"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import FaceEmotionTracker from "../../ai/FaceEmotionTracker";
import { Smile, Frown, Meh, Star, Gamepad2, Heart, Brain, PartyPopper, Microscope, HelpCircle, Timer } from "lucide-react";

const questions = [
  { face: <Smile size={120} className="text-[#FFB020]" />, prompt: 'How is this person feeling?', options: ['Happy', 'Sad', 'Angry'], correct: 0, hint: 'Notice the wide big smile!' },
  { face: <Frown size={120} className="text-[#C4B5FD]" />, prompt: 'What does this face show?', options: ['Surprised', 'Sad', 'Happy'], correct: 1, hint: 'The mouth turns downwards.' },
  { face: <Frown size={120} className="text-[#FF7E6B]" />, prompt: 'How is this person feeling?', options: ['Angry', 'Happy', 'Scared'], correct: 0, hint: 'The eyebrows are lowered down.' },
  { face: <Meh size={120} className="text-[#4A90D9]" />, prompt: 'What does this face show?', options: ['Sad', 'Happy', 'Surprised'], correct: 2, hint: 'Look at the neutral mouth shape.' },
  { face: <Smile size={120} className="text-[#3ECFB2]" />, prompt: 'How is this person feeling?', options: ['Angry', 'Excited', 'Tired'], correct: 1, hint: 'Cheerful bright expression!' },
];

export default function EmotionMatchGame() {
  const { setActiveGame, completeModule, recordQuestionTelemetry } = useChildStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [usedPrompt, setUsedPrompt] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const questionStartTime = useRef(Date.now());
  const currentEmotionRef = useRef("Focused");

  const q = questions[currentQ];

  useEffect(() => {
    questionStartTime.current = Date.now();
    setUsedPrompt(false);
    setShowHint(false);
  }, [currentQ]);

  const handleAnswer = (index) => {
    if (selectedOpt !== null) return;

    const solveTimeMs = Date.now() - questionStartTime.current;
    setSelectedOpt(index);
    const isCorrect = index === q.correct;
    
    // Send live telemetry to Parent Dashboard
    recordQuestionTelemetry({
      gameId: 'EmotionMatchGame',
      questionIndex: currentQ,
      questionText: q.prompt,
      solveTimeMs,
      isCorrect,
      usedPrompt,
      emotion: currentEmotionRef.current
    });

    if (isCorrect) {
      setLastAnswerCorrect(true);
      setScore(s => s + 1);
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ(c => c + 1);
          setLastAnswerCorrect(null);
          setSelectedOpt(null);
        } else {
          setShowResult(true);
          completeModule('m1');
        }
      }, 1500);
    } else {
      setLastAnswerCorrect(false);
      setTimeout(() => {
        setLastAnswerCorrect(null);
        setSelectedOpt(null);
      }, 1000);
    }
  };

  const handleUsePrompt = () => {
    setUsedPrompt(true);
    setShowHint(true);
  };

  const handlePlayAgain = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setLastAnswerCorrect(null);
    setSelectedOpt(null);
  };

  if (showResult) {
    return (
      <div className="absolute inset-0 bg-[#E8FAF6] z-50 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0, transition: { type: "spring", bounce: 0.6 } }}
          className="text-[80px] mb-4"
        >
          <PartyPopper size={80} className="text-[#FF7E6B]" />
        </motion.div>
        <h1 className="font-nunito font-bold text-[32px] text-[#1B2D3E] mb-2">Awesome Job!</h1>
        <p className="font-sora font-bold text-[24px] text-[#3ECFB2] mb-8">
          You got {score}/{questions.length} correct!
        </p>
        
        <div className="flex gap-2 mb-12 h-[60px]">
          {Array(score).fill(0).map((_, i) => (
            <motion.span 
              key={i} 
              className="text-4xl"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
            >
              <Star size={36} fill="currentColor" className="text-[#FFB020]" />
            </motion.span>
          ))}
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <button 
            onClick={handlePlayAgain}
            className="w-full min-h-[64px] bg-[#3ECFB2] text-white rounded-2xl font-nunito font-bold text-[20px] shadow-[0_6px_0_#1A9E8C] active:translate-y-1.5 active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <span>Play Again</span> <Gamepad2 size={24} />
          </button>
          <button 
            onClick={() => setActiveGame(null)}
            className="w-full min-h-[64px] bg-white/50 border-2 border-[#3ECFB2] text-[#1A9E8C] rounded-2xl font-nunito font-bold text-[20px] active:translate-y-1 transition-all"
          >
            Back to Play
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[#E8FAF6] z-50 flex flex-col overflow-y-auto">
      {/* Top Bar with AI Cam & Back */}
      <div className="p-4 flex items-center justify-between relative z-20">
        <button 
          onClick={() => setActiveGame(null)}
          className="px-4 py-2 bg-white/80 backdrop-blur-md border border-white/60 rounded-xl font-nunito font-bold text-[#1B2D3E] shadow-sm flex items-center gap-2"
        >
          <span>←</span> Back
        </button>

        {/* Live ML Face Tracker Compact Badge */}
        <FaceEmotionTracker 
          compact={true} 
          onEmotionUpdate={(res) => {
            currentEmotionRef.current = res.emotion;
          }} 
        />
      </div>

      {/* Parent Science Info Button */}
      <button 
        onClick={() => setShowInfo(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-[#3ECFB2]/30 hover:bg-white transition-all z-50 text-[#1B2D3E]"
        title="Science behind this game"
      >
        <Microscope size={22} />
      </button>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 my-2">
        {questions.map((_, i) => {
          let dotClass = "bg-[#8FA3B1]/30 w-4 h-4 rounded-full";
          if (i < currentQ) dotClass = "bg-[#3ECFB2] w-4 h-4 rounded-full";
          if (i === currentQ) dotClass = "bg-[#3ECFB2]/60 w-5 h-5 rounded-full ring-2 ring-[#3ECFB2]";
          return <div key={i} className={`transition-all ${dotClass}`} />;
        })}
      </div>

      <div className="flex-1 flex flex-col items-center px-6 max-w-md mx-auto w-full justify-center">
        {/* Face Display */}
        <motion.div
          key={currentQ}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={
            lastAnswerCorrect === false 
              ? { x: [0, -6, 6, -6, 6, 0], scale: 1, opacity: 1 } 
              : { scale: 1, opacity: 1, x: 0 }
          }
          transition={{ duration: lastAnswerCorrect === false ? 0.4 : 0.5, type: "spring" }}
          className="text-[120px] my-2 leading-none"
        >
          {q.face}
        </motion.div>

        <h2 className="font-nunito font-bold text-[22px] text-[#1B2D3E] text-center mb-4">
          {q.prompt}
        </h2>

        {/* Prompt Request Button */}
        <div className="mb-4">
          {!showHint ? (
            <button
              onClick={handleUsePrompt}
              className="px-3.5 py-1.5 bg-amber-100/80 text-amber-800 border border-amber-300 rounded-full font-nunito font-bold text-xs flex items-center gap-1.5 hover:bg-amber-200 transition-colors shadow-xs"
            >
              <HelpCircle size={14} /> Need a Hint? (ABA Prompt)
            </button>
          ) : (
            <div className="bg-amber-50 text-amber-900 border border-amber-300 px-4 py-2 rounded-xl text-xs font-dm-sans font-bold shadow-xs">
              💡 Hint: {q.hint}
            </div>
          )}
        </div>

        {/* Answer Buttons */}
        <div className="w-full space-y-3 relative mb-6">
          {q.options.map((opt, i) => {
            const isSelected = selectedOpt === i;
            let btnClass = "bg-white/70 border-white/80 shadow-sm";
            
            if (isSelected) {
              if (lastAnswerCorrect === true) btnClass = "bg-[#3ECFB2]/30 border-[#3ECFB2]";
              if (lastAnswerCorrect === false) btnClass = "bg-[#FFF4E3] border-[#FFA94D]";
            }

            return (
              <motion.div key={i} className="relative">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  animate={isSelected && lastAnswerCorrect === true ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  onClick={() => handleAnswer(i)}
                  className={`w-full min-h-[60px] rounded-2xl backdrop-blur-sm border-2 font-nunito font-bold text-[18px] text-[#1B2D3E] transition-colors relative z-10 ${btnClass}`}
                >
                  {opt}
                </motion.button>
              </motion.div>
            );
          })}
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
                Backed by ABA & Facial Emotion Science
              </h3>
              <p className="font-dm-sans text-sm text-[#56728A] leading-relaxed">
                Computerized Facial Emotion Recognition (FER) combined with ABA prompt fading tracks both reaction speed and spontaneity index, helping build core Theory of Mind and social cognition skills.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
