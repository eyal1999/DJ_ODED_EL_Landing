import { ChevronDown, Pause, Play } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { useA11y } from '../../context/a11y'
import { asset, BRAND, HERO } from '../../data/site'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cn, whatsappUrl } from '../../lib/utils'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { buttonStyles } from '../ui/button'
import { Equalizer } from '../ui/Equalizer'

const ease = [0.22, 1, 0.36, 1] as const

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

/**
 * Hero over a pinned promo video. While scrolling, the hero content drifts up slower than the page
 * and fades out, and the rest of the page (the "sheet" in App) slides up over the video.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { settings } = useA11y()
  const reduceMotion = useReducedMotion() || settings.stopMotion
  const [videoPaused, setVideoPaused] = useState(false)
  // 0 = hero at the top of the page, 1 = the sheet has fully covered it.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const videoShade = useTransform(scrollYProgress, [0, 1], [0, 0.8])

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="פתיח"
      className="relative isolate flex min-h-svh items-center pt-28 pb-32 lg:pt-24"
    >
      <HeroVideo sectionRef={sectionRef} scale={videoScale} shade={videoShade} still={reduceMotion} paused={videoPaused} />

      {/* Moving content needs a visible pause control (WCAG 2.2.2); sits above the accessibility button. */}
      {!reduceMotion && (
        <motion.button
          type="button"
          onClick={() => setVideoPaused((p) => !p)}
          aria-label={videoPaused ? 'הפעלת סרטון הרקע' : 'השהיית סרטון הרקע'}
          style={{ opacity: contentOpacity }}
          className="glass absolute start-5.5 bottom-24 z-10 grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/15 sm:start-7.5 sm:bottom-26"
        >
          {videoPaused ? <Play className="size-4 translate-x-px fill-current" /> : <Pause className="size-4 fill-current" />}
        </motion.button>
      )}

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="mx-auto grid w-full origin-top max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8"
      >
        <div className="text-center lg:text-start">
          <motion.a
            href="#contact"
            {...rise(0.1)}
            className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-stone-200 transition hover:border-white/20"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {HERO.availability}
          </motion.a>

          <motion.h1
            {...rise(0.2)}
            className="mt-7 text-[2.65rem] leading-[1.05] font-black tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
          >
            <span className="block">{HERO.titleTop}</span>
            <span className="text-gradient block animate-gradient pb-2">{HERO.titleBottom}</span>
            <span className="sr-only"> | {BRAND.role}</span>
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            aria-hidden
            className="mt-3 flex items-center justify-center gap-4 font-display text-xs tracking-[0.4em] text-stone-300 sm:text-sm lg:justify-start"
          >
            <span className="h-px w-10 bg-linear-to-l from-gold-400 to-transparent" />
            <span dir="ltr">{BRAND.role.toUpperCase()}</span>
            <span className="h-px w-10 bg-linear-to-r from-gold-400 to-transparent lg:hidden" />
          </motion.p>

          <motion.p
            {...rise(0.4)}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-pretty text-stone-200 lg:mx-0"
          >
            {HERO.lead}
          </motion.p>

          <motion.ul {...rise(0.5)} className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            {HERO.highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                <Icon className="size-4 text-gold-400" />
                {label}
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...rise(0.6)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: 'whatsapp', size: 'lg' })}
            >
              <WhatsAppIcon className="size-5" />
              צור קשר בוואטסאפ
            </a>
            <a href="#media" className={buttonStyles({ variant: 'ghost', size: 'lg' })}>
              <span className="grid size-8 place-items-center rounded-full bg-white text-ink-900">
                <Play className="size-3.5 translate-x-px fill-current" />
              </span>
              השמעת מוזיקה / סטים
            </a>
          </motion.div>
        </div>

        <LogoShowcase />
      </motion.div>

      <motion.a
        href="#about"
        aria-label="גללו למטה"
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-8 mx-auto hidden w-fit flex-col items-center gap-2 text-xs text-stone-300 transition-colors hover:text-white sm:flex"
      >
        גללו למטה
        <ChevronDown className="size-5 animate-bounce" />
      </motion.a>
    </section>
  )
}

type HeroVideoProps = {
  sectionRef: RefObject<HTMLElement | null>
  scale: MotionValue<number>
  shade: MotionValue<number>
  /** Reduced motion: show the poster frame only, no scroll effects. */
  still: boolean
  /** Paused by the visitor. */
  paused: boolean
}

/**
 * The promo reel, fixed behind the hero. It zooms in and darkens as the page covers it,
 * then pauses and stops painting once the hero has scrolled out of view.
 */
function HeroVideo({ sectionRef, scale, shade, still, paused }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [covered, setCovered] = useState(false)
  const [saveData] = useState(
    () => !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
  )
  const playVideo = !still && !saveData
  // A vertical clip stretched across a landscape screen looks stuck and choppy, so those get the wide cut.
  const wide = useMediaQuery('(orientation: landscape)')
  const clip = wide ? HERO.wideVideo : HERO.video
  // The wide cut has the desaturation baked in; the vertical one gets it from CSS.
  const fit = wide ? 'size-full object-cover' : 'size-full object-cover object-[50%_35%] saturate-[.8]'

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setCovered(!entry.isIntersecting))
    observer.observe(section)
    return () => observer.disconnect()
  }, [sectionRef])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (covered || paused) {
      video.pause()
    } else {
      // React sets `muted` as a property only; set it explicitly so autoplay policies allow playback.
      video.muted = true
      video.play().catch(() => {})
    }
  }, [covered, paused, playVideo, wide])

  return (
    <motion.div
      aria-hidden
      style={still ? undefined : { scale }}
      className={cn('fixed inset-0 -z-10 bg-ink-950', covered && 'invisible')}
    >
      {playVideo ? (
        // Keyed by clip: a <video> doesn't reload when only its <source> children change.
        <video
          key={clip.mp4}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          poster={clip.poster}
          className={fit}
        >
          <source src={clip.webm} type="video/webm" />
          <source src={clip.mp4} type="video/mp4" />
        </video>
      ) : (
        <img src={clip.poster} alt="" className={fit} />
      )}

      {/* Legibility: overall dim, darker behind the text column (start side in RTL) and toward the sheet below. */}
      <div className="absolute inset-0 bg-ink-950/45" />
      <div className="absolute inset-0 bg-linear-to-l from-ink-950/85 via-ink-950/35 to-ink-950/10 max-lg:hidden" />
      <div className="absolute inset-0 bg-linear-to-b from-ink-950/60 via-transparent to-ink-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(192,138,50,0.25),transparent_55%)]" />
      <div className="bg-grid absolute inset-0 opacity-40" />
      {!still && <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-ink-950" />}
    </motion.div>
  )
}

/** Desktop-only brand mark: the gold logo floating over a soft glow, with a live equalizer underneath. */
function LogoShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease }}
      className="relative hidden lg:block"
    >
      <div aria-hidden className="absolute inset-10 rounded-full bg-gold-500/20 blur-[100px]" />
      <div className="relative mx-auto max-w-md animate-float">
        <img
          src={asset('brand/logo.webp')}
          alt={BRAND.name}
          width={900}
          height={663}
          fetchPriority="high"
          className="w-full drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
        />
        <Equalizer bars={30} className="mx-auto mt-12 h-12 w-2/3 opacity-75" />
      </div>
    </motion.div>
  )
}
