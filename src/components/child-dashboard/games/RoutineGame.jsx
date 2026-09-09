"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import FaceEmotionTracker from "../../ai/FaceEmotionTracker";
import confetti from "canvas-confetti";
import { Calendar, Clock, CheckCircle2, Star, ArrowRight, Brain, Microscope, Sparkles } from "lucide-react";

export default function RoutineGame() {
  const { setActiveGame, completeModule, recordQuestionTelemetry } = useChildStore();

  const routines = [
    {
      title: "Morning Routine Sequence",
      prompt: "What comes FIRST when you wake up?",
      steps: [
        { id: "s1", label: "Brush Teeth 🪥", isCorrectFirst: true },
        { id: "s2", label: "Eat Breakfast 🥣", isCorrectFirst: false },
        { id: "s3", label: "Put on Shoes 👟", isCorrectFirst: false }
      ]
    },
    {
      title: "Bedtime Routine Sequence",
      prompt: "What comes FIRST before sleeping?",
      steps: [
        { id: "s1", label: "Read Story 📖", isCorrectFirst: false },
        { id: "s2", label: "Put on Pajamas 🛌", isCorrectFirst: true },
        { id: "s3", label: "Turn off Light 💡", isCorrectFirst: false }
      ]
    }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedStep, setSelectedStep] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const questionStartTime = useRef(Date.now());
  const currentEmotionRef = useRef("Focused");
  const routine = routines[currentLevel];

  useEffect(() => {
    questionStartTime.current = Date.now();
    setIsCorrect(null);
    setSelectedStep(null);
  }, [currentLevel]);

  const handleStepClick = (step) => {
    const solveTimeMs = Date.now() - questionStartTime.current;
    const correct = step.isCorrectFirst;
    setSelectedStep(step.id);
    setIsCorrect(correct);

    recordQuestionTelemetry({
      gameId: 'RoutineGame',
      questionIndex: currentLevel,
      questionText: routine.prompt,
      solveTimeMs,
      isCorrect: correct,
      usedPrompt: false,
      emotion: currentEmotionRef.current
    });

    if (correct) {
      if (currentLevel === routines.length - 1) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
          completeModule('m4');
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
        setSelectedStep(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#FFFBEB] px-4 z-50 fixed inset-0 overflow-y-auto">
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

      <div className="max-w-md w-full flex flex-col items-center pt-14">
        <div className="w-14 h-14 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 mb-3 shadow-xs">
          <Calendar size={32} />
        </div>

        <h2 className="font-nunito font-bold text-2xl text-[#1B2D3E] text-center mb-1">
          {routine.title}
        </h2>
        <p className="font-dm-sans text-sm text-slate-600 mb-6 text-center">
          {routine.prompt}
        </p>

        <div className="w-full space-y-3">
          {routine.steps.map((step) => {
            const isSel = selectedStep === step.id;
            let btnStyle = "bg-white border-amber-200 text-slate-800 shadow-sm";
            if (isSel) {
              btnStyle = isCorrect ? "bg-emerald-100 border-emerald-400 text-emerald-900" : "bg-rose-100 border-rose-400 text-rose-900";
            }

            return (
              <motion.button
                key={step.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStepClick(step)}
                className={`w-full p-4 rounded-2xl font-nunito font-bold text-lg border-2 text-left flex items-center justify-between transition-all ${btnStyle}`}
              >
                <span>{step.label}</span>
                {isSel && isCorrect && <CheckCircle2 size={24} className="text-emerald-600" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
