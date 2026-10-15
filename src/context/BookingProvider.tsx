import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { EventType } from '../data/site'
import { BookingContext } from './booking'

/** Lets any CTA (e.g. a service card) pre-select the event type in the contact form. */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<{ type: EventType; key: number } | null>(null)
  const presetEventType = useCallback((type: EventType) => setPreset({ type, key: Date.now() }), [])
  const value = useMemo(() => ({ preset, presetEventType }), [preset, presetEventType])

  return <BookingContext value={value}>{children}</BookingContext>
}
