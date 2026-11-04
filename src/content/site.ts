export interface SiteConfig {
  recipient: string
  giftDate: string | null
  locale: string
}

/**
 * Valor neutro de la demo. Reemplázalo por el nombre de la persona en tu
 * contenido privado. La fecha se deja en null para no mostrar una fecha falsa.
 */
export const site: SiteConfig = {
  recipient: 'ti',
  giftDate: null,
  locale: 'es-CL',
}

const calendarDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/

/**
 * Formatea una fecha calendario `YYYY-MM-DD` sin convertirla a UTC, para que
 * el día no cambie según la zona horaria.
 */
export function formatGiftDate(date: string | null, locale: string): string | null {
  if (date === null) {
    return null
  }

  const match = calendarDatePattern.exec(date)

  if (!match) {
    throw new Error(`Fecha inválida: "${date}". Se espera el formato YYYY-MM-DD.`)
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const parsed = new Date(year, month - 1, day)

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    throw new Error(`Fecha inválida: "${date}".`)
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(parsed)
}
