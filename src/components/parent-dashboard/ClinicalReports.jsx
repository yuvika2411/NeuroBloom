"use client";

import { useParentStore } from "../../stores/useParentStore";
import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Download, Eye, TrendingUp, Brain, FileBox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getIconForType = (type) => {
  switch (type) {
    case 'Progress': return <TrendingUp size={20} className="text-[#3ECFB2]" />;
    case 'Behavioral': return <Brain size={20} className="text-[#FF7E6B]" />;
    case 'Category': return <FileBox size={20} className="text-[#C4B5FD]" />;
    default: return <FileText size={20} className="text-[#4A90D9]" />;
  }
};

const getBgForType = (type) => {
  switch (type) {
    case 'Progress': return 'bg-[#E8FAF6]';
    case 'Behavioral': return 'bg-[#FFF0ED]';
    case 'Category': return 'bg-[#F3F0FF]';
    default: return 'bg-[#EBF3FC]';
  }
};

export default function ClinicalReports() {
  const { clinicalReports } = useParentStore();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white/55 backdrop-blur-lg border border-white/60 rounded-3xl p-6 shadow-[0_8px_32px_rgba(30,58,138,0.05)] w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-nunito font-bold text-2xl text-[#1B2D3E] mb-1">Clinical Reports</h2>
          <p className="font-dm-sans text-[#8FA3B1] text-sm">Auto-generated developmental & progress summaries</p>
        </div>
        <button className="bg-[#1B2D3E] text-white px-4 py-2 rounded-xl font-dm-sans text-sm font-bold shadow-md hover:bg-[#2C4A68] transition-colors flex items-center gap-2">
          <Download size={16} />
          Export All
        </button>
      </div>

      <div className="space-y-4">
        {clinicalReports.map((report) => {
          const isExpanded = expandedId === report.id;
          
          return (
            <div 
              key={report.id} 
              className={`border border-white/60 rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'bg-white shadow-md' : 'bg-white/40 hover:bg-white/80'}`}
            >
              <div 
                className="p-5 cursor-pointer flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row"
                onClick={() => toggleExpand(report.id)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${getBgForType(report.type)}`}>
                    {getIconForType(report.type)}
                  </div>
                  <div>
                    <h3 className="font-nunito font-bold text-lg text-[#1B2D3E]">{report.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-dm-sans text-xs text-[#8FA3B1] font-bold">{report.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#D1D5DB]"></span>
                      <span className="font-dm-sans text-xs text-[#8FA3B1]">{report.type} Report</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-auto justify-end">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleExpand(report.id); }}
                    className="flex items-center gap-1.5 text-[#4A90D9] bg-[#EBF3FC] px-3 py-1.5 rounded-lg font-dm-sans text-xs font-bold hover:bg-[#D6E6F9] transition-colors"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button className="p-1.5 text-[#8FA3B1] hover:bg-black/5 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                  <div className="w-[1px] h-6 bg-black/10 mx-1"></div>
                  <button className="p-1 text-[#8FA3B1]">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-black/5 bg-white/30">
                      <div className="mt-5 mb-4 bg-[#F8FAFC] rounded-xl p-4 border border-black/5">
                        <h4 className="font-nunito font-bold text-sm text-[#1B2D3E] mb-2 uppercase tracking-wider">Executive Summary</h4>
                        <p className="font-dm-sans text-[#475569] text-sm leading-relaxed">
                          {report.summary}
                        </p>
                      </div>
                      
                      <div className="px-1">
                        <h4 className="font-nunito font-bold text-sm text-[#1B2D3E] mb-2 uppercase tracking-wider">Detailed Analysis</h4>
                        <p className="font-dm-sans text-[#64748B] text-sm leading-relaxed whitespace-pre-line">
                          {report.details}
                        </p>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button className="text-[#3ECFB2] font-dm-sans text-sm font-bold hover:underline flex items-center gap-1">
                          Share with Therapist
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
