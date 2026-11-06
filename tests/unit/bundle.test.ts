import { describe, expect, it } from 'vitest'
import {
  collectGifts,
  findGift,
  resolveWelcome,
  sortGifts,
  sortOccasions,
} from '../../src/content/bundle'
import type { ContentBundle, Occasion } from '../../src/content/types'
import { validateContentBundle } from '../../src/content/validate'
import type { GiftDefinition } from '../../src/gifts/types'
import {
  demoOccasion,
  letterGift,
  makeBundle,
  poemGift,
  ringGift,
  messageGardenGift,
} from './fixtures'

const memoryGift: Extract<GiftDefinition, { kind: 'robot-memory' }> = {
  id: 'memoria-robot',
  kind: 'robot-memory',
  title: 'Memoria del robot',
  menuLabel: 'Memoria del robot',
  content: { pairs: ['1', '2'] },
}

const knownKinds = [
  'letter',
  'poem',
  'ring',
  'achievement',
  'robot-memory',
  'message-garden',
]

function occasion(id: string, date: string, gifts: readonly GiftDefinition[] = []): Occasion {
  return { id, date, title: id, gifts }
}

function validate(bundle: ContentBundle) {
  return validateContentBundle(bundle, { knownKinds })
}

describe('orden de ocasiones y regalos', () => {
  it('ordena las ocasiones por fecha ascendente y luego por id', () => {
    const occasions = [
      occasion('b', '2026-02-01'),
      occasion('c', '2026-01-01'),
      occasion('a', '2026-01-01'),
    ]

    expect(sortOccasions(occasions).map((item) => item.id)).toEqual(['a', 'c', 'b'])
    expect(occasions.map((item) => item.id)).toEqual(['b', 'c', 'a'])
  })

  it('ordena los regalos por order y luego por el orden del array', () => {
    const gifts: GiftDefinition[] = [
      { ...letterGift, id: 'primero', order: 2 },
      { ...letterGift, id: 'segundo', order: 1 },
      { ...letterGift, id: 'tercero' },
      { ...letterGift, id: 'cuarto', order: 1 },
    ]

    expect(sortGifts(gifts).map((gift) => gift.id)).toEqual([
      'segundo',
      'cuarto',
      'primero',
      'tercero',
    ])
  })

  it('recorre las ocasiones ordenadas antes de ordenar sus regalos', () => {
    const later = occasion('z', '2026-02-01', [{ ...letterGift, id: 'z1' }])
    const earlier = occasion('a', '2026-01-01', [
      { ...letterGift, id: 'a2', order: 2 },
      { ...letterGift, id: 'a1', order: 1 },
    ])

    expect(collectGifts([later, earlier]).map((gift) => gift.id)).toEqual(['a1', 'a2', 'z1'])
  })

  it('encuentra un regalo en cualquier ocasión', () => {
    const bundle = makeBundle({
      occasions: [
        occasion('primera', '2026-01-01', [letterGift]),
        occasion('segunda', '2026-02-01', [ringGift]),
      ],
    })

    expect(findGift(bundle, 'anillo')).toBe(ringGift)
    expect(findGift(bundle, 'no-existe')).toBeUndefined()
  })
})

describe('precedencia de bienvenida', () => {
  it('usa la bienvenida de la ocasión cuando existe', () => {
    const bundle = makeBundle()

    expect(resolveWelcome(bundle.site.welcome, { ...demoOccasion, welcome: 'Bienvenida de la ocasión.' })).toBe(
      'Bienvenida de la ocasión.',
    )
  })

  it('usa la bienvenida del sitio cuando la ocasión no la define', () => {
    const bundle = makeBundle()

    expect(resolveWelcome(bundle.site.welcome, demoOccasion)).toBe('Bienvenida del sitio.')
    expect(resolveWelcome(bundle.site.welcome)).toBe('Bienvenida del sitio.')
  })

  it('trata una bienvenida vacía como ausente', () => {
    const bundle = makeBundle()

    expect(resolveWelcome(bundle.site.welcome, { ...demoOccasion, welcome: '   ' })).toBe(
      'Bienvenida del sitio.',
    )
  })
})

