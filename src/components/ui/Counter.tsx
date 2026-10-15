import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Counts up from 0 to `value` the first time it scrolls into view. */
export function Counter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
