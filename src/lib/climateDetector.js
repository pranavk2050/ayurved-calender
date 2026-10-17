import { getClimateZone } from '../data/climateZones.js'

export function detectClimate(lat) {
  return getClimateZone(lat)
}
