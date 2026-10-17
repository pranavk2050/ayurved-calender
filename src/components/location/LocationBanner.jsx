import React from 'react'
import useAppStore from '../../store/useAppStore'
import { detectClimate } from '../../lib/climateDetector'
import { getHemisphere } from '../../lib/seasonDetector'

export default function LocationBanner({ season }) {
  const { location, cityName } = useAppStore()
  if (!location) return null

  const climate = detectClimate(location.lat)
  const hemisphere = getHemisphere(location.lat)

  return (
    <div className="flex flex-wrap gap-2 text-xs text-stone-500 mb-4">
      <span className="bg-stone-100 rounded-full px-3 py-1">📍 {cityName || `${location.lat.toFixed(1)}°, ${location.lon.toFixed(1)}°`}</span>
      <span className="bg-stone-100 rounded-full px-3 py-1">🌡 {climate.label}</span>
      <span className="bg-stone-100 rounded-full px-3 py-1">{hemisphere === 'northern' ? '🌐 Northern' : '🌐 Southern'} Hemisphere</span>
      {season && (
        <span className="bg-amber-100 text-amber-700 rounded-full px-3 py-1">
          🍂 {season.label} · {season.englishName}
        </span>
      )}
    </div>
  )
}
