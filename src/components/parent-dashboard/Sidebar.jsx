"use client";

import { useState } from "react";
import { useParentStore } from "../../stores/useParentStore";
import Link from "next/link";
import { Home, Activity, TrendingUp, Smile, Gamepad2, ClipboardList, Stethoscope, Settings, Sparkles, Flame } from "lucide-react";

export default function Sidebar() {
  const { child, parent, activeTab, setActiveTab } = useParentStore();

  const navItems = [
    { id: "overview", icon: <Home size={20} />, label: "Overview" },
    { id: "live", icon: <Activity size={20} className="text-indigo-500 animate-pulse" />, label: "Live Telemetry" },
    { id: "progress", icon: <TrendingUp size={20} />, label: "Progress" },
    { id: "mood", icon: <Smile size={20} />, label: "Mood & Expressions" },
    { id: "sessions", icon: <Gamepad2 size={20} />, label: "Sessions" },
    { id: "reports", icon: <ClipboardList size={20} />, label: "Clinical Reports" },
    { id: "notes", icon: <Stethoscope size={20} />, label: "Therapist Notes" },
    { id: "settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col bg-white/75 backdrop-blur-xl border-r border-indigo-100/60 shadow-[4px_0_24px_rgba(99,102,241,0.06)] hidden md:flex overflow-hidden">
      {/* Top Section */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex items-center text-[#6366F1] p-1.5 rounded-xl bg-[#6366F1]/10">
            <Sparkles size={22} className="text-[#6366F1]" />
          </span>
          <div>
            <h1 className="font-nunito font-extrabold text-[#0F172A] text-xl tracking-tight leading-none">
              SynaptiX
            </h1>
            <span className="text-[10px] font-bold text-[#6366F1] tracking-wider uppercase">Parent Portal</span>
          </div>
        </div>

        {/* Child Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-xl hover:bg-indigo-50/50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-[#6366F1]/15 flex items-center justify-center text-[#4F46E5] font-bold font-dm-sans shadow-xs shrink-0">
              {child.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-nunito font-bold text-[#0F172A] text-sm leading-tight truncate">
                {child.name} (Age {child.age})
              </div>
            </div>
            <div className="text-[#64748B] text-xs">▾</div>
          </div>
          <div className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white rounded-2xl px-3 py-1 text-[11px] font-bold shadow-[0_2px_0_#3730A3] self-start ml-2 flex items-center gap-1.5">
            <span className="flex items-center"><Flame size={13} className="text-amber-300" /></span> {child.streak} day streak
          </div>
        </div>
      </div>

      {/* Nav Items - Completely hidden scrollbar */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-2 space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl mx-1 text-sm transition-all text-left ${activeTab === item.id
                ? "bg-[#6366F1]/15 text-[#4F46E5] font-semibold border-r-2 border-[#6366F1] shadow-xs"
                : "text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#0F172A]"
              }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="font-dm-sans">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 sm:p-5 border-t border-indigo-100/60">
        <Link href="/dashboard/child" target="_blank" className="font-dm-sans text-xs text-[#0F172A] font-bold hover:text-[#6366F1] hover:bg-white transition-colors mb-3 block bg-white/70 p-2.5 rounded-xl text-center border border-indigo-100 shadow-xs flex items-center justify-center gap-2">
          <span><Gamepad2 size={15} className="text-[#6366F1]" /></span> Open Child Tab ↗
        </Link>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#6366F1]/20 flex items-center justify-center text-[#4F46E5] font-bold text-xs shrink-0">
            {parent.avatarInitials}
          </div>
          <div>
            <div className="font-nunito font-bold text-[#0F172A] text-sm leading-tight">{parent.name} M.</div>
            <div className="font-dm-sans text-[#64748B] text-xs hover:text-[#6366F1] transition-colors">Parent View</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
