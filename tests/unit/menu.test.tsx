import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { GiftMenu } from '../../src/components/GiftMenu'
import { makeBundle } from './fixtures'

describe('GiftMenu', () => {
  it('recibe las ocasiones y expone los regalos como lista', () => {
    const bundle = makeBundle()
    const markup = renderToStaticMarkup(
      <GiftMenu
        occasions={bundle.occasions}
        recipient={bundle.site.recipient}
        welcome={bundle.site.welcome}
        giftDate={null}
        dateLabel={null}
      />,
    )

    expect(markup).toContain('<nav aria-label="Regalos">')
    expect(markup).toContain('role="list"')
    expect(markup.match(/class="gift-card"/g)).toHaveLength(4)
    expect(markup).toContain('href="#/regalo/carta"')
    expect(markup).toContain('href="#/regalo/logro"')
    expect(markup).toContain('Bienvenida del sitio.')
  })

  it('muestra la fecha como <time> solo cuando está configurada', () => {
    const bundle = makeBundle()
    const withDate = renderToStaticMarkup(
      <GiftMenu
        occasions={bundle.occasions}
        recipient={bundle.site.recipient}
        welcome={bundle.site.welcome}
        giftDate="2026-10-30"
        dateLabel="30 de octubre de 2026"
      />,
    )
    const withoutDate = renderToStaticMarkup(
      <GiftMenu
        occasions={bundle.occasions}
        recipient={bundle.site.recipient}
        welcome={bundle.site.welcome}
        giftDate={null}
        dateLabel={null}
      />,
    )

    expect(withDate).toContain('<time dateTime="2026-10-30">30 de octubre de 2026</time>')
    expect(withoutDate).not.toContain('<time')
  })
})
