import { ArrowLeft, CircleCheckBig } from 'lucide-react'
import { SERVICES, type Service } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

export function Services() {
  return (
    <Section id="services" titleId="services-title" tone="raised">
      <SectionHeading
        eyebrow="SERVICES"
        titleId="services-title"
        title={
          <>
            החתונה שלכם, <span className="text-gradient">רגע אחרי רגע</span>
          </>
        }
        subtitle="מהפגישה הראשונה ועד הסט האחרון – כל חלק בערב מקבל פסקול משלו, מתוכנן מראש ומותאם לרחבה בזמן אמת."
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {SERVICES.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.1} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const { icon: Icon } = service

  return (
    <article className="glass glow-ring group flex h-full flex-col overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(192,138,50,0.6)]">
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink-850 via-ink-850/40 to-transparent" />
          <span
            dir="ltr"
            className="absolute end-4 top-4 rounded-full bg-black/45 px-3 py-1 font-display text-[10px] tracking-widest text-stone-200 uppercase backdrop-blur"
          >
            {service.en}
          </span>
        </div>
        <span className="absolute start-5 bottom-0 grid size-13 translate-y-1/3 place-items-center rounded-2xl bg-linear-to-br from-gold-600 to-gold-400 shadow-[0_0_30px_-4px_rgba(231,190,102,0.8)] transition duration-500 group-hover:rotate-6">
          <Icon className="size-6 text-ink-950" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-9">
        <h3 className="text-xl font-bold">{service.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-stone-400">{service.description}</p>
        <ul className="mt-5 space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-stone-200">
              <CircleCheckBig className="mt-0.5 size-4 shrink-0 text-gold-400" />
              {feature}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-7 text-sm font-bold text-gold-400 transition-all hover:gap-3 hover:text-white"
        >
          לבדיקת תאריך
          <ArrowLeft className="size-4" />
        </a>
      </div>
    </article>
  )
}
