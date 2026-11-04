import { describe, expect, it } from 'vitest'
import {
  achievementContent,
  letterContent,
  parseMessage,
  parseParagraphs,
  parseStanzas,
  poemContent,
  ringContent,
} from '../../src/content/texts'

describe('parseParagraphs', () => {
  it('separa párrafos por líneas en blanco y conserva el orden', () => {
    expect(parseParagraphs('Primero.\n\nSegundo.\n\n\nTercero.')).toEqual([
      'Primero.',
      'Segundo.',
      'Tercero.',
    ])
  })

  it('conserva los saltos internos y normaliza CRLF', () => {
    expect(parseParagraphs('Línea uno\r\nlínea dos.\r\n\r\nOtro párrafo.')).toEqual([
      'Línea uno\nlínea dos.',
      'Otro párrafo.',
    ])
  })

  it('ignora contenido vacío', () => {
    expect(parseParagraphs(' \n\n ')).toEqual([])
  })
})

describe('parseStanzas', () => {
  it('separa estrofas y versos conservando el orden', () => {
    expect(parseStanzas('Verso uno.\nVerso dos.\n\nVerso tres.\n\n\nVerso cuatro.')).toEqual([
      ['Verso uno.', 'Verso dos.'],
      ['Verso tres.'],
      ['Verso cuatro.'],
    ])
  })

  it('trata una línea con solo espacios como separador de estrofa', () => {
    expect(parseStanzas('Verso uno.\n   \nVerso dos.')).toEqual([['Verso uno.'], ['Verso dos.']])
  })

  it('ignora contenido vacío', () => {
    expect(parseStanzas('\n \n')).toEqual([])
  })
})

describe('parseMessage', () => {
  it('recorta el mensaje y normaliza CRLF', () => {
    expect(parseMessage('  Hola.\r\nMundo.  ')).toBe('Hola.\nMundo.')
  })

  it('devuelve null si el archivo está vacío', () => {
    expect(parseMessage(' \n ')).toBeNull()
  })
})

describe('textos de ejemplo', () => {
  it('provee contenido legible para los cuatro regalos', () => {
    expect(letterContent.paragraphs.length).toBeGreaterThan(0)
    expect(poemContent.stanzas.length).toBeGreaterThan(0)
    expect(poemContent.stanzas[0].length).toBeGreaterThan(0)
    expect(ringContent.message).toBeTypeOf('string')
    expect(ringContent.message).not.toBe('')
    expect(achievementContent.message).toBeTypeOf('string')
    expect(achievementContent.message).not.toBe('')
  })
})
