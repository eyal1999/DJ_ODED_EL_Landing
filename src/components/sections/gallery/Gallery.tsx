import { ZoomIn } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { GALLERY } from '../../../data/site'
import { Section, SectionHeading } from '../../ui/Section'
import { Lightbox } from './Lightbox'

/** Masonry photo grid (CSS columns) with hover zoom and a lightbox. */
export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="gallery" titleId="gallery-title">
      <SectionHeading
        eyebrow="GALLERY"
        titleId="gallery-title"
        title={
          <>
            גלריה <span className="text-gradient">מאירועים</span>
          </>
        }
        subtitle="רגעים אמיתיים מהרחבה – חתונות, מסיבות ואירועים שהפכו לבלתי נשכחים."
      />

      <div className="columns-2 gap-3 *:mb-3 sm:gap-4 sm:*:mb-4 md:columns-3 lg:columns-4">
        {GALLERY.map((image, i) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`הגדלת תמונה: ${image.caption}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-white/10"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full transition duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between gap-2 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-start text-sm font-bold">{image.caption}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
                <ZoomIn className="size-4" />
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox images={GALLERY} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </Section>
  )
}
