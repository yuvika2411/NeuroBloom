"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useChildStore } from "../../../stores/useChildStore";
import ChildLayout from "../../../components/child-dashboard/ChildLayout";
import HomeScreen from "../../../components/child-dashboard/screens/HomeScreen";
import PlayScreen from "../../../components/child-dashboard/screens/PlayScreen";
import StarsScreen from "../../../components/child-dashboard/screens/StarsScreen";
import ScheduleScreen from "../../../components/child-dashboard/screens/ScheduleScreen";
import FeelScreen from "../../../components/child-dashboard/screens/FeelScreen";
import EmotionMatchGame from "../../../components/child-dashboard/games/EmotionMatchGame";
import WordMatchGame from "../../../components/child-dashboard/games/WordMatchGame";
import PuzzleGame from "../../../components/child-dashboard/games/PuzzleGame";
import RoutineGame from "../../../components/child-dashboard/games/RoutineGame";
import BallTrackingGame from "../../../components/child-dashboard/games/BallTrackingGame";
import SoundMatchGame from "../../../components/child-dashboard/games/SoundMatchGame";
import SensorySortGame from "../../../components/child-dashboard/games/SensorySortGame";
import SocialStoryGame from "../../../components/child-dashboard/games/SocialStoryGame";

const screens = {
  home: <HomeScreen />,
  play: <PlayScreen />,
  stars: <StarsScreen />,
  schedule: <ScheduleScreen />,
  feel: <FeelScreen />,
};

export default function ChildDashboardPage() {
  const { activeScreen, activeGame } = useChildStore();

  if (activeGame === 'emotion-match') return <EmotionMatchGame />;
  if (activeGame === 'word-match') return <WordMatchGame />;
  if (activeGame === 'puzzle') return <PuzzleGame />;
  if (activeGame === 'routine') return <RoutineGame />;
  if (activeGame === 'sound-match') return <SoundMatchGame />;
  if (activeGame === 'sensory-sort') return <SensorySortGame />;
  if (activeGame === 'social-story') return <SocialStoryGame />;
  if (activeGame === 'ball-tracker') return <BallTrackingGame />;

  return (
    <ChildLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="h-full relative"
        >
          {screens[activeScreen] || <HomeScreen />}
        </motion.div>
      </AnimatePresence>
    </ChildLayout>
  );
}
