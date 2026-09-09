"use client";

import { useParentStore } from "../../stores/useParentStore";
import { Hand, Activity } from "lucide-react";

export default function HeaderBar() {
  const { parent, liveChildStatus } = useParentStore();

  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const dateString = today.toLocaleDateString('en-GB', options);

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="font-nunito font-bold text-2xl text-[#1B2D3E] mb-1 flex items-center gap-2">
          <span>Good morning, {parent.name}</span>
          <Hand size={24} className="text-[#FFB020]" />
        </h1>
        <div className="font-dm-sans text-xs text-[#8FA3B1] flex items-center gap-2">
          <span>{dateString}</span>
          <span>•</span>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Sync Active
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-xs font-nunito font-bold text-teal-800">
          <Activity size={14} className="text-teal-600 animate-pulse" />
          <span>Arjun is Online: {liveChildStatus.currentEmotion || "Focused"}</span>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#4A90D9]/20 flex items-center justify-center text-[#4A90D9] font-bold text-sm border-2 border-[#3ECFB2] cursor-pointer shadow-xs">
          {parent.avatarInitials}
        </div>
      </div>
    </header>
  );
}
