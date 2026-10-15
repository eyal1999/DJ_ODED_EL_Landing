import type { LucideIcon } from 'lucide-react'
import { AudioLines, Disc3, Gem, Heart, MapPin, PartyPopper, Sparkles } from 'lucide-react'

/* =================================================================
 * All site content lives in this file.
 * Replace texts, photos, links and media IDs here – the components
 * only read from these objects.
 *
 * Values marked "TODO" are placeholders that must be replaced with
 * the client's real details before going live.
 * ================================================================= */

/** Site root – '/' locally, '/DJ_ODED_EL_Landing/' on GitHub Pages (Vite `base`). */
export const HOME_URL = import.meta.env.BASE_URL

/** URL of a file in /public, e.g. asset('photos/about.webp'). Works under any deploy base path. */
export const asset = (path: string) => `${HOME_URL}${path}`

/**
 * Photos live in /public/photos. The current set comes from Oded's public Instagram / SoundCloud
 * (web resolution, ~640px) – swap in his original high-res files under the same names when available.
 */
const photo = (file: string) => asset(`photos/${file}.webp`)

/* ---------- Brand & contact ---------- */

export const BRAND = {
  name: 'ODED EL',
  role: 'DJ & Producer',
  footerBlurb:
    'די ג׳יי ומפיק מוזיקלי לחתונות ואירועים מתל אביב. מזרחית, מיינסטרים ומאשאפים מקוריים – כדי שהרחבה שלכם לא תתרוקן לרגע.',
}

export const CONTACT = {
  phoneDisplay: '054-625-5892',
  phoneHref: 'tel:+972546255892',
  /** International format, digits only (972 + number without the leading 0). */
  whatsappNumber: '972546255892',
  whatsappGreeting: 'היי! הגעתי מהאתר ואשמח לבדוק זמינות לאירוע 🎶',
  email: 'dj.odedelle@gmail.com',
  serviceArea: 'פריסה ארצית',
  responseTime: 'מענה מהיר בוואטסאפ ובטלפון',
  /**
   * Optional POST endpoint for the contact form (Formspree, Web3Forms, your own API).
   * Leave empty and the form opens WhatsApp with all the details pre-filled instead.
   */
  formEndpoint: '',
}

export type SocialKey = 'instagram' | 'facebook' | 'youtube' | 'spotify' | 'soundcloud' | 'tiktok'

export const SOCIALS: { key: SocialKey; label: string; href: string }[] = [
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/djodedel/' },
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/djodedEL' },
  { key: 'soundcloud', label: 'SoundCloud', href: 'https://soundcloud.com/oqgfg47uk3ne' },
  // Add YouTube / Spotify / TikTok here once the profiles exist – the icons are ready.
]

/* ---------- Navigation ---------- */

export type SectionId = 'about' | 'services' | 'media' | 'testimonials' | 'gallery' | 'contact'

const NAV: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'אודות' },
  { id: 'services', label: 'שירותים' },
  { id: 'media', label: 'מוזיקה וסרטונים' },
  { id: 'testimonials', label: 'המלצות' },
  { id: 'gallery', label: 'גלריה' },
  { id: 'contact', label: 'צור קשר' },
]

/* ---------- Hero ---------- */

export const HERO = {
  availability: 'תאריכים פנויים לעונת 2027 · בדקו זמינות',
  titleTop: 'האמנות של המוזיקה',
  titleBottom: 'לאירוע שלכם',
  lead: 'רחבה מלאה מהשיר הראשון ועד האחרון: סט שנבנה במיוחד בשבילכם – מזרחית, מיינסטרים ולהיטים – עם מאשאפים ורמיקסים מקוריים שמרימים את הערב.',
  /** Promo reel (14s loop cut from Oded's Facebook reel), pinned behind the hero. */
  video: { webm: asset('video/hero.webm'), mp4: asset('video/hero.mp4'), poster: asset('video/hero-poster.webp') },
  highlights: [
    { icon: Heart, label: 'מתמחה בחתונות ואירועים' },
    { icon: Disc3, label: 'מזרחית · מיינסטרים · להיטים' },
    { icon: AudioLines, label: 'מאשאפים ורמיקסים מקוריים' },
  ] satisfies { icon: LucideIcon; label: string }[],
}

export const MARQUEE = [
  'חתונות',
  'חינות',
  'בר/בת מצווה',
  'אירועים משפחתיים',
  'מסיבות פרטיות',
  'מועדונים',
  'מזרחית',
  'מיינסטרים',
  'מאשאפים',
  'רמיקסים מקוריים',
]

