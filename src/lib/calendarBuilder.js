import { startOfMonth, endOfMonth, eachDayOfInterval, addHours, startOfDay } from 'date-fns'
import { DINACHARYA_BLOCKS } from '../data/doshaCycles.js'
import { detectSeason, getHemisphere } from './seasonDetector.js'
import { detectClimate } from './climateDetector.js'
import { DOSHAS } from '../data/doshas.js'

// Build month-level events: one colored event per day showing dominant seasonal dosha
export function buildMonthEvents(date, lat = 20) {
  const hemisphere = getHemisphere(lat)
  const days = eachDayOfInterval({ start: startOfMonth(date), end: endOfMonth(date) })

  return days.map((day) => {
    const season = detectSeason(day, hemisphere)
    const dosha = DOSHAS[season.primaryDosha]
    return {
      id: `day-${day.toISOString()}`,
      title: `${dosha.label} · ${season.label}`,
      start: startOfDay(day),
      end: addHours(startOfDay(day), 23),
      allDay: true,
      resource: { dosha: season.primaryDosha, season },
    }
  })
}

// Build week-level events: six 4-hour dosha blocks per day
export function buildWeekEvents(startDate, endDate) {
  const days = eachDayOfInterval({ start: startOfDay(startDate), end: startOfDay(endDate) })
  const events = []

  for (const day of days) {
    for (const block of DINACHARYA_BLOCKS) {
      const { clockStart, clockEnd, dosha, label, id } = block
      const start = addHours(startOfDay(day), clockStart)
      // Handle midnight wrap (e.g., 22–2)
      const end = clockEnd > clockStart
        ? addHours(startOfDay(day), clockEnd)
        : addHours(startOfDay(day), clockEnd + 24)

      events.push({
        id: `${id}-${day.toISOString()}`,
        title: `${DOSHAS[dosha].label}`,
        start,
        end,
        resource: { dosha, block },
      })
    }
  }

  return events
}
