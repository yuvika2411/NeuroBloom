"use client";

import { useState } from "react";
import { useParentStore } from "../../stores/useParentStore";
import { Clock, HelpCircle, CheckCircle2, Filter, Download } from "lucide-react";

export default function QuestionTelemetryTable() {
  const { questionTelemetryLog = [] } = useParentStore();
  const [filterGame, setFilterGame] = useState("all");

  const filteredLogs = filterGame === "all" 
    ? questionTelemetryLog 
    : questionTelemetryLog.filter(l => l.gameId === filterGame);

  const emotionEmojis = {
    Happy: "😊",
    Focused: "🎯",
    Neutral: "😐",
    "Frustrated/Confused": "🤔",
    Surprised: "😲",
    Disengaged: "👀"
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-nunito font-bold text-xl text-slate-800">Detailed Telemetry Log</h3>
          <p className="text-xs text-slate-500 font-dm-sans">
            Question-by-question solve speed, prompt reliance, and ML facial expressions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterGame}
            onChange={(e) => setFilterGame(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-dm-sans font-medium text-slate-700"
          >
            <option value="all">All Learning Modules</option>
            <option value="EmotionMatchGame">Feelings Module</option>
            <option value="PuzzleGame">Visual Puzzle</option>
            <option value="WordMatchGame">PECS Words</option>
            <option value="RoutineGame">Executive Routine</option>
            <option value="BallTrackingGame">Focus Ball</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-dm-sans">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3 px-2">Question / Task</th>
              <th className="pb-3 px-2">Module</th>
              <th className="pb-3 px-2">Solve Latency</th>
              <th className="pb-3 px-2">Prompt Status</th>
              <th className="pb-3 px-2">Spontaneity Index</th>
              <th className="pb-3 px-2 text-right">Captured ML Emotion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredLogs.map((log, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-2 font-bold text-slate-800 font-nunito text-sm">
                  {log.questionText}
                </td>
                <td className="py-3 px-2 text-slate-600 font-medium">
                  {log.gameId}
                </td>
                <td className="py-3 px-2 text-slate-700 font-bold">
                  <span className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-lg border border-cyan-200">
                    <Clock size={11} /> {log.solveTimeSec}s
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${log.promptStatus === 'Independent' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {log.promptStatus}
                  </span>
                </td>
                <td className="py-3 px-2 font-bold text-slate-700">
                  {log.spontaneityIndex}%
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                    <span>{log.emotion}</span>
                    <span className="text-base">{emotionEmojis[log.emotion] || '🎯'}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
