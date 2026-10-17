import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import TodayPage from './pages/TodayPage'
import CalendarPage from './pages/CalendarPage'
import PrakritiPage from './pages/PrakritiPage'
import AboutPage from './pages/AboutPage'
import { useGeolocation } from './hooks/useGeolocation'
import { useLiveClock } from './hooks/useLiveClock'

function AppInner() {
  useGeolocation()
  useLiveClock()

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<TodayPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/prakriti" element={<PrakritiPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </AppShell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
