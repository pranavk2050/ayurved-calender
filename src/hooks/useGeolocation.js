import { useEffect } from 'react'
import useAppStore from '../store/useAppStore'
import { getSolarTimes } from '../lib/suncalcHelper'

async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
    const data = await res.json()
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      'Unknown'
    const country = data.address?.country || ''
    return `${city}, ${country}`
  } catch {
    return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`
  }
}

export function useGeolocation() {
  const { locationStatus, location, setLocation, setLocationDenied, setLocationRequesting, setSolarTimes } =
    useAppStore()

  useEffect(() => {
    // If we already have a location from a previous session, refresh solar times
    if (location && (locationStatus === 'granted' || locationStatus === 'manual')) {
      setSolarTimes(getSolarTimes(location.lat, location.lon, new Date()))
      return
    }

    if (locationStatus !== 'idle') return

    if (!navigator.geolocation) {
      setLocationDenied()
      return
    }

    setLocationRequesting()

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords
        const cityName = await reverseGeocode(lat, lon)
        setLocation({ lat, lon }, cityName)
        setSolarTimes(getSolarTimes(lat, lon, new Date()))
      },
      () => {
        setLocationDenied()
      },
      { timeout: 10000 }
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
