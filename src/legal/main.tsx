import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { A11yProvider } from '../context/A11yProvider'
import '../index.css'
import '../lib/smoothScroll'
import { AccessibilityStatement } from './docs/AccessibilityStatement'
import { PrivacyPolicy } from './docs/PrivacyPolicy'
import { TermsOfUse } from './docs/TermsOfUse'

/** Entry for privacy.html / terms.html / accessibility.html – the page picks its document via data-doc. */
const DOCS = { privacy: PrivacyPolicy, terms: TermsOfUse, accessibility: AccessibilityStatement }

const root = document.getElementById('root')!
const Doc = DOCS[root.dataset.doc as keyof typeof DOCS]

createRoot(root).render(
  <StrictMode>
    <A11yProvider>
      <Doc />
    </A11yProvider>
  </StrictMode>,
)
