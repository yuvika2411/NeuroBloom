"use client";

import { useChildStore } from "../../stores/useChildStore";
import Link from "next/link";
import { Users, Flame, Sparkles } from "lucide-react";

export default function TopStrip() {
  const { child } = useChildStore();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-indigo-100/60 px-4 md:px-6 h-16 flex items-center justify-between shadow-[0_2px_10px_rgba(99,102,241,0.03)]">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <span className="flex items-center text-[#6366F1] p-1 rounded-lg bg-[#6366F1]/10">
          <Sparkles size={20} className="text-[#6366F1]" />
        </span>
        <h1 className="font-nunito font-black text-[#0F172A] text-xl tracking-tight hidden sm:block">
          SynaptiX
        </h1>
        <span className="text-[10px] font-bold text-[#6366F1] bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 hidden sm:inline">
          Kids
        </span>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/dashboard/parent" className="bg-white/70 border border-[#6366F1]/30 text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors rounded-xl px-3 py-1.5 text-xs font-bold shadow-xs flex items-center gap-1.5">
          <Users size={16} /> <span className="hidden sm:inline">Parent View</span>
        </Link>
        <div className="bg-amber-50 border border-amber-200 text-[#F59E0B] rounded-xl px-3 py-1.5 text-sm font-bold shadow-xs flex items-center gap-1">
          <Flame size={16} fill="currentColor" /> <span className="hidden sm:inline">{child.streak}</span>
        </div>

        {/* Child Profile */}
        <div className="flex items-center gap-2 bg-white/90 border border-indigo-100 pl-1.5 pr-3 py-1 rounded-2xl shadow-xs">
          <div className="bg-indigo-50 rounded-xl w-8 h-8 flex items-center justify-center text-sm shadow-inner border border-white">
            {child.avatarEmoji}
          </div>
          <div className="font-nunito font-bold text-[#0F172A] text-sm hidden sm:block">
            {child.name}
          </div>
        </div>
      </div>
    </div>
  );
}
