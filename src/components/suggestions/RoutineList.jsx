import React from 'react'

export default function RoutineList({ routine, doshaColor }) {
  return (
    <ol className="space-y-2">
      {routine.map((step, i) => (
        <li key={i} className="flex gap-3 items-start text-sm">
          <span
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: doshaColor }}
          >
            {i + 1}
          </span>
          <span className="text-stone-700 leading-relaxed pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  )
}
