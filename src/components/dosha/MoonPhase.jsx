import React from 'react'
import { getMoonPhase, getMoonNote } from '../../lib/moonPhase'

export default function MoonPhase({ date }) {
  const moon = getMoonPhase(date)
  const note = getMoonNote(moon.name)

  return (
    <div className="rounded-xl bg-slate-900 text-white p-4 flex items-start gap-4">
      <span className="text-4xl leading-none shrink-0">{moon.emoji}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-semibold text-sm">{moon.name}</p>
          <span className="text-xs text-slate-400">{moon.fraction}% illuminated</span>
        </div>
        {/* Illumination bar */}
        <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-2 w-32">
          <div
            className="h-full bg-yellow-200 rounded-full"
            style={{ width: `${moon.fraction}%` }}
          />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed italic">{note}</p>
      </div>
    </div>
  )
}