/* ---------- About ---------- */

export type Achievement = {
  icon: LucideIcon
  title: string
  text: string
  /** When set, renders an animated counter above the title. */
  value?: number
  suffix?: string
}

const ACHIEVEMENTS: Achievement[] = [
  { icon: Heart, title: 'חתונות ואירועים', text: 'ההתמחות שלי – מהחופה ועד הסט האחרון' },
  { icon: PartyPopper, title: 'חינות ומסיבות', text: 'חינות, אירועים משפחתיים, מועדונים ומסיבות' },
  { icon: Disc3, title: 'הפקות מקוריות', text: 'מאשאפים ורמיקסים בסאונדקלאוד' },
  { icon: MapPin, title: 'פריסה ארצית', text: 'מתל אביב – מקיסריה ועד הרי ירושלים' },
]

export const ABOUT = {
  image: photo('about'),
  imageAlt: 'עודד מאחורי עמדת ODED EL מול מסך לדים עגול',
  /** Floating badges on the photo. */
  badge: { title: 'Weddings & Events', text: 'DJ ODED EL' },
  stat: { value: 10000, suffix: '+', label: 'האזנות לסטים שלי בסאונדקלאוד' },
  paragraphs: [
    'אני עודד – DJ ומפיק מוזיקלי מתל אביב, ומתמחה בחתונות ואירועים. בכל אירוע אני בונה את הסט מאפס, כך שירגיש בדיוק כמוכם: מזרחית שמקפיצה את הרחבה, מיינסטרים ולהיטים, ומה שאתם הכי אוהבים.',
    'לצד העמדה אני מפיק מאשאפים ורמיקסים משלי – אותם תשמעו בסטים ובסאונדקלאוד. השנה ליוויתי חתונות במקומות כמו יונו קיסריה, קדם, דסטינו ואהובת הספן. והסוד האמיתי? קריאת הקהל – לדעת מה הרחבה צריכה עוד לפני שהיא יודעת.',
  ],
  strengths: [
    'קריאת קהל מדויקת – רחבה מלאה מהשיר הראשון',
    'סט מותאם אישית – מזרחית, מיינסטרים ומה שאתם אוהבים',
    'מאשאפים ורמיקסים מקוריים שאני מפיק בעצמי',
    'פגישת תכנון אישית ובניית פלייליסט משותפת',
  ],
  achievements: ACHIEVEMENTS,
}

/* ---------- Services ---------- */

export const EVENT_TYPES = ['חתונה', 'חינה', 'בר/בת מצווה', 'אירוע פרטי', 'מסיבה', 'אחר'] as const
export type EventType = (typeof EVENT_TYPES)[number]

export type Service = {
  id: string
  icon: LucideIcon
  title: string
  en: string
  description: string
  features: string[]
  image: string
  /** Pre-selects this type in the contact form when the card's CTA is clicked. */
  eventType?: EventType
}

export const SERVICES: Service[] = [
  {
    id: 'weddings',
    icon: Heart,
    title: 'חתונות',
    en: 'Weddings',
    description:
      'מקבלת הפנים ועד הסט האחרון – ליווי מוזיקלי מלא שנבנה יחד אתכם, עם רגעים שאף אחד לא ישכח.',
    features: ['ליווי מוזיקלי לקבלת פנים וחופה', 'פגישת תכנון ובניית פלייליסט', 'מאשאפים אישיים לכניסה ולסלואו'],
    image: photo('service-weddings'),
    eventType: 'חתונה',
  },
  {
    id: 'henna',
    icon: Sparkles,
    title: 'חינות',
    en: 'Henna',
    description: 'ערב חינה שמח ומקפיץ – מזרחית ושמחה שמחברות את כל המשפחה לרחבה.',
    features: ['סט מזרחית שמח ומקפיץ', 'התאמה למסורת ולמשפחה', 'רחבה מלאה לאורך כל הערב'],
    image: photo('service-henna'),
    eventType: 'חינה',
  },
  {
    id: 'family',
    icon: Gem,
    title: 'אירועים משפחתיים ופרטיים',
    en: 'Family & Private',
    description: 'בר ובת מצווה, ימי הולדת ואירועים פרטיים – אווירה מדויקת שמתאימה לקהל ולמקום.',
    features: ['התאמה מלאה לגילאים ולסגנונות', 'סט שמחבר בין הדורות על הרחבה', 'סטים מיוחדים לרגעי השיא'],
    image: photo('service-family'),
    eventType: 'בר/בת מצווה',
  },
  {
    id: 'parties',
    icon: PartyPopper,
    title: 'מסיבות ומועדונים',
    en: 'Parties & Club',
    description: 'מסיבות פרטיות, ערבי מועדון ומסיבות פורים וקיץ – סטים מלאי אנרגיה עם מאשאפים ורמיקסים מקוריים.',
    features: ['מיינסטרים, להיטים ומזרחית', 'מאשאפים ורמיקסים מקוריים', 'אנרגיה עד הסט האחרון'],
    image: photo('service-parties'),
    eventType: 'מסיבה',
  },
]

