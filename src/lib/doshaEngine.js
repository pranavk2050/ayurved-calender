import { getBlockByHour } from '../data/doshaCycles.js'
import { getSolarAdjustedHour } from './suncalcHelper.js'
import { detectSeason, getHemisphere } from './seasonDetector.js'
import { detectClimate } from './climateDetector.js'

/**
 * Computes the active dosha state from all available inputs.
 *
 * @param {Object} params
 * @param {Date}   params.currentTime
 * @param {Object|null} params.solarTimes  - { sunrise, sunset, ... } from SunCalc
 * @param {Object|null} params.location    - { lat, lon }
 * @param {Object|null} params.prakriti    - { VATA: %, PITTA: %, KAPHA: % }
 *
 * @returns {{
 *   primary: string,
 *   secondary: string|null,
 *   scores: {VATA: number, PITTA: number, KAPHA: number},
 *   timeBlock: Object,
 *   season: Object,
 *   climate: Object,
 *   reasoning: string[]
 * }}
 */
export function computeDosha({ currentTime, solarTimes, location, prakriti, vikriti }) {
  const scores = { VATA: 0, PITTA: 0, KAPHA: 0 }
  const reasoning = []

  // 1. Time-of-day block (base score: 3 points)
  const solarHour = getSolarAdjustedHour(currentTime, solarTimes)
  const timeBlock = getBlockByHour(solarHour)
  scores[timeBlock.dosha] += 3
  reasoning.push(`Time of day (${timeBlock.label}): +3 to ${timeBlock.dosha}`)

  // 2. Season (1.5 points for primary, 0.75 for secondary)
  const lat = location?.lat ?? 20
  const hemisphere = getHemisphere(lat)
  const season = detectSeason(currentTime, hemisphere)
  scores[season.primaryDosha] += 1.5
  reasoning.push(`Season (${season.label}): +1.5 to ${season.primaryDosha}`)
  if (season.secondaryDosha) {
    scores[season.secondaryDosha] += 0.75
    reasoning.push(`Season secondary: +0.75 to ${season.secondaryDosha}`)
  }

  // 3. Climate zone (0.5 per amplified dosha)
  const climate = detectClimate(lat)
  for (const dosha of climate.amplifies) {
    scores[dosha] += 0.5
    reasoning.push(`Climate (${climate.label}): +0.5 to ${dosha}`)
  }

  // 4. Prakriti modifier (weighted 0.5 max per dosha)
  if (prakriti) {
    const prakritiTotal = prakriti.VATA + prakriti.PITTA + prakriti.KAPHA
    if (prakritiTotal > 0) {
      for (const dosha of ['VATA', 'PITTA', 'KAPHA']) {
        const mod = (prakriti[dosha] / prakritiTotal) * 0.5
        scores[dosha] += mod
      }
      reasoning.push('Prakriti constitution applied as weighting modifier')
    }
  }

  // 5. Vikriti modifier (current imbalance — weighted 1.0 max, stronger signal than Prakriti)
  if (vikriti) {
    const vikritiTotal = vikriti.VATA + vikriti.PITTA + vikriti.KAPHA
    if (vikritiTotal > 0) {
      for (const dosha of ['VATA', 'PITTA', 'KAPHA']) {
        const mod = (vikriti[dosha] / vikritiTotal) * 1.0
        scores[dosha] += mod
      }
      reasoning.push('Vikriti (current imbalance) applied as weighted modifier')
    }
  }

  // Sort to find primary and secondary
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const primary = sorted[0][0]
  const secondary = sorted[1][1] > sorted[0][1] * 0.6 ? sorted[1][0] : null

  return { primary, secondary, scores, timeBlock, season, climate, reasoning }
}
