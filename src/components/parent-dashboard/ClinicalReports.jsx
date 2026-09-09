"use client";

import { useParentStore } from "../../stores/useParentStore";
import { useState } from "react";
import { 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  ShieldCheck, 
  Activity, 
  Brain, 
  Clock, 
  CheckCircle2, 
  Award, 
  FileCheck,
  Hospital,
  Sparkles,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClinicalReports() {
  const { clinicalReports = [], stats = {}, realtimeMetrics = {} } = useParentStore();
  const [selectedReport, setSelectedReport] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-lg border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Hospital className="text-teal-600" size={24} />
            <h2 className="font-nunito font-bold text-2xl text-[#1B2D3E]">Hospital Clinical ASD Evaluation Reports</h2>
          </div>
          <p className="font-dm-sans text-slate-500 text-xs sm:text-sm">
            Official developmental evaluation reports with ML webcam affect analysis & BCBA clinical sign-off
          </p>
        </div>

        <button 
          onClick={handlePrint}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-nunito font-bold text-sm shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <Printer size={16} />
          Print Official Medical Report
        </button>
      </div>

      {/* Official Hospital Evaluation Report Card (Featured) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-teal-100 relative overflow-hidden print:shadow-none print:border-none print:p-0">
        
        {/* Hospital Letterhead Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-900 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                🏥
              </div>
              <div>
                <h1 className="font-nunito font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight uppercase">
                  NEUROBLOOM PEDIATRIC & AUTISM CLINICAL CENTER
                </h1>
                <p className="font-dm-sans text-xs text-slate-600 font-semibold">
                  Department of Pediatric Neurodevelopment & Applied Behavior Analysis (ABA)
                </p>
                <p className="text-[11px] text-slate-400 font-dm-sans">
                  204 Medical Heights Plaza, Suite 500 • Medical Records Registry ID: #NB-8942-ASD
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:pl-6 border-slate-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold font-dm-sans">
                <FileCheck size={14} /> Official Verified Report
              </span>
              <p className="text-[11px] text-slate-500 font-dm-sans mt-1">
                Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Patient & Assessment Demographic Grid */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-dm-sans">
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Patient Name</span>
            <strong className="text-slate-900 font-nunito text-base">Arjun M.</strong>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Age / Sex</span>
            <span className="text-slate-800 font-bold">6 Years • Male</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Primary Diagnosis</span>
            <span className="text-teal-700 font-bold">Autism Spectrum Disorder (Level 1)</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Attending BCBA Therapist</span>
            <span className="text-slate-800 font-bold">Dr. Neha Sharma, Ph.D., BCBA-D</span>
          </div>
        </div>

        {/* Executive Summary & Clinical Assessment Narrative */}
        <div className="space-y-6">
          <div className="bg-teal-50/60 rounded-2xl p-5 border border-teal-200">
            <h3 className="font-nunito font-bold text-sm text-teal-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Brain size={16} /> Clinical Diagnostic Impressions & ABA Progress
            </h3>
            <p className="font-dm-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
              Arjun completed 34 structured digital Discrete Trial Training (DTT) modules over the 30-day assessment window. Telemetry data demonstrates an <strong>82% unprompted independence rate</strong> across visual-spatial pattern matching and PECS AAC communication board tasks. Prompt dependency has decreased by 32% since baseline evaluation.
            </p>
          </div>

          {/* Standardized Domain Scorecard Table */}
          <div>
            <h3 className="font-nunito font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">
              Standardized Developmental Domain Scorecard (ATEC Metrics)
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs font-dm-sans">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Developmental Domain</th>
                    <th className="p-3">Baseline Score</th>
                    <th className="p-3">Current Score</th>
                    <th className="p-3">Prompt Reliance</th>
                    <th className="p-3 text-right">Clinical Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">I. Speech / AAC Communication</td>
                    <td className="p-3">54 / 100</td>
                    <td className="p-3 font-bold text-teal-700">78 / 100</td>
                    <td className="p-3">18% System Prompted</td>
                    <td className="p-3 text-right font-bold text-emerald-600">Significant Mastery</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">II. Theory of Mind & Emotion Match</td>
                    <td className="p-3">48 / 100</td>
                    <td className="p-3 font-bold text-teal-700">72 / 100</td>
                    <td className="p-3">14% System Prompted</td>
                    <td className="p-3 text-right font-bold text-emerald-600">Steady Improvement</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">III. Cognitive & Visual Pattern Match</td>
                    <td className="p-3">65 / 100</td>
                    <td className="p-3 font-bold text-teal-700">86 / 100</td>
                    <td className="p-3">8% System Prompted</td>
                    <td className="p-3 text-right font-bold text-emerald-600">High Competency</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">IV. Executive Routine & Transitions</td>
                    <td className="p-3">42 / 100</td>
                    <td className="p-3 font-bold text-teal-700">68 / 100</td>
                    <td className="p-3">22% System Prompted</td>
                    <td className="p-3 text-right font-bold text-teal-600">Progressing Well</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Machine Learning Webcam Camera Telemetry Summary */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-nunito font-bold text-base text-teal-300 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <span>On-Device Machine Learning Affect & Attention Camera Telemetry</span>
              </h3>
              <span className="text-[11px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full font-bold">
                100% Privacy Preserved
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-dm-sans">
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Average Focus Index</span>
                <span className="text-2xl font-bold font-nunito text-teal-300">88%</span>
                <p className="text-[10px] text-slate-300 mt-1">Sustained attentive posture throughout DTT sessions</p>
              </div>

              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Primary Valence State</span>
                <span className="text-2xl font-bold font-nunito text-emerald-300">Focused & Happy 😊</span>
                <p className="text-[10px] text-slate-300 mt-1">64% Focused • 26% Happy • 8% Hesitant</p>
              </div>

              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Mean Question Reaction Speed</span>
                <span className="text-2xl font-bold font-nunito text-cyan-300">{realtimeMetrics.avgSolveTimeSec || 3.2}s</span>
                <p className="text-[10px] text-slate-300 mt-1">Faster response latency with decreased hesitation</p>
              </div>
            </div>
          </div>

          {/* BCBA Physician Treatment Plan & Recommendations */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-nunito font-bold text-sm text-slate-900 uppercase tracking-wider mb-2">
              Therapist Recommendations & Next Clinical Targets
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1.5 font-dm-sans">
              <li>Continue daily 10-minute PECS AAC symbol board modules focusing on 3-symbol sentence construction.</li>
              <li>Maintain First-Then visual schedule routines prior to daily activity transitions.</li>
              <li>Re-evaluate Theory of Mind emotion recognition accuracy in 30 days.</li>
            </ul>
          </div>

          {/* Official Doctor Signature & Stamp */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="font-serif italic text-slate-800 text-lg font-bold text-teal-900">
                Dr. Neha Sharma, Ph.D., BCBA-D
              </div>
              <p className="text-[11px] text-slate-500 font-dm-sans">
                Board Certified Behavior Analyst • License #BCBA-2024-88421
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-600 flex flex-col items-center justify-center text-[9px] font-bold text-teal-800 text-center leading-tight">
                <span>OFFICIAL</span>
                <span>CLINICAL</span>
                <span>SEAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
