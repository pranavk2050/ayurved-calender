import { RITU_SEASONS } from '../data/ritucharyaSeasons.js'

export function detectSeason(date, hemisphere = 'northern') {
  let month = date.getMonth() + 1 // 1-indexed

  // Southern hemisphere: offset by 6 months
  if (hemisphere === 'southern') {
    month = month > 6 ? month - 6 : month + 6
  }

  for (const season of Object.values(RITU_SEASONS)) {
    if (season.months.includes(month)) return season
  }

  return Object.values(RITU_SEASONS)[0]
}

export function getHemisphere(lat) {
  return lat >= 0 ? 'northern' : 'southern'
}
