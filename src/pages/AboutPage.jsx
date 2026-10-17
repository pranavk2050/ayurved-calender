import React from 'react'
import { DOSHAS } from '../data/doshas'

const sections = [
  {
    title: 'The Three Doshas',
    content: `Ayurveda identifies three fundamental bio-energies called doshas — Vata, Pitta, and Kapha.
    Every person contains all three, but in unique proportions that determine their constitution (Prakriti).
    Health is maintained when these energies are in balance.`,
  },
  {
    title: 'Dinacharya — Daily Cycle',
    content: `Ayurveda describes a 24-hour cycle in which each dosha is naturally dominant for two 4-hour
    periods. Kapha rules the morning (6–10am) and evening (6–10pm), Pitta governs midday (10am–2pm) and
    night (10pm–2am), and Vata presides over the afternoon (2–6pm) and pre-dawn (2–6am).
    Aligning your activities with this cycle supports natural biological rhythms.`,
  },
  {
    title: 'Ritucharya — Seasonal Cycle',
    content: `The six Ayurvedic seasons (Ritu) each have a dominant dosha. Shishira (late winter) and
    Vasanta (spring) are Kapha seasons; Grishma (summer) and Sharad (autumn) are Pitta seasons;
    Varsha (monsoon) and Hemanta (early winter) are Vata seasons.
    Diet and lifestyle adjustments for each season help prevent imbalance.`,
  },
  {
    title: 'Location & Climate',
    content: `Your local climate modifies your baseline dosha environment. Tropical climates amplify
    Pitta and Kapha due to heat and humidity. Cold, dry or polar climates aggravate Vata and Kapha.
    Temperate climates tend to follow the standard seasonal pattern. This app uses your latitude to
    determine your climate zone and adjust suggestions accordingly.`,
  },
  {
    title: 'Prakriti vs. Vikriti',
    content: `Prakriti is your birth constitution — fixed and unique to you. Vikriti is your current
    state of imbalance. The quiz in this app assesses Prakriti, not Vikriti. For assessment of current
    imbalances, consult a qualified Ayurvedic practitioner.`,
  },
  {
    title: 'A Note on Use',
    content: `This app is for educational and wellness purposes. The suggestions here are based on
    classical Ayurvedic texts including the Charaka Samhita and Ashtanga Hridayam. They are not a
    substitute for medical advice. Always consult a healthcare professional for medical concerns.`,
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">About Ayurvedic Calendar</h1>
        <p className="text-stone-500 mt-2">
          A location-aware guide to living in rhythm with Ayurvedic wisdom.
        </p>
      </div>

      {/* Dosha quick reference */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Object.values(DOSHAS).map((d) => (
          <div
            key={d.id}
            className="rounded-xl p-4 border"
            style={{ borderColor: d.colorMid, background: d.colorLight }}
          >
            <p className="font-bold text-lg" style={{ color: d.color }}>{d.label}</p>
            <p className="text-sm text-stone-500">{d.sanskrit}</p>
            <p className="text-xs text-stone-600 mt-1">{d.elements.join(' + ')}</p>
          </div>
        ))}
      </div>

      {/* Sections */}
      {sections.map((s) => (
        <div key={s.title}>
          <h2 className="text-lg font-semibold text-stone-800 mb-2">{s.title}</h2>
          <p className="text-stone-600 text-sm leading-relaxed">{s.content}</p>
        </div>
      ))}

      <div className="border-t border-stone-200 pt-4">
        <p className="text-xs text-stone-400">
          References: Charaka Samhita, Ashtanga Hridayam, Sushruta Samhita.
          Geolocation via browser API. Sunrise/sunset via SunCalc. Location names via OpenStreetMap Nominatim.
        </p>
      </div>
    </div>
  )
}
