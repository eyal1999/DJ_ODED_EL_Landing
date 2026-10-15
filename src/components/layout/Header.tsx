import { CalendarCheck, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type MouseEvent } from 'react'
import { NAV_ITEMS } from '../../data/site'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { cn, scrollToSection, whatsappUrl } from '../../lib/utils'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { buttonStyles } from '../ui/button'
import { Logo } from '../ui/Logo'

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(SECTION_IDS)
  useLockBodyScroll(menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia('(min-width: 1024px)')
    const close = () => desktop.matches && setMenuOpen(false)
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    desktop.addEventListener('change', close)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      desktop.removeEventListener('change', close)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  // Close the menu first so the scroll lock is released, then scroll.
  const navigate = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollToSection(id)
  }

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500',
        solid
          ? 'border-b border-white/[0.06] bg-ink-900/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="ניווט ראשי" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors',
                      isActive ? 'text-white' : 'text-stone-400 hover:text-white',
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-linear-to-l from-gold-600 to-gold-400 shadow-[0_0_12px_rgba(231,190,102,0.9)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className={cn(buttonStyles({ size: 'sm' }), 'max-sm:hidden')}>
            <CalendarCheck className="size-4" />
            <span className="hidden xl:inline">השארת פרטים /</span>
            בדיקת תאריך
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
            className="glass grid size-11 place-items-center rounded-full text-white lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="ניווט ראשי"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/5 bg-ink-900/95 backdrop-blur-xl lg:hidden"
          >
            <div data-lenis-prevent className="max-h-[calc(100svh-4.5rem)] overflow-y-auto px-4 pt-4 pb-8 sm:px-6">
              <ul className="divide-y divide-white/5">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => navigate(e, item.id)}
                      className={cn(
                        'flex items-center justify-between py-4 text-2xl font-bold',
                        active === item.id ? 'text-gradient' : 'text-white',
                      )}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href="#contact"
                  onClick={(e) => navigate(e, 'contact')}
                  className={buttonStyles({ size: 'lg' })}
                >
                  <CalendarCheck className="size-5" />
                  השארת פרטים / בדיקת תאריך
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({ variant: 'whatsapp', size: 'lg' })}
                >
                  <WhatsAppIcon className="size-5" />
                  צור קשר בוואטסאפ
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
