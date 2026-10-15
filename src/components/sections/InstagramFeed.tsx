import { Clapperboard, Images } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { INSTAGRAM, type InstagramPost } from '../../data/site'
import { FeedWidget } from '../embeds/FeedWidget'
import { InstagramEmbed } from '../embeds/InstagramEmbed'
import { InstagramIcon } from '../ui/BrandIcons'
import { buttonStyles } from '../ui/button'
import { Modal } from '../ui/Modal'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

/**
 * Instagram section with two modes:
 *  1. Live feed – when INSTAGRAM.widget is configured (Elfsight / Juicer).
 *  2. Curated grid – tiles open the official post embed (if a shortcode is set) or the profile.
 */
export function InstagramFeed() {
  const [open, setOpen] = useState<InstagramPost | null>(null)
  const { widget } = INSTAGRAM

  return (
    <Section id="instagram" titleId="instagram-title" tone="raised">
      <SectionHeading
        eyebrow={INSTAGRAM.handle}
        titleId="instagram-title"
        title={
          <>
            הרגעים הכי חמים <span className="text-gradient">באינסטגרם</span>
          </>
        }
        subtitle="רילס מהרחבה, מאחורי הקלעים והופעות לייב – עקבו כדי לא לפספס."
      />

      {widget.provider && widget.id ? (
        <FeedWidget provider={widget.provider} id={widget.id} />
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {INSTAGRAM.posts.map((post, i) => (
            <motion.li
              key={post.image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostTile post={post} onOpen={() => setOpen(post)} />
            </motion.li>
          ))}
        </ul>
      )}

      <Reveal className="mt-12 text-center">
        <a href={INSTAGRAM.profileUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: 'ghost', size: 'lg' })}>
          <InstagramIcon className="size-5" />
          עקבו באינסטגרם
          <span dir="ltr" className="text-stone-400">
            {INSTAGRAM.handle}
          </span>
        </a>
      </Reveal>

      <Modal open={open !== null} onClose={() => setOpen(null)} label="פוסט מאינסטגרם" className="max-w-md">
        {open?.shortcode && <InstagramEmbed kind={open.kind} shortcode={open.shortcode} />}
      </Modal>
    </Section>
  )
}

function PostTile({ post, onOpen }: { post: InstagramPost; onOpen: () => void }) {
  const KindIcon = post.kind === 'reel' ? Clapperboard : Images
  const content = (
    <>
      <img
        src={post.image}
        alt={post.caption}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition duration-700 group-hover:scale-110"
      />
      <KindIcon aria-hidden className="absolute end-3 top-3 size-5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-b from-gold-300/90 via-gold-400/85 to-gold-600/90 p-3 text-center text-ink-950 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <InstagramIcon className="size-7" />
        <span className="line-clamp-2 text-sm font-bold">{post.caption}</span>
      </span>
    </>
  )
  const tileClass = 'group relative block aspect-square w-full overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-white/10'

  return post.shortcode ? (
    <button type="button" onClick={onOpen} className={tileClass} aria-label={`צפייה בפוסט: ${post.caption}`}>
      {content}
    </button>
  ) : (
    <a href={INSTAGRAM.profileUrl} target="_blank" rel="noopener noreferrer" className={tileClass}>
      {content}
    </a>
  )
}
