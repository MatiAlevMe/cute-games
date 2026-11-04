import { describe, expect, it } from 'vitest'
import { giftKinds, giftViewRegistry } from '../../src/gifts/registry'

describe('registro de vistas', () => {
  it('mapea cada tipo conocido a un componente', () => {
    expect([...giftKinds].sort()).toEqual(['achievement', 'letter', 'poem', 'ring'])

    for (const kind of giftKinds) {
      expect(giftViewRegistry[kind]).toBeTypeOf('function')
    }
  })

  it('no registra tipos de vista adicionales', () => {
    expect(Object.keys(giftViewRegistry).sort()).toEqual(
      ['achievement', 'letter', 'poem', 'ring'].sort(),
    )
  })
})
