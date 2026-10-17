import SunCalc from 'suncalc'

const PHASES = [
  { name: 'New Moon',        emoji: '🌑', min: 0,     max: 0.0625 },
  { name: 'Waxing Crescent', emoji: '🌒', min: 0.0625, max: 0.1875 },
  { name: 'First Quarter',   emoji: '🌓', min: 0.1875, max: 0.3125 },
  { name: 'Waxing Gibbous',  emoji: '🌔', min: 0.3125, max: 0.4375 },
  { name: 'Full Moon',       emoji: '🌕', min: 0.4375, max: 0.5625 },
  { name: 'Waning Gibbous',  emoji: '🌖', min: 0.5625, max: 0.6875 },
  { name: 'Last Quarter',    emoji: '🌗', min: 0.6875, max: 0.8125 },
  { name: 'Waning Crescent', emoji: '🌘', min: 0.8125, max: 1 },
]

export function getMoonPhase(date = new Date()) {
  const { fraction, phase } = SunCalc.getMoonIllumination(date)
  const phaseData = PHASES.find((p) => phase >= p.min && phase < p.max) ?? PHASES[0]
  return {
    ...phaseData,
    fraction: Math.round(fraction * 100),
    phaseValue: phase,
  }
}

// Ayurvedic significance of moon phases
const AYURVEDIC_NOTES = {
  'New Moon':        'Vata is heightened. Rest, reflect, and set intentions. Avoid fasting.',
  'Waxing Crescent': 'Energy and Kapha build. Begin new health routines now.',
  'First Quarter':   'Pitta rises with the waxing moon. Good for action and decisiveness.',
  'Waxing Gibbous':  'Kapha and fluids increase. Reduce salt and heavy foods.',
  'Full Moon':       'Peak Kapha and emotions. Ideal for abhyanga, meditation, and gratitude.',
  'Waning Gibbous':  'Begin releasing — good for detox and lighter eating.',
  'Last Quarter':    'Vata rises. Ground yourself with warm foods and oil massage.',
  'Waning Crescent': 'Rest and conserve. Avoid overexertion. Prepare for the new cycle.',
}

export function getMoonNote(phaseName) {
  return AYURVEDIC_NOTES[phaseName] ?? ''
}
