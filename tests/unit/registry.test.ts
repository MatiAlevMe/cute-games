import { describe, expect, it } from 'vitest'
import { getGift, giftViewRegistry, gifts } from '../../src/gifts/registry'

describe('registro de regalos', () => {
  it('contiene los cuatro regalos en el orden del menú', () => {
    expect(gifts.map((gift) => gift.id)).toEqual(['carta', 'poema', 'anillo', 'logro'])
  })

  it('usa ids únicos y seguros para rutas', () => {
    const ids = gifts.map((gift) => gift.id)

    expect(new Set(ids).size).toBe(ids.length)

    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('define una vista para cada tipo registrado', () => {
    for (const gift of gifts) {
      expect(giftViewRegistry[gift.kind]).toBeTypeOf('function')
    }
  })

  it('no registra tipos de vista adicionales', () => {
    expect(Object.keys(giftViewRegistry).sort()).toEqual(
      ['achievement', 'letter', 'poem', 'ring'].sort(),
    )
  })

  it('carga contenido de ejemplo para los cuatro regalos', () => {
    for (const gift of gifts) {
      expect(gift.content).not.toBeNull()
    }
  })

  it('encuentra un regalo por id y devuelve undefined si no existe', () => {
    expect(getGift('anillo')?.title).toBe('Anillo')
    expect(getGift('no-existe')).toBeUndefined()
  })
})
