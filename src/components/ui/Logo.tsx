import { asset, BRAND } from '../../data/site'
import { cn } from '../../lib/utils'

/** Horizontal lockup cut from the client's logo: triangle emblem + "ODED EL" wordmark (see /public/brand). */
export function Logo({ className, href = '#top' }: { className?: string; href?: string }) {
  return (
    <a
      href={href}
      aria-label={href === '#top' ? `${BRAND.name} – חזרה לראש העמוד` : `${BRAND.name} – לדף הבית`}
      className={cn('group inline-flex shrink-0 items-center gap-3', className)}
    >
      <img
        src={asset('brand/emblem.webp')}
        alt=""
        width={205}
        height={160}
        className="h-10 w-auto transition duration-500 group-hover:drop-shadow-[0_0_14px_rgba(231,190,102,0.6)]"
      />
      <img src={asset('brand/wordmark.webp')} alt="" width={438} height={72} className="h-[18px] w-auto" />
    </a>
  )
}
