import { create } from 'zustand'
import { syncEngine } from '../lib/syncEngine'

export const useChildStore = create((set, get) => {
  // Listen for real-time parent events (e.g. parent cheers, display settings)
  if (typeof window !== 'undefined') {
    syncEngine.subscribe((msg) => {
      if (msg.type === 'DISPLAY_SETTINGS_UPDATED') {
        set({ displaySettings: msg.payload });
      }
      if (msg.type === 'PARENT_CHEER') {
        set((state) => ({
          activeCheer: msg.payload,
          cheerCount: state.cheerCount + 1
        }))
        // Auto dismiss cheer after 4s
        setTimeout(() => {
          set({ activeCheer: null })
        }, 4000)
      }
    })
  }

  return {
    child: { name: 'Arjun', avatarEmoji: '🧒', streak: 7, stars: 34 },
    todayModules: [
      { id: 'm1', emoji: '🎭', title: 'Feelings Game',       shortTitle: 'Feelings', duration: '8 min',  skill: 'Social',        unlocked: true,  completed: false },
      { id: 'm2', emoji: '🔤', title: 'Word Match',           shortTitle: 'Words',    duration: '6 min',  skill: 'Communication', unlocked: true, completed: false },
      { id: 'm3', emoji: '🧩', title: 'Puzzle Time',          shortTitle: 'Puzzles',  duration: '7 min',  skill: 'Cognitive',     unlocked: true, completed: false },
      { id: 'm4', emoji: '📅', title: 'Daily Routine Puzzle', shortTitle: 'Routine',  duration: '5 min',  skill: 'Executive',     unlocked: true, completed: false },
      { id: 'm5', emoji: '🎯', title: 'Focus Ball',           shortTitle: 'Focus',    duration: '5 min',  skill: 'Attention',     unlocked: true, completed: false },
    ],
    completedModuleIds: [],
    currentMood: '😊',
    activeScreen: 'home',
    activeGame: null,
    activeCheer: null,
    cheerCount: 0,
    displaySettings: {
      theme: 'default',
      brightness: 100,
      saturation: 100,
      soundEnabled: true,
      customBackgroundImage: null,
    },
    setDisplaySettings: (settings) => set((state) => {
      const updated = { ...state.displaySettings, ...settings };
      syncEngine.emit('DISPLAY_SETTINGS_UPDATED', updated);
      return { displaySettings: updated };
    }),
    setMood: (mood) => {
      set({ currentMood: mood })
      syncEngine.emit('MOOD_CHANGED', { mood, timestamp: Date.now() })
    },
    completeModule: (id) =>
      set((state) => {
        const newCompleted = [...state.completedModuleIds, id]
        const updated = state.todayModules.map((m, i) => {
          if (m.id === id) return { ...m, completed: true }
          const idx = state.todayModules.findIndex((x) => x.id === id)
          if (i === idx + 1) return { ...m, unlocked: true }
          return m
        })

        // Broadcast module completion
        const completedModule = state.todayModules.find(m => m.id === id)
        syncEngine.emit('MODULE_COMPLETED', {
          moduleId: id,
          title: completedModule?.title || 'Learning Module',
          starsEarned: 3,
          timestamp: Date.now()
        })

        return { 
          completedModuleIds: newCompleted, 
          todayModules: updated,
          child: { ...state.child, stars: state.child.stars + 5 } 
        }
      }),

    // Dispatch question-level telemetry (solve time, prompt used, accuracy, emotion)
    recordQuestionTelemetry: ({ gameId, questionIndex, questionText, solveTimeMs, isCorrect, usedPrompt, emotion }) => {
      syncEngine.emit('QUESTION_TELEMETRY', {
        gameId,
        questionIndex,
        questionText,
        solveTimeMs,
        solveTimeSec: parseFloat((solveTimeMs / 1000).toFixed(1)),
        isCorrect,
        promptStatus: usedPrompt ? 'System-Prompted' : 'Independent',
        spontaneityIndex: usedPrompt ? 40 : 100,
        emotion: emotion || 'Focused',
        timestamp: Date.now()
      })
    },

    setScreen: (screen) => {
      set({ activeScreen: screen })
      syncEngine.emit('SCREEN_CHANGED', { screen, timestamp: Date.now() })
    },

    setActiveGame: (game) => {
      set({ activeGame: game })
      syncEngine.emit('ACTIVE_GAME_CHANGED', { game, timestamp: Date.now() })
    },

    clearCheer: () => set({ activeCheer: null }),
  }
})