describe('validación del bundle', () => {
  it('acepta el bundle de prueba con los tipos registrados', () => {
    const result = validate(makeBundle())

    expect(result).toEqual({ ok: true, problems: [] })
  })

  it('falla si un id no cumple el patrón de ruta', () => {
    const result = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            id: 'Demo',
            gifts: [{ ...letterGift, id: 'Carta' }],
          },
        ],
      }),
    )

    expect(result.ok).toBe(false)
    expect(result.problems.join('\n')).toMatch(/occasions\[0\]\.id "Demo"/)
    expect(result.problems.join('\n')).toMatch(/gifts\[0\]\.id "Carta"/)
  })

  it('falla si un id de regalo se repite en el bundle', () => {
    const result = validate(
      makeBundle({
        occasions: [
          { ...demoOccasion, gifts: [letterGift] },
          { ...demoOccasion, id: 'segunda', gifts: [{ ...poemGift, id: 'carta' }] },
        ],
      }),
    )

    expect(result.ok).toBe(false)
    expect(result.problems.join('\n')).toMatch(/id "carta" está duplicado/)
  })

  it('falla si una fecha no es una fecha calendario válida', () => {
    const result = validate(
      makeBundle({ occasions: [{ ...demoOccasion, date: '2026-02-30' }] }),
    )

    expect(result.ok).toBe(false)
    expect(result.problems.join('\n')).toMatch(/2026-02-30/)
  })

  it('falla si un kind no existe en el registro de vistas', () => {
    const unknownGift = {
      id: 'raro',
      kind: 'podcast',
      title: 'Raro',
      menuLabel: 'Raro',
      content: null,
    } as unknown as GiftDefinition

    const result = validate(
      makeBundle({ occasions: [{ ...demoOccasion, gifts: [unknownGift] }] }),
    )

    expect(result.ok).toBe(false)
    expect(result.problems.join('\n')).toMatch(/kind "podcast" no existe/)
  })

  it('acepta un asset local con alt y rechaza uno externo', () => {
    const local = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [
              { ...ringGift, asset: { src: '/assets/anillo.svg', alt: 'Anillo dorado' } },
            ],
          },
        ],
      }),
    )
    const external = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [
              {
                ...ringGift,
                asset: { src: 'https://example.com/anillo.svg', alt: 'Anillo dorado' },
              },
            ],
          },
        ],
      }),
    )
    const protocolRelative = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [
              {
                ...ringGift,
                asset: { src: '//example.com/anillo.svg', alt: 'Anillo dorado' },
              },
            ],
          },
        ],
      }),
    )

    expect(local.ok).toBe(true)
    expect(external.ok).toBe(false)
    expect(protocolRelative.ok).toBe(false)
    expect(external.problems.join('\n')).toMatch(/no es una ruta local/)
  })

  it('exige alt salvo que el asset sea decorativo', () => {
    const missingAlt = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [{ ...ringGift, asset: { src: '/assets/anillo.svg', alt: ' ' } }],
          },
        ],
      }),
    )
    const decorative = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [
              {
                ...ringGift,
                asset: { src: '/assets/anillo.svg', alt: '', decorative: true },
              },
            ],
          },
        ],
      }),
    )

    expect(missingAlt.ok).toBe(false)
    expect(missingAlt.problems.join('\n')).toMatch(/necesita alt/)
    expect(decorative.ok).toBe(true)
  })

  it('valida assets del tema como rutas locales', () => {
    const result = validate(
      makeBundle({
        site: {
          ...makeBundle().site,
          theme: {
            id: 'celeste',
            wallpaper: { src: 'https://example.com/fondo.svg', alt: 'Fondo celeste' },
          },
        },
      }),
    )

    expect(result.ok).toBe(false)
    expect(result.problems.join('\n')).toMatch(/site\.theme\.wallpaper\.src.*no es una ruta local/)
  })

  it('rechaza paletas que no alcanzan contraste AA', () => {
    const result = validate(
      makeBundle({
        site: {
          ...makeBundle().site,
          theme: {
            id: 'celeste',
            palette: {
              background: '#ffffff',
              surface: '#ffffff',
              primary: '#8bd3f2',
              primaryStrong: '#aaaaaa',
              accent: '#c2417a',
              text: '#eeeeee',
            },
          },
        },
      }),
    )

    expect(result.ok).toBe(false)
    expect(result.problems.join('\n')).toMatch(/text no alcanza contraste AA/)
    expect(result.problems.join('\n')).toMatch(/primaryStrong no alcanza contraste 3:1/)
  })

  it('valida que la memoria tenga etiquetas de parejas únicas y no vacías', () => {
    const valid = validate(
      makeBundle({ occasions: [{ ...demoOccasion, gifts: [memoryGift] }] }),
    )
    const invalid = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [{ ...memoryGift, content: { pairs: ['1'] } }],
          },
        ],
      }),
    )
    const malformed = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [{ ...memoryGift, content: { pairs: ['1', '1', ' '] } }],
          },
        ],
      }),
    )

    expect(valid.ok).toBe(true)
    expect(invalid.problems.join('\n')).toMatch(/al menos dos parejas/)
    expect(malformed.problems.join('\n')).toMatch(/etiquetas vacías/)
    expect(malformed.problems.join('\n')).toMatch(/no puede repetir etiquetas/)
  })

  it('valida que el jardín tenga mensajes no vacíos', () => {
    const valid = validate(
      makeBundle({ occasions: [{ ...demoOccasion, gifts: [messageGardenGift] }] }),
    )
    const empty = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [{ ...messageGardenGift, content: { messages: [] } }],
          },
        ],
      }),
    )
    const blank = validate(
      makeBundle({
        occasions: [
          {
            ...demoOccasion,
            gifts: [{ ...messageGardenGift, content: { messages: ['  '] } }],
          },
        ],
      }),
    )

    expect(valid.ok).toBe(true)
    expect(empty.problems.join('\n')).toMatch(/necesita al menos un mensaje/)
    expect(blank.problems.join('\n')).toMatch(/no puede contener mensajes vacíos/)
  })
})
