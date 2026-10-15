import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { whatsappUrl } from '../../lib/utils'
import { WhatsAppIcon } from '../ui/BrandIcons'

/** Always-visible WhatsApp CTA with a one-time greeting bubble. */
export function FloatingWhatsApp() {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setShowHint(true), 6000)
    const hide = setTimeout(() => setShowHint(false), 16000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed end-4 bottom-4 z-40 flex items-end gap-3 sm:end-6 sm:bottom-6">
      {/* In RTL the first child sits on the right, keeping the button in the corner. */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            className="pointer-events-auto relative mb-2 max-w-56 rounded-2xl rounded-ee-sm border border-white/10 bg-ink-800/95 px-4 py-3 text-sm shadow-2xl backdrop-blur"
          >
            <button
              type="button"
              onClick={() => setShowHint(false)}
              aria-label="סגירת ההודעה"
              className="absolute -start-2 -top-2 grid size-6 place-items-center rounded-full bg-ink-700 text-stone-300 ring-1 ring-white/10 hover:text-white"
            >
              <X className="size-3.5" />
            </button>
            <p className="font-bold">היי! 👋</p>
            <p className="mt-0.5 text-stone-300">רוצים לבדוק תאריך? דברו איתי בוואטסאפ</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שיחה בוואטסאפ"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto relative grid size-15 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_40px_-6px_rgba(37,211,102,0.7)]"
      >
        <span aria-hidden className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp opacity-50" />
        <WhatsAppIcon className="relative size-8" />
      </motion.a>
    </div>
  )
}
