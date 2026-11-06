import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { GiftMenu } from '../../src/components/GiftMenu'
import { formatGiftDate } from '../../src/content/date'
import type { Occasion } from '../../src/content/types'
import { letterGift, makeBundle, poemGift, ringGift } from './fixtures'

function renderMenu(occasions: readonly Occasion[]) {
  const bundle = makeBundle({ occasions })

  return renderToStaticMarkup(
    <GiftMenu
      occasions={bundle.occasions}
      recipient={bundle.site.recipient}
      siteWelcome={bundle.site.welcome}
      locale={bundle.site.locale}
    />,
  )
}

describe('GiftMenu', () => {
  it('agrupa regalos por ocasión y conserva sus rutas como listas semánticas', () => {
    const markup = renderMenu([
      {
        id: 'tarde',
        date: '2026-03-07',
        title: 'Ocasión posterior',
        gifts: [ringGift],
      },
      {
        id: 'segunda',
        date: '2026-01-02',
        title: 'Ocasión del sitio',
        gifts: [poemGift, { ...letterGift, order: 1 }],
      },
      {
        id: 'primera',
        date: '2026-01-02',
        title: 'Ocasión personalizada',
        welcome: 'Bienvenida de la ocasión.',
        gifts: [{ ...ringGift, id: 'anillo-personalizado' }],
      },
    ])

    expect(markup).toContain('<nav aria-label="Regalos">')
    expect(markup).toContain('<ol class="occasion-timeline">')
    expect(markup.match(/class="gift-grid"/g)).toHaveLength(3)
    expect(markup).toContain('href="#/regalo/carta"')
    expect(markup).toContain('href="#/regalo/poema"')
    expect(markup).toContain('href="#/regalo/anillo-personalizado"')
    expect(markup).toContain('Bienvenida del sitio.')
    expect(markup).toContain('Bienvenida de la ocasión.')

    const firstById = markup.indexOf('id="occasion-primera"')
    const secondById = markup.indexOf('id="occasion-segunda"')
    const laterById = markup.indexOf('id="occasion-tarde"')
    expect(firstById).toBeLessThan(secondById)
    expect(secondById).toBeLessThan(laterById)
    expect(markup.indexOf('href="#/regalo/carta"')).toBeLessThan(
      markup.indexOf('href="#/regalo/poema"'),
    )
  })

  it('formatea cada fecha calendario con su valor dateTime original', () => {
    const markup = renderMenu([
      { id: 'enero', date: '2026-01-02', title: 'Enero', gifts: [] },
      { id: 'marzo', date: '2026-03-07', title: 'Marzo', gifts: [] },
    ])

    expect(markup).toContain(
      `<time dateTime="2026-01-02">${formatGiftDate('2026-01-02', 'es-CL')}</time>`,
    )
    expect(markup).toContain(
      `<time dateTime="2026-03-07">${formatGiftDate('2026-03-07', 'es-CL')}</time>`,
    )
  })

  it('muestra la bienvenida del sitio aunque todavía no haya ocasiones', () => {
    const markup = renderMenu([])

    expect(markup).toContain('Bienvenida del sitio.')
    expect(markup).not.toContain('<time')
  })
})
