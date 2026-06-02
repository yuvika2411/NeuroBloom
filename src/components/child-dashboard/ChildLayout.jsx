"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TopStrip from "./TopStrip";
import { Sparkles, Star } from "lucide-react";
import BottomNav from "./BottomNav";
import { useChildStore } from "../../stores/useChildStore";

const themeConfigs = {
  default: {
    bg: "bg-[#F8FAFC]",
    gridBase: "rgba(62, 207, 178, 0.1)",
    gridGlow: "rgba(62, 207, 178, 0.35)",
    spotlight: "rgba(62, 207, 178, 0.15)",
    stars: "text-[#3ECFB2]/20"
  },
  pastel: {
    bg: "bg-[#FDF4FF]",
    gridBase: "rgba(244, 114, 182, 0.1)",
    gridGlow: "rgba(244, 114, 182, 0.3)",
    spotlight: "rgba(244, 114, 182, 0.12)",
    stars: "text-[#F472B6]/20"
  },
  'high-contrast': {
    bg: "bg-white",
    gridBase: "rgba(0, 0, 0, 0.08)",
    gridGlow: "rgba(0, 0, 0, 0.25)",
    spotlight: "rgba(0, 0, 0, 0.08)",
    stars: "text-black/10"
  },
  dark: {
    bg: "bg-[#0F172A]",
    gridBase: "rgba(255, 255, 255, 0.06)",
    gridGlow: "rgba(255, 255, 255, 0.2)",
    spotlight: "rgba(255, 255, 255, 0.08)",
    stars: "text-white/10"
  }
};

export default function ChildLayout({ children }) {
  const { displaySettings } = useChildStore();
  const currentTheme = themeConfigs[displaySettings.theme] || themeConfigs.default;

  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="flex flex-col min-h-screen relative transition-all duration-500 overflow-hidden"
      style={{
        filter: `brightness(${displaySettings.brightness}%) saturate(${displaySettings.saturation}%)`
      }}
    >
      {/* Solid Base Background */}
      <div className={`fixed inset-0 -z-30 transition-colors duration-1000 ${currentTheme.bg}`} />
      
      {/* Custom Background Image Overlay */}
      {displaySettings.customBackgroundImage && (
        <div 
          className="fixed inset-0 z-[-25] bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url(${displaySettings.customBackgroundImage})` }}
        />
      )}
      
      {/* Interactive Grid & Spotlight */}
      <div className="fixed inset-0 pointer-events-none z-[-20]">
        {/* Subtle Base Grid */}
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            backgroundImage: `linear-gradient(${currentTheme.gridBase} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme.gridBase} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            WebkitMaskImage: `linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)`
          }}
        />
        
        {/* Spotlight Glow Grid - Follows Mouse */}
        <div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            backgroundImage: `linear-gradient(${currentTheme.gridGlow} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme.gridGlow} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 60%)`
          }}
        />

        {/* Soft Ambient Light - Follows Mouse */}
        <div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentTheme.spotlight}, transparent 50%)`
          }}
        />
      </div>

      {/* Subtle Floating Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-60">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className={`absolute text-2xl md:text-4xl transition-colors duration-1000 ${currentTheme.stars}`}
            initial={{ 
              y: "110vh", 
              x: `${20 + (i * 15)}vw`, 
              scale: (i % 2) * 0.3 + 0.7,
              rotate: 0 
            }}
            animate={{ 
              y: "-10vh",
              rotate: 360
            }}
            transition={{ 
              duration: 30 + (i * 3), 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 4
            }}
          >
            {i % 2 === 0 ? <Sparkles size={28} fill="currentColor" /> : <Star size={24} fill="currentColor" />}
          </motion.div>
        ))}
      </div>
      
      <TopStrip />
      
      <main className="flex-1 flex flex-col pt-16 pb-24 md:pb-8 md:pl-[114px] md:pr-6 relative z-10 pointer-events-auto">
        {children}
      </main>
      
      <BottomNav />
    </div>
  );
}
