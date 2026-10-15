import type { LucideIcon } from 'lucide-react'
import { AudioLines, Disc3, Heart, MapPin, PartyPopper, Sparkles, Users } from 'lucide-react'

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
 * Photos live in /public/photos, converted to WebP from the original files Oded sent (Google Drive).
 * Instagram tiles (ig-*) mirror his posts; the gallery has a grid size (-sm) and a lightbox size (-lg).
 */
const photo = (file: string) => asset(`photos/${file}.webp`)

/* ---------- Brand & contact ---------- */

export const BRAND = {
  name: 'ODED EL',
  role: 'DJ & Producer',
  footerBlurb:
    'די ג׳יי ומפיק מוזיקלי לחתונות ואירועים מראשון לציון. מזרחית, מיינסטרים והפקות ורמיקסים ייחודיים – כדי שהרחבה שלכם לא תתרוקן לרגע.',
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
  lead: 'רחבה מלאה מהשיר הראשון ועד האחרון: סט שנבנה במיוחד בשבילכם – מזרחית, מיינסטרים ולהיטים – עם הפקות ורמיקסים ייחודיים שמרימים את הערב.',
  /** Promo reel (14s loop cut from Oded's Facebook reel), pinned behind the hero. */
  video: { webm: asset('video/hero.webm'), mp4: asset('video/hero.mp4'), poster: asset('video/hero-poster.webp') },
  highlights: [
    { icon: Heart, label: 'מתמחה בחתונות ואירועים' },
    { icon: Disc3, label: 'מזרחית · מיינסטרים · להיטים' },
    { icon: AudioLines, label: 'הפקות ורמיקסים ייחודיים' },
  ] satisfies { icon: LucideIcon; label: string }[],
}

export const MARQUEE = [
  'חתונות',
  'חינות',
  'בר/בת מצווה',
  'אירועים משפחתיים',
  'אירועים עסקיים',
  'מסיבות פרטיות',
  'מועדונים',
  'מזרחית',
  'מיינסטרים',
  'הפקות ייחודיות',
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
  { icon: PartyPopper, title: 'חינות ואירועים משפחתיים', text: 'חינות, בר ובת מצווה ושמחות משפחתיות' },
  { icon: Disc3, title: 'הפקות ייחודיות', text: 'הפקות ורמיקסים ייחודיים משלי' },
  { icon: MapPin, title: 'פריסה ארצית', text: 'מראשון לציון – מקיסריה ועד הרי ירושלים' },
]

export const ABOUT = {
  image: photo('about'),
  imageAlt: 'עודד מאחורי עמדת ODED EL מול מסך לדים עגול',
  /** Floating badges on the photo. */
  badge: { title: 'Weddings & Events', text: 'DJ ODED EL' },
  stat: { value: 10000, suffix: '+', label: 'האזנות בסאונדקלאוד' },
  paragraphs: [
    'אני עודד – DJ ומפיק מוזיקלי מראשון לציון, ומתמחה בחתונות ואירועים. בכל אירוע אני בונה את הסט מאפס, כך שירגיש בדיוק כמוכם: מזרחית שמקפיצה את הרחבה, מיינסטרים ולהיטים, ומה שאתם הכי אוהבים.',
    'לצד העמדה אני יוצר הפקות ורמיקסים ייחודיים – אותם תשמעו בסטים שלי. השנה ליוויתי חתונות במקומות כמו יונו קיסריה, קדם, דסטינו ואהובת הספן. והסוד האמיתי? קריאת הקהל – לדעת מה הרחבה צריכה עוד לפני שהיא יודעת.',
  ],
  strengths: [
    'קריאת קהל מדויקת – רחבה מלאה מהשיר הראשון',
    'סט מותאם אישית – מזרחית, מיינסטרים ומה שאתם אוהבים',
    'הפקות ורמיקסים ייחודיים שאני יוצר בעצמי',
    'פגישת תכנון אישית ובניית פלייליסט משותפת',
  ],
  achievements: ACHIEVEMENTS,
}

/* ---------- Services ---------- */

