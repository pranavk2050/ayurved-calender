// Six 4-hour Dinacharya blocks. clockStart/clockEnd are 24h integers.
// The engine uses solar-time offsets when SunCalc data is available.
export const DINACHARYA_BLOCKS = [
  {
    id: 'kapha-morning',
    dosha: 'KAPHA',
    clockStart: 6,
    clockEnd: 10,
    label: 'Morning Kapha',
    guidance: 'Best time for exercise, yoga, and grounding activities. Kapha heaviness supports physical effort.',
  },
  {
    id: 'pitta-midday',
    dosha: 'PITTA',
    clockStart: 10,
    clockEnd: 14,
    label: 'Midday Pitta',
    guidance: 'Digestive fire is strongest. Eat your largest meal. Focus on intellectual work and decisions.',
  },
  {
    id: 'vata-afternoon',
    dosha: 'VATA',
    clockStart: 14,
    clockEnd: 18,
    label: 'Afternoon Vata',
    guidance: 'Creative energy peaks. Good for brainstorming, communication, and light tasks. Take a short break around 2–3pm.',
  },
  {
    id: 'kapha-evening',
    dosha: 'KAPHA',
    clockStart: 18,
    clockEnd: 22,
    label: 'Evening Kapha',
    guidance: 'Wind down. Eat a light dinner before 7pm. Gentle walks, light reading, relaxation.',
  },
  {
    id: 'pitta-night',
    dosha: 'PITTA',
    clockStart: 22,
    clockEnd: 2,
    label: 'Night Pitta',
    guidance: 'The body repairs and detoxifies. Sleep before 10pm to avoid catching a second wind from Pitta energy.',
  },
  {
    id: 'vata-predawn',
    dosha: 'VATA',
    clockStart: 2,
    clockEnd: 6,
    label: 'Pre-dawn Vata',
    guidance: 'Brahma Muhurta — the sacred hour before sunrise. Ideal for meditation, pranayama, and spiritual practice.',
  },
]

export function getBlockByHour(hour) {
  for (const block of DINACHARYA_BLOCKS) {
    const { clockStart, clockEnd } = block
    if (clockEnd > clockStart) {
      if (hour >= clockStart && hour < clockEnd) return block
    } else {
      // Wraps midnight (e.g., 22–2)
      if (hour >= clockStart || hour < clockEnd) return block
    }
  }
  return DINACHARYA_BLOCKS[0]
}
