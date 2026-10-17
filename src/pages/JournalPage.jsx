import React from 'react'
import LocationGate from '../components/location/LocationGate'
import JournalForm from '../components/journal/JournalForm'
import JournalTimeline from '../components/journal/JournalTimeline'
import useJournalStore from '../store/useJournalStore'

export default function JournalPage() {
  const getTodayEntry = useJournalStore((s) => s.getTodayEntry)
  const todayEntry = getTodayEntry()

  return (
    <LocationGate>
      <h1 className="text-xl font-semibold text-stone-800 mb-1">Dosha Journal</h1>
      <p className="text-sm text-stone-500 mb-5">
        Track how you feel each day — energy, digestion, and mood. Patterns over time reveal
        which lifestyle choices keep your doshas in balance.
      </p>

      {/* Show form only if no entry today yet */}
      {!todayEntry && (
        <div className="mb-8">
          <JournalForm />
        </div>
      )}

      {todayEntry && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          ✓ Today's entry logged. You can edit it in the timeline below.
        </div>
      )}

      <JournalTimeline />
    </LocationGate>
  )
}
