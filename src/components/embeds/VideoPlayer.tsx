import { Clapperboard } from 'lucide-react'
import type { Video } from '../../data/site'
import { isPlaceholderId } from '../../lib/utils'

function videoEmbedUrl({ provider, videoId }: Pick<Video, 'provider' | 'videoId'>, autoplay = true) {
  const play = autoplay ? 1 : 0
  return provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${play}&rel=0&modestbranding=1&playsinline=1`
    : `https://player.vimeo.com/video/${videoId}?autoplay=${play}&title=0&byline=0&portrait=0&dnt=1`
}

/** Responsive 16:9 YouTube / Vimeo player. Shows a setup hint while the video ID is still a placeholder. */
export function VideoPlayer({ video, autoplay = true }: { video: Video; autoplay?: boolean }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_-20px_rgba(192,138,50,0.45)] ring-1 ring-white/10">
      {isPlaceholderId(video.videoId) ? (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(192,138,50,0.25),transparent_65%)] p-6 text-center">
          <div>
            <Clapperboard className="mx-auto size-12 text-gold-400" />
            <p className="mt-4 text-xl font-bold">{video.title}</p>
            <p className="mt-2 text-sm text-stone-400">
              הסרטון יוצג כאן לאחר הוספת מזהה {video.provider === 'youtube' ? 'YouTube' : 'Vimeo'} בקובץ התוכן
            </p>
          </div>
        </div>
      ) : (
        <iframe
          src={videoEmbedUrl(video, autoplay)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      )}
    </div>
  )
}
