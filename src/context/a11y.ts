import { createContext, useContext } from 'react'

export type A11ySettings = {
  /** 0 = default text size; each step adds 12.5%. */
  textStep: number
  contrast: boolean
  grayscale: boolean
  highlightLinks: boolean
  readableFont: boolean
  textSpacing: boolean
  stopMotion: boolean
  bigCursor: boolean
}

export type A11yToggle = Exclude<keyof A11ySettings, 'textStep'>

export const MAX_TEXT_STEP = 3

export const DEFAULT_A11Y: A11ySettings = {
  textStep: 0,
  contrast: false,
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  textSpacing: false,
  stopMotion: false,
  bigCursor: false,
}

type A11yContextValue = {
  settings: A11ySettings
  toggle: (key: A11yToggle) => void
  setTextStep: (step: number) => void
  reset: () => void
}

export const A11yContext = createContext<A11yContextValue | null>(null)

export function useA11y() {
  const ctx = useContext(A11yContext)
  if (!ctx) throw new Error('useA11y must be used inside <A11yProvider>')
  return ctx
}
