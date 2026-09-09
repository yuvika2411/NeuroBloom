"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import EmotionMatchGame from "../games/EmotionMatchGame";
import WordMatchGame from "../games/WordMatchGame";
import PuzzleGame from "../games/PuzzleGame";
import BallTrackingGame from "../games/BallTrackingGame";
import RoutineGame from "../games/RoutineGame";
import SoundMatchGame from "../games/SoundMatchGame";
import SensorySortGame from "../games/SensorySortGame";
import SocialStoryGame from "../games/SocialStoryGame";
import { useSoundEffect } from "../../../hooks/useSoundEffect";
import { Smile, Type, Puzzle, Crosshair, Calendar, Gamepad2, Brain, Microscope, Music, Palette, Users } from "lucide-react";

export default function PlayScreen() {
  const { activeGame, setActiveGame } = useChildStore();
  const [selectedResearch, setSelectedResearch] = useState(null);
  const playSound = useSoundEffect();

  const games = [
    { 
      id: "emotion-match", icon: <Smile size={56} className="text-[#3ECFB2]" strokeWidth={2.5} />, label: "Feelings", gradient: "from-[#E8FAF6] to-[#3ECFB2]/30", action: () => setActiveGame('emotion-match'),
      research: {
        title: "Facial Emotion Recognition (FER)",
        desc: "Research demonstrates that guided digital interventions significantly improve emotion identification, reaction time, and social cognition in children and adolescents with Autism Spectrum Disorder.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=facial+emotion+recognition+autism+computerized"
      }
    },
    { 
      id: "word-match", icon: <Type size={56} className="text-[#FF7E6B]" strokeWidth={2.5} />, label: "Words", gradient: "from-[#FFF0ED] to-[#FF7E6B]/30", action: () => setActiveGame('word-match'),
      research: {
        title: "Picture-to-Word Mapping & PECS AAC",
        desc: "Clinical research indicates that combining visual supports with textual pairing is a highly effective strategy for vocabulary acquisition and reading comprehension in individuals with autism.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=visual+supports+vocabulary+autism"
      }
    },
    { 
      id: "puzzle", icon: <Puzzle size={56} className="text-[#C4B5FD]" strokeWidth={2.5} />, label: "Puzzles", gradient: "from-[#F3F0FF] to-[#C4B5FD]/30", action: () => setActiveGame('puzzle'),
      research: {
        title: "Visual Pattern Matching",
        desc: "Research indicates that individuals with autism often demonstrate superior performance in perceiving local details and extracting visual patterns.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=autism+visual-spatial+pattern+matching"
      }
    },
    { 
      id: "routine", icon: <Calendar size={56} className="text-[#4A90D9]" strokeWidth={2.5} />, label: "Routine", gradient: "from-[#FFFBEB] to-[#FFB020]/30", action: () => setActiveGame('routine'),
      research: {
        title: "Executive Function & First-Then Puzzles",
        desc: "First-Then visual routine schedule training reduces transition-related anxiety and reinforces executive planning skills in autistic children.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=visual+schedules+autism+routine"
      }
    },
    { 
      id: "sound-match", icon: <Music size={56} className="text-[#A78BFA]" strokeWidth={2.5} />, label: "Sound Match", gradient: "from-[#FAF5FF] to-[#A78BFA]/30", action: () => setActiveGame('sound-match'),
      research: {
        title: "Auditory Sensory Processing",
        desc: "Matching environmental and vocal sound tones enhances auditory discrimination and sensory integration.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=auditory+integration+autism"
      }
    },
    { 
      id: "sensory-sort", icon: <Palette size={56} className="text-[#10B981]" strokeWidth={2.5} />, label: "Color Sort", gradient: "from-[#ECFDF5] to-[#10B981]/30", action: () => setActiveGame('sensory-sort'),
      research: {
        title: "Sensory Bubble Sorting & Self-Regulation",
        desc: "Interactive visual color sorting exercises provide rhythmic sensory regulation and fine motor precision.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=sensory+regulation+autism"
      }
    },
    { 
      id: "social-story", icon: <Users size={56} className="text-[#3B82F6]" strokeWidth={2.5} />, label: "Social Story", gradient: "from-[#EFF6FF] to-[#3B82F6]/30", action: () => setActiveGame('social-story'),
      research: {
        title: "ABA Social Story Interventions",
        desc: "Scenario-based choices reinforce Theory of Mind and positive peer interaction strategies in social contexts.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=social+stories+autism"
      }
    },
    { 
      id: "ball-tracker", icon: <Crosshair size={56} className="text-[#FFB020]" strokeWidth={2.5} />, label: "Focus Ball", gradient: "from-[#FFF8E6] to-[#FFB020]/30", action: () => setActiveGame('ball-tracker'),
      research: {
        title: "Smooth Pursuit Eye Movement",
        desc: "Computerized visual tracking exercises significantly improve response inhibition and sustained attention.",
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6404780/"
      }
    },
  ];

  if (activeGame === 'emotion-match') return <EmotionMatchGame />;
  if (activeGame === 'word-match') return <WordMatchGame />;
  if (activeGame === 'puzzle') return <PuzzleGame />;
  if (activeGame === 'routine') return <RoutineGame />;
  if (activeGame === 'sound-match') return <SoundMatchGame />;
  if (activeGame === 'sensory-sort') return <SensorySortGame />;
  if (activeGame === 'social-story') return <SocialStoryGame />;
  if (activeGame === 'ball-tracker') return <BallTrackingGame />;

  return (
    <div className="flex flex-col max-w-5xl mx-auto h-full px-4 md:px-8">
      <h1 className="font-nunito font-bold text-[24px] md:text-[32px] text-center pt-4 pb-4 text-[#1B2D3E]">
        8 Evidence-Backed ASD Games <Gamepad2 size={28} className="inline-block text-[#3ECFB2] ml-2 pb-1" />
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 flex-1 content-start pb-4">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              playSound();
              game.action();
            }}
            role="button"
            tabIndex={0}
            className={`rounded-3xl p-4 flex flex-col items-center justify-center min-h-[150px] bg-gradient-to-br ${game.gradient} border-2 border-white/60 shadow-xs group hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer relative z-10`}
          >
            {game.research && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedResearch(game.research);
                }}
                className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-sm hover:bg-white hover:scale-110 transition-all border border-white/60 shadow-xs"
                title="For Parents: Science behind this game"
              >
                <Microscope size={14} className="text-[#1B2D3E]" />
              </button>
            )}
            <div className="mb-2 group-hover:animate-bounce bg-white/70 backdrop-blur-sm w-[64px] h-[64px] rounded-[20px] shadow-xs border-2 border-white flex items-center justify-center transition-all">
              {game.icon}
            </div>
            <span className="font-nunito font-bold text-[#1B2D3E] text-sm md:text-base text-center leading-tight">
              {game.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center pb-6 mt-1">
        <div className="bg-white/60 backdrop-blur-md border border-[#3ECFB2]/30 px-4 py-2 rounded-2xl flex items-center gap-2 text-[#1A9E8C] font-dm-sans font-bold shadow-xs text-xs">
          <Microscope size={16} className="text-[#1A9E8C]" /> Every game includes webcam ML facial expression tracking
        </div>
      </div>

      {/* Science / Research Modal */}
      <AnimatePresence>
        {selectedResearch && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1B2D3E]/40 backdrop-blur-xs"
              onClick={() => setSelectedResearch(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative z-10 shadow-2xl border-4 border-[#3ECFB2]/20"
            >
              <button 
                onClick={() => setSelectedResearch(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 font-bold"
              >
                ✕
              </button>
              <div className="mb-3 text-[#4A90D9]"><Brain size={36} /></div>
              <h3 className="font-nunito font-bold text-2xl text-[#1B2D3E] mb-1">
                Backed by Clinical ASD Science
              </h3>
              <h4 className="font-nunito font-bold text-[#1A9E8C] mb-3">
                {selectedResearch.title}
              </h4>
              <p className="font-dm-sans text-sm text-[#56728A] leading-relaxed mb-6">
                {selectedResearch.desc}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
