import React from 'react'
import { DOSHAS } from '../../data/doshas'
import useAppStore from '../../store/useAppStore'
import { dominantVikriti } from '../../data/vikritiQuiz'
import { SUGGESTIONS } from '../../data/suggestions'

export default function VikritiResult() {
  const vikriti = useAppStore((s) => s.vikriti)
  const resetVikriti = useAppStore((s) => s.resetVikriti)
  if (!vikriti) return null

  const dominant = dominantVikriti(vikriti)
  const dosha = DOSHAS[dominant]
  const sorted = Object.entries(vikriti).sort((a, b) => b[1] - a[1])
  const suggestions = SUGGESTIONS[dominant]

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div
        className="rounded-2xl p-5 text-white shadow-md"
        style={{ background: dosha.color }}
      >
        <p className="text-xs uppercase tracking-wide opacity-75 font-medium">Current Imbalance (Vikriti)</p>
        <h3 className="text-2xl font-bold mt-1">{dosha.label} {dosha.sanskrit}</h3>
        <p className="text-sm opacity-80 mt-2 leading-relaxed">{dosha.description}</p>
      </div>

      {/* Percentage bars */}
      <div className="rounded-xl bg-white border border-stone-200 p-4 space-y-2">
        {sorted.map(([id, pct]) => {
          const d = DOSHAS[id]
          return (
            <div key={id}>
              <div className="flex justify-between text-xs text-stone-500 mb-1">
                <span>{d.label}</span><span>{pct}%</span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: d.color }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Key rebalancing tips */}
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-3">
          Priority rebalancing steps
        </p>
        <ul className="space-y-1.5">
          {suggestions.routine.slice(0, 5).map((step, i) => (
            <li key={i} className="flex gap-2 items-start text-sm text-stone-700">
              <span style={{ color: dosha.color }} className="shrink-0 font-bold">▸</span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-400 italic">
          Reassess Vikriti every 2–4 weeks as your state changes.
        </p>
        <button
          onClick={resetVikriti}
          className="text-sm text-stone-400 hover:text-stone-600 underline"
        >
          Retake
        </button>
      </div>
    </div>
  )
}
