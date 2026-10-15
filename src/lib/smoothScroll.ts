import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Inertial smooth scrolling for mouse wheels and trackpads (touch keeps native scrolling).
 * In-page anchor links scroll smoothly too; Lenis honours the html `scroll-padding-top`
 * (index.css), so targets land below the fixed header without an extra offset.
 * Not created for visitors who prefer reduced motion.
 */
export const lenis = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? null
  : new Lenis({ autoRaf: true, lerp: 0.085, anchors: true })
