"use client";

import { motion } from "framer-motion";
import TopStrip from "./TopStrip";
import BottomNav from "./BottomNav";
import { useChildStore } from "../../stores/useChildStore";

const themeConfigs = {
  default: {
    bg: ['linear-gradient(135deg, #A7F3D0, #C7D2FE, #BAE6FD)', 'linear-gradient(135deg, #BAE6FD, #C7D2FE, #A7F3D0)'],
    blob1: "bg-[#3ECFB2]/30",
    blob2: "bg-[#C4B5FD]/40",
    blob3: "bg-[#FDE047]/30",
    stars: "text-white/50"
  },
  pastel: {
    bg: ['linear-gradient(135deg, #F3F4F6, #FDF4FF, #F0FDF4)', 'linear-gradient(135deg, #F0FDF4, #F3F4F6, #FDF4FF)'],
    blob1: "bg-[#E5E7EB]/50",
    blob2: "bg-[#FBCFE8]/40",
    blob3: "bg-[#BBF7D0]/40",
    stars: "text-gray-400/30"
  },
  'high-contrast': {
    bg: ['linear-gradient(135deg, #FFFFFF, #E5E7EB, #D1D5DB)', 'linear-gradient(135deg, #D1D5DB, #FFFFFF, #E5E7EB)'],
    blob1: "bg-black/5",
    blob2: "bg-black/5",
    blob3: "bg-black/5",
    stars: "text-black/10"
  },
  dark: {
    bg: ['linear-gradient(135deg, #111827, #1F2937, #374151)', 'linear-gradient(135deg, #374151, #111827, #1F2937)'],
    blob1: "bg-black/40",
    blob2: "bg-[#4B5563]/30",
    blob3: "bg-[#1E40AF]/20",
    stars: "text-white/10"
  }
};

export default function ChildLayout({ children }) {
  const { displaySettings } = useChildStore();
  const currentTheme = themeConfigs[displaySettings.theme] || themeConfigs.default;

  return (
    <div 
      className="flex flex-col min-h-screen relative transition-all duration-500"
      style={{
        filter: `brightness(${displaySettings.brightness}%) saturate(${displaySettings.saturation}%)`
      }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="fixed inset-0 -z-30 transition-colors duration-1000"
        animate={{ 
          background: currentTheme.bg
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      
      {/* Custom Background Image Overlay */}
      {displaySettings.customBackgroundImage && (
        <div 
          className="fixed inset-0 z-[-25] bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: `url(${displaySettings.customBackgroundImage})` }}
        />
      )}
      
      {/* Playful Floating Background Shapes (Visible on all devices) */}
      <div className="fixed inset-0 pointer-events-none z-[-20]">
        <motion.div
          className={`absolute top-[10%] left-[5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full blur-[60px] md:blur-[80px] transition-colors duration-1000 ${currentTheme.blob1}`}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute bottom-[15%] right-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[70px] md:blur-[100px] transition-colors duration-1000 ${currentTheme.blob2}`}
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute top-[40%] right-[30%] w-[200px] md:w-[350px] h-[200px] md:h-[350px] rounded-full blur-[50px] md:blur-[80px] transition-colors duration-1000 ${currentTheme.blob3}`}
          animate={{ x: [0, -20, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className={`absolute text-3xl md:text-5xl transition-colors duration-1000 ${currentTheme.stars}`}
            initial={{ 
              y: "110vh", 
              x: `${10 + (i * 15)}vw`, 
              scale: (i % 3) * 0.2 + 0.6,
              rotate: 0 
            }}
            animate={{ 
              y: "-10vh",
              rotate: 360
            }}
            transition={{ 
              duration: 25 + (i * 2), 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 3
            }}
          >
            {i % 2 === 0 ? "✨" : "☁️"}
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
