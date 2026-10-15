type SoundCloudEmbedProps = {
  /** Public SoundCloud track or playlist URL. */
  url: string
  title: string
  /** Large artwork player instead of the classic waveform bar. */
  visual?: boolean
  height?: number
}

/** Native SoundCloud widget, tinted with the site's gold accent. */
export function SoundCloudEmbed({ url, title, visual = false, height = visual ? 300 : 166 }: SoundCloudEmbedProps) {
  const params = new URLSearchParams({
    url,
    color: '#d9a74b',
    auto_play: 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'true',
    show_reposts: 'false',
    show_teaser: 'false',
    visual: String(visual),
  })

  return (
    <iframe
      title={`SoundCloud – ${title}`}
      src={`https://w.soundcloud.com/player/?${params}`}
      height={height}
      loading="lazy"
      allow="autoplay"
      className="block w-full rounded-xl border-0 bg-ink-800"
    />
  )
}
