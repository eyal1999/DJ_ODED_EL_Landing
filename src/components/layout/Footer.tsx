import { ArrowUp, Mail, Phone } from 'lucide-react'
import { BRAND, CONTACT, LEGAL, NAV_ITEMS } from '../../data/site'
import { whatsappUrl } from '../../lib/utils'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { Logo } from '../ui/Logo'
import { SocialLinks } from '../ui/SocialLinks'

const YEAR = new Date().getFullYear()

/** `sectionBase` is the site root on the standalone legal pages so section links lead back to the landing page. */
export function Footer({ sectionBase = '' }: { sectionBase?: string }) {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-gold-600/60 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr] lg:px-8">
        <div>
          <Logo href={sectionBase || undefined} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">{BRAND.footerBlurb}</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="קישורים מהירים">
          <h3 className="text-sm font-bold text-white">קישורים מהירים</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm md:grid-cols-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`${sectionBase}#${item.id}`} className="text-stone-400 transition hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold text-white">יצירת קשר</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2.5 text-stone-400 transition hover:text-white">
                <Phone className="size-4 text-gold-400" />
                <span dir="ltr">{CONTACT.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2.5 text-stone-400 transition hover:text-white">
                <Mail className="size-4 text-gold-400" />
                <span dir="ltr">{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-stone-400 transition hover:text-white"
              >
                <WhatsAppIcon className="size-4 text-whatsapp" />
                שליחת הודעה בוואטסאפ
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 pt-6 pb-28 text-xs text-stone-400 sm:flex-row sm:px-6 sm:pb-6 lg:px-8">
          <p>
            © {YEAR} <span dir="ltr">{BRAND.name}</span>. כל הזכויות שמורות.
          </p>
          <nav aria-label="מידע משפטי ונגישות">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {LEGAL.pages.map((page) => (
                <li key={page.id}>
                  <a href={page.href} className="underline-offset-4 transition hover:text-white hover:underline">
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#top" className="inline-flex items-center gap-1.5 transition hover:text-white">
            חזרה למעלה
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
