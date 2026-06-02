"use client";

import { useChildStore } from "../../stores/useChildStore";
import Link from "next/link";

export default function TopStrip() {
  const { child } = useChildStore();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-md border-b border-white/60 px-4 h-16 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="bg-[#3ECFB2]/20 rounded-2xl w-10 h-10 flex items-center justify-center text-xl shadow-sm border border-white/50">
          {child.avatarEmoji}
        </div>
        <div className="font-nunito font-bold text-[#1B2D3E] text-[18px]">
          {child.name}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/parent" className="bg-white/50 border border-white/60 text-[#1B2D3E] hover:bg-white/70 transition-colors rounded-full px-3 py-1 text-xs font-bold shadow-sm flex items-center gap-1.5">
          <span>👩‍👦</span> Parent View
        </Link>
        <div className="bg-[#FF7E6B]/15 border border-[#FF7E6B]/30 text-[#FF7E6B] rounded-full px-3 py-1 text-sm font-bold shadow-sm">
          🔥 {child.streak}
        </div>
      </div>
    </div>
  );
}