/* ---------- Music & video ---------- */

export type VideoCategory = 'wedding' | 'club' | 'live'

export const VIDEO_FILTERS: { id: VideoCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'הכל' },
  { id: 'wedding', label: 'אפטרמוביז מחתונות' },
  { id: 'club', label: 'מועדונים ופסטיבלים' },
  { id: 'live', label: 'לייב שואו' },
]

export type Video = {
  id: string
  provider: 'youtube' | 'vimeo'
  /** YouTube: the part after "watch?v=". Vimeo: the number in the video URL. */
  videoId: string
  title: string
  subtitle: string
  category: VideoCategory
  /** Optional custom cover. YouTube videos fall back to their own thumbnail. */
  cover?: string
}

/**
 * YouTube / Vimeo videos. While this list is empty the video gallery is hidden and the
 * section shows music only. Example:
 * { id: 'wedding-yono', provider: 'youtube', videoId: 'dQw4w9WgXcQ', title: 'חתונה ביונו קיסריה',
 *   subtitle: 'Wedding Highlights', category: 'wedding' },
 */
export const VIDEOS: Video[] = []

export type SpotifyEmbedType = 'artist' | 'album' | 'playlist' | 'track'

export const MUSIC = {
  /** Optional Spotify artist / playlist embed, e.g. { type: 'artist', id: '…', title: 'הפלייליסט הרשמי' }. */
  spotify: null as { type: SpotifyEmbedType; id: string; title: string } | null,
  /** Public SoundCloud track / set URLs. */
  soundcloud: [
    { title: 'סט חתונות מזרחית 2026', url: 'https://soundcloud.com/oqgfg47uk3ne/dj-oded-el-2026' },
    {
      title: 'Nanana x Freed From Desire (Mashup)',
      url: 'https://soundcloud.com/oqgfg47uk3ne/peggy-gou-it-goes-like-nanana-x-freed-from-desire-oded-elle-mashup',
    },
    {
      title: 'אייל גולן – עיר נמל & טרפטוני (עם שרון סלמה)',
      url: 'https://soundcloud.com/oqgfg47uk3ne/eyal-golan-air-namal-beach-of-traptoni-oded-elle-sharon-salama',
    },
  ],
  platforms: [
    { key: 'soundcloud', label: 'האזינו בסאונדקלאוד', href: 'https://soundcloud.com/oqgfg47uk3ne', color: '#FF5500' },
  ] satisfies { key: SocialKey; label: string; href: string; color: string }[],
}

/* ---------- Instagram ---------- */

export type FeedWidgetProvider = 'elfsight' | 'juicer'

export type InstagramPost = {
  kind: 'reel' | 'post'
  image: string
  caption: string
  /** The code from the post URL (instagram.com/reel/<shortcode>/). When set, the tile opens the real embed. */
  shortcode?: string
}

export const INSTAGRAM = {
  handle: '@djodedel',
  profileUrl: 'https://www.instagram.com/djodedel/',
  /**
   * Live feed widget. Create a free Instagram feed on Elfsight or Juicer, then set
   * provider + the widget / feed ID here and the grid below is replaced by the live feed.
   */
  widget: { provider: null as FeedWidgetProvider | null, id: '' },
  posts: [
    { kind: 'post', shortcode: 'DdRnyDXDUMj', image: photo('ig-DdRnyDXDUMj'), caption: 'רחבה רוקדת באורות אדומים וכחולים' },
    { kind: 'post', shortcode: 'Dbghp8ONqBG', image: photo('ig-Dbghp8ONqBG'), caption: 'מאחורי העמדה מול מסך הלדים' },
    { kind: 'post', shortcode: 'DbgeqSHtg4-', image: photo('ig-DbgeqSHtg4-'), caption: 'סט לילה באירוע חוץ' },
    { kind: 'reel', shortcode: 'DaYehdgNQ2L', image: photo('ig-DaYehdgNQ2L'), caption: 'רגעים מחתונה' },
    { kind: 'post', shortcode: 'DaP5ztwDYt_', image: photo('ig-DaP5ztwDYt_'), caption: 'רוקדים על הבמה ליד העמדה' },
    { kind: 'post', shortcode: 'DaK1g4qDUn4', image: photo('ig-DaK1g4qDUn4'), caption: 'רחבת ריקודים מלאה באולם' },
  ] satisfies InstagramPost[],
}

