import React from 'react'
import LocationGate from '../components/location/LocationGate'
import DoshaCalendar from '../components/calendar/DoshaCalendar'

export default function CalendarPage() {
  return (
    <LocationGate>
      <h1 className="text-xl font-semibold text-stone-800 mb-1">Dosha Calendar</h1>
      <p className="text-sm text-stone-500 mb-5">
        Month view shows the seasonal dosha for each day. Week view shows the six daily dosha blocks.
      </p>
      <DoshaCalendar />
    </LocationGate>
  )
}
