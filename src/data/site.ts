import type { LucideIcon } from 'lucide-react'
import { AudioLines, Disc3, Heart, HeartHandshake, ListMusic, MapPin, Sparkles } from 'lucide-react'

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
    'די ג׳יי ומפיק מוזיקלי לחתונות מראשון לציון. מזרחית, מיינסטרים והפקות ורמיקסים ייחודיים – כדי שהרחבה שלכם לא תתרוקן לרגע.',
}

export const CONTACT = {
  phoneDisplay: '054-625-5892',
  phoneHref: 'tel:+972546255892',
  /** International format, digits only (972 + number without the leading 0). */
  whatsappNumber: '972546255892',
  whatsappGreeting: 'היי! הגעתי מהאתר ואשמח לבדוק זמינות לחתונה שלנו 🎶',
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
  titleBottom: 'לחתונה שלכם',
  lead: 'רחבה מלאה מהשיר הראשון ועד האחרון: סט שנבנה במיוחד בשבילכם – מזרחית, מיינסטרים ולהיטים – עם הפקות ורמיקסים ייחודיים שמרימים את הערב.',
  /** Promo reel (14s loop cut from Oded's Facebook reel), pinned behind the hero. */
  video: { webm: asset('video/hero.webm'), mp4: asset('video/hero.mp4'), poster: asset('video/hero-poster.webp') },
  highlights: [
    { icon: Heart, label: 'מתמחה בחתונות' },
    { icon: Disc3, label: 'מזרחית · מיינסטרים · להיטים' },
    { icon: AudioLines, label: 'הפקות ורמיקסים ייחודיים' },
  ] satisfies { icon: LucideIcon; label: string }[],
}

/** Weddings only – Oded asked that the site not mention any other kind of event. */
export const MARQUEE = [
  'חתונות',
  'קבלת פנים',
  'חופה',
  'כניסה לרחבה',
  'סלואו',
  'מזרחית',
  'מיינסטרים',
  'הפקות ייחודיות',
  'רמיקסים מקוריים',
  'רחבה מלאה',
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
  { icon: Heart, title: 'חתונות', text: 'ההתמחות שלי – מהחופה ועד הסט האחרון' },
  { icon: ListMusic, title: 'פלייליסט אישי', text: 'בונים יחד סט שמתאים לכם ולאורחים שלכם' },
  { icon: Disc3, title: 'הפקות ייחודיות', text: 'הפקות ורמיקסים ייחודיים משלי' },
  { icon: MapPin, title: 'פריסה ארצית', text: 'מראשון לציון – לחתונות בכל הארץ' },
]

