import type { InstagramPost } from '../../data/site'

/** Official Instagram iFrame embed for a single post or reel. */
export function InstagramEmbed({ kind, shortcode }: Required<Pick<InstagramPost, 'kind' | 'shortcode'>>) {
  return (
    <iframe
      title="Instagram"
      src={`https://www.instagram.com/${kind === 'reel' ? 'reel' : 'p'}/${shortcode}/embed/captioned/`}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      className="mx-auto block h-[min(80vh,720px)] w-full max-w-[420px] rounded-2xl border-0 bg-white"
    />
  )
}
