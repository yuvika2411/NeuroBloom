"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import FaceEmotionTracker from "../../ai/FaceEmotionTracker";
import confetti from "canvas-confetti";
import { Target, Trophy, RotateCcw, Brain, Microscope } from "lucide-react";

export default function BallTrackingGame() {
  const { setActiveGame, completeModule, recordQuestionTelemetry } = useChildStore();
  const [score, setScore] = useState(0);
  const [ballPos, setBallPos] = useState({ top: 40, left: 50 });
  const [ballSize, setBallSize] = useState(80);
  const [gameOver, setGameOver] = useState(false);
  
  const questionStartTime = useRef(Date.now());
  const currentEmotionRef = useRef("Focused");
  const targetCount = 5;

  useEffect(() => {
    questionStartTime.current = Date.now();
  }, [score]);

  const handleBallClick = () => {
    const clickLatencyMs = Date.now() - questionStartTime.current;

    recordQuestionTelemetry({
      gameId: 'BallTrackingGame',
      questionIndex: score,
      questionText: `Motor Ball Click ${score + 1}`,
      solveTimeMs: clickLatencyMs,
      isCorrect: true,
      usedPrompt: false,
      emotion: currentEmotionRef.current
    });

    const newScore = score + 1;
    setScore(newScore);

    if (newScore >= targetCount) {
      setGameOver(true);
      confetti({ particleCount: 80, spread: 60 });
      completeModule('m5');
    } else {
      // Move ball randomly
      const newTop = Math.floor(Math.random() * 60) + 20;
      const newLeft = Math.floor(Math.random() * 70) + 15;
      setBallPos({ top: newTop, left: newLeft });
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col overflow-hidden">
      <div className="p-4 flex items-center justify-between z-20">
        <button
          onClick={() => setActiveGame(null)}
          className="px-4 py-2 bg-white/20 text-white rounded-xl font-nunito font-bold backdrop-blur-md"
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

      {!gameOver ? (
        <div className="relative flex-1">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/80 text-teal-400 font-nunito font-bold px-6 py-2 rounded-full border border-teal-500/30 text-lg">
            Tap the Magic Focus Ball! ({score}/{targetCount})
          </div>

          <motion.button
            onClick={handleBallClick}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ top: `${ballPos.top}%`, left: `${ballPos.left}%` }}
            className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 shadow-[0_0_30px_rgba(62,207,178,0.8)] border-4 border-white cursor-pointer flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
          >
            <Target size={40} className="text-slate-900 animate-spin" />
          </motion.button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-white space-y-6">
          <Trophy size={80} className="text-amber-400" />
          <h2 className="text-3xl font-nunito font-bold">Great Hand-Eye Focus!</h2>
          <button
            onClick={() => setActiveGame(null)}
            className="px-8 py-4 bg-teal-500 rounded-2xl font-nunito font-bold text-xl shadow-lg"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
