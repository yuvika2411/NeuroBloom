"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import confetti from "canvas-confetti";
import { Star, Timer, Crosshair, Sparkles, Trophy, RefreshCw, Brain, Microscope } from "lucide-react";

export default function BallTrackingGame() {
  const { setActiveGame, completeModule } = useChildStore();
  
  const [score, setScore] = useState(0);
  const targetScore = 5;
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState('playing'); // playing, won, timeout
  const [showInfo, setShowInfo] = useState(false);
  
  const moveBall = () => {
    // Keep ball within 10% and 90% of screen to avoid edges
    setPosition({
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 80) + 10
    });
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    // Slow, smooth movement every 2.5 seconds to train visual tracking
    const moveInterval = setInterval(() => {
      moveBall();
    }, 2500);
    
    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(moveInterval);
      clearInterval(timerInterval);
    };
  }, [gameState]);

  const handleTap = () => {
    if (gameState !== 'playing') return;
    
    const newScore = score + 1;
    setScore(newScore);
    
    // Small confetti burst for immediate positive feedback
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 }, colors: ['#FDE047', '#3ECFB2'] });
    
    if (newScore >= targetScore) {
      setGameState('won');
      setTimeout(() => {
        completeModule('m4'); // Complete focus ball module
        setActiveGame(null);
      }, 2500);
    } else {
      // Move immediately after catching
      moveBall();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-900/10 px-4 z-50 fixed inset-0 overflow-hidden backdrop-blur-sm">
      <button 
        onClick={() => setActiveGame(null)}
        className="absolute top-6 left-6 md:top-8 md:left-8 min-w-[56px] min-h-[56px] z-50 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center font-nunito font-bold text-[#1B2D3E] shadow-sm border border-white hover:bg-white transition-colors"
      >
        ← Back
      </button>

      {/* Parent Info Button */}
      <button 
        onClick={() => setShowInfo(true)}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-2xl shadow-sm border border-white hover:bg-white transition-colors z-50"
        title="For Parents: Science behind this game"
      >
        <Microscope size={24} className="text-[#1B2D3E]" />
      </button>

      {/* Bottom Bar for Score and Timer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center font-nunito font-bold text-[#3ECFB2] shadow-lg border-2 border-white px-6 py-3 text-xl md:text-2xl min-w-[140px]">
          {score} / {targetScore} <Star size={20} className="inline-block text-[#FFB020]" fill="currentColor" />
        </div>
        <div className={`bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center font-dm-sans font-bold shadow-lg border-2 border-white px-6 py-3 text-xl md:text-2xl min-w-[120px] ${timeLeft <= 10 ? 'text-[#FF7E6B] animate-pulse' : 'text-[#8FA3B1]'}`}>
          <Timer size={20} className="inline-block mr-1 pb-0.5" /> {timeLeft}s
        </div>
      </div>
      
      <div className="absolute top-24 left-0 right-0 text-center pointer-events-none z-40">
        <h2 className="font-nunito font-bold text-2xl md:text-3xl text-[#1B2D3E] mb-2 bg-white/80 inline-block px-8 py-3 rounded-full backdrop-blur-md shadow-sm border border-white">
          Catch the glowing ball! <Crosshair size={24} className="inline-block text-[#FF7E6B] ml-2 pb-1" />
        </h2>
      </div>

      {gameState === 'playing' && (
        <motion.button
          onClick={handleTap}
          animate={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
          transition={{
            type: "tween",
            ease: "easeInOut", // Smooth pursuit
            duration: 2.5
          }}
          className="absolute w-24 h-24 md:w-32 md:h-32 -ml-12 -mt-12 md:-ml-16 md:-mt-16 rounded-full bg-[#FDE047] shadow-[0_0_60px_rgba(253,224,71,0.8)] border-4 border-white flex items-center justify-center text-5xl md:text-7xl cursor-pointer hover:scale-105 active:scale-95 transition-transform z-10"
          whileTap={{ scale: 0.8 }}
        >
          <Sparkles size={48} className="text-white" />
        </motion.button>
      )}

      {gameState === 'won' && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center shadow-lg border-2 border-[#3ECFB2]/30 z-50"
        >
          <div className="flex justify-center mb-4 text-[#FFB020]"><Trophy size={80} /></div>
          <h2 className="font-nunito font-bold text-2xl md:text-4xl text-[#1B2D3E]">
            Amazing Focus!
          </h2>
          <p className="font-dm-sans text-[#8FA3B1] mt-2 md:text-xl">
            You tracked every single move.
          </p>
        </motion.div>
      )}

      {gameState === 'timeout' && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center shadow-lg border-2 border-[#FF7E6B]/30 z-50 flex flex-col items-center"
        >
          <div className="flex justify-center mb-4 text-[#FF7E6B]"><Timer size={80} /></div>
          <h2 className="font-nunito font-bold text-2xl md:text-4xl text-[#1B2D3E]">
            Time's Up!
          </h2>
          <p className="font-dm-sans text-[#8FA3B1] mt-2 md:text-xl mb-6">
            You got {score} stars. Let's try again!
          </p>
          <button 
            onClick={() => {
              setScore(0);
              setTimeLeft(30);
              setGameState('playing');
              moveBall();
            }}
            className="bg-[#3ECFB2] text-white px-8 py-3 rounded-xl font-nunito font-bold text-xl shadow-[0_4px_0_#1A9E8C] active:translate-y-1 active:shadow-none transition-all"
          >
            <span className="flex items-center justify-center gap-2">Play Again <RefreshCw size={20} /></span>
          </button>
        </motion.div>
      )}

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
              <div className="mb-4 text-[#4A90D9]"><Brain size={40} /></div>
              <h3 className="font-nunito font-bold text-2xl text-[#1B2D3E] mb-2">
                Backed by Science
              </h3>
              <p className="font-dm-sans text-[#56728A] leading-relaxed mb-6">
                This module uses <strong>Smooth Pursuit Eye Movement</strong> training. Research demonstrates that computerized visual tracking exercises significantly improve response inhibition, cognitive control, and sustained attention (focus) in children with ADHD.
              </p>
              <a 
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6404780/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#E8FAF6] text-[#1A9E8C] px-5 py-3 rounded-xl font-bold font-dm-sans border border-[#3ECFB2]/30 hover:bg-[#3ECFB2]/20 transition-colors w-full md:w-auto"
              >
                Read NIH Research Paper ↗
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
