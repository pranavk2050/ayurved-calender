import { useMemo } from 'react'
import useAppStore from '../store/useAppStore'
import { computeDosha } from '../lib/doshaEngine'

export function useCurrentDosha() {
  const currentTime = useAppStore((s) => s.currentTime)
  const solarTimes = useAppStore((s) => s.solarTimes)
  const location = useAppStore((s) => s.location)
  const prakriti = useAppStore((s) => s.prakriti)
  const vikriti = useAppStore((s) => s.vikriti)

  return useMemo(
    () => computeDosha({ currentTime, solarTimes, location, prakriti, vikriti }),
    [currentTime, solarTimes, location, prakriti, vikriti]
  )
}
