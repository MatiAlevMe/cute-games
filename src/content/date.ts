const calendarDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/

interface CalendarDate {
  year: number
  month: number
  day: number
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

function daysInMonth(year: number, month: number): number {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  return days[month - 1] ?? 0
}

/**
 * Lee una fecha calendario `YYYY-MM-DD` sin pasar por UTC. Devuelve `null` si
 * el formato o el día no son válidos.
 */
export function parseCalendarDate(date: string): CalendarDate | null {
  const match = calendarDatePattern.exec(date)

  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    return null
  }

  return { year, month, day }
}

export function isValidCalendarDate(date: string): boolean {
  return parseCalendarDate(date) !== null
}

/**
 * Formatea una fecha calendario `YYYY-MM-DD` sin convertirla a UTC, para que
 * el día no cambie según la zona horaria.
 */
export function formatGiftDate(date: string | null, locale: string): string | null {
  if (date === null) {
    return null
  }

  const parsedDate = parseCalendarDate(date)

  if (!parsedDate) {
    throw new Error(`Fecha inválida: "${date}". Se espera una fecha calendario YYYY-MM-DD.`)
  }

  const parsed = new Date(0)
  parsed.setHours(0, 0, 0, 0)
  parsed.setFullYear(parsedDate.year, parsedDate.month - 1, parsedDate.day)

  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(parsed)
}
