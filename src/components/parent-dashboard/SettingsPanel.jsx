"use client";

import { useChildStore } from "../../stores/useChildStore";
import { Palette, Flower, Square, Moon, Settings, Sun, Volume2, ImageIcon, Paintbrush } from "lucide-react";

export default function SettingsPanel() {
  const { displaySettings, setDisplaySettings } = useChildStore();

  const themes = [
    { id: 'default', name: 'SynaptiX Celestial (Default)', icon: <Palette size={24} />, desc: 'Luminous indigo and starlight glow for active focus' },
    { id: 'pastel', name: 'Soft Pastels', icon: <Flower size={24} />, desc: 'Calming, low-sensory color palette' },
    { id: 'high-contrast', name: 'High Contrast', icon: <Square size={24} />, desc: 'Distinct visual boundaries for focus' },
    { id: 'dark', name: 'Night Owl', icon: <Moon size={24} />, desc: 'Low light emission for sensitive eyes' }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-indigo-100/80 rounded-3xl p-6 md:p-12 shadow-[0_8px_32px_rgba(99,102,241,0.1)]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#6366F1]/15 rounded-xl flex items-center justify-center text-2xl">
          <Settings size={28} className="text-[#6366F1]" />
        </div>
        <div>
          <h2 className="font-nunito font-bold text-2xl text-[#0F172A]">Child Display & Sensory Settings</h2>
          <p className="font-dm-sans text-[#64748B]">Fine-tune the sensory output of the SynaptiX child dashboard.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Sensory Controls */}
        <div className="space-y-8">
          <div>
            <h3 className="font-nunito font-bold text-[#0F172A] text-lg mb-2 flex items-center gap-2">
              <span className="text-[#F59E0B]"><Sun size={20} /></span> Screen Brightness
            </h3>
            <p className="font-dm-sans text-sm text-[#64748B] mb-4">Adjust the overall light emission of the child's screen.</p>
            <div className="flex items-center gap-4">
              <span className="text-[#64748B] text-sm font-bold">50%</span>
              <input
                type="range"
                min="50"
                max="150"
                value={displaySettings.brightness}
                onChange={(e) => setDisplaySettings({ brightness: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6366F1]"
              />
              <span className="text-[#4F46E5] text-sm font-bold w-12 text-right">{displaySettings.brightness}%</span>
            </div>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-[#0F172A] text-lg mb-2 flex items-center gap-2">
              <span className="text-[#06B6D4]"><Palette size={20} /></span> Color Saturation
            </h3>
            <p className="font-dm-sans text-sm text-[#64748B] mb-4">Lower saturation for a calmer visual experience.</p>
            <div className="flex items-center gap-4">
              <span className="text-[#64748B] text-sm font-bold">0%</span>
              <input
                type="range"
                min="0"
                max="200"
                value={displaySettings.saturation}
                onChange={(e) => setDisplaySettings({ saturation: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#06B6D4]"
              />
              <span className="text-[#06B6D4] text-sm font-bold w-12 text-right">{displaySettings.saturation}%</span>
            </div>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-[#0F172A] text-lg mb-2 flex items-center gap-2">
              <span className="text-[#F43F5E]"><Volume2 size={20} /></span> UI Sound Effects
            </h3>
            <p className="font-dm-sans text-sm text-[#64748B] mb-4">Playfully responsive sounds when tapping child dashboard icons.</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDisplaySettings({ soundEnabled: !displaySettings.soundEnabled })}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${displaySettings.soundEnabled ? 'bg-[#6366F1]' : 'bg-gray-200'}`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${displaySettings.soundEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <span className={`font-bold font-dm-sans ${displaySettings.soundEnabled ? 'text-[#4F46E5]' : 'text-gray-400'}`}>
                {displaySettings.soundEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-[#0F172A] text-lg mb-2 flex items-center gap-2">
              <span className="text-[#6366F1]"><ImageIcon size={20} /></span> Custom Background Image
            </h3>
            <p className="font-dm-sans text-sm text-[#64748B] mb-4">Upload a familiar photo (like a family picture) for the dashboard background.</p>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-[#6366F1]/10 hover:bg-[#6366F1]/20 text-[#4F46E5] px-4 py-2 rounded-xl font-bold font-dm-sans transition-colors border border-[#6366F1]/30">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setDisplaySettings({ customBackgroundImage: event.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              {displaySettings.customBackgroundImage && (
                <button
                  onClick={() => setDisplaySettings({ customBackgroundImage: null })}
                  className="text-[#F43F5E] font-bold font-dm-sans hover:underline text-sm"
                >
                  Remove Image
                </button>
              )}
            </div>
            {displaySettings.customBackgroundImage && (
              <div className="mt-4 p-2 bg-white/60 rounded-xl border border-white/60 inline-block">
                <img src={displaySettings.customBackgroundImage} alt="Custom Background Preview" className="h-16 w-auto rounded-lg object-cover shadow-sm" />
              </div>
            )}
          </div>

          <button
            onClick={() => setDisplaySettings({ brightness: 100, saturation: 100, theme: 'default', soundEnabled: true, customBackgroundImage: null })}
            className="px-6 py-3 bg-white border border-gray-200 text-[#64748B] rounded-xl font-dm-sans font-bold hover:bg-gray-50 transition-colors shadow-sm"
          >
            Reset to Defaults
          </button>
        </div>

        {/* Color Palette Themes */}
        <div>
          <h3 className="font-nunito font-bold text-[#0F172A] text-lg mb-4 flex items-center gap-2">
            <span className="text-[#A855F7]"><Paintbrush size={20} /></span> Visual Themes
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {themes.map(t => {
              const isActive = displaySettings.theme === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setDisplaySettings({ theme: t.id })}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${isActive
                      ? 'border-[#6366F1] bg-[#EEF2FF] shadow-sm'
                      : 'border-white/60 bg-white/50 hover:bg-white hover:border-gray-200'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isActive ? 'bg-white shadow-sm text-[#6366F1]' : 'bg-gray-100 text-[#64748B]'}`}>
                    {t.icon}
                  </div>
                  <div>
                    <div className={`font-nunito font-bold ${isActive ? 'text-[#4F46E5]' : 'text-[#0F172A]'}`}>
                      {t.name}
                    </div>
                    <div className="font-dm-sans text-sm text-[#64748B]">
                      {t.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
