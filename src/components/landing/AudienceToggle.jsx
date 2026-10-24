"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import { User, Flame, Smile, Puzzle, Rocket, Star, BarChart3, Calendar, Settings, Pause } from "lucide-react";

export default function AudienceToggle() {
  const [activeTab, setActiveTab] = useState("parents");

  const content = {
    parents: {
      headline: "Everything you need to stay close to your child's growth",
      body: "See your child's mood curve, engagement streaks, and module progress — all in one beautiful SynaptiX dashboard.",
      features: ["📧 Daily summary insights", "📈 Real-time mood timeline", "🏆 Skill milestones", "📝 Therapist notes & chat"],
      mockup: (
        <div className="relative mx-auto w-[280px] h-[560px] bg-white rounded-[40px] border-[12px] border-[#0F172A] shadow-2xl overflow-hidden flex flex-col">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0F172A] rounded-b-3xl z-20"></div>

          {/* App Header */}
          <div className="bg-gradient-to-r from-[#6366F1] to-[#06B6D4] pt-12 pb-6 px-6 text-white relative">
            <div className="flex justify-between items-center mb-4">
              <div className="font-nunito font-bold text-lg">Leo's Overview</div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl"><User size={20} /></div>
            </div>
            <div className="bg-white/20 rounded-2xl p-3 backdrop-blur-sm border border-white/30 flex items-center gap-3">
              <span className="text-[#F59E0B]"><Flame size={24} /></span>
              <div>
                <div className="text-xs text-white/80 font-bold uppercase tracking-wider">Current Streak</div>
                <div className="text-xl font-bold">7 Days!</div>
              </div>
            </div>
          </div>

          {/* App Body */}
          <div className="flex-1 bg-[#F8FAFC] p-5 space-y-4">
            <div className="text-sm font-bold text-[#0F172A] mb-2">Today's Progress</div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50">
              <div className="flex justify-between text-xs text-[#64748B] font-bold mb-2">
                <span>Attention Span</span>
                <span className="text-[#6366F1]">12m / 15m</span>
              </div>
              <div className="w-full h-2 bg-indigo-50 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-[#6366F1] rounded-full"></div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 flex flex-col items-center justify-center gap-2">
                <span className="text-[#F59E0B]"><Smile size={24} /></span>
                <span className="text-xs font-bold text-[#0F172A]">Joyful</span>
              </div>
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 flex flex-col items-center justify-center gap-2">
                <span className="text-[#06B6D4]"><Puzzle size={24} /></span>
                <span className="text-xs font-bold text-[#0F172A]">Pattern</span>
              </div>
            </div>
          </div>

          {/* App Bottom Nav */}
          <div className="h-16 bg-white border-t border-slate-100 flex justify-around items-center px-4">
            <div className="w-10 h-10 rounded-full bg-[#6366F1]/15 text-[#6366F1] flex items-center justify-center"><BarChart3 size={20} /></div>
            <div className="w-10 h-10 rounded-full text-[#64748B] flex items-center justify-center"><Calendar size={20} /></div>
            <div className="w-10 h-10 rounded-full text-[#64748B] flex items-center justify-center"><Settings size={20} /></div>
          </div>
        </div>
      )
    },
    children: {
      headline: "Therapy that feels like an inspiring celestial adventure",
      body: "A high-quality, adaptive game environment where every star and puzzle is dynamically tailored to your child's developmental rhythm.",
      features: ["🎮 Immersive worlds", "🧩 Adaptive difficulty", "🚫 Zero clinical pressure", "🎁 Built-in rewards & stars"],
      mockup: (
        <div className="relative mx-auto w-full max-w-[500px] h-[320px] bg-[#0F172A] rounded-[32px] border-[12px] border-[#0F172A] shadow-2xl overflow-hidden mt-8">
          {/* Camera Hole */}
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full z-20 hidden md:block"></div>

          {/* Game Screen Content */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B4B] via-[#312E81] to-[#4338CA] overflow-hidden">
            {/* Celestial Star */}
            <div className="absolute top-6 right-10 w-16 h-16 bg-[#F59E0B] rounded-full shadow-[0_0_40px_rgba(245,158,11,0.8)]"></div>

            {/* Star clouds */}
            <div className="absolute top-10 left-8 w-20 h-8 bg-white/20 rounded-full blur-[2px]"></div>
            <div className="absolute top-16 left-32 w-16 h-6 bg-white/10 rounded-full blur-[2px]"></div>

            {/* Game Landscape */}
            <div className="absolute bottom-0 w-[150%] h-[120px] bg-[#06B6D4] rounded-t-[100%] left-[-25%] border-t-8 border-[#0891B2]"></div>

            {/* Character */}
            <motion.div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-2xl border-4 border-[#0F172A] shadow-lg flex items-center justify-center text-4xl"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Rocket size={36} className="text-[#6366F1]" />
            </motion.div>

            {/* Collectibles */}
            <motion.div className="absolute bottom-24 right-20 text-3xl" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}><Star size={28} className="text-[#F59E0B]" fill="currentColor" /></motion.div>
            <motion.div className="absolute bottom-32 left-24 text-3xl" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }}><Star size={28} className="text-[#F59E0B]" fill="currentColor" /></motion.div>

            {/* Game UI Overlay */}
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/30 text-white font-bold text-sm flex items-center gap-2">
              <span className="text-[#F59E0B]"><Star size={16} fill="currentColor" /></span> 1,240
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white">
              <Pause size={20} />
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-dm-sans text-[#4F46E5] font-semibold mb-3 block text-lg bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
            Who It's For
          </span>
          <h2 className="font-nunito font-bold text-3xl md:text-[38px] text-[#0F172A] mb-10">
            Built for the Whole Support Circle
          </h2>

          {/* Toggle */}
          <div className="flex p-1 bg-indigo-50 rounded-full border border-indigo-100">
            <button
              onClick={() => setActiveTab("parents")}
              className={`px-6 py-2.5 rounded-full font-dm-sans font-bold text-sm md:text-base transition-all duration-300 ${activeTab === "parents"
                  ? "bg-[#6366F1] text-white shadow-[0_4px_0_#3730A3]"
                  : "text-[#64748B] hover:text-[#6366F1]"
                }`}
            >
              For Parents
            </button>
            <button
              onClick={() => setActiveTab("children")}
              className={`px-6 py-2.5 rounded-full font-dm-sans font-bold text-sm md:text-base transition-all duration-300 ${activeTab === "children"
                  ? "bg-[#6366F1] text-white shadow-[0_4px_0_#3730A3]"
                  : "text-[#64748B] hover:text-[#6366F1]"
                }`}
            >
              For Children
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center gap-12 absolute inset-0 w-full"
            >
              {/* Left Content */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="font-nunito font-bold text-3xl text-[#0F172A] mb-4">
                  {content[activeTab].headline}
                </h3>
                <p className="font-dm-sans text-lg text-[#64748B] mb-8 leading-relaxed max-w-lg">
                  {content[activeTab].body}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {content[activeTab].features.map((feature, idx) => (
                    <div key={idx} className="bg-slate-50 border border-indigo-50 rounded-xl px-4 py-3 font-dm-sans text-[#0F172A] font-medium flex items-center shadow-xs">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Mockup */}
              <div className="w-full md:w-1/2 flex justify-center">
                {content[activeTab].mockup}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
