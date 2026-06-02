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
  concentrationData: [
    { day: 'Mon', focusScore: 75, attentionSpan: 12 },
    { day: 'Tue', focusScore: 82, attentionSpan: 15 },
    { day: 'Wed', focusScore: 68, attentionSpan: 10 },
    { day: 'Thu', focusScore: 88, attentionSpan: 18 },
    { day: 'Fri', focusScore: 92, attentionSpan: 22 },
    { day: 'Sat', focusScore: 85, attentionSpan: 16 },
    { day: 'Sun', focusScore: 78, attentionSpan: 14 },
  ],
  categoryTimeData: [
    { name: 'Emotions', value: 45, color: '#FFB020' },
    { name: 'Communication', value: 30, color: '#3ECFB2' },
    { name: 'Puzzles', value: 15, color: '#4A90D9' },
    { name: 'Social', value: 10, color: '#C4B5FD' },
  ],
  behavioralData: [
    { day: 'Mon', incidents: 2, intensity: 3 },
    { day: 'Tue', incidents: 1, intensity: 2 },
    { day: 'Wed', incidents: 3, intensity: 4 },
    { day: 'Thu', incidents: 0, intensity: 0 },
    { day: 'Fri', incidents: 1, intensity: 2 },
    { day: 'Sat', incidents: 0, intensity: 0 },
    { day: 'Sun', incidents: 1, intensity: 1 },
  ],
  vocabularyData: [
    { week: 'Week 1', wordsLearned: 5, cumulative: 5 },
    { week: 'Week 2', wordsLearned: 8, cumulative: 13 },
    { week: 'Week 3', wordsLearned: 6, cumulative: 19 },
    { week: 'Week 4', wordsLearned: 12, cumulative: 31 },
  ],
  completionData: [
    { name: 'Completed', value: 75, color: '#3ECFB2' },
    { name: 'Prompted', value: 15, color: '#FFC043' },
    { name: 'Abandoned', value: 10, color: '#FF7E6B' },
  ],
  sleepMoodData: [
    { day: 'Mon', sleepHours: 7.5, moodScore: 3.5 },
    { day: 'Tue', sleepHours: 8.5, moodScore: 4.0 },
    { day: 'Wed', sleepHours: 8.0, moodScore: 3.8 },
    { day: 'Thu', sleepHours: 9.5, moodScore: 4.5 },
    { day: 'Fri', sleepHours: 9.0, moodScore: 4.2 },
    { day: 'Sat', sleepHours: 10.0, moodScore: 4.7 },
    { day: 'Sun', sleepHours: 8.5, moodScore: 4.2 },
  ],
  clinicalReports: [
    {
      id: 'r1',
      title: 'Weekly Progress Report',
      date: 'June 2, 2026',
      type: 'Progress',
      summary: 'Arjun showed a 15% increase in independent task completion this week. Notable improvements in the Emotion Recognition modules.',
      details: 'This week, Arjun completed 14 modules. The most significant progress was observed during the Social Story exercises. Meltdowns decreased by 20% compared to last week. Sleep quality has been consistently good, which correlates with higher focus scores during morning sessions.'
    },
    {
      id: 'r2',
      title: 'Category Training: Communication',
      date: 'May 28, 2026',
      type: 'Category',
      summary: 'Focus on AAC board usage and vocabulary expansion.',
      details: 'Over the past month, Arjun has successfully integrated 12 new symbols into daily use. Prompt dependency for communication has dropped to 30%. Next phase will focus on forming 3-symbol sentences.'
    },
    {
      id: 'r3',
      title: 'Monthly Behavioral Summary',
      date: 'May 15, 2026',
      type: 'Behavioral',
      summary: 'Overall decrease in trigger intensity; transition periods remain challenging.',
      details: 'A review of the past 30 days indicates that transitions between highly preferred and non-preferred activities are the primary triggers. Recommend introducing visual timers 5 minutes prior to transitions.'
    }
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
