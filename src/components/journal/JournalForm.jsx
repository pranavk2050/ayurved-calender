import React, { useState, useEffect } from 'react'
import { DOSHAS } from '../../data/doshas'
import useJournalStore from '../../store/useJournalStore'
import { useCurrentDosha } from '../../hooks/useCurrentDosha'

const RATINGS = [1, 2, 3, 4, 5]

function StarRating({ value, onChange, color }) {
  return (
    <div className="flex gap-1">
      {RATINGS.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => onChange(r)}
          className="text-xl transition-transform hover:scale-110"
          style={{ color: r <= value ? color : '#d6d3d1' }}
        >
          ●
        </button>
      ))}
    </div>
  )
}

export default function JournalForm({ existingEntry, onSave }) {
  const doshaResult = useCurrentDosha()
  const { addEntry, updateEntry } = useJournalStore()

  const [energy, setEnergy] = useState(existingEntry?.energy ?? 3)
  const [digestion, setDigestion] = useState(existingEntry?.digestion ?? 3)
  const [mood, setMood] = useState(existingEntry?.mood ?? 3)
  const [notes, setNotes] = useState(existingEntry?.notes ?? '')

  const dosha = DOSHAS[doshaResult.primary]

  function handleSave() {
    const entry = {
      date: new Date().toISOString(),
      dosha: doshaResult.primary,
      energy,
      digestion,
      mood,
      notes: notes.trim(),
    }
    if (existingEntry) {
      updateEntry(existingEntry.id, entry)
    } else {
      addEntry(entry)
    }
    onSave?.()
  }

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-stone-800">
          {existingEntry ? 'Edit today\'s entry' : 'How are you feeling today?'}
        </h3>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
          style={{ background: dosha.color }}
        >
          {dosha.label} day
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-600 block mb-1.5">⚡ Energy</label>
          <StarRating value={energy} onChange={setEnergy} color="#f59e0b" />
        </div>
        <div>
          <label className="text-sm font-medium text-stone-600 block mb-1.5">🔥 Digestion</label>
          <StarRating value={digestion} onChange={setDigestion} color={dosha.color} />
        </div>
        <div>
          <label className="text-sm font-medium text-stone-600 block mb-1.5">🌿 Mood</label>
          <StarRating value={mood} onChange={setMood} color="#10b981" />
        </div>
        <div>
          <label className="text-sm font-medium text-stone-600 block mb-1.5">📝 Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How do you feel? What did you eat? Any symptoms?"
            rows={3}
            className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: dosha.color }}
      >
        {existingEntry ? 'Update entry' : 'Save entry'}
      </button>
    </div>
  )
}
