import anilloText from './texts/anillo.txt?raw'
import cartaText from './texts/carta.txt?raw'
import logroText from './texts/logro.txt?raw'
import poemaText from './texts/poema.txt?raw'

function normalizeNewlines(raw: string): string {
  return raw.replace(/\r\n?/g, '\n')
}

function splitBlocks(raw: string): string[] {
  return normalizeNewlines(raw).split(/\n[ \t]*\n/)
}

/** Cada bloque separado por una línea en blanco es un párrafo. */
export function parseParagraphs(raw: string): string[] {
  return splitBlocks(raw)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
}

/**
 * Cada bloque separado por una línea en blanco es una estrofa; cada línea no
 * vacía dentro del bloque es un verso. Se conserva el orden y los saltos.
 */
export function parseStanzas(raw: string): string[][] {
  return splitBlocks(raw)
    .map((block) =>
      block
        .split('\n')
        .map((line) => line.replace(/[ \t]+$/, ''))
        .filter((line) => line.trim().length > 0),
    )
    .filter((stanza) => stanza.length > 0)
}

/** Un mensaje breve; si el archivo está vacío, queda pendiente. */
export function parseMessage(raw: string): string | null {
  const message = normalizeNewlines(raw).trim()

  return message.length > 0 ? message : null
}

export const letterContent = { paragraphs: parseParagraphs(cartaText) }
export const poemContent = { stanzas: parseStanzas(poemaText) }
export const ringContent = { message: parseMessage(anilloText) }
export const achievementContent = { message: parseMessage(logroText) }
