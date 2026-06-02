"use client";

import ParentLayout from "../../../components/parent-dashboard/ParentLayout";
import HeaderBar from "../../../components/parent-dashboard/HeaderBar";
import StatsRow from "../../../components/parent-dashboard/StatsRow";
import ActivityTimeline from "../../../components/parent-dashboard/ActivityTimeline";
import TherapistNotes from "../../../components/parent-dashboard/TherapistNotes";
import MoodChart from "../../../components/parent-dashboard/MoodChart";
import SkillBars from "../../../components/parent-dashboard/SkillBars";
import PromptDependency from "../../../components/parent-dashboard/PromptDependency";
import UpcomingModules from "../../../components/parent-dashboard/UpcomingModules";
import Achievements from "../../../components/parent-dashboard/Achievements";
import SettingsPanel from "../../../components/parent-dashboard/SettingsPanel";
import { useParentStore } from "../../../stores/useParentStore";

export default function ParentDashboardPage() {
  const { activeTab } = useParentStore();

  const Placeholder = ({ title, emoji }) => (
    <div className="bg-white/55 backdrop-blur-lg border border-white/60 rounded-3xl p-12 shadow-[0_8px_32px_rgba(62,207,178,0.12)] flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="font-nunito font-bold text-2xl text-[#1B2D3E] mb-2">{title}</h2>
      <p className="font-dm-sans text-[#8FA3B1]">This module will be available soon.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <StatsRow />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityTimeline />
              </div>
              <div>
                <TherapistNotes />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MoodChart />
              <SkillBars />
            </div>
            
            <PromptDependency />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
              <UpcomingModules />
              <Achievements />
            </div>
          </>
        );
      case "progress":
        return (
          <div className="space-y-6 pb-12">
            <SkillBars />
            <PromptDependency />
            <Achievements />
          </div>
        );
      case "mood":
        return (
          <div className="space-y-6 pb-12">
            <MoodChart />
          </div>
        );
      case "sessions":
        return (
          <div className="space-y-6 pb-12">
            <ActivityTimeline />
            <UpcomingModules />
          </div>
        );
      case "notes":
        return (
          <div className="space-y-6 pb-12 max-w-2xl">
            <TherapistNotes />
          </div>
        );
      case "reports":
        return <Placeholder title="Clinical Reports" emoji="📋" />;
      case "settings":
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <ParentLayout>
      <HeaderBar />
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto w-full">
        {renderContent()}
      </div>
    </ParentLayout>
  );
}
