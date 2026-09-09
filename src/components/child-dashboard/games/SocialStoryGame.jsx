"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import FaceEmotionTracker from "../../ai/FaceEmotionTracker";
import confetti from "canvas-confetti";
import { Users, Heart, Star, Brain, Microscope, Volume2, HelpCircle, CheckCircle2, Sparkles } from "lucide-react";

export default function SocialStoryGame() {
  const { setActiveGame, completeModule, recordQuestionTelemetry } = useChildStore();

  const stories = [
    {
      title: "Sharing Toys at the Playground 🛝",
      scenario: "Arjun is playing with a toy truck. A friend asks, 'Can I have a turn?' What should Arjun do?",
      spokenText: "Arjun is playing with a toy. A friend asks to share. What is the kind choice?",
      options: [
        { label: "Share and say 'Here you go!' 🤝", isCorrect: true },
        { label: "Hide the toy away 🙈", isCorrect: false }
      ],
      hint: "Sharing brings smiles and happy friends!"
    },
    {
      title: "Greeting a Teacher in the Morning 🏫",
      scenario: "Arjun walks into the classroom and sees Teacher Neha. What is the polite way to say hello?",
      spokenText: "Arjun enters class and sees his teacher. How should he say hello?",
      options: [
        { label: "Smile & say 'Good Morning!' 😊", isCorrect: true },
        { label: "Walk past without looking 🚶", isCorrect: false }
      ],
      hint: "Making eye contact and smiling is friendly!"
    }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [usedPrompt, setUsedPrompt] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const questionStartTime = useRef(Date.now());
  const currentEmotionRef = useRef("Focused");
  const story = stories[currentLevel];

  const speakStory = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(story.spokenText);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    questionStartTime.current = Date.now();
    setIsCorrect(null);
    setSelectedOpt(null);
    setUsedPrompt(false);
    setShowHint(false);
    speakStory();
  }, [currentLevel]);

  const handleOptionClick = (idx, opt) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    const solveTimeMs = Date.now() - questionStartTime.current;
    const correct = opt.isCorrect;
    setIsCorrect(correct);

    recordQuestionTelemetry({
      gameId: 'SocialStoryGame',
      questionIndex: currentLevel,
      questionText: story.title,
      solveTimeMs,
      isCorrect: correct,
      usedPrompt,
      emotion: currentEmotionRef.current
    });

    if (correct) {
      if (currentLevel === stories.length - 1) {
        confetti({ particleCount: 100, spread: 70 });
        setTimeout(() => {
          completeModule('m8');
          setActiveGame(null);
        }, 2000);
      } else {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
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
    <div className="flex flex-col items-center justify-center h-full bg-[#EFF6FF] px-4 z-50 fixed inset-0 overflow-y-auto">
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

      <div className="max-w-md w-full flex flex-col items-center pt-16">
        <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 mb-3 shadow-xs">
          <Users size={36} />
        </div>

        <h2 className="font-nunito font-bold text-2xl text-[#1B2D3E] text-center mb-1">
          {story.title}
        </h2>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-200 text-center my-4 relative">
          <p className="font-dm-sans text-sm text-slate-700 leading-relaxed">
            "{story.scenario}"
          </p>
          <button 
            onClick={speakStory} 
            className="mt-2 text-xs font-bold text-blue-600 inline-flex items-center gap-1 hover:underline"
          >
            <Volume2 size={14} /> Listen to Story
          </button>
        </div>

        {/* Prompt Assistance */}
        <div className="mb-4">
          {!showHint ? (
            <button
              onClick={() => { setUsedPrompt(true); setShowHint(true); }}
              className="px-3.5 py-1.5 bg-amber-100/80 text-amber-800 border border-amber-300 rounded-full font-nunito font-bold text-xs flex items-center gap-1.5 hover:bg-amber-200 transition-colors shadow-xs"
            >
              <HelpCircle size={14} /> Need a Hint? (Prompt Assist)
            </button>
          ) : (
            <div className="bg-amber-50 text-amber-900 border border-amber-300 px-4 py-2 rounded-xl text-xs font-dm-sans font-bold">
              💡 Hint: {story.hint}
            </div>
          )}
        </div>

        <div className="w-full space-y-3">
          {story.options.map((opt, idx) => {
            const isSel = selectedOpt === idx;
            let btnStyle = "bg-white border-blue-200 text-slate-800 shadow-sm";
            if (isSel) {
              btnStyle = isCorrect ? "bg-emerald-100 border-emerald-400 text-emerald-900" : "bg-rose-100 border-rose-400 text-rose-900";
            }

            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionClick(idx, opt)}
                className={`w-full p-4 rounded-2xl font-nunito font-bold text-base border-2 text-left flex items-center justify-between transition-all ${btnStyle}`}
              >
                <span>{opt.label}</span>
                {isSel && isCorrect && <CheckCircle2 size={24} className="text-emerald-600" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
