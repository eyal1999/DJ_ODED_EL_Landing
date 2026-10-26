import { CircleCheckBig, Heart, MessageCircle } from 'lucide-react'
import { ABOUT } from '../../data/site'
import { buttonStyles } from '../ui/button'
import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

export function About() {
  return (
    <Section id="about" titleId="about-title">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 end-0 -z-10 size-[28rem] rounded-full bg-gold-600/15 blur-[120px]"
      />

      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Photo with glow + floating badges */}
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-gold-600/40 to-gold-400/30 opacity-60 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <img src={ABOUT.image} alt={ABOUT.imageAlt} loading="lazy" className="size-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-ink-900/70 via-transparent to-transparent" />
          </div>

          <div className="absolute start-4 top-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/75 px-4 py-3 backdrop-blur-xl sm:-start-6">
            <span className="grid size-10 place-items-center rounded-xl bg-gold-300/15 text-gold-300">
              <Heart className="size-5" />
            </span>
            <div dir="ltr" className="text-start">
              <p className="text-sm font-bold">{ABOUT.badge.title}</p>
              <p className="text-xs text-stone-400">{ABOUT.badge.text}</p>
            </div>
          </div>

          <div className="absolute end-4 -bottom-6 animate-float rounded-2xl border border-white/10 bg-ink-900/75 px-5 py-4 backdrop-blur-xl sm:-end-6">
            <p className="text-gradient font-display text-3xl font-bold">
              <Counter value={ABOUT.stat.value} suffix={ABOUT.stat.suffix} />
            </p>
            <p className="mt-1 text-sm text-stone-300">{ABOUT.stat.label}</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="start"
            eyebrow="ABOUT ME"
            titleId="about-title"
            title={
              <>
                מי אני? <span className="text-gradient">המוזיקה היא השפה שלי</span>
              </>
            }
            className="mb-8 sm:mb-8"
          />
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-stone-300">
            {ABOUT.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {ABOUT.strengths.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-stone-200">
                  <CircleCheckBig className="mt-0.5 size-5 shrink-0 text-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className={`${buttonStyles()} mt-10`}>
              <MessageCircle className="size-5" />
              בואו נדבר על החתונה שלכם
            </a>
          </Reveal>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ABOUT.achievements.map(({ icon: Icon, title, text, value, suffix }, i) => (
          <Reveal
            key={title}
            delay={i * 0.08}
            className="glass glow-ring group rounded-3xl p-6 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-20px_rgba(192,138,50,0.6)]"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-gold-600/25 to-gold-400/25 text-gold-400 ring-1 ring-white/10 transition group-hover:shadow-[0_0_24px_-4px_rgba(231,190,102,0.8)]">
              <Icon className="size-6" />
            </span>
            {value !== undefined && (
              <p className="mt-5 font-display text-3xl font-bold text-white">
                <Counter value={value} suffix={suffix} />
              </p>
            )}
            <h3 className={value !== undefined ? 'mt-1 text-lg font-bold' : 'mt-5 text-xl font-bold'}>{title}</h3>
            <p className="mt-1.5 text-sm text-stone-400">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
