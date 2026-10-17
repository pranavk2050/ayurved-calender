import React, { useState } from 'react'
import useAppStore from '../../store/useAppStore'
import { getSolarTimes } from '../../lib/suncalcHelper'

export default function LocationGate({ children }) {
  const { locationStatus, setManualLocation, setSolarTimes } = useAppStore()
  const [city, setCity] = useState('')
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')

  const isResolved = locationStatus === 'granted' || locationStatus === 'manual'
  if (isResolved) return children

  async function searchCity(e) {
    e.preventDefault()
    if (!city.trim()) return
    setSearching(true)
    setError('')
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`
      )
      const data = await res.json()
      if (!data.length) {
        setError('City not found. Try a different name.')
        setSearching(false)
        return
      }
      const { lat, lon, display_name } = data[0]
      const location = { lat: parseFloat(lat), lon: parseFloat(lon) }
      const shortName = display_name.split(',').slice(0, 2).join(', ')
      setManualLocation(location, shortName)
      setSolarTimes(getSolarTimes(location.lat, location.lon, new Date()))
    } catch {
      setError('Network error. Please try again.')
    }
    setSearching(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-5xl mb-4">🌍</div>
      <h2 className="text-2xl font-semibold text-stone-800 mb-2">Where are you?</h2>
      <p className="text-stone-500 mb-6 max-w-md">
        Your location helps us calculate sunrise times, seasons, and climate — all of which shape
        which dosha is active right now.
      </p>

      {locationStatus === 'requesting' && (
        <p className="text-stone-500 animate-pulse">Requesting location permission…</p>
      )}

      {(locationStatus === 'denied' || locationStatus === 'idle') && (
        <form onSubmit={searchCity} className="w-full max-w-sm flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city (e.g. Pune)"
              className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={searching}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {searching ? '…' : 'Go'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {locationStatus === 'denied' && (
            <p className="text-xs text-stone-400">
              Browser location was denied. You can enter your city manually above.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
