import React from 'react'
import { DOSHAS } from '../../data/doshas'
import { DINACHARYA_BLOCKS } from '../../data/doshaCycles'

const SIZE = 220
const CX = SIZE / 2
const CY = SIZE / 2
const OUTER_R = 90
const INNER_R = 55

function polarToXY(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: CX + r * Math.cos(rad),
    y: CY + r * Math.sin(rad),
  }
}

function arcPath(startH, endH, r) {
  const start = (startH / 24) * 360
  const end = (endH / 24) * 360
  const largeArc = end - start > 180 ? 1 : 0
  const s = polarToXY(start, r)
  const e = polarToXY(end, r)
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`
}

function arcBand(startH, endH, innerR, outerR) {
  const start = (startH / 24) * 360
  const end = (endH / 24) * 360
  const largeArc = end - start > 180 ? 1 : 0
  const os = polarToXY(start, outerR)
  const oe = polarToXY(end, outerR)
  const is = polarToXY(start, innerR)
  const ie = polarToXY(end, innerR)
  return `M ${os.x} ${os.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${oe.x} ${oe.y} L ${ie.x} ${ie.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${is.x} ${is.y} Z`
}

export default function DoshaClock({ currentTime, activeBlock }) {
  const hour = currentTime.getHours() + currentTime.getMinutes() / 60
  const handAngle = (hour / 24) * 360
  const handEnd = polarToXY(handAngle, OUTER_R - 5)
  const handStart = polarToXY(handAngle + 180, 12)

  return (
    <div className="flex flex-col items-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Background circle */}
        <circle cx={CX} cy={CY} r={OUTER_R + 5} fill="#fef3c7" />

        {/* Dosha arcs */}
        {DINACHARYA_BLOCKS.map((block) => {
          const { clockStart, clockEnd, dosha } = block
          const dosha_data = DOSHAS[dosha]
          const isActive = activeBlock?.id === block.id
          // Handle midnight wrap: render as two arcs
          if (clockEnd < clockStart) {
            return (
              <g key={block.id}>
                <path
                  d={arcBand(clockStart, 24, INNER_R, OUTER_R)}
                  fill={isActive ? dosha_data.color : dosha_data.colorMid}
                  opacity={isActive ? 1 : 0.45}
                />
                <path
                  d={arcBand(0, clockEnd, INNER_R, OUTER_R)}
                  fill={isActive ? dosha_data.color : dosha_data.colorMid}
                  opacity={isActive ? 1 : 0.45}
                />
              </g>
            )
          }
          return (
            <path
              key={block.id}
              d={arcBand(clockStart, clockEnd, INNER_R, OUTER_R)}
              fill={isActive ? dosha_data.color : dosha_data.colorMid}
              opacity={isActive ? 1 : 0.45}
            />
          )
        })}

        {/* Hour marks */}
        {[0, 6, 12, 18].map((h) => {
          const angle = (h / 24) * 360
          const inner = polarToXY(angle, OUTER_R + 2)
          const outer = polarToXY(angle, OUTER_R + 8)
          const label = polarToXY(angle, OUTER_R + 16)
          return (
            <g key={h}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#a8a29e" strokeWidth="1.5" />
              <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#78716c">
                {h === 0 ? '12a' : h === 6 ? '6a' : h === 12 ? '12p' : '6p'}
              </text>
            </g>
          )
        })}

        {/* Inner white disc */}
        <circle cx={CX} cy={CY} r={INNER_R - 1} fill="white" />

        {/* Time hand */}
        <line
          x1={handStart.x}
          y1={handStart.y}
          x2={handEnd.x}
          y2={handEnd.y}
          stroke="#292524"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r={4} fill="#292524" />

        {/* Current time label */}
        <text x={CX} y={CY + 16} textAnchor="middle" fontSize="10" fill="#78716c">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </text>
      </svg>

      {/* Block legend strip */}
      <div className="flex gap-1 mt-2 flex-wrap justify-center">
        {DINACHARYA_BLOCKS.map((block) => {
          const isActive = activeBlock?.id === block.id
          const dosha_data = DOSHAS[block.dosha]
          return (
            <span
              key={block.id}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: isActive ? dosha_data.color : dosha_data.colorLight,
                color: isActive ? 'white' : dosha_data.color,
              }}
            >
              {block.clockStart}–{block.clockEnd === 2 || block.clockEnd === 6 ? `${block.clockEnd}am` : block.clockEnd >= 12 ? `${block.clockEnd === 24 ? '12am' : block.clockEnd - 12 || 12}pm` : `${block.clockEnd}am`}
            </span>
          )
        })}
      </div>
    </div>
  )
}
