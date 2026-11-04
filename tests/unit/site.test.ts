import { describe, expect, it } from 'vitest'
import { formatGiftDate, site } from '../../src/content/site'

describe('formatGiftDate', () => {
  it('no muestra fecha mientras no exista una aprobada', () => {
    expect(site.giftDate).toBeNull()
    expect(formatGiftDate(null, 'es-CL')).toBeNull()
  })

  it('formatea como fecha calendario sin desfase de día', () => {
    expect(formatGiftDate('2026-01-01', 'es-CL')).toBe('1 de enero de 2026')
    expect(formatGiftDate('2026-12-31', 'es-CL')).toBe('31 de diciembre de 2026')
    expect(formatGiftDate('2024-02-29', 'es-CL')).toBe('29 de febrero de 2024')
  })

  it.each(['2026-13-01', '2026-02-30', '2023-02-29', '2026-1-1', '01-01-2026', ''])(
    'rechaza la fecha inválida %j',
    (date) => {
      expect(() => formatGiftDate(date, 'es-CL')).toThrow(/Fecha inválida/)
    },
  )
})

describe('configuración del sitio', () => {
  it('usa un valor neutro y el idioma propuesto', () => {
    expect(site.recipient).toBe('ti')
    expect(site.locale).toBe('es-CL')
  })
})
