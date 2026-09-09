"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CameraOff, Sparkles, Brain, Eye, ShieldCheck, Activity } from "lucide-react";
import { faceAnalyzer } from "../../lib/faceMLModel";
import { syncEngine } from "../../lib/syncEngine";

export default function FaceEmotionTracker({ onEmotionUpdate, compact = false }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [permissionError, setPermissionError] = useState(null);
  const [currentEmotion, setCurrentEmotion] = useState({
    emotion: "Focused",
    confidence: 0.91,
    focusScore: 88,
    attentionState: "High Focus",
    faceDetected: true
  });
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    let intervalId = null;
    let streamInstance = null;

    if (cameraActive) {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 320, height: 240, frameRate: 15 } })
        .then((stream) => {
          streamInstance = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          intervalId = setInterval(() => {
            if (videoRef.current) {
              const res = faceAnalyzer.analyzeVideoFrame(videoRef.current);
              setCurrentEmotion(res);
              if (onEmotionUpdate) onEmotionUpdate(res);

              // Broadcast real-time emotion telemetry to Parent Dashboard
              syncEngine.emit("EMOTION_UPDATE", {
                emotion: res.emotion,
                confidence: res.confidence,
                focusScore: res.focusScore,
                attentionState: res.attentionState,
                timestamp: Date.now()
              });

              // Draw facial landmark overlay on canvas
              if (canvasRef.current && res.landmarks) {
                const ctx = canvasRef.current.getContext("2d");
                ctx.clearRect(0, 0, 320, 240);
                const { box, leftEye, rightEye, mouth } = res.landmarks;

                // Draw bounding box
                ctx.strokeStyle = "#3ECFB2";
                ctx.lineWidth = 2;
                ctx.strokeRect(box.x, box.y, box.width, box.height);

                // Points
                ctx.fillStyle = "#FFB020";
                ctx.beginPath();
                ctx.arc(leftEye.x, leftEye.y, 4, 0, Math.PI * 2);
                ctx.arc(rightEye.x, rightEye.y, 4, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#FF7E6B";
                ctx.beginPath();
                ctx.arc(mouth.x, mouth.y, 5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }, 400);
        })
        .catch((err) => {
          console.warn("Webcam access warning:", err);
          setPermissionError("Camera access disabled or denied");
          setCameraActive(false);
        });
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (streamInstance) {
        streamInstance.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive, onEmotionUpdate]);

  const emotionEmojis = {
    Happy: "😊",
    Focused: "🎯",
    Neutral: "😐",
    "Frustrated/Confused": "🤔",
    Surprised: "😲",
    Disengaged: "👀"
  };

  const emotionColors = {
    Happy: "bg-emerald-500 text-white",
    Focused: "bg-cyan-500 text-white",
    Neutral: "bg-slate-500 text-white",
    "Frustrated/Confused": "bg-amber-500 text-white",
    Surprised: "bg-purple-500 text-white",
    Disengaged: "bg-rose-500 text-white"
  };

  if (compact) {
    return (
      <div className="relative inline-flex items-center gap-2">
        <button
          onClick={() => setCameraActive(!cameraActive)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-nunito font-bold border transition-all ${
            cameraActive
              ? "bg-[#3ECFB2]/15 text-[#1A9E8C] border-[#3ECFB2]/40 shadow-sm"
              : "bg-white/80 text-gray-600 border-gray-200 hover:bg-white"
          }`}
          title="Toggle Webcam ML Emotion Tracking"
        >
          {cameraActive ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Cam Active</span>
              <span className="text-sm">{emotionEmojis[currentEmotion.emotion] || "🎯"}</span>
            </>
          ) : (
            <>
              <Camera size={14} />
              <span>Enable AI Emotion Tracker</span>
            </>
          )}
        </button>

        {/* Hidden processing video */}
        <video ref={videoRef} autoPlay playsInline muted className="hidden" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 border-2 border-teal-100 shadow-md relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
            <Brain size={20} />
          </div>
          <div>
            <h4 className="font-nunito font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <span>ML Emotion & Attention AI</span>
              <Sparkles size={14} className="text-amber-500" />
            </h4>
            <p className="text-[11px] text-slate-500 font-dm-sans">
              Real-time facial expression tracking
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPrivacyModal(true)}
          className="text-slate-400 hover:text-teal-600 transition-colors p-1"
          title="Privacy & Security Information"
        >
          <ShieldCheck size={18} />
        </button>
      </div>

      {/* Video & AI Canvas Container */}
      <div className="relative aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
        {cameraActive ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 opacity-80"
            />
            <canvas
              ref={canvasRef}
              width={320}
              height={240}
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none"
            />

            {/* Live Telemetry Overlay Badge */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 text-white text-xs font-nunito font-bold">
              <span className="text-base">{emotionEmojis[currentEmotion.emotion] || "🎯"}</span>
              <span>{currentEmotion.emotion}</span>
              <span className="text-[10px] text-teal-300">({Math.round(currentEmotion.confidence * 100)}%)</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 text-xs text-white">
              <Activity size={12} className="text-emerald-400 animate-pulse" />
              <span>Focus: {currentEmotion.focusScore}%</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
              <CameraOff size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-300">Webcam Tracker Inactive</p>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-[200px]">
                Turn on camera to record real-time emotional state & focus latency
              </p>
            </div>
            <button
              onClick={() => {
                setPermissionError(null);
                setCameraActive(true);
              }}
              className="px-4 py-2 bg-[#3ECFB2] text-white rounded-xl text-xs font-nunito font-bold shadow-md hover:bg-[#32BFA3] transition-colors flex items-center gap-1.5"
            >
              <Camera size={14} /> Start AI Camera
            </button>
          </div>
        )}
      </div>

      {permissionError && (
        <div className="mt-2 text-[11px] text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 font-medium">
          ⚠️ {permissionError}. Using default simulated model telemetry.
        </div>
      )}

      {/* Control Toggle Bar */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-dm-sans text-[11px]">
          Status: <strong className="text-slate-700">{cameraActive ? "Live Scanning" : "Paused"}</strong>
        </span>
        {cameraActive && (
          <button
            onClick={() => setCameraActive(false)}
            className="text-rose-500 hover:text-rose-600 font-bold text-[11px]"
          >
            Turn Off Camera
          </button>
        )}
      </div>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacyModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-teal-100 z-10 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-lg font-nunito font-bold text-slate-800">100% On-Device Privacy</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-dm-sans">
                NeuroBloom's facial expression ML model processes webcam frames <strong>entirely inside your browser</strong>. Video streams are analyzed in volatile memory and are <strong>never recorded, stored, or sent</strong> to external servers.
              </p>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-2.5 bg-teal-500 text-white rounded-xl font-bold text-xs shadow-md hover:bg-teal-600"
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
