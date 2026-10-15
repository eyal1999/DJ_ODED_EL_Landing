import { SOCIALS } from '../../data/site'
import { cn } from '../../lib/utils'
import { BRAND_ICONS } from './brandIconMap'

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2.5', className)}>
      {SOCIALS.map(({ key, label, href }) => {
        const Icon = BRAND_ICONS[key]
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="glass grid size-11 place-items-center rounded-full text-stone-300 transition duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:text-white hover:shadow-[0_0_24px_-6px_rgba(231,190,102,0.8)]"
            >
              <Icon className="size-5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
