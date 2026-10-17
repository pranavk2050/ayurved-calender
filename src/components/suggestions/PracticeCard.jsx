import React from 'react'

export default function PracticeCard({ type, data, doshaColor }) {
  if (type === 'yoga') {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-stone-100 bg-stone-50 p-3">
          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wide mb-1">Style</p>
          <p className="text-sm text-stone-700">{data.style}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">Recommended Poses</p>
          <ul className="space-y-1.5">
            {data.poses.map((pose) => (
              <li key={pose} className="flex items-center gap-2 text-sm text-stone-700">
                <span style={{ color: doshaColor }}>▸</span> {pose}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
          <p className="text-xs font-semibold text-blue-700 mb-1">Pranayama</p>
          <p className="text-sm text-blue-800">{data.pranayama}</p>
        </div>

        <div className="rounded-lg bg-stone-50 border border-stone-200 p-3">
          <p className="text-xs text-stone-500"><strong>Avoid:</strong> {data.avoid}</p>
        </div>
      </div>
    )
  }

  // mindfulness
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">Practices</p>
        <ul className="space-y-1.5">
          {data.practices.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-stone-700">
              <span style={{ color: doshaColor }}>✦</span> {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
        <p className="text-xs font-semibold text-blue-700 mb-1">Breathwork</p>
        <p className="text-sm text-blue-800">{data.breath}</p>
      </div>

      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 space-y-1">
        <p className="text-xs text-amber-800"><strong>Duration:</strong> {data.duration}</p>
        <p className="text-xs text-amber-700 italic">"{data.affirmation}"</p>
      </div>
    </div>
  )
}
