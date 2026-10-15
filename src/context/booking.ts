import { createContext, useContext } from 'react'
import type { EventType } from '../data/site'

type BookingContextValue = {
  /** Last event type requested from a CTA; `key` changes on every request so repeats re-apply. */
  preset: { type: EventType; key: number } | null
  presetEventType: (type: EventType) => void
}

export const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
