import { Headphones } from 'lucide-react'
import { VIDEOS } from '../../../data/site'
import { Reveal } from '../../ui/Reveal'
import { Section, SectionHeading } from '../../ui/Section'
import { MusicPlayers } from './MusicPlayers'
import { VideoGallery } from './VideoGallery'

/** Videos + music. With no videos configured yet, the section is music-only. */
export function MediaShowcase() {
  const hasVideos = VIDEOS.length > 0
  return (
    <Section id="media" titleId="media-title">
      <div
        aria-hidden
        className="pointer-events-none absolute start-0 top-1/3 -z-10 size-[30rem] rounded-full bg-gold-400/10 blur-[130px]"
      />
      <SectionHeading
        eyebrow="MUSIC & MEDIA"
        titleId="media-title"
        title={
          <>
            המוזיקה <span className="text-gradient">שלי</span>
          </>
        }
        subtitle={
          hasVideos
            ? 'אפטרמוביז מחתונות, סטים ממועדונים והופעות לייב – תראו ותשמעו בעצמכם.'
            : 'סט חתונות מלא, ישר מהרחבה – תשמעו בעצמכם.'
        }
      />

      {hasVideos && (
        <>
          <VideoGallery />

          <Reveal className="mt-24 mb-10 flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-gold-600 to-gold-400 shadow-[0_0_30px_-6px_rgba(231,190,102,0.8)]">
              <Headphones className="size-6 text-ink-950" />
            </span>
            <div>
              <h3 className="text-2xl font-black sm:text-3xl">סטים ורמיקסים להאזנה</h3>
              <p className="mt-1 text-stone-400">סטים מלאים, ישירות מהעמדה.</p>
            </div>
          </Reveal>
        </>
      )}

      <MusicPlayers />
    </Section>
  )
}
