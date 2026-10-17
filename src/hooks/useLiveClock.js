import { useEffect } from 'react'
import useAppStore from '../store/useAppStore'

export function useLiveClock() {
  const setCurrentTime = useAppStore((s) => s.setCurrentTime)

  useEffect(() => {
    const tick = () => setCurrentTime(new Date())
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [setCurrentTime])
}
