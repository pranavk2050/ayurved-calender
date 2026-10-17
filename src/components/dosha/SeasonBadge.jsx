import React from 'react'
import { DOSHAS } from '../../data/doshas'

export default function SeasonBadge({ season }) {
  if (!season) return null
  const dosha = DOSHAS[season.primaryDosha]

  return (
    <div
      className="rounded-xl p-4 border"
      style={{ borderColor: dosha.colorMid, background: dosha.colorLight }}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: dosha.color }}>
            Current Season
          </p>
          <p className="font-bold text-stone-800 text-lg">{season.label} · {season.englishName}</p>
          <p className="text-sm text-stone-600 mt-1">{season.description}</p>
        </div>
        <div
          className="text-xs px-2.5 py-1 rounded-full font-semibold shrink-0"
          style={{ background: dosha.color, color: 'white' }}
        >
          {dosha.label}
        </div>
      </div>
      <p className="text-xs text-stone-500 mt-2 italic">💡 {season.tips}</p>
    </div>
  )
}