export const ABOUT = {
  /** Oded asked for this one first: him with a couple at the decks (also the reason it left the gallery). */
  image: photo('about'),
  imageAlt: 'עודד עם חתן וכלה בעמדת התקלוט, מתחת לתקרת לדים',
  /** Floating badges on the photo. */
  badge: { title: 'Wedding DJ', text: 'ODED EL' },
  stat: { value: 10000, suffix: '+', label: 'האזנות בסאונדקלאוד' },
  paragraphs: [
    'אני עודד – DJ ומפיק מוזיקלי מראשון לציון, ומתמחה בחתונות. בכל חתונה אני בונה את הסט מאפס, כך שירגיש בדיוק כמוכם: מזרחית שמקפיצה את הרחבה, מיינסטרים ולהיטים, ומה שאתם הכי אוהבים.',
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

export type Service = {
  id: string
  icon: LucideIcon
  title: string
  en: string
  description: string
  features: string[]
  image: string
}

/** The wedding, in the order it happens – from the planning meeting to the last set. */
export const SERVICES: Service[] = [
  {
    id: 'planning',
    icon: ListMusic,
    title: 'פגישת תכנון',
    en: 'Planning',
    description: 'לפני החתונה נפגשים, מכירים ובונים יחד את הסט – השירים שלכם, הסגנון שלכם והקהל שלכם.',
    features: ['פגישת היכרות ותכנון אישית', 'בניית פלייליסט משותפת', 'התאמה לאורחים ולמשפחה'],
    image: photo('service-planning'),
  },
  {
    id: 'ceremony',
    icon: HeartHandshake,
    title: 'קבלת פנים וחופה',
    en: 'Reception & Chuppah',
    description: 'מוזיקה שמקבלת את האורחים באווירה הנכונה, וליווי מוזיקלי לרגעים המרגשים של החופה.',
    features: ['מוזיקה לקבלת הפנים', 'ליווי מוזיקלי מלא לחופה', 'השירים שבחרתם לרגעים החשובים'],
    image: photo('service-ceremony'),
  },
  {
    id: 'entrance',
    icon: Sparkles,
    title: 'כניסה לרחבה וסלואו',
    en: 'Entrance & Slow Dance',
    description: 'הרגעים שכולם מצלמים – עם רמיקסים ייחודיים משלי שהופכים את הכניסה שלכם לרחבה לשיא של הערב.',
    features: ['רמיקסים ייחודיים לכניסה ולסלואו', 'בחירת השירים יחד איתכם', 'אנרגיה שמעלה את כל האולם לרחבה'],
    image: photo('service-entrance'),
  },
  {
    id: 'dancefloor',
    icon: Disc3,
    title: 'הרחבה',
    en: 'Dance Floor',
    description: 'מזרחית, מיינסטרים ולהיטים – סט שנבנה בשבילכם ומותאם לרחבה בזמן אמת, עד השיר האחרון.',
    features: ['קריאת קהל מדויקת', 'מזרחית · מיינסטרים · להיטים', 'הפקות ורמיקסים ייחודיים'],
    image: photo('service-dancefloor'),
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
  /** The couple's original WhatsApp screenshot (shown instead of the text, which becomes its alt text). */
  screenshot?: { src: string; width: number; height: number }
}

/**
 * Real messages couples sent Oded after their wedding. The site shows the WhatsApp screenshots he shared
 * (public/photos/reviews – cropped, profile pictures blurred, one surname and one bank-transfer receipt removed);
 * `quote` is a lightly tidied transcription used as the image's alt text for screen readers.
 * The order keeps the two columns balanced (see Testimonials).
 */
const review = (name: string, height: number) => ({ src: photo(`reviews/${name}`), width: 900, height })

export const TESTIMONIALS: Testimonial[] = [
  {
    names: 'נועם',
    role: 'כלה',
    quote:
      'אנחנו לא מספיקים להתאושש מכל הטירוף שהיה, אבל הייתי חייבת לכתוב לך שהיית פשוט מדהים, 10/100000000! אנשים לא הפסיקו לרקוד ולהחמיא עלייך כל האירוע וגם אחרי. היית פשוט מושלם בשבילנו, הבנת אותנו בדיוק ואת הווייב של האנשים… קלעת לכל הקהל שלנו בול וכיבדת את כולם. באמת שאתה מדהים והבחירה הכי טובה בעולם!',
    venue: 'דסטינו',
    date: 'יוני 2026',
    screenshot: review('noam', 1677),
  },
  {
    names: 'רחלי וגיא',
    role: 'חתן וכלה',
    quote:
      'מאיפה נתחיל בכלל? עשית לנו את האירוע הכי הכי שמח שראיתי בחיים! אתה מטורף ואתה בן אדם עם נשמה ענקית. השירות שלך, הסבלנות שלך והמוזיקה שלך! תודה תודה… נכנסת לנו ללב בקטע אחר, אוהבים אותך.',
    screenshot: review('racheli', 967),
  },
  {
    names: 'עינב',
    role: 'כלה',
    quote:
      'איזה איש מדהים אתה, הבחירה הכי טובה בעולם (!!) שליווית אותנו ביום שלנו. כל האורחים עפו עליך ועל המוזיקה המושלמת שלך. קיימת את כל הבקשות שלנו ופשוט כולם נהנו בכל רגע (דודה שלי אמרה לי וואו על השירים בקבלת פנים 😂). וכמובן שנמליץ עליך, יא תותח!',
    date: 'אוקטובר 2026',
    screenshot: review('einav', 967),
  },
  {
    names: 'מרדכי וקארין',
    role: 'חתן וכלה',
    quote:
      'עודד היקר, תודה רבה על אירוע לפנתאון! עשית לנו באמת שמח וידעת לקרוא את הרחבה כמו שצריך. אתה אחלה גבר וממליצים לזוגות הבאים לבחור בך – אתה אחד מהספקים שבאמת היינו מבסוטים עליהם ביום הגדול שלנו. אוהבים אותך, מרדכי וקארין!',
    screenshot: review('mordechai', 691),
  },
  {
    names: 'אייל',
    role: 'חתן',
    quote:
      'בוקר טוב אח שלי. היה אירוע מטורף!! תודה רבה לך שהשקעת בנו, וממש ישבת והכנת שירים שמתאימים לנו ולסובבים אותנו. היה כיף גדול.',
    date: 'אוגוסט 2026',
    screenshot: review('eyal', 960),
  },
  {
    names: 'שחר',
    role: 'כלה',
    quote:
      'אחרי שהתאוששנו קצת – תודה רבה לך יא אלוף, היה לנו ערב מושלם! לא רציתי לזוז מהרחבה לשנייה, ואפילו יהודה רקד, הצלחנו חחח. תודה רבה יא תותח!',
    date: 'אוגוסט 2026',
    screenshot: review('shachar', 971),
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

/** Order chosen so the masonry columns end at about the same height at 2, 3 and 4 columns. */
export const GALLERY: GalleryImage[] = [
  galleryPhoto('7c2955f3', 'עודד בעמדת ODED EL מתחת למשולש ניאון כחול', 'מאחורי העמדה'),
  galleryPhoto('img_0131', 'עודד עם חתן וכלה במתחם אירועים פתוח', 'עוד זוג מאושר'),
  galleryPhoto('img_9892', 'נברשת ומשולשי ניאון מעל הרחבה', 'הבמה מוכנה'),
  galleryPhoto('oded-wheel', 'עודד מאחורי עמדת ODED EL מול מסך לדים עגול', 'בעמדה'),
  galleryPhoto('img_8917', 'עודד מגבו מול קהל ענק ותאורת לייזרים', 'מול הקהל'),
  galleryPhoto('img_9887', 'אולם אירועים עם נברשת ולייזרים סגולים', 'אווירה'),
  galleryPhoto('r6m30249', 'אולם חתונה מלא עם נברשת ענקית וטבעות ניאון', 'רחבה מלאה'),
  galleryPhoto('img_8795', 'כיפת לדים מעל רחבה רוקדת', 'על הרחבה'),
  galleryPhoto('img_1216', 'זוג בפגישת תכנון עם עודד, מחזיקים את תיק ODED EL', 'פגישת תכנון'),
  galleryPhoto('img_8736', 'אולם עם עמודי לדים ענקיים, לייזרים ועמדת ODED EL', 'הפקה גדולה'),
  galleryPhoto('cr1_0017', 'קהל עם ידיים באוויר מול עמדת ODED EL בתאורה ורודה', 'שיא הערב'),
  galleryPhoto('r6m30123', 'עודד בעמדה מול רחבה מלאה ונברשת גדולה', 'מול הרחבה'),
  galleryPhoto('img_0247', 'עודד עם חתן וכלה בגן אירועים', 'יום החתונה'),
]

/* ---------- Legal pages ---------- */

export const LEGAL = {
  /** Who operates the site, as named in the policies – change to the registered business name if different. */
  owner: 'ODED EL',
  /** "Last updated" date shown on the policy pages – bump it whenever their text changes. */
  updated: '26 באוקטובר 2026',
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
