import SunCalc from 'suncalc'

export function getSolarTimes(lat, lon, date = new Date()) {
  const times = SunCalc.getTimes(date, lat, lon)
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
    dusk: times.dusk,
    dawn: times.dawn,
  }
}

// Returns the solar hour (0-23.99) adjusted to match the 6-block Dinacharya system.
// We map actual clock hour to a "solar-adjusted" hour so that Kapha morning
// begins at actual sunrise rather than fixed 6am.
export function getSolarAdjustedHour(now, solarTimes) {
  if (!solarTimes || !solarTimes.sunrise || isNaN(solarTimes.sunrise.getTime())) {
    return now.getHours() + now.getMinutes() / 60
  }

  const sunriseHour = solarTimes.sunrise.getHours() + solarTimes.sunrise.getMinutes() / 60
  const clockHour = now.getHours() + now.getMinutes() / 60

  // Offset from canonical 6am sunrise
  const offset = sunriseHour - 6
  let adjusted = clockHour - offset
  if (adjusted < 0) adjusted += 24
  if (adjusted >= 24) adjusted -= 24
  return adjusted
}
