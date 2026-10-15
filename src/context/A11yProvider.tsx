import { useCallback, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { lenis } from '../lib/smoothScroll'
import { A11yContext, DEFAULT_A11Y, MAX_TEXT_STEP, type A11ySettings, type A11yToggle } from './a11y'

const STORAGE_KEY = 'odedel-a11y'

/** Each toggle maps to a class on <html>; the matching styles live in index.css. */
const CLASSES: Record<A11yToggle, string> = {
  contrast: 'a11y-contrast',
  grayscale: 'a11y-grayscale',
  highlightLinks: 'a11y-links',
  readableFont: 'a11y-font',
  textSpacing: 'a11y-spacing',
  stopMotion: 'a11y-stop-motion',
  bigCursor: 'a11y-cursor',
}

function load(): A11ySettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...DEFAULT_A11Y, ...JSON.parse(saved) } : DEFAULT_A11Y
  } catch {
    return DEFAULT_A11Y
  }
}

/** Accessibility-menu settings: applied to <html> before paint and remembered in this browser. */
export function A11yProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(load)

  useLayoutEffect(() => {
    const root = document.documentElement
    for (const [key, className] of Object.entries(CLASSES)) {
      root.classList.toggle(className, settings[key as A11yToggle])
    }
    if (settings.textStep) root.dataset.a11yText = String(settings.textStep)
    else delete root.dataset.a11yText
    // "Stop animations" also turns the inertial wheel scrolling back into native scrolling.
    if (lenis) lenis.options.smoothWheel = !settings.stopMotion

    try {
      const isDefault = JSON.stringify(settings) === JSON.stringify(DEFAULT_A11Y)
      if (isDefault) localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // Storage blocked (private mode etc.) – settings still apply for this visit.
    }
  }, [settings])

  const toggle = useCallback((key: A11yToggle) => setSettings((s) => ({ ...s, [key]: !s[key] })), [])
  const setTextStep = useCallback(
    (step: number) => setSettings((s) => ({ ...s, textStep: Math.min(MAX_TEXT_STEP, Math.max(0, step)) })),
    [],
  )
  const reset = useCallback(() => setSettings(DEFAULT_A11Y), [])
  const value = useMemo(() => ({ settings, toggle, setTextStep, reset }), [settings, toggle, setTextStep, reset])

  return <A11yContext value={value}>{children}</A11yContext>
}
