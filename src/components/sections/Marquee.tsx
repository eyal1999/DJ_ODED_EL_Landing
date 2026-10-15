import { Sparkles } from 'lucide-react'
import { MARQUEE } from '../../data/site'
import { cn } from '../../lib/utils'

/** Endless keyword ticker under the hero. Two identical halves make the loop seamless. */
export function Marquee() {
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-white/5 bg-ink-850 py-5 select-none">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10 pe-10">
            {MARQUEE.map((word, i) => (
              <span key={word} className="flex items-center gap-10">
                <span
                  className={cn(
                    'text-2xl font-black whitespace-nowrap sm:text-3xl',
                    i % 2 ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.55)]' : 'text-white/85',
                  )}
                >
                  {word}
                </span>
                <Sparkles className="size-5 shrink-0 text-gold-400" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-linear-to-l from-ink-850 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-linear-to-r from-ink-850 to-transparent sm:w-32" />
    </div>
  )
}
