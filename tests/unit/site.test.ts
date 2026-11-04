import { describe, expect, it } from 'vitest'
import { formatGiftDate, isValidCalendarDate } from '../../src/content/date'
import { demoBundle } from '../../src/content/demo'

describe('formatGiftDate', () => {
  it('no muestra fecha cuando no hay una configurada', () => {
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

describe('isValidCalendarDate', () => {
  it('acepta fechas calendario reales', () => {
    expect(isValidCalendarDate('2024-02-29')).toBe(true)
    expect(isValidCalendarDate('2026-01-01')).toBe(true)
  })

  it.each(['2026-02-29', '2026-04-31', '2026-00-10', '2026-01-00', '2026-01-01T00:00'])(
    'rechaza la fecha inválida %j',
    (date) => {
      expect(isValidCalendarDate(date)).toBe(false)
    },
  )
})

describe('configuración del sitio', () => {
  it('usa valores neutros y el tema celeste por defecto', () => {
    expect(demoBundle.site.recipient).toBe('ti')
    expect(demoBundle.site.locale).toBe('es-CL')
    expect(demoBundle.site.theme.id).toBe('celeste')
  })
})
