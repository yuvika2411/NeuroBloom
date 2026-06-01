import { create } from 'zustand'

export const useStore = create((set) => ({
  userType: 'parent',
  setUserType: (type) => set({ userType: type }),
}))
