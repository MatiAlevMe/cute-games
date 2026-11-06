import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ThemeShell } from '../../src/components/ThemeShell'
import { contrastRatio, defaultThemePalettes } from '../../src/content/theme'
import type { ThemeConfig } from '../../src/content/types'

describe('temas visuales', () => {
  it.each([
    ['celeste', '#eaf7ff'],
    ['alternativo', '#f4f1ff'],
  ] as const)('renderiza el tema %s y su paleta predeterminada', (id, background) => {
    const theme: ThemeConfig = { id }
    const markup = renderToStaticMarkup(
      <ThemeShell theme={theme}>
        <main>Contenido</main>
      </ThemeShell>,
    )

    expect(markup).toContain(`class="app-shell theme-${id}"`)
    expect(markup).toContain(`--color-background:${background}`)
    expect(markup).toContain('/assets/theme/fallback-wallpaper.svg')
    expect(markup).toContain('/assets/theme/fallback-robot.svg')
  })

  it('usa el asset local configurable desde el contenido', () => {
    const markup = renderToStaticMarkup(
      <ThemeShell
        theme={{
          id: 'celeste',
          wallpaper: {
            src: '/assets/theme/propio.svg',
            alt: 'Cielo ilustrado',
          },
        }}
      >
        <main>Contenido</main>
      </ThemeShell>,
    )

    expect(markup).toContain('src="/assets/theme/propio.svg"')
    expect(markup).toContain('alt="Cielo ilustrado"')
  })

  it('mantiene contraste AA para texto y 3:1 para los elementos fuertes de ambas paletas', () => {
    for (const palette of Object.values(defaultThemePalettes)) {
      for (const surface of [palette.background, palette.surface]) {
        expect(contrastRatio(palette.text, surface)).toBeGreaterThanOrEqual(4.5)
        expect(contrastRatio(palette.primaryStrong, surface)).toBeGreaterThanOrEqual(3)
      }
    }
  })
})
