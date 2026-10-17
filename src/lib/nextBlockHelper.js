import { DINACHARYA_BLOCKS } from '../data/doshaCycles.js'
import { getSolarAdjustedHour } from './suncalcHelper.js'

/**
 * Returns the next dosha block and minutes remaining until it starts.
 */
export function getNextBlock(currentTime, solarTimes) {
  const solarHour = getSolarAdjustedHour(currentTime, solarTimes)

  // Find current block index
  let currentIdx = 0
  for (let i = 0; i < DINACHARYA_BLOCKS.length; i++) {
    const { clockStart, clockEnd } = DINACHARYA_BLOCKS[i]
    if (clockEnd > clockStart) {
      if (solarHour >= clockStart && solarHour < clockEnd) { currentIdx = i; break }
    } else {
      if (solarHour >= clockStart || solarHour < clockEnd) { currentIdx = i; break }
    }
  }

  const nextIdx = (currentIdx + 1) % DINACHARYA_BLOCKS.length
  const nextBlock = DINACHARYA_BLOCKS[nextIdx]

  // Minutes until the next block's clockStart
  const clockHour = currentTime.getHours() + currentTime.getMinutes() / 60
  let nextStart = nextBlock.clockStart
  let minutesLeft = (nextStart - clockHour) * 60
  if (minutesLeft <= 0) minutesLeft += 24 * 60

  return { nextBlock, minutesLeft: Math.round(minutesLeft) }
}

export function formatCountdown(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}
