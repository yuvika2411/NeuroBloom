"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParentStore } from "../../stores/useParentStore";
import { 
  Activity, 
  Brain, 
  Clock, 
  CheckCircle2, 
  Heart, 
  Send, 
  Sparkles, 
  Zap, 
  ShieldCheck,
  Smile,
  Target,
  AlertCircle,
  HelpCircle
} from "lucide-react";

export default function LiveMonitor() {
  const { 
    liveChildStatus = {}, 
    questionTelemetryLog = [], 
    realtimeMetrics = {}, 
    sendParentCheer,
    emotionHistory = []
  } = useParentStore();

  const [cheerMsg, setCheerMsg] = useState("");
  const [cheerSent, setCheerSent] = useState(false);

  const handleSendCheer = (text = "You're doing awesome!", emoji = "⭐") => {
    sendParentCheer(text, emoji);
    setCheerSent(true);
    setTimeout(() => setCheerSent(false), 3000);
  };

  const emotionEmojis = {
    Happy: "😊",
    Focused: "🎯",
    Neutral: "😐",
    "Frustrated/Confused": "🤔",
    Surprised: "😲",
    Disengaged: "👀"
  };

  return (
    <div className="space-y-6">
      {/* Live Active Status Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-teal-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-3xl">
                🧒
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-nunito font-bold text-2xl text-white">Arjun is Active Now</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-dm-sans flex items-center gap-1">
                  <Activity size={12} className="animate-pulse" /> Live Telemetry
                </span>
              </div>
              <p className="text-xs text-slate-300 font-dm-sans mt-0.5">
                Current Activity: <strong className="text-teal-300">{liveChildStatus.activeGame || "Emotion Match Game"}</strong> • Screen: <span className="text-slate-400 capitalize">{liveChildStatus.currentScreen || "play"}</span>
              </p>
            </div>
          </div>

          {/* Live Emotion & Focus Stats Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
              <span className="text-[11px] text-slate-400 block font-dm-sans">ML Emotion State</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xl">{emotionEmojis[liveChildStatus.currentEmotion] || "🎯"}</span>
                <span className="font-nunito font-bold text-sm text-teal-300">{liveChildStatus.currentEmotion}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
              <span className="text-[11px] text-slate-400 block font-dm-sans">Focus Score</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Zap size={16} className="text-amber-400" />
                <span className="font-nunito font-bold text-base text-amber-300">{liveChildStatus.focusScore || 88}%</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 block font-dm-sans">Avg Solve Latency</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock size={16} className="text-cyan-400" />
                <span className="font-nunito font-bold text-base text-cyan-300">{realtimeMetrics.avgSolveTimeSec}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Cheer & Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parent Cheer Quick Dispatcher */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <h3 className="font-nunito font-bold text-lg text-slate-800">Send Instant Cheer</h3>
            </div>
            <p className="text-xs text-slate-500 font-dm-sans mb-4">
              Send real-time star badges & messages directly to Arjun's screen while he plays!
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => handleSendCheer("Superstar effort!", "⭐")}
                className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-nunito font-bold flex items-center gap-1 transition-all"
              >
                <span>⭐</span> Superstar effort!
              </button>
              <button
                onClick={() => handleSendCheer("Proud of you!", "❤️")}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-nunito font-bold flex items-center gap-1 transition-all"
              >
                <span>❤️</span> Proud of you!
              </button>
              <button
                onClick={() => handleSendCheer("Keep it up!", "🔥")}
                className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-nunito font-bold flex items-center gap-1 transition-all"
              >
                <span>🔥</span> Keep it up!
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={cheerMsg}
                onChange={(e) => setCheerMsg(e.target.value)}
                placeholder="Type custom encouraging note..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-400 font-dm-sans"
              />
              <button
                onClick={() => {
                  if (cheerMsg.trim()) {
                    handleSendCheer(cheerMsg, "🌟");
                    setCheerMsg("");
                  }
                }}
                className="px-4 py-2 bg-[#3ECFB2] text-white rounded-xl text-xs font-nunito font-bold shadow-sm hover:bg-[#34BBA0] transition-colors"
              >
                <Send size={14} />
              </button>
            </div>

            {cheerSent && (
              <p className="text-[11px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> Live cheer delivered to Arjun's screen!
              </p>
            )}
          </div>
        </div>

        {/* Live Question Telemetry Feed */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <Activity size={18} />
              </div>
              <h3 className="font-nunito font-bold text-lg text-slate-800">Live Question Telemetry Stream</h3>
            </div>
            <span className="text-xs text-slate-400 font-dm-sans">
              Auto-syncs per answer
            </span>
          </div>

          <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
            {questionTelemetryLog.map((log, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${log.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {log.isCorrect ? '✓' : '!'}
                  </span>
                  <div>
                    <p className="font-nunito font-bold text-slate-800 text-sm">{log.questionText}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-dm-sans mt-0.5">
                      <span>Module: {log.gameId}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {log.solveTimeSec}s
                      </span>
                      <span>•</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${log.promptStatus === 'Independent' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {log.promptStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base">{emotionEmojis[log.emotion] || '🎯'}</span>
                  <span className="block text-[10px] font-bold text-slate-600">{log.emotion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
