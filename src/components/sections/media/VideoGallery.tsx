import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { VIDEO_FILTERS, VIDEOS, type Video, type VideoCategory } from '../../../data/site'
import { cn } from '../../../lib/utils'
import { VideoCard } from '../../embeds/VideoCard'
import { VideoPlayer } from '../../embeds/VideoPlayer'
import { Modal } from '../../ui/Modal'

/** Filterable YouTube / Vimeo showcase – aftermovies, club sets and live shows. */
export function VideoGallery() {
  const [filter, setFilter] = useState<VideoCategory | 'all'>('all')
  const [playing, setPlaying] = useState<Video | null>(null)

  const videos = filter === 'all' ? VIDEOS : VIDEOS.filter((v) => v.category === filter)
  const hasFeatured = videos.length >= 3

  return (
    <div>
      <div role="group" aria-label="סינון סרטונים" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0">
        {VIDEO_FILTERS.map((f) => {
          const active = f.id === filter
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                'relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
                active ? 'font-bold text-ink-950' : 'text-stone-400 hover:text-white',
              )}
            >
              {active && (
                <motion.span
                  layoutId="video-filter"
                  className="absolute inset-0 rounded-full bg-linear-to-l from-gold-600 to-gold-400 shadow-[0_0_24px_-6px_rgba(231,190,102,0.9)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {!active && <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]" />}
              <span className="relative">{f.label}</span>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid auto-rows-[15rem] gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-[14rem] lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {videos.map((video, i) => {
            const featured = hasFeatured && i === 0
            return (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(featured && 'sm:col-span-2 sm:row-span-2')}
              >
                <VideoCard video={video} featured={featured} onPlay={() => setPlaying(video)} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      <Modal open={playing !== null} onClose={() => setPlaying(null)} label={playing?.title ?? 'נגן וידאו'} className="max-w-5xl">
        {playing && (
          <>
            <VideoPlayer video={playing} />
            <p className="mt-4 text-center text-lg font-bold">{playing.title}</p>
          </>
        )}
      </Modal>
    </div>
  )
}
