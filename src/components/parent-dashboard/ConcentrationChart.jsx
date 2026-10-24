"use client";

import { useParentStore } from "../../stores/useParentStore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useState, useEffect } from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-xl p-3 shadow-lg">
        <p className="font-dm-sans font-bold text-[#0F172A] text-sm mb-2">{label}</p>
        <div className="flex flex-col gap-1">
          <span className="font-sora text-sm text-[#6366F1] font-bold">Focus: {payload[0].value}%</span>
          <span className="font-sora text-sm text-[#06B6D4] font-bold">Span: {payload[1].value} min</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ConcentrationChart() {
  const { concentrationData = [], child = {} } = useParentStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-indigo-100/80 rounded-3xl p-6 shadow-[0_8px_32px_rgba(99,102,241,0.1),0_2px_8px_rgba(15,23,42,0.04)] h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-nunito font-bold text-xl text-[#0F172A]">{child.name}'s Concentration</h2>
        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
          This Week
        </span>
      </div>

      <div className="w-full h-[250px] mt-4">
        {mounted && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={concentrationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'var(--font-dm-sans)' }} 
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12 }} 
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12 }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontFamily: 'var(--font-dm-sans)' }} />
              <Bar yAxisId="left" dataKey="focusScore" name="Focus Level (%)" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={12} animationDuration={1500} />
              <Bar yAxisId="right" dataKey="attentionSpan" name="Attention Span (min)" fill="#06B6D4" radius={[4, 4, 0, 0]} barSize={12} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
