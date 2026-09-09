"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParentStore } from "../../stores/useParentStore";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { Stethoscope, MessageSquare, Send, Paperclip, CheckCheck, Sparkles, FileText, Calendar, Clock, UserCheck, ShieldCheck } from "lucide-react";

export default function TherapistNotes({ showChat = true }) {
  const { therapistNotes = [], child = {}, setActiveTab } = useParentStore();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dr. Neha Sharma",
      isTherapist: true,
      time: "9:30 AM",
      text: `Hello Priya! I reviewed ${child.name || 'Arjun'}'s latest session logs. The prompt dependency fading is progressing very well.`
    },
    {
      id: 2,
      sender: "Priya (Parent)",
      isTherapist: false,
      time: "9:34 AM",
      text: `Thank you Dr. Neha! He enjoyed the Feelings game today. I'm attaching his latest hospital clinical report for your review.`
    },
    {
      id: 3,
      sender: "Priya (Parent)",
      isTherapist: false,
      time: "9:34 AM",
      text: "Attached Official Hospital Clinical Report: #NB-8942-ASD",
      isReportAttachment: true
    }
  ]);
  const [isReplying, setIsReplying] = useState(false);

  const handleSendMessage = (textToSend = messageText, isReport = false) => {
    if (!textToSend.trim() && !isReport) return;

    const newMsg = {
      id: Date.now(),
      sender: "Priya (Parent)",
      isTherapist: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend,
      isReportAttachment: isReport
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!isReport) setMessageText("");

    // Simulate real-time therapist reply after 1.5s
    setIsReplying(true);
    setTimeout(() => {
      setIsReplying(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "Dr. Neha Sharma",
          isTherapist: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: isReport 
            ? `Thank you for sharing the official clinical report! I have reviewed Arjun's 82% unprompted independence score and webcam affect data. Excellent progress!`
            : `Got it, Priya! I have updated Arjun's treatment plan targets accordingly. Keep up the great work!`
        }
      ]);
    }, 1600);
  };

  if (!showChat) {
    return (
      <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-3xl p-6 shadow-sm h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60">
          <div>
            <h2 className="font-nunito font-bold text-lg text-[#1B2D3E] flex items-center gap-2">
              <Stethoscope size={20} className="text-teal-600" />
              <span>Clinical Notes & Observations</span>
            </h2>
            <p className="text-xs text-slate-500 font-dm-sans">
              Real-time notes from Dr. Neha & webcam ML facial model
            </p>
          </div>
          <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-bold font-dm-sans shrink-0">
            {therapistNotes.length} Entries
          </span>
        </div>

        {/* Dynamic height list filling full available space */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-3.5 overflow-y-auto pr-1 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {therapistNotes.map((note) => {
            const isMlNote = note.author.toLowerCase().includes("ml") || note.author.toLowerCase().includes("model");
            return (
              <motion.div
                key={note.id}
                variants={fadeUp}
                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs border-l-4 border-l-[#3ECFB2] relative hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="font-nunito font-bold text-[#1B2D3E] text-xs flex items-center gap-1.5">
                    {isMlNote ? (
                      <Sparkles size={15} className="text-teal-500" />
                    ) : (
                      <Stethoscope size={15} className="text-teal-600" />
                    )}
                    <span>{note.author}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isMlNote ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-slate-100 text-slate-700"
                  }`}>
                    {note.date}
                  </span>
                </div>
                
                <p className="font-dm-sans text-slate-700 text-xs sm:text-sm leading-relaxed">
                  "{note.content}"
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Link to Full Page & Direct Chat */}
        <div className="flex-shrink-0 pt-4 border-t border-slate-200/60 flex items-center justify-between mt-3">
          <span className="text-xs text-slate-500 font-dm-sans flex items-center gap-1.5">
            <MessageSquare size={14} className="text-teal-600" />
            <span>Direct chat on Therapist Notes tab</span>
          </span>
          <button
            onClick={() => setActiveTab && setActiveTab("notes")}
            className="px-4 py-2 bg-[#3ECFB2] hover:bg-[#34BBA0] text-white rounded-xl font-nunito font-bold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>Open Notes & Chat</span>
            <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full pb-12">
      
      {/* Left Column: Notes & ML Observations (7 Cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-nunito font-bold text-xl text-[#1B2D3E] flex items-center gap-2">
                <Stethoscope size={22} className="text-teal-600" />
                <span>Clinical Notes & Observations</span>
              </h2>
              <p className="text-xs text-slate-500 font-dm-sans">
                Recorded notes from Dr. Neha & automated webcam ML telemetry
              </p>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-bold font-dm-sans">
              {therapistNotes.length} Entries
            </span>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4 max-h-[560px] overflow-y-auto pr-1"
          >
            {therapistNotes.map((note) => (
              <motion.div
                key={note.id}
                variants={fadeUp}
                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs border-l-4 border-l-[#3ECFB2] relative pt-5"
              >
                <div className="absolute -top-2.5 left-4 bg-[#3ECFB2] text-white px-2.5 py-0.5 rounded-lg text-[10px] font-bold shadow-xs">
                  {note.date}
                </div>
                
                <div className="font-nunito font-bold text-[#1B2D3E] text-sm mb-1.5 flex items-center gap-1.5">
                  <Stethoscope size={16} className="text-teal-600" />
                  <span>{note.author}</span>
                </div>
                <p className="font-dm-sans text-slate-700 text-xs sm:text-sm leading-relaxed">
                  "{note.content}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Upcoming Consultations Card */}
        <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-3xl p-6 shadow-md border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 text-xl font-bold">
              📅
            </div>
            <div>
              <h4 className="font-nunito font-bold text-base text-white">Next Telehealth Review Session</h4>
              <p className="text-xs text-slate-300 font-dm-sans flex items-center gap-2 mt-0.5">
                <span>Friday, June 12 • 4:00 PM</span>
                <span>•</span>
                <span className="text-teal-300 font-bold">With Dr. Neha Sharma</span>
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-teal-500 text-white rounded-xl font-nunito font-bold text-xs shadow-md hover:bg-teal-600 transition-colors whitespace-nowrap">
            Confirm Appointment
          </button>
        </div>
      </div>

      {/* Right Column: Embedded Live Messaging Panel (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[600px]">
          
          {/* Chat Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-sm border-2 border-slate-900">
                  NS
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <h3 className="font-nunito font-bold text-base text-white">Dr. Neha Sharma, BCBA-D</h3>
                <p className="text-[11px] text-teal-300 font-dm-sans flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Direct Chat • Usually replies in 10 mins
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 min-h-[380px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.isTherapist ? "items-start" : "items-end"}`}
              >
                <span className="text-[10px] text-slate-400 font-dm-sans mb-1 px-1">
                  {m.sender} • {m.time}
                </span>

                {m.isReportAttachment ? (
                  <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-3.5 rounded-2xl shadow-sm border border-teal-500/30 max-w-[90%] space-y-2">
                    <div className="flex items-center gap-2 text-teal-300 font-nunito font-bold text-xs">
                      <FileText size={16} /> Official Hospital Evaluation Report
                    </div>
                    <p className="text-[11px] text-slate-200 font-dm-sans">
                      Patient: Arjun M. • ATEC Mastery: 82% • Focus Index: 88%
                    </p>
                    <span className="inline-block px-2 py-0.5 bg-teal-500/20 text-teal-200 rounded text-[10px] font-bold">
                      PDF Report Attached 📄
                    </span>
                  </div>
                ) : (
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] text-xs font-dm-sans shadow-xs ${
                      m.isTherapist
                        ? "bg-white text-slate-800 border border-slate-200"
                        : "bg-[#3ECFB2] text-white font-medium"
                    }`}
                  >
                    {m.text}
                  </div>
                )}
              </div>
            ))}

            {isReplying && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-dm-sans italic p-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" /> Dr. Neha is typing...
              </div>
            )}
          </div>

          {/* Quick Report Attachment & Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSendMessage("Attached Official Hospital Clinical Report: #NB-8942-ASD", true)}
                className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-nunito font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Paperclip size={14} /> Attach Hospital Clinical Report
              </button>
              <span className="text-[10px] text-slate-400 font-dm-sans">HIPAA Encrypted</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Type message to Dr. Neha..."
                className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-400 font-dm-sans"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 bg-[#3ECFB2] text-white rounded-xl shadow-md hover:bg-[#34BBA0] transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
