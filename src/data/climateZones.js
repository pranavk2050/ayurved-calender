// Climate zones derived from absolute latitude.
// amplifies[] lists doshas that are heightened by this climate.
export const CLIMATE_ZONES = [
  {
    id: 'TROPICAL',
    label: 'Tropical',
    description: 'Hot and humid year-round',
    latMax: 23.5,
    amplifies: ['PITTA', 'KAPHA'],
    modifier: 'Heat and humidity elevate both Pitta (fire) and Kapha (moisture).',
  },
  {
    id: 'SUBTROPICAL',
    label: 'Subtropical',
    description: 'Warm with distinct wet and dry seasons',
    latMax: 35,
    amplifies: ['PITTA'],
    modifier: 'Warmth and seasonal intensity keep Pitta elevated.',
  },
  {
    id: 'TEMPERATE',
    label: 'Temperate',
    description: 'Moderate with four seasons',
    latMax: 60,
    amplifies: [],
    modifier: 'Balanced climate follows standard seasonal dosha patterns.',
  },
  {
    id: 'SUBARCTIC',
    label: 'Sub-arctic',
    description: 'Long cold winters, brief summers',
    latMax: 75,
    amplifies: ['VATA', 'KAPHA'],
    modifier: 'Cold and dry winds aggravate Vata; prolonged cold builds Kapha.',
  },
  {
    id: 'POLAR',
    label: 'Polar',
    description: 'Extreme cold with polar night/day',
    latMax: 90,
    amplifies: ['VATA', 'KAPHA'],
    modifier: 'Extreme cold and dryness strongly aggravate both Vata and Kapha.',
  },
]

export function getClimateZone(lat) {
  const absLat = Math.abs(lat)
  return CLIMATE_ZONES.find((z) => absLat <= z.latMax) ?? CLIMATE_ZONES[CLIMATE_ZONES.length - 1]
}
