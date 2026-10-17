import React from 'react'
import useAppStore from '../store/useAppStore'
import { useCurrentDosha } from '../hooks/useCurrentDosha'
import LocationGate from '../components/location/LocationGate'
import LocationBanner from '../components/location/LocationBanner'
import DoshaClock from '../components/dosha/DoshaClock'
import DoshaCard from '../components/dosha/DoshaCard'
import DoshaCountdown from '../components/dosha/DoshaCountdown'
import SeasonBadge from '../components/dosha/SeasonBadge'
import MoonPhase from '../components/dosha/MoonPhase'
import SuggestionPanel from '../components/suggestions/SuggestionPanel'

export default function TodayPage() {
  const currentTime = useAppStore((s) => s.currentTime)
  const solarTimes = useAppStore((s) => s.solarTimes)
  const doshaResult = useCurrentDosha()

  return (
    <LocationGate>
      <LocationBanner season={doshaResult.season} />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left column: clock + countdown + season */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 flex flex-col items-center">
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-4">Daily Cycle</h2>
            <DoshaClock currentTime={currentTime} activeBlock={doshaResult.timeBlock} />
          </div>
          <DoshaCountdown currentTime={currentTime} solarTimes={solarTimes} />
          <SeasonBadge season={doshaResult.season} />
          <MoonPhase date={currentTime} />
        </div>

        {/* Right column: dosha card + suggestions */}
        <div className="space-y-5">
          <DoshaCard doshaResult={doshaResult} />
          <SuggestionPanel doshaId={doshaResult.primary} />
        </div>
      </div>
    </LocationGate>
  )
}
