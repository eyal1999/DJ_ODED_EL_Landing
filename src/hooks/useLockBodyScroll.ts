import { useEffect } from 'react'
import { lenis } from '../lib/smoothScroll'

let locks = 0

/** Prevents the page behind a modal / mobile menu from scrolling. Supports nested locks. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    locks += 1
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      locks -= 1
      if (locks > 0) return
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [locked])
}
