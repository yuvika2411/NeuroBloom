"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import FaceEmotionTracker from "../../ai/FaceEmotionTracker";
import confetti from "canvas-confetti";
import { Volume2, Music, Smile, Heart, Star, Brain, Microscope, HelpCircle, Sparkles, CloudRain, Dog, Laugh, HandClap } from "lucide-react";

export default function SoundMatchGame() {
  const { setActiveGame, completeModule, recordQuestionTelemetry } = useChildStore();

  const questions = [
    {
      soundName: "Happy Laughter",
      prompt: "Match the sound of someone laughing with joy!",
      spokenText: "Haha, so happy!",
      options: [
        { label: "Happy Laugh", icon: "😄", isCorrect: true },
        { label: "Barking Dog", icon: "🐶", isCorrect: false },
        { label: "Rain Falling", icon: "🌧️", isCorrect: false }
      ],
      hint: "Listen for the joyful laughter sound!"
    },
    {
      soundName: "Puppy Bark",
      prompt: "Match the sound of a playful friendly puppy!",
      spokenText: "Woof woof! Friendly puppy!",
      options: [
        { label: "Raindrops", icon: "🌧️", isCorrect: false },
        { label: "Playful Puppy", icon: "🐶", isCorrect: true },
        { label: "Clapping Hands", icon: "👏", isCorrect: false }
      ],
      hint: "Look for the cute brown puppy!"
    },
    {
      soundName: "Applause & Clapping",
      prompt: "Match the sound of cheering and clapping!",
      spokenText: "Yay! Clapping hands!",
      options: [
        { label: "Clapping Hands", icon: "👏", isCorrect: true },
        { label: "Happy Laugh", icon: "😄", isCorrect: false },
        { label: "Rain Falling", icon: "🌧️", isCorrect: false }
      ],
      hint: "Hands clapping together in celebration!"
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [usedPrompt, setUsedPrompt] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const questionStartTime = useRef(Date.now());
  const currentEmotionRef = useRef("Focused");
  const q = questions[currentQ];

  const playSound = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(q.spokenText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    questionStartTime.current = Date.now();
    setIsCorrect(null);
    setSelectedOpt(null);
    setUsedPrompt(false);
    setShowHint(false);
    playSound();
  }, [currentQ]);

  const handleOptionClick = (index, opt) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(index);
    const solveTimeMs = Date.now() - questionStartTime.current;
    const correct = opt.isCorrect;
    setIsCorrect(correct);

    recordQuestionTelemetry({
      gameId: 'SoundMatchGame',
      questionIndex: currentQ,
      questionText: `Sound Match: ${q.soundName}`,
      solveTimeMs,
      isCorrect: correct,
      usedPrompt,
      emotion: currentEmotionRef.current
    });

    if (correct) {
      if (currentQ === questions.length - 1) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
          completeModule('m6');
          setActiveGame(null);
        }, 2000);
      } else {
        setTimeout(() => {
          setCurrentQ(prev => prev + 1);
        }, 1400);
      }
    } else {
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedOpt(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#FAF5FF] px-4 z-50 fixed inset-0 overflow-y-auto">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <button 
          onClick={() => setActiveGame(null)}
          className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center font-nunito font-bold text-[#1B2D3E] shadow-sm border border-white hover:bg-white transition-colors"
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
        title="Science behind Auditory Sound Matching"
      >
        <Microscope size={22} />
      </button>

      <div className="max-w-md w-full flex flex-col items-center pt-16">
        <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center text-purple-600 mb-3 shadow-xs">
          <Music size={36} />
        </div>

        <h2 className="font-nunito font-bold text-2xl text-[#1B2D3E] text-center mb-1">
          Listen & Match Sound
        </h2>
        <p className="font-dm-sans text-sm text-slate-600 mb-4 text-center">
          {q.prompt}
        </p>

        {/* Play Sound Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playSound}
          className="px-6 py-3 bg-purple-600 text-white rounded-full font-nunito font-bold text-base shadow-md flex items-center gap-2 mb-6 hover:bg-purple-700 transition-colors"
        >
          <Volume2 size={22} className="animate-bounce" /> Replay Sound Tones
        </motion.button>

        {/* Prompt Assistance */}
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
              💡 Hint: {q.hint}
            </div>
          )}
        </div>

        <div className="w-full space-y-3">
          {q.options.map((opt, idx) => {
            const isSel = selectedOpt === idx;
            let btnStyle = "bg-white border-purple-200 text-slate-800 shadow-sm";
            if (isSel) {
              btnStyle = isCorrect ? "bg-emerald-100 border-emerald-400 text-emerald-900" : "bg-rose-100 border-rose-400 text-rose-900";
            }

            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionClick(idx, opt)}
                className={`w-full p-4 rounded-2xl font-nunito font-bold text-lg border-2 flex items-center justify-between transition-all ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{opt.icon}</span>
                  <span>{opt.label}</span>
                </div>
                {isSel && isCorrect && <Star size={24} className="text-amber-500 fill-amber-400" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
