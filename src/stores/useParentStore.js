import { create } from 'zustand'
import { syncEngine } from '../lib/syncEngine'

export const useParentStore = create((set, get) => {
  // Subscribe to real-time sync events from Child Dashboard
  if (typeof window !== 'undefined') {
    syncEngine.subscribe((msg) => {
      const state = get();

      if (msg.type === 'EMOTION_UPDATE') {
        const { emotion, focusScore, attentionState } = msg.payload;
        set({
          liveChildStatus: {
            ...state.liveChildStatus,
            isOnline: true,
            currentEmotion: emotion,
            focusScore,
            attentionState,
            lastUpdated: Date.now()
          },
          // Append emotion snapshot to history
          emotionHistory: [
            { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), emotion, focusScore },
            ...(state.emotionHistory || []).slice(0, 14)
          ]
        });
      }

      if (msg.type === 'ACTIVE_GAME_CHANGED') {
        set({
          liveChildStatus: {
            ...state.liveChildStatus,
            isOnline: true,
            activeGame: msg.payload.game,
            lastUpdated: Date.now()
          }
        });
      }

      if (msg.type === 'SCREEN_CHANGED') {
        set({
          liveChildStatus: {
            ...state.liveChildStatus,
            isOnline: true,
            currentScreen: msg.payload.screen,
            lastUpdated: Date.now()
          }
        });
      }

      if (msg.type === 'QUESTION_TELEMETRY') {
        const tel = msg.payload;
        const newLogs = [tel, ...(state.questionTelemetryLog || [])];
        
        // Recalculate average solve time & independence rate
        const totalSolveSec = newLogs.reduce((acc, curr) => acc + curr.solveTimeSec, 0);
        const avgSolveTimeSec = parseFloat((totalSolveSec / newLogs.length).toFixed(1));

        const independentCount = newLogs.filter(l => l.promptStatus === 'Independent').length;
        const independenceRate = Math.round((independentCount / newLogs.length) * 100);

        // Auto-generate ML Facial Expression Observation Note
        const newMlNote = {
          id: Math.random().toString(36).substring(2, 9),
          date: 'Live ML Stream',
          author: 'ML Facial Model Observation',
          content: `Webcam camera detected Arjun exhibiting ${tel.emotion} expression (${tel.promptStatus}) during ${tel.gameId} ("${tel.questionText}"). Solve latency: ${tel.solveTimeSec}s.`
        };

        set({
          questionTelemetryLog: newLogs,
          therapistNotes: [newMlNote, ...(state.therapistNotes || [])],
          stats: {
            ...state.stats,
            todayMinutes: state.stats.todayMinutes + Math.ceil(tel.solveTimeSec / 60)
          },
          realtimeMetrics: {
            avgSolveTimeSec,
            independenceRate,
            totalQuestionsAnswered: newLogs.length
          },
          // Append to session timeline
          sessionTimeline: [
            {
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              module: tel.gameId || 'Game Activity',
              emoji: tel.isCorrect ? '✅' : '💡',
              duration: `${tel.solveTimeSec}s`,
              mood: tel.emotion,
              moodEmoji: tel.emotion === 'Happy' ? '😊' : tel.emotion === 'Focused' ? '🎯' : '🤔',
              score: tel.isCorrect ? 100 : 60,
              promptStatus: tel.promptStatus
            },
            ...(state.sessionTimeline || [])
          ]
        });
      }

      if (msg.type === 'MODULE_COMPLETED') {
        set({
          stats: {
            ...state.stats,
            totalModules: state.stats.totalModules + 1
          }
        });
      }
    });
  }

  return {
    activeTab: 'overview',
    setActiveTab: (tab) => set({ activeTab: tab }),
    parent: { name: 'Priya', avatarInitials: 'PM' },
    child: { name: 'Arjun', age: 6, streak: 7 },
    
    // Live Real-Time Child Telemetry State
    liveChildStatus: {
      isOnline: true,
      currentScreen: 'play',
      activeGame: 'EmotionMatchGame',
      currentEmotion: 'Focused',
      focusScore: 88,
      attentionState: 'High Focus',
      lastUpdated: Date.now()
    },

    realtimeMetrics: {
      avgSolveTimeSec: 3.2,
      independenceRate: 82,
      totalQuestionsAnswered: 18
    },

    emotionHistory: [
      { time: '10:00:15', emotion: 'Focused', focusScore: 85 },
      { time: '10:01:30', emotion: 'Happy', focusScore: 92 },
      { time: '10:02:45', emotion: 'Focused', focusScore: 88 },
      { time: '10:04:10', emotion: 'Frustrated/Confused', focusScore: 65 },
      { time: '10:05:20', emotion: 'Happy', focusScore: 95 },
    ],

    questionTelemetryLog: [
      {
        gameId: 'EmotionMatchGame',
        questionIndex: 0,
        questionText: 'How is this person feeling?',
        solveTimeMs: 2400,
        solveTimeSec: 2.4,
        isCorrect: true,
        promptStatus: 'Independent',
        spontaneityIndex: 100,
        emotion: 'Happy',
        timestamp: Date.now() - 120000
      },
      {
        gameId: 'PuzzleGame',
        questionIndex: 1,
        questionText: 'Find the matching star shape',
        solveTimeMs: 3800,
        solveTimeSec: 3.8,
        isCorrect: true,
        promptStatus: 'Independent',
        spontaneityIndex: 100,
        emotion: 'Focused',
        timestamp: Date.now() - 240000
      },
      {
        gameId: 'WordMatchGame',
        questionIndex: 0,
        questionText: 'Match Apple symbol',
        solveTimeMs: 4200,
        solveTimeSec: 4.2,
        isCorrect: true,
        promptStatus: 'System-Prompted',
        spontaneityIndex: 40,
        emotion: 'Frustrated/Confused',
        timestamp: Date.now() - 360000
      }
    ],

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
      { day: 'Mon', focusScore: 75, attentionSpan: 12, solveSpeedSec: 4.2 },
      { day: 'Tue', focusScore: 82, attentionSpan: 15, solveSpeedSec: 3.8 },
      { day: 'Wed', focusScore: 68, attentionSpan: 10, solveSpeedSec: 5.1 },
      { day: 'Thu', focusScore: 88, attentionSpan: 18, solveSpeedSec: 3.2 },
      { day: 'Fri', focusScore: 92, attentionSpan: 22, solveSpeedSec: 2.8 },
      { day: 'Sat', focusScore: 85, attentionSpan: 16, solveSpeedSec: 3.1 },
      { day: 'Sun', focusScore: 78, attentionSpan: 14, solveSpeedSec: 3.5 },
    ],
    categoryTimeData: [
      { name: 'Emotions', value: 45, color: '#FFB020' },
      { name: 'Communication', value: 30, color: '#3ECFB2' },
      { name: 'Puzzles', value: 15, color: '#4A90D9' },
      { name: 'Executive', value: 10, color: '#C4B5FD' },
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
      { name: 'Independent', value: 78, color: '#3ECFB2' },
      { name: 'Prompted', value: 16, color: '#FFC043' },
      { name: 'Skipped', value: 6, color: '#FF7E6B' },
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
        title: 'Weekly Progress & ML Facial Telemetry Report',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        type: 'Progress',
        summary: 'Arjun showed an 82% unprompted independence rate. ML camera model recorded sustained focus (88% avg focus score) with 0 sensory overload triggers.',
        details: 'Real-time webcam ML model notes:\n- High sustained attention during visual matching & AAC symbol boards.\n- Facial expression shifted smoothly from Neutral -> Focused -> Happy upon solving task independently.\n- Solve latency averaged 3.2s per question.'
      },
      {
        id: 'r2',
        title: 'Category Training: AAC Communication & Facial Cues',
        date: 'May 28, 2026',
        type: 'Category',
        summary: 'Focus on AAC board usage and facial expression recognition.',
        details: 'Over the past month, Arjun has successfully integrated 12 new symbols into daily use. Facial expression tracking indicates increased enjoyment (Happy valence up 25%) during sound-paired PECS activities.'
      }
    ],
    skillProgress: [
      { label: 'Communication',      value: 68, color: '#3ECFB2' },
      { label: 'Emotion Recognition', value: 75, color: '#C4B5FD' },
      { label: 'Cognitive / Puzzles', value: 84, color: '#4A90D9' },
      { label: 'Executive Function',  value: 62, color: '#FF7E6B' },
      { label: 'Social Interaction',  value: 58, color: '#FFA94D' },
    ],
    promptDependency: [
      { week: 'Week 1', independent: 30, prompted: 50, skipped: 20 },
      { week: 'Week 2', independent: 42, prompted: 40, skipped: 18 },
      { week: 'Week 3', independent: 55, prompted: 35, skipped: 10 },
      { week: 'Week 4', independent: 82, prompted: 14, skipped: 4  },
    ],
    sessionTimeline: [
      { time: '9:15 AM', module: 'Emotion Match Game',         emoji: '🎭', duration: '2.4s', mood: 'Happy',   moodEmoji: '😊', score: 100, promptStatus: 'Independent' },
      { time: '9:23 AM', module: 'Picture Communication Board', emoji: '🗣️', duration: '4.2s', mood: 'Focused', moodEmoji: '🎯', score: 100, promptStatus: 'Independent' },
      { time: '9:28 AM', module: 'Shape Sorting Puzzle',        emoji: '🧩', duration: '3.8s', mood: 'Happy',   moodEmoji: '😊', score: 100, promptStatus: 'Independent' },
    ],
    therapistNotes: [
      {
        id: '1',
        date: 'Today',
        author: 'ML Facial Model Observation',
        content: 'Webcam ML camera analysis recorded Arjun exhibiting 92% Happy & Focused facial expressions during game sessions. Solve latency averaged 3.2s.',
      },
      {
        id: '2',
        date: 'June 1',
        author: 'Dr. Neha Sharma (Therapist)',
        content: 'Arjun showed great improvement in prompt fading today! Facial expression notes confirm sustained attention without agitation.',
      }
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

    sendParentCheer: (text = "You are doing amazing!", emoji = "⭐") => {
      syncEngine.emit('PARENT_CHEER', {
        text,
        emoji,
        sender: 'Mom',
        timestamp: Date.now()
      });
    }
  }
})
