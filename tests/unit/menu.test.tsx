import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { GiftMenu } from '../../src/components/GiftMenu'
import { gifts } from '../../src/gifts/registry'

describe('GiftMenu', () => {
  it('expone la navegación como lista con los cuatro regalos', () => {
    const markup = renderToStaticMarkup(
      <GiftMenu gifts={gifts} recipient="ti" giftDate={null} dateLabel={null} />,
    )

    expect(markup).toContain('<nav aria-label="Regalos">')
    expect(markup).toContain('role="list"')
    expect(markup.match(/class="gift-card"/g)).toHaveLength(4)
    expect(markup).toContain('href="#/regalo/carta"')
    expect(markup).toContain('href="#/regalo/logro"')
  })

  it('muestra la fecha como <time> solo cuando está configurada', () => {
    const withDate = renderToStaticMarkup(
      <GiftMenu
        gifts={gifts}
        recipient="ti"
        giftDate="2026-10-30"
        dateLabel="30 de octubre de 2026"
      />,
    )
    const withoutDate = renderToStaticMarkup(
      <GiftMenu gifts={gifts} recipient="ti" giftDate={null} dateLabel={null} />,
    )

    expect(withDate).toContain('<time dateTime="2026-10-30">30 de octubre de 2026</time>')
    expect(withoutDate).not.toContain('<time')
  })
})
