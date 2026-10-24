"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import Link from "next/link";
import { Star, User, Puzzle, Brain, Target, Trophy, MessageCircle, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden flex items-center bg-[#F4F6FC]">
      {/* Background Blobs & Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#6366F1]/15 blob-bg blur-3xl z-0 pointer-events-none" />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#06B6D4]/15 blob-bg blur-3xl z-0 pointer-events-none"
        style={{ animationDirection: "reverse", animationDuration: "25s" }}
      />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#6366F1_1px,transparent_1px),linear-gradient(to_bottom,#6366F1_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-[20%] right-[45%] text-[#F59E0B] text-3xl z-0"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
        className="absolute bottom-[30%] left-[45%] text-[#06B6D4] text-2xl z-0"
      >
        ✦
      </motion.div>

      {/* Floating Circles */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 90, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] w-16 h-16 border-4 border-[#6366F1]/20 rounded-full z-0"
      />
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -90, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[5%] w-24 h-24 border-4 border-[#A855F7]/25 rounded-full z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row items-center gap-8 lg:gap-16"
        >
          {/* Left Content */}
          <div className="w-full md:w-[55%] flex flex-col items-start text-left relative z-20">
            <motion.div variants={fadeUp} className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-bold text-indigo-700 mb-4 shadow-xs">
                <Sparkles size={14} className="text-[#6366F1]" />
                <span>Next-Generation Adaptive Digital Therapy</span>
              </div>
              <h1 className="font-nunito font-extrabold text-5xl md:text-[64px] leading-[1.05] text-[#0F172A] mb-6 tracking-tight">
                Where Every Child's Mind Reaches for the{" "}
                <span className="relative inline-block text-[#6366F1]">
                  Stars
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#F59E0B]"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 15 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-dm-sans text-lg md:text-xl text-[#64748B] mb-10 max-w-lg leading-relaxed font-medium">
                Ditch the cold clinical feeling. SynaptiX's game-based cognitive therapy feels like
                empowering playtime, backed by world-class ABA behavioral science.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 w-full sm:w-auto"
            >
              <Link href="/dashboard" className="w-full sm:w-auto">
                <button className="clay-btn-primary text-lg px-8 py-4 w-full text-center">
                  Start Free Trial
                </button>
              </Link>
              <button className="ghost-btn text-lg flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto bg-white/70 backdrop-blur-sm border-indigo-200">
                <span className="bg-[#6366F1] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  ▶
                </span>
                Watch SynaptiX Demo
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-dm-sans text-[#0F172A] font-bold"
            >
              <span className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#6366F1] border-2 border-[#F4F6FC]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#06B6D4] border-2 border-[#F4F6FC]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#A855F7] border-2 border-[#F4F6FC]"></div>
                </div>
                500+ Families on SynaptiX
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F59E0B] flex items-center"><Star size={20} fill="currentColor" /></span> 4.9/5 Clinical Rating
              </span>
            </motion.div>
          </div>

          {/* Right Visual - Dynamic Bento Collage */}
          <div className="w-full md:w-[45%] relative mt-16 md:mt-0 h-[500px] md:h-[650px] flex items-center justify-center">

            {/* New Back Card - Progress Chart */}
            <motion.div
              className="absolute z-10 w-[240px] md:w-[280px] top-[15%] left-[-10%] md:left-[-7%] bg-white/75 backdrop-blur-md border border-indigo-100 rounded-[24px] p-5 shadow-lg"
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ rotate: "-8deg" }}
            >
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">Weekly Milestones</div>
              <div className="flex items-end gap-2 h-16">
                <div className="w-1/4 bg-indigo-50 h-[40%] rounded-t-md relative"><div className="absolute -top-6 w-full text-center text-[10px] text-[#64748B] font-bold">M</div></div>
                <div className="w-1/4 bg-indigo-50 h-[60%] rounded-t-md relative"><div className="absolute -top-6 w-full text-center text-[10px] text-[#64748B] font-bold">T</div></div>
                <div className="w-1/4 bg-[#6366F1] h-[100%] rounded-t-md relative shadow-[0_0_12px_rgba(99,102,241,0.4)]"><div className="absolute -top-6 w-full text-center text-[10px] text-[#6366F1] font-bold">W</div></div>
                <div className="w-1/4 bg-indigo-50 h-[80%] rounded-t-md relative"><div className="absolute -top-6 w-full text-center text-[10px] text-[#64748B] font-bold">T</div></div>
              </div>
            </motion.div>

            {/* Center Main Card */}
            <motion.div
              variants={fadeUp}
              className="absolute z-20 w-[300px] md:w-[360px] bg-white backdrop-blur-2xl border-2 border-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_rgba(15,23,42,0.12)]"
              style={{ rotate: "-2deg" }}
            >
              {/* Header Gradient Area */}
              <div className="bg-gradient-to-r from-[#6366F1] to-[#06B6D4] p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] bg-[length:12px_12px]"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-lg border-2 border-white/50">
                    <User size={36} className="text-[#6366F1]" />
                  </div>
                  <div>
                    <div className="font-nunito font-extrabold text-white text-2xl leading-tight drop-shadow-sm">Leo's Journey</div>
                    <div className="font-dm-sans text-sm text-white/95 font-medium tracking-wide bg-black/15 px-3 py-1 rounded-full inline-block mt-2 shadow-sm">ASD & ADHD Path</div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="p-5 bg-slate-50/80 rounded-2xl border border-indigo-50 shadow-xs relative">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Today's Module</span>
                    <span className="flex items-center gap-1.5 bg-indigo-50 px-2 py-1 rounded-md text-[10px] text-[#4F46E5] font-bold border border-indigo-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] animate-pulse"></span> IN PROGRESS
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1]/15 to-[#A855F7]/15 flex items-center justify-center border border-white shadow-xs"><Puzzle size={32} className="text-[#6366F1]" /></div>
                    <div>
                      <div className="font-bold text-[#0F172A] text-lg">Pattern Recognition</div>
                      <div className="text-xs text-[#64748B] font-medium mt-1 flex items-center gap-1">
                        <span className="flex items-center text-[#6366F1]"><Brain size={16} /></span> Cognitive & Focus
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-[#64748B] mb-3">
                    <span>Attention Span Goal</span>
                    <span className="text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-md shadow-xs border border-indigo-100">12 mins</span>
                  </div>
                  <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden shadow-inner relative border border-white">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    >
                      <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)] animate-[scroll_20s_linear_infinite]"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Top Right Floating Card - High Contrast ADHD Mode */}
            <motion.div
              className="absolute z-30 top-[5%] right-[-5%] md:right-[-18%] w-[210px] bg-[#0F172A] border-2 border-indigo-500/30 rounded-2xl p-5 shadow-[0_16px_32px_rgba(15,23,42,0.4)]"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ rotate: "4deg" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/20 text-indigo-400 w-8 h-8 rounded-lg flex items-center justify-center border border-indigo-500/50 shadow-inner"><Target size={18} /></div>
                  <div className="font-nunito font-bold text-white text-base">ADHD Mode</div>
                </div>
                {/* Toggle switch UI */}
                <div className="w-9 h-5 bg-[#6366F1] rounded-full p-0.5 shadow-[0_0_8px_rgba(99,102,241,0.4)]">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-4 shadow-sm"></div>
                </div>
              </div>
              <div className="font-dm-sans text-xs text-slate-400 font-medium leading-relaxed mt-2 border-t border-white/10 pt-3">
                Sensory stimulation <span className="text-white">optimized</span> for focus.
              </div>
            </motion.div>

            {/* Bottom Right Floating Pill - Achievement */}
            <motion.div
              className="absolute z-30 bottom-[5%] right-[0%] md:right-[-5%] bg-white/95 backdrop-blur-md border-2 border-white rounded-full py-2.5 px-4 shadow-[0_12px_24px_rgba(0,0,0,0.08)] flex items-center gap-2"
              animate={{ y: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
              style={{ rotate: "-3deg" }}
            >
              <div className="text-[#F59E0B]"><Trophy size={24} /></div>
              <div className="font-nunito font-bold text-[#0F172A] text-sm tracking-wide">SynaptiX Star!</div>
            </motion.div>

            {/* Bottom Left Floating Pill - Vibrant ABA Skill */}
            <motion.div
              className="absolute z-30 bottom-[12%] left-[-5%] md:left-[-20%] bg-gradient-to-r from-[#F43F5E] to-[#FB7185] border-2 border-white rounded-full py-4 px-6 shadow-[0_16px_32px_rgba(244,63,94,0.25)] flex items-center gap-4"
              animate={{ y: [8, -8, 8] }}
              transition={{
                repeat: Infinity,
                duration: 5.5,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{ rotate: "-5deg" }}
            >
              <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm border border-white/40">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-[10px] uppercase tracking-wider text-white/90 font-bold">
                  ABA Target
                </div>
                <div className="font-nunito font-bold text-white text-sm leading-tight drop-shadow-sm">
                  Speech & Social
                </div>
              </div>
            </motion.div>

            {/* Background Aesthetic Blur Shape */}
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[400px] aspect-square bg-gradient-to-tr from-[#6366F1] via-[#06B6D4] to-[#A855F7] rounded-full blur-[80px] opacity-25 mix-blend-multiply"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
