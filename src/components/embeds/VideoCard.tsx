import { Play } from 'lucide-react'
import type { Video } from '../../data/site'
import { cn, isPlaceholderId } from '../../lib/utils'
import { YouTubeIcon } from '../ui/BrandIcons'

const CATEGORY_LABEL: Record<Video['category'], string> = {
  wedding: 'חתונה',
  club: 'מועדון / פסטיבל',
  live: 'לייב שואו',
}

function coverFor(video: Video) {
  if (video.cover) return video.cover
  if (video.provider === 'youtube' && !isPlaceholderId(video.videoId))
    return `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`
  return undefined
}

/**
 * Lightweight "facade": shows a cover + play button and only loads the
 * real player (in a modal) on click – keeps the page fast.
 */
export function VideoCard({ video, featured, onPlay }: { video: Video; featured?: boolean; onPlay: () => void }) {
  const cover = coverFor(video)
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`ניגון: ${video.title}`}
      className="group glow-ring relative block size-full min-h-56 overflow-hidden rounded-3xl bg-ink-800 text-start ring-1 ring-white/10"
    >
      {cover && (
        <img
          src={cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
        />
      )}
      <span className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/40 to-ink-950/10 transition group-hover:via-ink-950/20" />

      <span
        className={cn(
          'absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:bg-linear-to-br group-hover:from-gold-600 group-hover:to-gold-400 group-hover:shadow-[0_0_50px_-5px_rgba(231,190,102,0.9)]',
          featured ? 'size-20 sm:size-24' : 'size-16',
        )}
      >
        <Play className={cn('translate-x-0.5 fill-white text-white transition group-hover:fill-ink-950 group-hover:text-ink-950', featured ? 'size-8 sm:size-9' : 'size-6')} />
      </span>

      <span className="absolute end-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-medium backdrop-blur">
        {CATEGORY_LABEL[video.category]}
      </span>

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
        <span>
          <span dir="ltr" className="block font-display text-[10px] tracking-[0.25em] text-gold-400 uppercase">
            {video.subtitle}
          </span>
          <span className={cn('mt-1.5 block font-bold text-white', featured ? 'text-xl sm:text-3xl' : 'text-lg')}>
            {video.title}
          </span>
        </span>
        {video.provider === 'youtube' && <YouTubeIcon className="size-6 shrink-0 text-white/70" />}
      </span>
    </button>
  )
}
