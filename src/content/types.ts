import type { GiftDefinition } from '../gifts/types'

export type ThemeId = 'celeste' | 'alternativo'

export interface ThemeAsset {
  src: string
  alt: string
  decorative?: boolean
}

export interface ThemePalette {
  background: string
  surface: string
  primary: string
  primaryStrong: string
  accent: string
  text: string
}

export interface ThemeConfig {
  id: ThemeId
  palette?: ThemePalette
  wallpaper?: ThemeAsset
  mascot?: ThemeAsset
}

export interface SiteConfig {
  recipient: string
  welcome: string
  locale: string
  theme: ThemeConfig
}

export interface Occasion {
  id: string
  /** Fecha calendario `YYYY-MM-DD`, sin conversión a UTC. */
  date: string
  title: string
  welcome?: string
  gifts: readonly GiftDefinition[]
}

export interface ContentBundle {
  site: SiteConfig
  occasions: readonly Occasion[]
}
