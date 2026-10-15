import { cn } from '../../lib/utils'

/** Decorative animated equalizer bars (deterministic, so it renders the same every time). */
export function Equalizer({ bars = 24, className }: { bars?: number; className?: string }) {
  return (
    <div aria-hidden className={cn('flex items-end gap-[3px]', className)}>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="flex-1 origin-bottom animate-eq rounded-full bg-linear-to-t from-gold-600 to-gold-400"
          style={{
            height: `${35 + ((i * 37) % 65)}%`,
            animationDuration: `${0.55 + ((i * 13) % 7) / 10}s`,
            animationDelay: `${-((i * 7) % 5) * 0.18}s`,
          }}
        />
      ))}
    </div>
  )
}
