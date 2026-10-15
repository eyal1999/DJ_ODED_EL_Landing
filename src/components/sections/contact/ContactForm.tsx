import { CalendarDays, CalendarCheck, ChevronDown, CircleCheckBig, LoaderCircle, MapPin, PartyPopper, Phone, RotateCcw, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { useBooking } from '../../../context/booking'
import { BRAND, CONTACT, EVENT_TYPES, type EventType } from '../../../data/site'
import { cn, legalHref, todayIso, whatsappUrl } from '../../../lib/utils'
import { WhatsAppIcon } from '../../ui/BrandIcons'
import { buttonStyles } from '../../ui/button'

type Values = { name: string; phone: string; date: string; eventType: EventType; venue: string }
type Errors = Partial<Record<'name' | 'phone', string>>
type Status = 'idle' | 'sending' | 'success' | 'error'

const INITIAL: Values = { name: '', phone: '', date: '', eventType: 'חתונה', venue: '' }

/** Israeli mobile / landline (05X / 0X / 07X, with or without +972) or any international number. */
const isValidPhone = (raw: string) => {
  const phone = raw.replace(/[\s\-()]/g, '')
  return /^(?:\+?972|0)(?:[23489]|5\d|7\d)\d{7}$/.test(phone) || /^\+\d{9,15}$/.test(phone)
}

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'נא להזין שם מלא'
  if (!values.phone.trim()) errors.phone = 'נא להזין מספר טלפון'
  else if (!isValidPhone(values.phone)) errors.phone = 'מספר הטלפון לא תקין'
  return errors
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${iso}T00:00:00`))

function buildMessage(v: Values) {
  return [
    `*בקשה לבדיקת זמינות – ${BRAND.name}*`,
    `שם: ${v.name.trim()}`,
    `טלפון: ${v.phone.trim()}`,
    v.date && `תאריך האירוע: ${formatDate(v.date)}`,
    `סוג האירוע: ${v.eventType}`,
    v.venue.trim() && `מיקום: ${v.venue.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * Lead form. With CONTACT.formEndpoint set it POSTs JSON to your backend / form
 * service; otherwise it opens WhatsApp with every detail pre-filled.
 */
export function ContactForm() {
  const id = useId()
  const { preset } = useBooking()
  const [values, setValues] = useState<Values>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')

  const [appliedPresetKey, setAppliedPresetKey] = useState<number | null>(null)

  // A service card asked for a specific event type.
  if (preset && preset.key !== appliedPresetKey) {
    setAppliedPresetKey(preset.key)
    setValues((v) => ({ ...v, eventType: preset.type }))
  }

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`${id}-${Object.keys(found)[0]}`)?.focus()
      return
    }
    if (honeypot) {
      setStatus('success')
      return
    }

    if (!CONTACT.formEndpoint) {
      window.open(whatsappUrl(buildMessage(values)), '_blank', 'noopener')
      setStatus('success')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, message: buildMessage(values) }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(INITIAL)
    setStatus('idle')
  }

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
      <div aria-hidden className="pointer-events-none absolute -top-24 -end-24 size-64 rounded-full bg-gold-600/25 blur-[90px]" />

      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-[26rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
              className="grid size-20 place-items-center rounded-full bg-linear-to-br from-gold-600 to-gold-400 shadow-[0_0_60px_-6px_rgba(231,190,102,0.9)]"
            >
              <CircleCheckBig className="size-10 text-ink-950" />
            </motion.span>
            <h3 className="mt-6 text-3xl font-black">הפרטים התקבלו!</h3>
            <p className="mt-3 max-w-sm text-stone-300">
              {CONTACT.formEndpoint
                ? 'נחזור אליכם בהקדם עם תשובה לגבי התאריך. מחכים לחגוג איתכם!'
                : 'פתחנו לכם שיחת וואטסאפ עם כל הפרטים – רק נשאר ללחוץ "שליחה" 🎶'}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {!CONTACT.formEndpoint && (
                <a
                  href={whatsappUrl(buildMessage(values))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({ variant: 'whatsapp' })}
                >
                  <WhatsAppIcon className="size-5" />
                  פתיחת וואטסאפ שוב
                </a>
              )}
              <button type="button" onClick={reset} className={buttonStyles({ variant: 'ghost' })}>
                <RotateCcw className="size-4" />
                שליחת פנייה נוספת
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative"
          >
            <h3 className="text-2xl font-black sm:text-3xl">בדיקת זמינות לתאריך</h3>
            <p className="mt-2 text-stone-400">ממלאים פרטים קצרים – ואני חוזר אליכם עם תשובה.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field id={`${id}-name`} label="שם מלא" required icon={User} error={errors.name}>
                <input
                  id={`${id}-name`}
                  name="name"
                  autoComplete="name"
                  placeholder="איך קוראים לכם?"
                  value={values.name}
                  onChange={(e) => set('name', e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${id}-name-error` : undefined}
                  className={inputClass(!!errors.name)}
                />
              </Field>

              <Field id={`${id}-phone`} label="טלפון" required icon={Phone} error={errors.phone}>
                <input
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="050-1234567"
                  value={values.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
                  className={inputClass(!!errors.phone)}
                />
              </Field>

              <Field id={`${id}-date`} label="תאריך האירוע" icon={CalendarDays}>
                <input
                  id={`${id}-date`}
                  name="date"
                  type="date"
                  min={todayIso()}
                  value={values.date}
                  onChange={(e) => set('date', e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              <Field id={`${id}-type`} label="סוג האירוע" icon={PartyPopper}>
                <select
                  id={`${id}-type`}
                  name="eventType"
                  value={values.eventType}
                  onChange={(e) => set('eventType', e.target.value as EventType)}
                  className={cn(inputClass(false), 'cursor-pointer appearance-none pe-11')}
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-ink-800">
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
              </Field>

              <Field id={`${id}-venue`} label="מיקום / מקום האירוע" icon={MapPin} className="sm:col-span-2">
                <input
                  id={`${id}-venue`}
                  name="venue"
                  autoComplete="address-level2"
                  placeholder="לדוגמה: גן אירועים בשרון"
                  value={values.venue}
                  onChange={(e) => set('venue', e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              {/* Spam trap – hidden from people, bots tend to fill it. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
              />
            </div>

            {status === 'error' && (
              <p role="alert" className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
                משהו השתבש בשליחה. נסו שוב או{' '}
                <a href={whatsappUrl(buildMessage(values))} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                  שלחו לנו בוואטסאפ
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className={cn(buttonStyles({ size: 'lg' }), 'mt-8 w-full animate-gradient bg-[length:200%_auto]')}
            >
              {status === 'sending' ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" />
                  שולחים...
                </>
              ) : (
                <>
                  <CalendarCheck className="size-5" />
                  בדקו זמינות לאירוע שלכם
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs text-stone-400">
              ללא התחייבות. הפרטים משמשים רק כדי לחזור אליכם –{' '}
              <a href={legalHref('privacy')} className="underline underline-offset-2 transition hover:text-white">
                מדיניות הפרטיות
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass = (invalid: boolean) =>
  cn(
    'h-13 w-full rounded-xl border bg-white/[0.04] ps-12 pe-4 text-base text-white transition outline-none placeholder:text-stone-400 focus:bg-white/[0.07] focus:ring-4',
    invalid
      ? 'border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/20'
      : 'border-white/10 hover:border-white/20 focus:border-gold-600 focus:ring-gold-600/20',
  )

type FieldProps = {
  id: string
  label: string
  icon: LucideIcon
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}

function Field({ id, label, icon: Icon, required, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-stone-300">
        {label}
        {required && <span className="text-gold-400"> *</span>}
      </label>
      <div className="relative">
        <Icon aria-hidden className="pointer-events-none absolute start-4 top-1/2 z-10 size-5 -translate-y-1/2 text-stone-400" />
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}
