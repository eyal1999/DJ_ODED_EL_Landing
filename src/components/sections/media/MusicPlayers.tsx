import type { CSSProperties } from 'react'
import { MUSIC, SOCIALS } from '../../../data/site'
import { PlayerCard } from '../../embeds/PlayerCard'
import { SoundCloudEmbed } from '../../embeds/SoundCloudEmbed'
import { SpotifyEmbed } from '../../embeds/SpotifyEmbed'
import { cn } from '../../../lib/utils'
import { BRAND_ICONS } from '../../ui/brandIconMap'
import { Reveal } from '../../ui/Reveal'

const profile = (key: string) => SOCIALS.find((s) => s.key === key)?.href

/**
 * Spotify + SoundCloud players side by side, followed by "listen on" platform buttons.
 * Without a Spotify embed the SoundCloud players take the full width, led by one large artwork player.
 */
export function MusicPlayers() {
  const { spotify } = MUSIC
  return (
    <>
      <div className={cn('grid gap-6', spotify ? 'lg:grid-cols-2' : 'mx-auto max-w-3xl')}>
        {spotify && (
          <Reveal>
            <PlayerCard platform="spotify" title={spotify.title} href={profile('spotify')} className="h-full">
              <SpotifyEmbed type={spotify.type} id={spotify.id} title={spotify.title} />
            </PlayerCard>
          </Reveal>
        )}
        <div className="grid gap-6">
          {MUSIC.soundcloud.map((track, i) => (
            <Reveal key={track.title} delay={0.1 * (i + 1)}>
              <PlayerCard platform="soundcloud" title={track.title} href={profile('soundcloud')}>
                <SoundCloudEmbed url={track.url} title={track.title} visual={!spotify && i === 0} />
              </PlayerCard>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.2} className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {MUSIC.platforms.map(({ key, label, href, color }) => {
          const Icon = BRAND_ICONS[key]
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--brand': color } as CSSProperties}
              className="glass inline-flex h-14 items-center justify-center gap-3 rounded-full px-7 font-bold transition duration-300 hover:-translate-y-0.5 hover:border-(--brand) hover:shadow-[0_0_36px_-8px_var(--brand)]"
            >
              <Icon className="size-5 text-(--brand)" />
              {label}
            </a>
          )
        })}
      </Reveal>
    </>
  )
}
