import { create } from 'zustand'

export const useParentStore = create((set) => ({
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
  parent: { name: 'Priya', avatarInitials: 'PM' },
  child: { name: 'Arjun', age: 6, streak: 7 },
  stats: {
    todayMinutes: 18,
    weeklyStreak: 7,
    totalModules: 34,
    avgMoodScore: 4.2,
  },
  weeklyMoodData: [
    { day: 'Mon', score: 3.5, emoji: '😐' },
    { day: 'Tue', score: 4.0, emoji: '😊' },
    { day: 'Wed', score: 3.8, emoji: '😊' },
    { day: 'Thu', score: 4.5, emoji: '😄' },
    { day: 'Fri', score: 4.2, emoji: '😊' },
    { day: 'Sat', score: 4.7, emoji: '😄' },
    { day: 'Sun', score: 4.2, emoji: '😊' },
  ],
  skillProgress: [
    { label: 'Communication',      value: 68, color: '#3ECFB2' },
    { label: 'Emotion Recognition', value: 55, color: '#C4B5FD' },
    { label: 'Cognitive / Puzzles', value: 82, color: '#4A90D9' },
    { label: 'Executive Function',  value: 44, color: '#FF7E6B' },
    { label: 'Social Interaction',  value: 37, color: '#FFA94D' },
  ],
  promptDependency: [
    { week: 'Week 1', independent: 30, prompted: 50, skipped: 20 },
    { week: 'Week 2', independent: 42, prompted: 40, skipped: 18 },
    { week: 'Week 3', independent: 55, prompted: 35, skipped: 10 },
    { week: 'Week 4', independent: 63, prompted: 30, skipped: 7  },
  ],
  sessionTimeline: [
    { time: '9:15 AM', module: 'Emotion Match Game',         emoji: '🎭', duration: '8 min',  mood: 'Happy',   moodEmoji: '😊', score: 85 },
    { time: '9:23 AM', module: 'Picture Communication Board', emoji: '🗣️', duration: '5 min', mood: 'Neutral', moodEmoji: '😐', score: 70 },
    { time: '9:28 AM', module: 'Shape Sorting Puzzle',        emoji: '🧩', duration: '5 min', mood: 'Happy',   moodEmoji: '😊', score: 92 },
  ],
  therapistNotes: [
    {
      id: '1',
      date: 'June 1',
      author: 'Dr. Neha Sharma',
      content: 'Arjun showed great improvement in turn-taking today. Recommend continuing Social Story modules. Increase puzzle difficulty next session.',
    },
    {
      id: '2',
      date: 'May 28',
      author: 'Dr. Neha Sharma',
      content: 'Communication board usage is up significantly. Try introducing 3-symbol sentences next week.',
    },
  ],
  achievements: [
    { id: '1', emoji: '🔥', label: '7-Day Streak',    unlocked: true  },
    { id: '2', emoji: '🧩', label: 'Puzzle Master',   unlocked: true  },
    { id: '3', emoji: '😊', label: 'Happy Explorer',  unlocked: true  },
    { id: '4', emoji: '🗣️', label: 'First Words',    unlocked: true  },
    { id: '5', emoji: '⭐', label: 'Top Scorer',      unlocked: true  },
    { id: '6', emoji: '🌟', label: 'Week Champion',   unlocked: true  },
    { id: '7', emoji: '🏅', label: '30-Day Streak',   unlocked: false },
    { id: '8', emoji: '🎭', label: 'Social Star',     unlocked: false },
  ],
  upcomingModules: [
    { id: '1', emoji: '🎭', title: 'Social Story: At the Playground', duration: '8 min', skill: 'Social',        difficulty: 2 },
    { id: '2', emoji: '🔤', title: 'Vocabulary Builder: Feelings',     duration: '6 min', skill: 'Communication', difficulty: 1 },
    { id: '3', emoji: '🧩', title: 'Pattern Puzzle Level 5',           duration: '7 min', skill: 'Cognitive',     difficulty: 3 },
  ],
}))
