import {
  Accessibility,
  AlignJustify,
  CirclePause,
  Contrast,
  FileText,
  Link2,
  Minus,
  MousePointer2,
  Palette,
  Plus,
  RotateCcw,
  Type,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { MAX_TEXT_STEP, useA11y, type A11yToggle } from '../../context/a11y'
import { cn, legalHref } from '../../lib/utils'

const TOGGLES: { key: A11yToggle; label: string; icon: LucideIcon }[] = [
  { key: 'contrast', label: 'ניגודיות גבוהה', icon: Contrast },
  { key: 'grayscale', label: 'גווני אפור', icon: Palette },
  { key: 'highlightLinks', label: 'הדגשת קישורים', icon: Link2 },
  { key: 'readableFont', label: 'גופן קריא', icon: Type },
  { key: 'textSpacing', label: 'ריווח טקסט', icon: AlignJustify },
  { key: 'stopMotion', label: 'עצירת אנימציות', icon: CirclePause },
  { key: 'bigCursor', label: 'סמן גדול', icon: MousePointer2 },
]

/** Floating accessibility button + settings panel (non-modal; Esc or an outside click closes it). */
export function AccessibilityMenu() {
  const { settings, toggle, setTextStep, reset } = useA11y()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const titleId = useId()
  const activeCount = TOGGLES.filter((t) => settings[t.key]).length + (settings.textStep ? 1 : 0)

  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('button')?.focus()
    const close = (returnFocus: boolean) => {
      setOpen(false)
      if (returnFocus) buttonRef.current?.focus()
    }
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && close(true)
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) close(false)
    }
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div className="fixed start-4 bottom-4 z-[60] sm:start-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-labelledby={titleId}
            data-lenis-prevent
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute start-0 bottom-[calc(100%+0.75rem)] max-h-[calc(100svh-7rem)] w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-ink-850/95 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 id={titleId} className="flex items-center gap-2 text-lg font-bold">
                <Accessibility className="size-5 text-gold-400" />
                תפריט נגישות
              </h2>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  buttonRef.current?.focus()
                }}
                aria-label="סגירת תפריט הנגישות"
                className="grid size-9 place-items-center rounded-full text-stone-300 transition hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              <button
                type="button"
                onClick={() => setTextStep(settings.textStep + 1)}
                disabled={settings.textStep === MAX_TEXT_STEP}
                aria-label="הגדלת טקסט"
                className="grid size-10 place-items-center rounded-xl bg-white/5 transition hover:bg-white/10 disabled:opacity-40"
              >
                <Plus className="size-5" />
              </button>
              <p className="text-sm font-medium" aria-live="polite">
                גודל טקסט <span dir="ltr">{100 + settings.textStep * 12.5}%</span>
              </p>
              <button
                type="button"
                onClick={() => setTextStep(settings.textStep - 1)}
                disabled={settings.textStep === 0}
                aria-label="הקטנת טקסט"
                className="grid size-10 place-items-center rounded-xl bg-white/5 transition hover:bg-white/10 disabled:opacity-40"
              >
                <Minus className="size-5" />
              </button>
            </div>

            <ul className="mt-3 grid grid-cols-2 gap-2">
              {TOGGLES.map(({ key, label, icon: Icon }) => {
                const on = settings[key]
                return (
                  <li key={key}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(key)}
                      className={cn(
                        'flex h-full w-full flex-col items-center gap-2 rounded-2xl border px-2 py-3.5 text-sm font-medium transition',
                        on
                          ? 'border-gold-400 bg-gold-400/15 text-white'
                          : 'border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25 hover:text-white',
                      )}
                    >
                      <Icon className={cn('size-6', on ? 'text-gold-300' : 'text-stone-400')} />
                      {label}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-medium text-stone-300 transition hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="size-4" />
                איפוס הגדרות
              </button>
              <a
                href={legalHref('accessibility')}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-medium text-gold-300 transition hover:bg-white/10 hover:text-gold-200"
              >
                <FileText className="size-4" />
                הצהרת נגישות
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label="תפריט נגישות"
        className="relative grid size-14 place-items-center rounded-full bg-linear-to-b from-gold-300 via-gold-400 to-gold-600 text-ink-950 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.8)] ring-1 ring-gold-200/50 ring-inset transition hover:scale-105"
      >
        <Accessibility className="size-7" />
        {activeCount > 0 && (
          <span
            aria-hidden
            className="absolute -top-1 -end-1 grid size-5 place-items-center rounded-full bg-ink-950 text-[11px] font-bold text-gold-300 ring-2 ring-gold-400"
          >
            {activeCount}
          </span>
        )}
      </button>
    </div>
  )
}
