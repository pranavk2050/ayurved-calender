import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import TodayPage from './pages/TodayPage'
import CalendarPage from './pages/CalendarPage'
import PrakritiPage from './pages/PrakritiPage'
import AboutPage from './pages/AboutPage'
import JournalPage from './pages/JournalPage'
import { useGeolocation } from './hooks/useGeolocation'
import { useLiveClock } from './hooks/useLiveClock'
import { useNotifications } from './hooks/useNotifications'
import useAppStore from './store/useAppStore'

function AppInner() {
  useGeolocation()
  useLiveClock()
  const notificationsEnabled = useAppStore((s) => s.notificationsEnabled)
  useNotifications(notificationsEnabled)

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<TodayPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/prakriti" element={<PrakritiPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </AppShell>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  )
}
