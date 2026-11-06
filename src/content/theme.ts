import type { ThemeConfig, ThemePalette } from './types'

export const defaultThemePalettes: Record<ThemeConfig['id'], ThemePalette> = {
  celeste: {
    background: '#eaf7ff',
    surface: '#ffffff',
    primary: '#8bd3f2',
    primaryStrong: '#075985',
    accent: '#c2417a',
    text: '#163247',
  },
  alternativo: {
    background: '#f4f1ff',
    surface: '#ffffff',
    primary: '#c8b6ff',
    primaryStrong: '#51408a',
    accent: '#9b3b68',
    text: '#29213d',
  },
}

export function resolveThemePalette(theme: ThemeConfig): ThemePalette {
  return { ...defaultThemePalettes[theme.id], ...theme.palette }
}

export function contrastRatio(first: string, second: string): number {
  const firstLuminance = relativeLuminance(first)
  const secondLuminance = relativeLuminance(second)

  if (firstLuminance === null || secondLuminance === null) {
    return 0
  }

  const lighter = Math.max(firstLuminance, secondLuminance)
  const darker = Math.min(firstLuminance, secondLuminance)
  return (lighter + 0.05) / (darker + 0.05)
}

function relativeLuminance(color: string): number | null {
  if (!/^#[\da-f]{6}$/i.test(color)) {
    return null
  }

  const channels = [1, 3, 5].map((offset) => {
    const channel = Number.parseInt(color.slice(offset, offset + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}
