import React from 'react'
import { DOSHAS } from '../../data/doshas'
import useAppStore from '../../store/useAppStore'

function DonutChart({ prakriti }) {
  const size = 160
  const cx = size / 2
  const cy = size / 2
  const r = 55
  const strokeWidth = 22
  const circumference = 2 * Math.PI * r

  const entries = [
    { id: 'VATA', pct: prakriti.VATA },
    { id: 'PITTA', pct: prakriti.PITTA },
    { id: 'KAPHA', pct: prakriti.KAPHA },
  ]

  let offset = 0
  const segments = entries.map(({ id, pct }) => {
    const length = (pct / 100) * circumference
    const seg = { id, length, offset, pct }
    offset += length
    return seg
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f5f5f4" strokeWidth={strokeWidth} />
      {segments.map(({ id, length, offset: off }) => (
        <circle
          key={id}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={DOSHAS[id].color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${length} ${circumference - length}`}
          strokeDashoffset={-off + circumference / 4}
          strokeLinecap="butt"
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#78716c">
        Prakriti
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#a8a29e">
        Constitution
      </text>
    </svg>
  )
}

export default function PrakritiResult() {
  const prakriti = useAppStore((s) => s.prakriti)
  const resetPrakriti = useAppStore((s) => s.resetPrakriti)

  if (!prakriti) return null

  const sorted = Object.entries(prakriti).sort((a, b) => b[1] - a[1])
  const dominant = sorted[0][0]
  const dominantDosha = DOSHAS[dominant]

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <DonutChart prakriti={prakriti} />
          <div>
            <p className="text-sm text-stone-400 uppercase tracking-wide font-medium">Your Prakriti</p>
            <h2 className="text-2xl font-bold mt-1" style={{ color: dominantDosha.color }}>
              {dominantDosha.label} {dominantDosha.sanskrit}
            </h2>
            <p className="text-sm text-stone-600 mt-2">{dominantDosha.description}</p>
          </div>
        </div>

        {/* Percentage bars */}
        <div className="mt-5 space-y-2">
          {sorted.map(([id, pct]) => {
            const d = DOSHAS[id]
            return (
              <div key={id}>
                <div className="flex justify-between text-xs text-stone-500 mb-1">
                  <span>{d.label} {d.sanskrit}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: d.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Imbalance signs */}
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
          Watch for imbalance signs
        </p>
        <div className="flex flex-wrap gap-1.5">
          {dominantDosha.imbalanceSigns.map((sign) => (
            <span key={sign} className="text-xs px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-600">
              {sign}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={resetPrakriti}
        className="text-sm text-stone-400 hover:text-stone-600 underline"
      >
        Retake quiz
      </button>
    </div>
  )
}
