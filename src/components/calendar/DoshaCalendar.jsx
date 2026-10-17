import React, { useState, useMemo } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import useAppStore from '../../store/useAppStore'
import { buildMonthEvents, buildWeekEvents } from '../../lib/calendarBuilder'
import { DOSHAS } from '../../data/doshas'
import CalendarLegend from './CalendarLegend'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { 'en-US': enUS },
})

function DoshaEvent({ event }) {
  const dosha = DOSHAS[event.resource?.dosha]
  if (!dosha) return <span>{event.title}</span>
  return (
    <span
      style={{ background: dosha.color, color: 'white' }}
      className="text-xs px-1 rounded font-medium"
    >
      {event.title}
    </span>
  )
}

export default function DoshaCalendar() {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('month')
  const location = useAppStore((s) => s.location)
  const lat = location?.lat ?? 20

  const events = useMemo(() => {
    if (view === 'month') {
      return buildMonthEvents(date, lat)
    }
    const start = startOfDay(date)
    const end = endOfDay(date)
    return buildWeekEvents(start, end)
  }, [date, view, lat])

  const eventPropGetter = (event) => {
    const dosha = DOSHAS[event.resource?.dosha]
    if (!dosha) return {}
    return {
      style: {
        backgroundColor: dosha.color,
        border: 'none',
        color: 'white',
        fontSize: '11px',
      },
    }
  }

  return (
    <div>
      <div style={{ height: 520 }}>
        <Calendar
          localizer={localizer}
          events={events}
          date={date}
          view={view}
          onNavigate={setDate}
          onView={setView}
          views={['month', 'week', 'day']}
          eventPropGetter={eventPropGetter}
          components={{ event: DoshaEvent }}
          popup
        />
      </div>
      <CalendarLegend />
    </div>
  )
}
