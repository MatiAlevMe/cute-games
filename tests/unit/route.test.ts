import { describe, expect, it } from 'vitest'
import { giftHref, parseRoute } from '../../src/app/router'

describe('parseRoute', () => {
  it.each(['', '#', '#/'])('interpreta %j como el menú', (hash) => {
    expect(parseRoute(hash)).toEqual({ name: 'menu' })
  })

  it('resuelve un regalo existente por id', () => {
    expect(parseRoute('#/regalo/carta')).toEqual({ name: 'gift', id: 'carta' })
  })

  it('acepta una barra final', () => {
    expect(parseRoute('#/regalo/logro/')).toEqual({ name: 'gift', id: 'logro' })
  })

  it('decodifica el id de la ruta', () => {
    expect(parseRoute('#/regalo/logro%2Dextra')).toEqual({ name: 'gift', id: 'logro-extra' })
  })

  it.each([
    '#/regalo',
    '#/regalo/',
    '#/otra',
    '#/regalo/carta/extra',
    '#/regalo/carta?x=1',
    '#/regalo/%',
  ])('rechaza la ruta %j', (hash) => {
    expect(parseRoute(hash)).toEqual({ name: 'not-found' })
  })
})

describe('giftHref', () => {
  it('construye una ruta hash segura', () => {
    expect(giftHref('logro')).toBe('#/regalo/logro')
    expect(giftHref('con espacio')).toBe('#/regalo/con%20espacio')
  })
})
