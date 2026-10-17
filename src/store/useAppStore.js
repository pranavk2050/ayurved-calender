import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set) => ({
      // Location
      location: null,
      locationStatus: 'idle', // 'idle' | 'requesting' | 'granted' | 'denied' | 'manual'
      cityName: null,

      // Solar times (updated daily)
      solarTimes: null,

      // Live clock (updated every minute)
      currentTime: new Date(),

      // Prakriti (birth constitution)
      prakriti: null,
      prakritiComplete: false,

      // Vikriti (current imbalance)
      vikriti: null,
      vikritiComplete: false,

      // Notifications
      notificationsEnabled: false,

      // Actions
      setLocation: (location, cityName = null) =>
        set({ location, locationStatus: 'granted', cityName }),

      setLocationDenied: () => set({ locationStatus: 'denied' }),
      setLocationRequesting: () => set({ locationStatus: 'requesting' }),

      setManualLocation: (location, cityName) =>
        set({ location, locationStatus: 'manual', cityName }),

      setSolarTimes: (solarTimes) => set({ solarTimes }),

      setCurrentTime: (currentTime) => set({ currentTime }),

      setPrakriti: (prakriti) => set({ prakriti, prakritiComplete: true }),
      resetPrakriti: () => set({ prakriti: null, prakritiComplete: false }),

      setVikriti: (vikriti) => set({ vikriti, vikritiComplete: true }),
      resetVikriti: () => set({ vikriti: null, vikritiComplete: false }),

      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
    }),
    {
      name: 'ayurved-app-storage',
      // Only persist prakriti and location across sessions
      partialize: (state) => ({
        prakriti: state.prakriti,
        prakritiComplete: state.prakritiComplete,
        vikriti: state.vikriti,
        vikritiComplete: state.vikritiComplete,
        notificationsEnabled: state.notificationsEnabled,
        location: state.location,
        cityName: state.cityName,
        locationStatus: state.locationStatus === 'granted' || state.locationStatus === 'manual'
          ? state.locationStatus
          : 'idle',
      }),
    }
  )
)

export default useAppStore
