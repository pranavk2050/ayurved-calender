import React, { useState } from 'react'
import { DOSHAS } from '../../data/doshas'
import useJournalStore from '../../store/useJournalStore'
import JournalForm from './JournalForm'

function Dot({ value, max = 5, color }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i < value ? color : '#e7e5e4' }}
        />
      ))}
    </div>
  )
}

function EntryCard({ entry, onEdit }) {
  const dosha = DOSHAS[entry.dosha] ?? DOSHAS.VATA
  const date = new Date(entry.date)
  const isToday = date.toDateString() === new Date().toDateString()

  return (
    <div className="flex gap-3">
      {/* Timeline stem */}
      <div className="flex flex-col items-center">
        <div
          className="w-4 h-4 rounded-full shrink-0 mt-1 border-2 border-white shadow"
          style={{ background: dosha.color }}
        />
        <div className="w-0.5 bg-stone-200 flex-1 mt-1" />
      </div>

      {/* Card */}
      <div className="pb-5 flex-1 min-w-0">
        <div
          className="rounded-xl p-4 border"
          style={{ borderColor: dosha.colorMid, background: dosha.colorLight }}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <p className="text-xs font-semibold text-stone-500">
                {isToday ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <p className="text-sm font-bold" style={{ color: dosha.color }}>
                {dosha.label} · {dosha.sanskrit}
              </p>
            </div>
            {isToday && (
              <button
                onClick={() => onEdit(entry)}
                className="text-xs text-stone-400 hover:text-stone-600 underline shrink-0"
              >
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { label: 'Energy', value: entry.energy, color: '#f59e0b' },
              { label: 'Digestion', value: entry.digestion, color: dosha.color },
              { label: 'Mood', value: entry.mood, color: '#10b981' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <p className="text-xs text-stone-500 mb-1">{label}</p>
                <Dot value={value} color={color} />
              </div>
            ))}
          </div>

          {entry.notes && (
            <p className="text-xs text-stone-600 italic leading-relaxed border-t border-stone-200 pt-2 mt-2">
              "{entry.notes}"
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function JournalTimeline() {
  const entries = useJournalStore((s) => s.entries)
  const [editingEntry, setEditingEntry] = useState(null)

  if (!entries.length) {
    return (
      <div className="text-center py-12 text-stone-400">
        <p className="text-4xl mb-3">📓</p>
        <p className="text-sm">No entries yet. Log today's first entry above.</p>
      </div>
    )
  }

  return (
    <div>
      {editingEntry && (
        <div className="mb-6">
          <JournalForm existingEntry={editingEntry} onSave={() => setEditingEntry(null)} />
        </div>
      )}

      <div>
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} onEdit={setEditingEntry} />
        ))}
        {/* End dot */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-stone-200" />
          </div>
          <p className="text-xs text-stone-400 pt-0.5">Journal started</p>
        </div>
      </div>
    </div>
  )
}
