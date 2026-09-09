"use client";

import { motion } from "framer-motion";
import { useParentStore } from "../../stores/useParentStore";
import { staggerContainer } from "../../lib/animations";

export default function SkillBars() {
  const { skillProgress = [], stats = {} } = useParentStore();

  return (
    <div className="bg-white/55 backdrop-blur-lg border border-white/60 rounded-3xl p-6 shadow-[0_8px_32px_rgba(62,207,178,0.12),0_2px_8px_rgba(0,0,0,0.05)] h-full flex flex-col">
      <div className="mb-6">
        <h2 className="font-nunito font-bold text-xl text-[#1B2D3E] mb-1">Skill Development</h2>
        <p className="font-dm-sans text-[#8FA3B1] text-xs">Based on {stats.totalModules} sessions this month</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex-1 flex flex-col justify-center space-y-5"
      >
        {skillProgress.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between items-end mb-1.5">
              <span className="font-dm-sans text-sm font-medium text-[#1B2D3E]">{skill.label}</span>
              <span className="font-sora font-bold text-sm" style={{ color: skill.color }}>{skill.value}%</span>
            </div>
            <div className="w-full bg-[#E8FAF6] h-3 rounded-full overflow-hidden border border-white">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
