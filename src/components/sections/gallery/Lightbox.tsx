import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import type { GalleryImage } from '../../../data/site'
import { Modal } from '../../ui/Modal'

type LightboxProps = {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
}

const SWIPE_THRESHOLD = 80

/** Full-screen image viewer: arrows / keyboard / swipe navigation, RTL-aware. */
export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const open = index !== null
  const count = images.length
  const image = index !== null ? images[index] : null

  // RTL: "next" lives on the left.
  const next = () => index !== null && onChange((index + 1) % count)
  const prev = () => index !== null && onChange((index - 1 + count) % count)

  useEffect(() => {
    if (index === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onChange((index + 1) % count)
      if (e.key === 'ArrowRight') onChange((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, count, onChange])

  return (
    <Modal open={open} onClose={onClose} label="גלריית תמונות" className="max-w-6xl">
      {image && (
        <figure className="flex flex-col items-center">
          <div className="relative flex w-full items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={image.full}
                src={image.full}
                alt={image.alt}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x > SWIPE_THRESHOLD) next()
                  else if (info.offset.x < -SWIPE_THRESHOLD) prev()
                }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="max-h-[75svh] w-auto max-w-full cursor-grab touch-pan-y rounded-2xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] select-none active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>

            <NavButton label="התמונה הקודמת" onClick={prev} className="start-2 sm:-start-4">
              <ChevronRight className="size-6" />
            </NavButton>
            <NavButton label="התמונה הבאה" onClick={next} className="end-2 sm:-end-4">
              <ChevronLeft className="size-6" />
            </NavButton>
          </div>

          <figcaption className="mt-5 flex items-center gap-3 text-sm text-stone-300">
            <span className="font-bold text-white">{image.caption}</span>
            <span className="text-stone-600">•</span>
            <span dir="ltr" className="tabular-nums">
              {index! + 1} / {count}
            </span>
          </figcaption>
        </figure>
      )}
    </Modal>
  )
}

function NavButton({ label, onClick, className, children }: { label: string; onClick: () => void; className: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/60 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/15 ${className}`}
    >
      {children}
    </button>
  )
}
