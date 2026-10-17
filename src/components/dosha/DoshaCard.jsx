import React from 'react'
import { DOSHAS } from '../../data/doshas'

export default function DoshaCard({ doshaResult }) {
  const { primary, secondary, timeBlock, reasoning } = doshaResult
  const dosha = DOSHAS[primary]

  return (
    <div
      className="rounded-2xl p-5 text-white shadow-md"
      style={{ background: dosha.color }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm opacity-75 uppercase tracking-wide font-medium">Active Now</p>
          <h2 className="text-3xl font-bold mt-0.5">{dosha.label}</h2>
          <p className="text-lg opacity-80 font-light">{dosha.sanskrit}</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-75">{timeBlock.label}</p>
          {secondary && (
            <p className="text-xs opacity-60 mt-1">
              Secondary: {DOSHAS[secondary].label}
            </p>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm opacity-90 leading-relaxed">{dosha.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {dosha.elements.map((el) => (
          <span key={el} className="text-xs px-2 py-0.5 rounded-full bg-white/20">{el}</span>
        ))}
        {dosha.qualities.map((q) => (
          <span key={q} className="text-xs px-2 py-0.5 rounded-full bg-white/10">{q}</span>
        ))}
      </div>

      <p className="mt-3 text-xs opacity-70 italic">{timeBlock.guidance}</p>
    </div>
  )
}
