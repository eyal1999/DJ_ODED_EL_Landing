import type { SpotifyEmbedType } from '../../data/site'

type SpotifyEmbedProps = {
  type: SpotifyEmbedType
  id: string
  title: string
  /** 352 = full player with tracklist, 152 = compact. */
  height?: 152 | 352
}

/** Native Spotify iFrame player (artist / album / playlist / track). */
export function SpotifyEmbed({ type, id, title, height = 352 }: SpotifyEmbedProps) {
  return (
    <iframe
      title={`Spotify – ${title}`}
      src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`}
      height={height}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="block w-full rounded-xl border-0 bg-ink-800"
    />
  )
}
