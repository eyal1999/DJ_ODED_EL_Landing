import { cn } from '../../lib/utils'

type Variant = 'primary' | 'whatsapp' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap transition duration-300 select-none disabled:pointer-events-none disabled:opacity-60'

const gold =
  'bg-linear-to-b from-gold-300 via-gold-400 to-gold-600 text-ink-950 shadow-[0_0_28px_-8px_rgba(231,190,102,0.7)] ring-1 ring-gold-200/40 ring-inset hover:-translate-y-0.5 hover:from-gold-200 hover:shadow-[0_0_44px_-6px_rgba(231,190,102,0.85)]'

const variants: Record<Variant, string> = {
  primary: gold,
  /** In-page WhatsApp CTAs stay on-brand gold; the floating bubble keeps WhatsApp green. */
  whatsapp: gold,
  ghost: 'glass text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base sm:px-8 sm:text-lg',
}

/** Shared button look for <a> and <button> elements. */
export const buttonStyles = ({ variant = 'primary', size = 'md' }: { variant?: Variant; size?: Size } = {}) =>
  cn(base, variants[variant], sizes[size])
