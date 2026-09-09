"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import FaceEmotionTracker from "../../ai/FaceEmotionTracker";
import confetti from "canvas-confetti";
import { Palette, Sparkles, CheckCircle2, Star, Brain, Microscope, Heart } from "lucide-react";

export default function SensorySortGame() {
  const { setActiveGame, completeModule, recordQuestionTelemetry } = useChildStore();

  const colorLevels = [
    { targetColor: "Red", hex: "#EF4444", bgClass: "bg-red-500", label: "Tap all RED sensory bubbles!" },
    { targetColor: "Blue", hex: "#3B82F6", bgClass: "bg-blue-500", label: "Tap all BLUE sensory bubbles!" },
    { targetColor: "Yellow", hex: "#EAB308", bgClass: "bg-yellow-500", label: "Tap all YELLOW sensory bubbles!" }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const questionStartTime = useRef(Date.now());
  const currentEmotionRef = useRef("Focused");
  const level = colorLevels[currentLevel];

  useEffect(() => {
    questionStartTime.current = Date.now();
    setPoppedCount(0);

    // Generate random bubbles with 3 matching target color and 3 dummy colors
    const colors = [
      { name: "Red", hex: "#EF4444", isTarget: level.targetColor === "Red" },
      { name: "Blue", hex: "#3B82F6", isTarget: level.targetColor === "Blue" },
      { name: "Yellow", hex: "#EAB308", isTarget: level.targetColor === "Yellow" },
      { name: "Green", hex: "#22C55E", isTarget: false },
      { name: "Purple", hex: "#A855F7", isTarget: false }
    ];

    const generated = [];
    for (let i = 0; i < 6; i++) {
      const isMatch = i % 2 === 0;
      const colObj = isMatch 
        ? colors.find(c => c.name === level.targetColor)
        : colors.filter(c => c.name !== level.targetColor)[i % 3];

      generated.push({
        id: i,
        colorName: colObj.name,
        hex: colObj.hex,
        isTarget: colObj.isTarget,
        x: Math.floor(Math.random() * 60) + 20,
        y: Math.floor(Math.random() * 50) + 25,
        popped: false
      });
    }
    setBubbles(generated);
  }, [currentLevel]);

  const handleBubbleClick = (b) => {
    if (b.popped) return;
    const solveTimeMs = Date.now() - questionStartTime.current;

    recordQuestionTelemetry({
      gameId: 'SensorySortGame',
      questionIndex: currentLevel,
      questionText: `Sensory Color ${level.targetColor}`,
      solveTimeMs,
      isCorrect: b.isTarget,
      usedPrompt: false,
      emotion: currentEmotionRef.current
    });

    if (b.isTarget) {
      setBubbles(prev => prev.map(item => item.id === b.id ? { ...item, popped: true } : item));
      const newPopped = poppedCount + 1;
      setPoppedCount(newPopped);

      if (newPopped >= 3) {
        if (currentLevel === colorLevels.length - 1) {
          confetti({ particleCount: 90, spread: 60 });
          setTimeout(() => {
            completeModule('m7');
            setActiveGame(null);
          }, 1800);
        } else {
          setTimeout(() => {
            setCurrentLevel(prev => prev + 1);
          }, 1200);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#ECFDF5] px-4 z-50 fixed inset-0 overflow-hidden">
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

      <div className="absolute top-16 text-center z-10">
        <h2 className="font-nunito font-bold text-2xl text-slate-800 flex items-center justify-center gap-2">
          <span>{level.label}</span>
          <span className="w-5 h-5 rounded-full inline-block border-2 border-white shadow-xs" style={{ backgroundColor: level.hex }} />
        </h2>
        <p className="font-dm-sans text-xs text-slate-600 mt-1">
          Popped: {poppedCount}/3
        </p>
      </div>

      {/* Floating Interactive Sensory Bubbles */}
      <div className="relative w-full max-w-lg h-[400px]">
        {bubbles.map((b) => {
          if (b.popped) return null;
          return (
            <motion.button
              key={b.id}
              onClick={() => handleBubbleClick(b)}
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2 + (b.id % 3) * 0.5,
                ease: "easeInOut"
              }}
              style={{ 
                left: `${b.x}%`, 
                top: `${b.y}%`,
                backgroundColor: b.hex 
              }}
              className="absolute w-20 h-20 rounded-full border-4 border-white/80 shadow-lg flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 text-white font-bold"
            >
              <Sparkles size={24} className="opacity-80" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
