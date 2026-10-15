import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { CONTACT } from '../../../data/site'
import { whatsappUrl } from '../../../lib/utils'
import { WhatsAppIcon } from '../../ui/BrandIcons'
import { buttonStyles } from '../../ui/button'
import { Reveal } from '../../ui/Reveal'
import { Section, SectionHeading } from '../../ui/Section'
import { SocialLinks } from '../../ui/SocialLinks'
import { ContactForm } from './ContactForm'

export function Contact() {
  return (
    <Section id="contact" titleId="contact-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[32rem] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgba(192,138,50,0.18),transparent)] blur-2xl"
      />
      <SectionHeading
        eyebrow="CONTACT"
        titleId="contact-title"
        title={
          <>
            צור קשר <span className="text-gradient">ובדיקת זמינות</span>
          </>
        }
        subtitle="התאריכים בעונה מתמלאים מהר – השאירו פרטים ונבדוק יחד אם התאריך שלכם פנוי."
      />

      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.15}>
          <aside aria-label="פרטי התקשרות" className="glass flex h-full flex-col rounded-[2rem] p-6 sm:p-10">
            <h3 className="text-2xl font-black">מעדיפים לדבר ישירות?</h3>
            <p className="mt-2 text-stone-400">זמין בטלפון ובוואטסאפ – בואו נדבר על האירוע שלכם.</p>

            <ul className="mt-8 space-y-3">
              <InfoRow icon={Phone} label="טלפון" href={CONTACT.phoneHref}>
                <span dir="ltr">{CONTACT.phoneDisplay}</span>
              </InfoRow>
              <InfoRow icon={Mail} label="אימייל" href={`mailto:${CONTACT.email}`}>
                <span dir="ltr" className="break-all">
                  {CONTACT.email}
                </span>
              </InfoRow>
              <InfoRow icon={MapPin} label="אזור שירות">
                {CONTACT.serviceArea}
              </InfoRow>
              <InfoRow icon={Clock} label="זמינות">
                {CONTACT.responseTime}
              </InfoRow>
            </ul>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonStyles({ variant: 'whatsapp', size: 'lg' })} mt-8 w-full`}
            >
              <WhatsAppIcon className="size-5" />
              שלחו הודעה בוואטסאפ
            </a>

            <div className="mt-auto border-t border-white/10 pt-6">
              <p className="mb-4 text-sm text-stone-400">עקבו אחריי</p>
              <SocialLinks />
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}

function InfoRow({ icon: Icon, label, href, children }: { icon: LucideIcon; label: string; href?: string; children: ReactNode }) {
  const body = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-gold-600/25 to-gold-400/25 text-gold-400 ring-1 ring-white/10">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-stone-400">{label}</span>
        <span className="block font-bold text-white">{children}</span>
      </span>
    </>
  )
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-4 rounded-2xl p-2 -m-2 transition hover:bg-white/5">
          {body}
        </a>
      ) : (
        <div className="flex items-center gap-4">{body}</div>
      )}
    </li>
  )
}
