import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  titleId?: string
  /** "raised" adds a slightly lighter band to separate consecutive sections. */
  tone?: 'base' | 'raised'
  className?: string
  children: ReactNode
}

export function Section({ id, titleId, tone = 'base', className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('relative isolate overflow-x-clip py-24 sm:py-32', tone === 'raised' && 'bg-ink-850', className)}
    >
      {tone === 'raised' && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-white/10 to-transparent"
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  titleId?: string
  align?: 'center' | 'start'
  className?: string
}

export function SectionHeading({ eyebrow, title, subtitle, titleId, align = 'center', className }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <Reveal className={cn('mb-12 max-w-2xl sm:mb-16', centered ? 'mx-auto text-center' : 'text-start', className)}>
      <p
        className={cn(
          'mb-4 flex items-center gap-3 font-display text-[11px] font-medium tracking-[0.3em] text-gold-400 sm:text-xs',
          centered && 'justify-center',
        )}
      >
        <span aria-hidden className="h-px w-8 bg-linear-to-l from-gold-400 to-transparent" />
        <span dir="ltr">{eyebrow}</span>
        {centered && <span aria-hidden className="h-px w-8 bg-linear-to-r from-gold-400 to-transparent" />}
      </p>
      <h2 id={titleId} className="text-3xl leading-tight font-black text-balance sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-pretty text-stone-400">{subtitle}</p>}
    </Reveal>
  )
}
