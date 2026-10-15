import { CONTACT, LEGAL } from '../data/site'
import { lenis } from './smoothScroll'

/** URL of a standalone legal page (see LEGAL.pages). */
export const legalHref = (id: (typeof LEGAL.pages)[number]['id']) => LEGAL.pages.find((p) => p.id === id)!.href

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

export const whatsappUrl = (message: string = CONTACT.whatsappGreeting) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`

/** Scrolls to a section after the current frame (lets menus close / scroll locks release first). */
export function scrollToSection(id: string) {
  requestAnimationFrame(() => {
    const target = document.getElementById(id)
    if (!target) return
    if (lenis) lenis.scrollTo(target)
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  })
}

/** Media IDs left as "YOUR_..." in site.ts are treated as not configured yet. */
export const isPlaceholderId = (id: string) => !id || id.startsWith('YOUR_')

/** Injects a third-party script once (Elfsight / Juicer widgets). */
export function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.body.appendChild(script)
}

export function loadStylesheet(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

/** Today's date as YYYY-MM-DD in local time (for <input type="date" min>). */
export function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
