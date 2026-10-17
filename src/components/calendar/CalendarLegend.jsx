import React from 'react'
import { DOSHAS } from '../../data/doshas'

export default function CalendarLegend() {
  return (
    <div className="flex gap-4 mt-4 flex-wrap">
      {Object.values(DOSHAS).map((d) => (
        <div key={d.id} className="flex items-center gap-2 text-sm text-stone-600">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: d.color }} />
          {d.label} · {d.sanskrit}
        </div>
      ))}
    </div>
  )
}
