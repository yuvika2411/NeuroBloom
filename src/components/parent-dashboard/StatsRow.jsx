"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParentStore } from "../../stores/useParentStore";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { Gamepad2, Flame, Puzzle, Smile } from "lucide-react";

function useCountUp(target, duration = 1.2) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration * 60); // Assuming 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration, isInView]);

  return { count, ref };
}

function StatCard({ stat }) {
  const { count, ref } = useCountUp(stat.value);

  // For floats like 4.2
  const displayValue = Number.isInteger(stat.value) ? count : (count / Math.ceil(stat.value) * stat.value).toFixed(1);

  return (
    <motion.div
      variants={fadeUp}
      ref={ref}
      className="bg-white/70 backdrop-blur-lg border border-indigo-100/80 rounded-3xl p-5 shadow-[0_8px_32px_rgba(99,102,241,0.1),0_2px_8px_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.iconBg}`}>
          {stat.icon}
        </div>
        <div className="font-dm-sans text-[13px] text-[#64748B] font-medium leading-tight">
          {stat.label}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="font-sora font-bold text-[32px] text-[#0F172A] leading-none">
          {stat.value === 4.2 && count === Math.ceil(stat.value) ? stat.value : displayValue}
          {stat.suffix}
        </div>
      </div>
      <div className={`text-[11px] font-bold mt-2 ${stat.subLabelColor}`}>
        {stat.subLabel}
      </div>
    </motion.div>
  );
}

export default function StatsRow() {
  const { stats = {} } = useParentStore();

  const statCards = [
    {
      icon: <Gamepad2 size={28} className="text-[#6366F1]" />,
      iconBg: "bg-[#6366F1]/15",
      value: stats.todayMinutes,
      suffix: " min",
      label: "Active Today",
      subLabel: "↑ +3 min vs yesterday",
      subLabelColor: "text-[#6366F1]"
    },
    {
      icon: <Flame size={28} className="text-[#F59E0B]" />,
      iconBg: "bg-[#F59E0B]/15",
      value: stats.weeklyStreak,
      suffix: " days",
      label: "Current Streak",
      subLabel: "Personal best! 🎉",
      subLabelColor: "text-[#F59E0B]"
    },
    {
      icon: <Puzzle size={28} className="text-[#06B6D4]" />,
      iconBg: "bg-[#06B6D4]/15",
      value: stats.totalModules,
      suffix: "",
      label: "Modules Done",
      subLabel: "This month",
      subLabelColor: "text-[#64748B]"
    },
    {
      icon: <Smile size={28} className="text-[#A855F7]" />,
      iconBg: "bg-[#A855F7]/15",
      value: stats.avgMoodScore, // 4.2
      suffix: "/5",
      label: "Avg Mood Score",
      subLabel: "↑ +0.3 vs last week",
      subLabelColor: "text-[#6366F1]"
    }
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {statCards.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </motion.div>
  );
}
