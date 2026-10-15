import { CalendarCheck, CalendarDays, MapPin } from 'lucide-react'
import { TESTIMONIALS, type Testimonial } from '../../data/site'
import { buttonStyles } from '../ui/button'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

/** Splits the reviews into two columns of similar height – screenshots have very different lengths. */
function balanceColumns(items: Testimonial[]) {
  const columns: [Testimonial[], Testimonial[]] = [[], []]
  const heights = [0, 0]
  for (const t of items) {
    const i = heights[0] <= heights[1] ? 0 : 1
    columns[i].push(t)
    heights[i] += (t.screenshot ? t.screenshot.height / t.screenshot.width : 0.6) + 0.15
  }
  return { columns, shorter: heights[0] <= heights[1] ? 0 : 1 }
}

/**
 * The couples' own WhatsApp messages as (lightly touched-up) screenshots, in two balanced
 * columns with a booking prompt filling the shorter one.
 */
export function Testimonials() {
  const { columns, shorter } = balanceColumns(TESTIMONIALS)

  return (
    <Section id="testimonials" titleId="testimonials-title" tone="raised">
      <SectionHeading
        eyebrow="TESTIMONIALS"
        titleId="testimonials-title"
        // Headline quotes one of the couples (Noam's message below).
        title={
          <>
            ״אנשים לא <span className="text-gradient">הפסיקו לרקוד״</span>
          </>
        }
        subtitle="ההודעות שמחכות לי בבוקר שאחרי האירוע – בשבילן שווה כל רגע מאחורי העמדה."
      />

      <div className="mx-auto grid max-w-5xl items-start gap-5 md:grid-cols-2 md:gap-6">
        {columns.map((column, c) => (
          <div key={c} className="grid gap-5 md:gap-6">
            {column.map((t, i) => (
              <Reveal key={t.names} delay={0.08 * (i + c)}>
                <ReviewCard testimonial={t} />
              </Reveal>
            ))}
            {c === shorter && (
              <Reveal delay={0.2}>
                <NextCoupleCard />
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

function ReviewCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure className="glass rounded-[1.75rem] p-2.5 sm:p-3">
      {t.screenshot ? (
        <img
          src={t.screenshot.src}
          width={t.screenshot.width}
          height={t.screenshot.height}
          loading="lazy"
          decoding="async"
          alt={`צילום מסך של הודעת וואטסאפ מ${t.names}: ${t.quote}`}
          className="w-full rounded-[1.25rem] ring-1 ring-black/10"
        />
      ) : (
        <blockquote className="p-5 text-[15px] leading-relaxed text-stone-200">{t.quote}</blockquote>
      )}
      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-2 pt-3.5 pb-1.5">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-gold-600 to-gold-400 font-black text-ink-950"
          >
            {t.names.charAt(0)}
          </span>
          <p className="leading-tight">
            <span className="block font-bold">{t.names}</span>
            <span className="text-sm text-stone-400">{t.role}</span>
          </p>
        </div>
        {(t.venue || t.date) && (
          <div className="flex flex-wrap gap-2 text-xs text-stone-300">
            {t.venue && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                <MapPin className="size-3.5 text-gold-400" />
                {t.venue}
              </span>
            )}
            {t.date && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                <CalendarDays className="size-3.5 text-gold-400" />
                {t.date}
              </span>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  )
}

function NextCoupleCard() {
  return (
    <div className="glass glow-ring rounded-[1.75rem] p-8 text-center">
      <p className="text-2xl font-black">
        הזוג הבא <span className="text-gradient">יכול להיות אתם</span>
      </p>
      <p className="mt-3 text-stone-300">התאריכים בעונה מתמלאים מהר – בדקו אם התאריך שלכם עדיין פנוי.</p>
      <a href="#contact" className={`${buttonStyles()} mt-6`}>
        <CalendarCheck className="size-5" />
        בדיקת זמינות
      </a>
    </div>
  )
}
