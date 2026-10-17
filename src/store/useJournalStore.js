import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Each entry: { id, date (ISO string), dosha, energy, digestion, mood, notes }
const useJournalStore = create(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entry) =>
        set((state) => ({
          entries: [
            { ...entry, id: `${Date.now()}` },
            ...state.entries,
          ],
        })),

      updateEntry: (id, patch) =>
        set((state) => ({
          entries: state.entries.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),

      deleteEntry: (id) =>
        set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),

      getTodayEntry: () => {
        const today = new Date().toDateString()
        return get().entries.find((e) => new Date(e.date).toDateString() === today) ?? null
      },
    }),
    { name: 'ayurved-journal' }
  )
)

export default useJournalStore
