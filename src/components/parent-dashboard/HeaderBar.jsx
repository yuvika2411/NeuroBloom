"use client";

import { useParentStore } from "../../stores/useParentStore";
import { Hand, Activity } from "lucide-react";

export default function HeaderBar() {
  const { parent, liveChildStatus } = useParentStore();

  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const dateString = today.toLocaleDateString('en-GB', options);

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-indigo-100/60 px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="font-nunito font-bold text-2xl text-[#0F172A] mb-1 flex items-center gap-2">
          <span>Good morning, {parent.name}</span>
          <Hand size={24} className="text-[#F59E0B]" />
        </h1>
        <div className="font-dm-sans text-xs text-[#64748B] flex items-center gap-2">
          <span>{dateString}</span>
          <span>•</span>
          <span className="text-indigo-600 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            SynaptiX Live Sync Active
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-nunito font-bold text-indigo-900 shadow-xs">
          <Activity size={14} className="text-indigo-600 animate-pulse" />
          <span>Arjun is Online: {liveChildStatus.currentEmotion || "Focused"}</span>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1]/20 to-[#A855F7]/20 flex items-center justify-center text-[#4F46E5] font-bold text-sm border-2 border-[#6366F1] cursor-pointer shadow-xs">
          {parent.avatarInitials}
        </div>
      </div>
    </header>
  );
}
