"use client";

import { useParentStore } from "../../stores/useParentStore";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";
import { Smile, Frown, Meh } from "lucide-react";

const getIconForEmoji = (emoji, props) => {
  switch (emoji) {
    case '😄': return <Smile {...props} className="text-[#F59E0B]" />;
    case '😊': return <Smile {...props} className="text-[#6366F1]" />;
    case '😐': return <Meh {...props} className="text-[#06B6D4]" />;
    case '😢': return <Frown {...props} className="text-[#F43F5E]" />;
    default: return <Smile {...props} className="text-[#6366F1]" />;
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-xl p-3 shadow-lg">
        <p className="font-dm-sans font-bold text-[#0F172A] text-sm mb-1">{label}</p>
        <div className="flex items-center gap-2">
          {getIconForEmoji(data.emoji, { size: 20 })}
          <span className="font-sora font-bold text-[#6366F1]">{data.score}/5</span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomizedDot = (props) => {
  const { cx, cy, payload } = props;

  return (
    <foreignObject x={cx - 12} y={cy - 12} width={24} height={24}>
      {getIconForEmoji(payload.emoji, { size: 24, strokeWidth: 2.5 })}
    </foreignObject>
  );
};

export default function MoodChart() {
  const { weeklyMoodData = [], child = {} } = useParentStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-indigo-100/80 rounded-3xl p-6 shadow-[0_8px_32px_rgba(99,102,241,0.1),0_2px_8px_rgba(15,23,42,0.04)] h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-nunito font-bold text-xl text-[#0F172A]">{child.name}'s Mood & Valence</h2>
        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
          This Week
        </span>
      </div>

      <div className="w-full h-[250px] mt-4">
        {mounted && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyMoodData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'var(--font-dm-sans)' }} 
                dy={10}
              />
              <YAxis 
                domain={[1, 5]} 
                axisLine={false} 
                tickLine={false} 
                tick={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#6366F1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
                isAnimationActive={true}
                animationDuration={1500}
                dot={<CustomizedDot />}
                activeDot={{ r: 6, fill: "#6366F1", stroke: "white", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