/* ---------- Testimonials ---------- */

export type Testimonial = {
  names: string
  role: string
  quote: string
  venue: string
  date: string
  rating: 1 | 2 | 3 | 4 | 5
}

/**
 * Real client reviews only. While this list is empty the section and its menu link stay hidden.
 * Oded keeps his recommendations in the "המלצות" story highlight on Instagram – transcribe them
 * here (with the couple's OK), e.g.:
 * { names: 'נועה ואיתי', role: 'חתן וכלה', quote: '…', venue: 'יונו קיסריה', date: 'יוני 2026', rating: 5 },
 */
export const TESTIMONIALS: Testimonial[] = []

/* ---------- Gallery ---------- */

export type GalleryImage = { src: string; full: string; alt: string; caption: string }

const galleryPhoto = (code: string, alt: string, caption: string): GalleryImage => ({
  src: photo(`gallery-${code}`),
  full: photo(`gallery-${code}`),
  alt,
  caption,
})

export const GALLERY: GalleryImage[] = [
  galleryPhoto('DVN5kbDDWKJ', 'עודד מאחורי עמדת ODED EL, בשחור-לבן', 'מאחורי העמדה'),
  galleryPhoto('DaK1g4qDUn4', 'רחבת ריקודים מלאה באולם עם נברשת ותאורת במה', 'הרחבה מלאה'),
  galleryPhoto('DYUcpeoMPax', 'עודד עם זוג מתחתן ליד החופה', 'הזוגות שלי'),
  galleryPhoto('Dbghp8ONqBG', 'עודד בעמדת ODED EL מול מסך לדים עגול', 'סט חתונה'),
  galleryPhoto('DaP5ztwDYt_', 'רוקדים על הבמה סביב עמדת ODED EL', 'שיא הערב'),
  galleryPhoto('DZIJWamjcRi', 'עודד מגבו מול קהל ענק ותאורת לייזרים', 'מול הקהל'),
  galleryPhoto('DYXaLhPtRME', 'עודד עם זוג מתחתן בחופה על גג מול הים', 'חופה מול הים'),
  galleryPhoto('DbgeqSHtg4-', 'עודד מנגן בלילה באירוע חוץ', 'אירוע חוץ'),
  galleryPhoto('DdRnyDXDUMj', 'רחבה רוקדת באורות אדומים וכחולים', 'על הרחבה'),
  galleryPhoto('DXPWzm1DedH', 'עודד עם זוג מתחתן בגן אירועים', 'יום החתונה'),
  galleryPhoto('DaYehdgNQ2L', 'עודד בעמדת ODED EL בתאורת ניאון כחולה', 'בעמדה'),
  galleryPhoto('DbghDAVjYk3', 'עמדת ODED EL מוארת בלילה', 'ODED EL'),
]

/* ---------- Legal pages ---------- */

export const LEGAL = {
  /** Who operates the site, as named in the policies – change to the registered business name if different. */
  owner: 'ODED EL',
  /** "Last updated" date shown on the policy pages – bump it whenever their text changes. */
  updated: '15 באוקטובר 2026',
  /** Accessibility coordinator named in the accessibility statement (Israeli accessibility regulations, reg. 35). */
  accessibilityContact: 'עודד',
  pages: [
    { id: 'privacy', href: asset('privacy.html'), label: 'מדיניות פרטיות' },
    { id: 'terms', href: asset('terms.html'), label: 'תנאי שימוש' },
    { id: 'accessibility', href: asset('accessibility.html'), label: 'הצהרת נגישות' },
  ],
} as const

/* ---------- Derived ---------- */

/** Sections without real content yet drop out of the menus automatically. */
export const NAV_ITEMS = NAV.filter((item) => item.id !== 'testimonials' || TESTIMONIALS.length > 0).map((item) =>
  item.id === 'media' && VIDEOS.length === 0 ? { ...item, label: 'מוזיקה' } : item,
)
