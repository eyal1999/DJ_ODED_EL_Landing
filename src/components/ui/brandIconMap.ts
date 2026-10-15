import type { JSX } from 'react'
import type { SocialKey } from '../../data/site'
import {
  FacebookIcon,
  InstagramIcon,
  SoundCloudIcon,
  SpotifyIcon,
  TikTokIcon,
  YouTubeIcon,
  type IconProps,
} from './BrandIcons'

export const BRAND_ICONS: Record<SocialKey, (props: IconProps) => JSX.Element> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
  spotify: SpotifyIcon,
  soundcloud: SoundCloudIcon,
  tiktok: TikTokIcon,
}