export const EVENT_TYPES = ['חתונה', 'חינה', 'בר/בת מצווה', 'אירוע משפחתי', 'אירוע עסקי', 'מסיבה', 'אחר'] as const
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
    features: ['ליווי מוזיקלי לקבלת פנים וחופה', 'פגישת תכנון ובניית פלייליסט', 'רמיקסים ייחודיים לכניסה ולסלואו'],
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
    id: 'family-business',
    icon: Users,
    title: 'אירועים משפחתיים ועסקיים',
    en: 'Family & Corporate',
    description: 'בר ובת מצווה, ימי הולדת, אירועי חברה וכנסים – אווירה מדויקת שמתאימה לקהל ולמקום.',
    features: ['התאמה מלאה לקהל ולאופי האירוע', 'מוזיקת רקע לקבלת פנים ורחבה מלאה בהמשך', 'סטים מיוחדים לרגעי השיא'],
    image: photo('service-family'),
    // Covers two event types, so its CTA doesn't preset one in the contact form.
  },
  {
    id: 'parties',
    icon: PartyPopper,
    title: 'מסיבות ומועדונים',
    en: 'Parties & Club',
    description: 'מסיבות פרטיות, ערבי מועדון ומסיבות פורים וקיץ – סטים מלאי אנרגיה עם הפקות ורמיקסים ייחודיים.',
    features: ['מיינסטרים, להיטים ומזרחית', 'הפקות ורמיקסים ייחודיים', 'אנרגיה עד הסט האחרון'],
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
  /** Public SoundCloud track / set URLs – Oded wants only the wedding set shown. */
  soundcloud: [{ title: 'סט חתונות מזרחית 2026', url: 'https://soundcloud.com/oqgfg47uk3ne/dj-oded-el-2026' }],
  platforms: [
    {
      key: 'soundcloud',
      label: 'האזינו בסאונדקלאוד',
      href: 'https://soundcloud.com/oqgfg47uk3ne/dj-oded-el-2026',
      color: '#FF5500',
    },
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
  venue?: string
  date?: string
  /** Only for reviews that actually came with a star rating (e.g. Google reviews). */
  rating?: 1 | 2 | 3 | 4 | 5
}

/**
 * Real messages couples sent Oded after their event (WhatsApp screenshots he shared), lightly trimmed –
 * stretched letters and repeated punctuation tidied, first names only. Add new ones the same way.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    names: 'נועם',
    role: 'כלה',
    quote:
      'אנחנו לא מספיקים להתאושש מכל הטירוף שהיה, אבל הייתי חייבת לכתוב לך שהיית פשוט מדהים, 10/100000000! אנשים לא הפסיקו לרקוד ולהחמיא עלייך כל האירוע וגם אחרי. היית פשוט מושלם בשבילנו, הבנת אותנו בדיוק ואת הווייב של האנשים… קלעת לכל הקהל שלנו בול וכיבדת את כולם. באמת שאתה מדהים והבחירה הכי טובה בעולם!',
    venue: 'דסטינו',
    date: 'יוני 2026',
  },
  {
    names: 'רחלי וגיא',
    role: 'חתן וכלה',
    quote:
      'מאיפה נתחיל בכלל? עשית לנו את האירוע הכי הכי שמח שראיתי בחיים! אתה מטורף ואתה בן אדם עם נשמה ענקית. השירות שלך, הסבלנות שלך והמוזיקה שלך! תודה תודה… נכנסת לנו ללב בקטע אחר, אוהבים אותך.',
  },
  {
    names: 'עינב',
    role: 'כלה',
    quote:
      'איזה איש מדהים אתה, הבחירה הכי טובה בעולם (!!) שליווית אותנו ביום שלנו. כל האורחים עפו עליך ועל המוזיקה המושלמת שלך. קיימת את כל הבקשות שלנו ופשוט כולם נהנו בכל רגע (דודה שלי אמרה לי וואו על השירים בקבלת פנים 😂). וכמובן שנמליץ עליך, יא תותח!',
    date: 'אוקטובר 2026',
  },
  {
    names: 'שלומי',
    role: 'חתן',
    quote: 'אח יקר שלי, איזה אירוע עשית לנו! הכל היה מדויק, מסודר, הכי שמח שיש בעולם. אין עלייך יא אח שלי, מספר 1 אתה!',
    date: 'אוקטובר 2026',
  },
]

/* ---------- Gallery ---------- */

export type GalleryImage = { src: string; full: string; alt: string; caption: string }

const galleryPhoto = (slug: string, alt: string, caption: string): GalleryImage => ({
  src: photo(`gallery/${slug}-sm`),
  full: photo(`gallery/${slug}-lg`),
  alt,
  caption,
})

export const GALLERY: GalleryImage[] = [
  galleryPhoto('7c2955f3', 'עודד בעמדת ODED EL מתחת למשולש ניאון כחול', 'מאחורי העמדה'),
  galleryPhoto('r6m30123', 'עודד בעמדה מול רחבה מלאה ונברשת גדולה', 'מול הרחבה'),
  galleryPhoto('img_0012', 'עודד עם חתן וכלה ליד החופה', 'הזוגות שלי'),
  galleryPhoto('img_8736', 'אולם עם עמודי לדים ענקיים, לייזרים ועמדת ODED EL', 'הפקה גדולה'),
  galleryPhoto('cr1_0017', 'קהל עם ידיים באוויר מול עמדת ODED EL בתאורה ורודה', 'שיא הערב'),
  galleryPhoto('img_8917', 'עודד מגבו מול קהל ענק ותאורת לייזרים', 'מול הקהל'),
  galleryPhoto('img_0247', 'עודד עם חתן וכלה בגן אירועים', 'יום החתונה'),
  galleryPhoto('img_7251', 'עודד עם חתן וכלה תחת תקרת לדים', 'רגע עם הזוג'),
  galleryPhoto('img_8795', 'כיפת לדים מעל רחבה רוקדת', 'על הרחבה'),
  galleryPhoto('img_0384', 'טקס חופה בשקיעה על גג', 'חופת שקיעה'),
  galleryPhoto('img_9887', 'אולם אירועים עם נברשת ולייזרים סגולים', 'אווירה'),
  galleryPhoto('img_0131', 'עודד עם חתן וכלה במתחם אירועים פתוח', 'עוד זוג מאושר'),
  galleryPhoto('img_1216', 'זוג בפגישת תכנון עם עודד, מחזיקים את תיק ODED EL', 'פגישת תכנון'),
  galleryPhoto('img_9892', 'נברשת ומשולשי ניאון מעל הרחבה', 'הבמה מוכנה'),
  galleryPhoto('img_0119', 'זוג בפגישת היכרות עם עודד', 'פגישת היכרות'),
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
