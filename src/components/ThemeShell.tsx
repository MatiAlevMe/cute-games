import type { CSSProperties, ReactNode } from 'react'
import { resolveThemePalette } from '../content/theme'
import type { ThemeConfig } from '../content/types'
import { ThemeArtwork } from './ThemeArtwork'

export function ThemeShell({ theme, children }: { theme: ThemeConfig; children: ReactNode }) {
  const palette = resolveThemePalette(theme)
  const style = {
    '--color-background': palette.background,
    '--color-surface': palette.surface,
    '--color-primary': palette.primary,
    '--color-primary-strong': palette.primaryStrong,
    '--color-accent': palette.accent,
    '--color-text': palette.text,
  } as CSSProperties

  return (
    <div className={`app-shell theme-${theme.id}`} style={style}>
      <ThemeArtwork wallpaper={theme.wallpaper} mascot={theme.mascot} />
      {children}
    </div>
  )
}
