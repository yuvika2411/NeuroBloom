"use client";

import { motion } from "framer-motion";
import { useParentStore } from "../../stores/useParentStore";
import { staggerContainer } from "../../lib/animations";
import { PartyPopper } from "lucide-react";

export default function PromptDependency() {
  const { promptDependency = [], child = {} } = useParentStore();

  // Find the latest week's independent percentage
  const latestInd = promptDependency[promptDependency.length - 1]?.independent || 0;
  const firstInd = promptDependency[0]?.independent || 0;

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-indigo-100/80 rounded-3xl p-6 shadow-[0_8px_32px_rgba(99,102,241,0.1),0_2px_8px_rgba(15,23,42,0.04)] flex flex-col">
      <div className="mb-6">
        <h2 className="font-nunito font-bold text-xl text-[#0F172A] mb-1">Independence Growth</h2>
        <p className="font-dm-sans text-[#64748B] text-xs">How often {child.name} completes tasks without prompts</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4 mb-8"
      >
        {promptDependency.map((weekData, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-14 font-dm-sans text-xs text-[#64748B] font-bold text-right shrink-0">
              {weekData.week}
            </div>
            <div className="flex-1 h-8 rounded-full overflow-hidden flex shadow-inner border border-white bg-slate-100/70">
              {/* Independent - SynaptiX Indigo */}
              <motion.div
                className="h-full bg-[#6366F1] flex items-center justify-center overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: `${weekData.independent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              >
                {weekData.independent > 15 && (
                  <span className="text-[10px] font-bold text-white font-dm-sans whitespace-nowrap">
                    {weekData.independent}%
                  </span>
                )}
              </motion.div>

              {/* Prompted - Amber */}
              <motion.div
                className="h-full bg-[#F59E0B] flex items-center justify-center overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: `${weekData.prompted}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              >
                {weekData.prompted > 15 && (
                  <span className="text-[10px] font-bold text-white font-dm-sans whitespace-nowrap">
                    {weekData.prompted}%
                  </span>
                )}
              </motion.div>

              {/* Skipped - Rose */}
              <motion.div
                className="h-full bg-[#F43F5E] flex items-center justify-center overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: `${weekData.skipped}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              >
                {weekData.skipped > 15 && (
                  <span className="text-[10px] font-bold text-white font-dm-sans whitespace-nowrap">
                    {weekData.skipped}%
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs font-dm-sans text-[#64748B] mb-6">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]"></span> Independent</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> Prompted</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]"></span> Skipped</div>
      </div>

      {/* Bottom Highlight Callout */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white rounded-2xl p-4 text-center shadow-[0_4px_16px_rgba(99,102,241,0.25)] mt-auto">
        <p className="font-nunito font-bold text-sm text-white flex items-center justify-center gap-1.5 mb-0.5">
          <span>{latestInd}% Independent this week</span>
          <PartyPopper size={16} className="text-amber-300" />
        </p>
        <p className="font-dm-sans text-xs text-indigo-100">
          Up from {firstInd}% at start • Prompt fading is working!
        </p>
      </div>
    </div>
  );
}
