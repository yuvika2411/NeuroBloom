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
    <div className="bg-white/55 backdrop-blur-lg border border-white/60 rounded-3xl p-6 shadow-[0_8px_32px_rgba(62,207,178,0.12),0_2px_8px_rgba(0,0,0,0.05)] flex flex-col">
      <div className="mb-6">
        <h2 className="font-nunito font-bold text-xl text-[#1B2D3E] mb-1">Independence Growth</h2>
        <p className="font-dm-sans text-[#8FA3B1] text-xs">How often {child.name} completes tasks without prompts</p>
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
            <div className="w-14 font-dm-sans text-xs text-[#8FA3B1] font-bold text-right shrink-0">
              {weekData.week}
            </div>
            <div className="flex-1 h-8 rounded-full overflow-hidden flex shadow-inner border border-white bg-white/40">
              {/* Independent - Green */}
              <motion.div
                className="h-full bg-[#3ECFB2] flex items-center justify-center overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: `${weekData.independent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              >
                {weekData.independent > 15 && (
                  <span className="text-[10px] font-bold text-white/90 font-dm-sans whitespace-nowrap">
                    {weekData.independent}%
                  </span>
                )}
              </motion.div>
              
              {/* Prompted - Amber */}
              <motion.div
                className="h-full bg-[#FFC043] flex items-center justify-center overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: `${weekData.prompted}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              >
                {weekData.prompted > 15 && (
                  <span className="text-[10px] font-bold text-white/90 font-dm-sans whitespace-nowrap">
                    {weekData.prompted}%
                  </span>
                )}
              </motion.div>

              {/* Skipped - Coral */}
              <motion.div
                className="h-full bg-[#FF7E6B] flex items-center justify-center overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: `${weekData.skipped}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              >
                {weekData.skipped > 15 && (
                  <span className="text-[10px] font-bold text-white/90 font-dm-sans whitespace-nowrap">
                    {weekData.skipped}%
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="flex justify-center items-center gap-4 font-dm-sans text-[11px] text-[#8FA3B1] font-bold mb-6">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3ECFB2]"></span> Independent</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FFC043]"></span> Prompted</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FF7E6B]"></span> Skipped</div>
      </div>

      <div className="bg-[#3ECFB2] rounded-2xl p-4 text-center shadow-[0_4px_12px_rgba(62,207,178,0.3)] mt-auto">
        <p className="font-nunito font-bold text-white text-sm">
          {child.name} is {latestInd}% independent this week — up from {firstInd}% at start. <PartyPopper size={16} className="inline-block ml-1 pb-0.5" />
        </p>
      </div>
    </div>
  );
}
