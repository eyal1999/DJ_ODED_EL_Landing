import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SocialKey } from '../../data/site'
import { cn } from '../../lib/utils'
import { BRAND_ICONS } from '../ui/brandIconMap'

type PlayerCardProps = {
  platform: SocialKey
  title: string
  href?: string
  className?: string
  children: ReactNode
}

/** Glass frame with a platform header around an embedded player. */
export function PlayerCard({ platform, title, href, className, children }: PlayerCardProps) {
  const Icon = BRAND_ICONS[platform]
  return (
    <div className={cn('glass glow-ring rounded-3xl p-3 sm:p-4', className)}>
      <div className="flex items-center justify-between gap-3 px-2 pt-1 pb-3">
        <p className="flex min-w-0 items-center gap-2.5 font-bold">
          <Icon className="size-5 shrink-0 text-gold-400" />
          <span className="truncate">{title}</span>
        </p>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs text-stone-400 transition hover:text-white"
          >
            לפרופיל
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
      {children}
    </div>
  )
}
