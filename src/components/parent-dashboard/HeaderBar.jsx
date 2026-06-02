"use client";

import { useParentStore } from "../../stores/useParentStore";
import { Hand, Bell } from "lucide-react";

export default function HeaderBar() {
  const { parent } = useParentStore();

  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const dateString = today.toLocaleDateString('en-GB', options); // e.g., Tuesday, 3 June 2025

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/60 px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="font-nunito font-bold text-2xl text-[#1B2D3E] mb-1">
          Good morning, {parent.name} <Hand size={24} className="inline-block text-[#FFB020] ml-1 mb-1" />
        </h1>
        <div className="font-dm-sans text-sm text-[#8FA3B1]">
          {dateString}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button className="relative text-2xl text-[#8FA3B1] hover:text-[#1B2D3E] transition-colors">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF7E6B] rounded-full text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
            2
          </span>
        </button>
        <div className="w-10 h-10 rounded-full bg-[#4A90D9]/20 flex items-center justify-center text-[#4A90D9] font-bold text-sm border-2 border-[#3ECFB2] cursor-pointer">
          {parent.avatarInitials}
        </div>
      </div>
    </header>
  );
}
