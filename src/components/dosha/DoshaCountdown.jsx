import React from 'react'
import { DOSHAS } from '../../data/doshas'
import { getNextBlock, formatCountdown } from '../../lib/nextBlockHelper'

export default function DoshaCountdown({ currentTime, solarTimes }) {
  const { nextBlock, minutesLeft } = getNextBlock(currentTime, solarTimes)
  const dosha = DOSHAS[nextBlock.dosha]

  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3 border text-sm"
      style={{ borderColor: dosha.colorMid, background: dosha.colorLight }}
    >
      <div>
        <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Next</p>
        <p className="font-semibold" style={{ color: dosha.color }}>
          {dosha.label} · {nextBlock.label}
        </p>
      </div>
      <div className="text-right">
        <p
          className="text-2xl font-bold tabular-nums"
          style={{ color: dosha.color }}
        >
          {formatCountdown(minutesLeft)}
        </p>
        <p className="text-xs text-stone-400">remaining</p>
      </div>
    </div>
  )
}
