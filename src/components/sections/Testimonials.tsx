import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Quote, Star } from 'lucide-react'
import { useInView, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { TESTIMONIALS, type Testimonial } from '../../data/site'
import { cn } from '../../lib/utils'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

const AUTOPLAY_MS = 6000

/**
 * Native scroll-snap carousel: swipeable on touch, works in RTL without
 * transform math, autoplays while visible and pauses on hover / focus.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const inView = useInView(trackRef, { amount: 0.4 })
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [pages, setPages] = useState(TESTIMONIALS.length)
  const [paused, setPaused] = useState(false)

  const average = TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length

  // How many "start positions" exist = cards - cards visible at once + 1.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const card = track.firstElementChild as HTMLElement | null
      if (!card) return
      const perView = Math.max(1, Math.round(track.clientWidth / card.offsetWidth))
      setPages(Math.max(1, TESTIMONIALS.length - perView + 1))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current
      const card = track?.children[i] as HTMLElement | undefined
      if (!track || !card) return
      // Align the card's start edge (right edge in RTL) with the track's start edge.
      const delta = card.getBoundingClientRect().right - track.getBoundingClientRect().right
      track.scrollBy({ left: delta, behavior: reduceMotion ? 'auto' : 'smooth' })
    },
    [reduceMotion],
  )

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const trackRight = track.getBoundingClientRect().right
    let closest = 0
    let min = Infinity
    Array.from(track.children).forEach((child, i) => {
      const distance = Math.abs(child.getBoundingClientRect().right - trackRight)
      if (distance < min) {
        min = distance
        closest = i
      }
    })
    setIndex(Math.min(closest, pages - 1))
  }

  const next = useCallback(() => goTo(index >= pages - 1 ? 0 : index + 1), [goTo, index, pages])
  const prev = () => goTo(index <= 0 ? pages - 1 : index - 1)

  useEffect(() => {
    if (!inView || paused || reduceMotion) return
    const timer = setTimeout(next, AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [inView, paused, reduceMotion, next])

  return (
    <Section id="testimonials" titleId="testimonials-title" tone="raised">
      <SectionHeading
        eyebrow="TESTIMONIALS"
        titleId="testimonials-title"
        title={
          <>
            זוגות <span className="text-gradient">ממליצים</span>
          </>
        }
        subtitle={
          <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Stars rating={Math.round(average)} />
            <span>
              <strong className="text-white">{average.toFixed(1)}</strong> ממוצע דירוג מתוך {TESTIMONIALS.length} המלצות
            </span>
          </span>
        }
      />

      <Reveal>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            onScroll={onScroll}
            aria-label="המלצות לקוחות"
            role="region"
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
          >
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.names} testimonial={t} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <CarouselButton label="ההמלצה הקודמת" onClick={prev}>
              <ChevronRight className="size-5" />
            </CarouselButton>
            <div className="flex items-center gap-2">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`מעבר להמלצה ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'h-2 rounded-full transition-all duration-500',
                    i === index ? 'w-8 bg-linear-to-l from-gold-600 to-gold-400' : 'w-2 bg-white/20 hover:bg-white/40',
                  )}
                />
              ))}
            </div>
            <CarouselButton label="ההמלצה הבאה" onClick={next}>
              <ChevronLeft className="size-5" />
            </CarouselButton>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure className="glass glow-ring relative flex w-[86%] shrink-0 snap-start flex-col rounded-3xl p-7 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
      <Quote aria-hidden className="absolute end-6 top-6 size-12 text-white/[0.06]" />
      <Stars rating={t.rating} />
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-stone-200">{t.quote}</blockquote>
      <figcaption className="mt-6 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-gold-600 to-gold-400 text-lg font-black text-ink-950"
          >
            {t.names.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold">{t.names}</p>
            <p className="text-sm text-stone-400">{t.role}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-300">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
            <MapPin className="size-3.5 text-gold-400" />
            {t.venue}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
            <CalendarDays className="size-3.5 text-gold-400" />
            {t.date}
          </span>
        </div>
      </figcaption>
    </figure>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <span role="img" aria-label={`דירוג ${rating} מתוך 5`} className="inline-flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn('size-4', i < rating ? 'fill-gold-300 text-gold-300' : 'text-stone-600')}
        />
      ))}
    </span>
  )
}

function CarouselButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="glass grid size-12 place-items-center rounded-full text-white transition hover:border-gold-400/50 hover:shadow-[0_0_24px_-6px_rgba(231,190,102,0.8)]"
    >
      {children}
    </button>
  )
}
