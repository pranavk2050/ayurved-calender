import { useEffect, useRef } from 'react'
import useAppStore from '../store/useAppStore'
import { getNextBlock, formatCountdown } from '../lib/nextBlockHelper'
import { DOSHAS } from '../data/doshas'

const ALERT_MINUTES = 15

export function useNotifications(enabled) {
  const currentTime = useAppStore((s) => s.currentTime)
  const solarTimes = useAppStore((s) => s.solarTimes)
  const lastNotifiedRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    if (Notification.permission !== 'granted') return

    const { nextBlock, minutesLeft } = getNextBlock(currentTime, solarTimes)

    // Fire once per transition when within the alert window
    const key = `${nextBlock.id}-${currentTime.toDateString()}`
    if (minutesLeft <= ALERT_MINUTES && minutesLeft > 0 && lastNotifiedRef.current !== key) {
      lastNotifiedRef.current = key
      const dosha = DOSHAS[nextBlock.dosha]
      new Notification(`${dosha.emoji ?? dosha.label} time in ${formatCountdown(minutesLeft)}`, {
        body: nextBlock.guidance,
        icon: '/ayurved-calender/pwa-192.png',
        badge: '/ayurved-calender/pwa-192.png',
        tag: nextBlock.id,
      })
    }
  }, [currentTime, solarTimes, enabled])
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'
  return await Notification.requestPermission()
}
