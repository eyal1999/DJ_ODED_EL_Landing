import { ArrowRight } from 'lucide-react'
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { AccessibilityMenu } from '../components/layout/AccessibilityMenu'
import { Footer } from '../components/layout/Footer'
import { buttonStyles } from '../components/ui/button'
import { Logo } from '../components/ui/Logo'
import { useA11y } from '../context/a11y'
import { BRAND, CONTACT, HOME_URL, LEGAL } from '../data/site'
import { cn, whatsappUrl } from '../lib/utils'

type LegalPageId = (typeof LEGAL.pages)[number]['id']

/** Shell for the standalone legal pages: slim header, document column, the site footer and the accessibility menu. */
export function LegalLayout({ id, title, children }: { id: LegalPageId; title: string; children: ReactNode }) {
  const { settings } = useA11y()

  return (
    <MotionConfig reducedMotion={settings.stopMotion ? 'always' : 'user'}>
      <a
        href="#content"
        className="sr-only rounded-full bg-white px-5 py-3 font-bold text-ink-900 focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70]"
      >
        דילוג לתוכן הראשי
      </a>

      <header id="top" className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink-900/80 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo href={HOME_URL} />
          <a href={HOME_URL} className={buttonStyles({ variant: 'ghost', size: 'sm' })}>
            <ArrowRight className="size-4" />
            חזרה לאתר
          </a>
        </div>
      </header>

      <main id="content" className="relative isolate overflow-x-clip">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 end-0 -z-10 size-[32rem] rounded-full bg-gold-500/10 blur-[130px]"
        />
        <article className="mx-auto max-w-3xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
          <p className="font-display text-xs tracking-[0.3em] text-gold-400">
            <span dir="ltr">{BRAND.name}</span>
          </p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-stone-400">עודכן לאחרונה: {LEGAL.updated}</p>
          <div className="legal-prose mt-8 border-t border-white/10 pt-2">{children}</div>
        </article>

        <nav aria-label="מסמכים נוספים" className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
          <ul className="flex flex-wrap gap-2.5">
            {LEGAL.pages.map((page) => (
              <li key={page.id}>
                <a
                  href={page.href}
                  aria-current={page.id === id ? 'page' : undefined}
                  className={cn(
                    'inline-flex rounded-full border px-4 py-2 text-sm font-medium transition',
                    page.id === id
                      ? 'border-gold-400 bg-gold-400/15 text-white'
                      : 'border-white/10 text-stone-300 hover:border-white/25 hover:text-white',
                  )}
                >
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <Footer sectionBase={HOME_URL} />
      <AccessibilityMenu />
    </MotionConfig>
  )
}

/** Opening words naming the site and its operator (merged while LEGAL.owner is just the brand name). */
export function SiteParties() {
  return LEGAL.owner === BRAND.name ? (
    <>
      ברוכים הבאים לאתר של <span dir="ltr">{BRAND.name}</span> (״האתר״, ״אנחנו״).
    </>
  ) : (
    <>
      ברוכים הבאים לאתר של <span dir="ltr">{BRAND.name}</span> (״האתר״), המופעל על ידי{' '}
      <span dir="ltr">{LEGAL.owner}</span> (״אנחנו״).
    </>
  )
}

/** Phone / email / WhatsApp list used at the end of each legal document. */
export function ContactDetails() {
  return (
    <ul>
      <li>
        טלפון:{' '}
        <a href={CONTACT.phoneHref} dir="ltr">
          {CONTACT.phoneDisplay}
        </a>
      </li>
      <li>
        דוא״ל:{' '}
        <a href={`mailto:${CONTACT.email}`} dir="ltr">
          {CONTACT.email}
        </a>
      </li>
      <li>
        וואטסאפ:{' '}
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          שליחת הודעה
        </a>
      </li>
    </ul>
  )
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
