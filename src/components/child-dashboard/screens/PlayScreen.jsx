"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import EmotionMatchGame from "../games/EmotionMatchGame";
import WordMatchGame from "../games/WordMatchGame";
import PuzzleGame from "../games/PuzzleGame";
import BallTrackingGame from "../games/BallTrackingGame";
import { useSoundEffect } from "../../../hooks/useSoundEffect";

export default function PlayScreen() {
  const { activeGame, setActiveGame, setScreen } = useChildStore();
  const [selectedResearch, setSelectedResearch] = useState(null);
  const playSound = useSoundEffect();

  const games = [
    { 
      id: "emotion-match", emoji: "😊", label: "Feelings", gradient: "from-[#3ECFB2]/30 to-[#4A90D9]/20", action: () => setActiveGame('emotion-match'),
      research: {
        title: "Facial Emotion Recognition (FER)",
        desc: "Research demonstrates that guided digital interventions significantly improve emotion identification, reaction time, and social cognition in children and adolescents with Autism Spectrum Disorder.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=facial+emotion+recognition+autism+computerized"
      }
    },
    { 
      id: "word-match", emoji: "🔤", label: "Words", gradient: "from-[#C4B5FD]/40 to-[#4A90D9]/20", action: () => setActiveGame('word-match'),
      research: {
        title: "Picture-to-Word Mapping",
        desc: "Clinical research indicates that combining visual supports with textual pairing is a highly effective strategy for vocabulary acquisition and reading comprehension in individuals with autism.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=visual+supports+vocabulary+autism"
      }
    },
    { 
      id: "puzzle", emoji: "🧩", label: "Puzzles", gradient: "from-[#FFF4E3] to-[#FF7E6B]/15", action: () => setActiveGame('puzzle'),
      research: {
        title: "Visual Pattern Matching",
        desc: "Research indicates that individuals with autism often demonstrate superior performance in perceiving local details and extracting visual patterns. This game leverages that distinct cognitive profile to build confidence and working memory.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=autism+visual-spatial+pattern+matching"
      }
    },
    { 
      id: "ball-tracker", emoji: "🎯", label: "Focus Ball", gradient: "from-[#FDE047]/30 to-[#F97316]/20", action: () => setActiveGame('ball-tracker'),
      research: {
        title: "Smooth Pursuit Eye Movement",
        desc: "Research demonstrates that computerized visual tracking exercises significantly improve response inhibition, cognitive control, and sustained attention (focus) in children with ADHD.",
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6404780/"
      }
    },
    { id: "schedule", emoji: "📅", label: "Schedule", gradient: "from-[#E8FAF6] to-[#3ECFB2]/20", action: () => setScreen('schedule') },
  ];

  if (activeGame === 'emotion-match') {
    return <EmotionMatchGame />;
  }

  if (activeGame === 'word-match') {
    return <WordMatchGame />;
  }

  if (activeGame === 'puzzle') {
    return <PuzzleGame />;
  }

  if (activeGame === 'ball-tracker') {
    return <BallTrackingGame />;
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto h-full px-4 md:px-8">
      <h1 className="font-nunito font-bold text-[24px] md:text-[32px] text-center pt-6 pb-6 md:pb-10 text-[#1B2D3E]">
        Let's Play! 🎮
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 flex-1 content-start md:content-center pb-4">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              playSound();
              game.action();
            }}
            role="button"
            tabIndex={0}
            className={`rounded-3xl p-6 md:p-12 flex flex-col items-center justify-center min-h-[160px] md:min-h-[220px] bg-gradient-to-br ${game.gradient} border-2 border-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.06)] group hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer relative z-10`}
          >
            {game.research && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedResearch(game.research);
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-lg hover:bg-white hover:scale-110 transition-all border border-white/60 shadow-sm"
                title="For Parents: Science behind this game"
              >
                🔬
              </button>
            )}
            <span className="text-5xl md:text-[80px] mb-4 md:mb-6 block drop-shadow-md group-hover:animate-bounce">{game.emoji}</span>
            <span className="font-nunito font-bold text-[#1B2D3E] text-lg md:text-[24px]">
              {game.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center pb-8 mt-2">
        <div className="bg-white/60 backdrop-blur-md border border-[#3ECFB2]/30 px-5 md:px-6 py-3 rounded-2xl flex items-center gap-3 text-[#1A9E8C] font-dm-sans font-bold shadow-sm text-sm md:text-base">
          <span className="text-xl">🔬</span> All modules are backed by clinical ASD research
        </div>
      </div>

      {/* Science / Research Modal */}
      <AnimatePresence>
        {selectedResearch && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1B2D3E]/40 backdrop-blur-sm"
              onClick={() => setSelectedResearch(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative z-10 shadow-2xl border-4 border-[#3ECFB2]/20"
            >
              <button 
                onClick={() => setSelectedResearch(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 font-bold"
              >
                ✕
              </button>
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-nunito font-bold text-2xl text-[#1B2D3E] mb-2">
                Backed by Science
              </h3>
              <h4 className="font-nunito font-bold text-[#1A9E8C] mb-3">
                {selectedResearch.title}
              </h4>
              <p className="font-dm-sans text-[#56728A] leading-relaxed mb-6">
                {selectedResearch.desc}
              </p>
              <a 
                href={selectedResearch.link}
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
