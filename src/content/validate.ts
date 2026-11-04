import type { GiftDefinition } from '../gifts/types'
import { isValidCalendarDate } from './date'
import type { ContentBundle, ThemeAsset } from './types'

const idPattern = /^[a-z0-9-]+$/
const themeIds = new Set(['celeste', 'alternativo'])

export interface ContentValidationOptions {
  /** Tipos de vista conocidos; en la app se obtienen de `giftViewRegistry`. */
  knownKinds: readonly string[]
}

export interface ContentValidationResult {
  ok: boolean
  problems: string[]
}

function isLocalAssetPath(src: string): boolean {
  if (!src.startsWith('/') || src.startsWith('//') || src.includes('\\')) {
    return false
  }

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(src)) {
    return false
  }

  return src.split('/').every((segment) => segment !== '..')
}

function validateAsset(asset: ThemeAsset, path: string, problems: string[]): void {
  if (!isLocalAssetPath(asset.src)) {
    problems.push(`${path}.src "${asset.src}" no es una ruta local válida.`)
  }

  if (!asset.decorative && !asset.alt.trim()) {
    problems.push(`${path} necesita alt o debe marcarse como decorative.`)
  }
}

function validateGift(
  gift: GiftDefinition,
  path: string,
  knownKinds: ReadonlySet<string>,
  giftIds: Set<string>,
  problems: string[],
): void {
  if (!idPattern.test(gift.id)) {
    problems.push(`${path}.id "${gift.id}" no cumple ^[a-z0-9-]+$.`)
  }

  if (giftIds.has(gift.id)) {
    problems.push(`${path}.id "${gift.id}" está duplicado en el bundle.`)
  }

  giftIds.add(gift.id)

  if (!gift.title.trim()) {
    problems.push(`${path}.title está vacío.`)
  }

  if (!gift.menuLabel.trim()) {
    problems.push(`${path}.menuLabel está vacío.`)
  }

  if (!knownKinds.has(gift.kind)) {
    problems.push(`${path}.kind "${gift.kind}" no existe en giftViewRegistry.`)
  }

  if (gift.order !== undefined && (!Number.isFinite(gift.order) || !Number.isInteger(gift.order))) {
    problems.push(`${path}.order debe ser un entero finito.`)
  }

  if (gift.asset) {
    validateAsset(gift.asset, `${path}.asset`, problems)
  }
}

export function validateContentBundle(
  bundle: ContentBundle,
  options: ContentValidationOptions,
): ContentValidationResult {
  const problems: string[] = []
  const knownKinds = new Set(options.knownKinds)
  const occasionIds = new Set<string>()
  const giftIds = new Set<string>()

  if (!bundle.site.recipient.trim()) {
    problems.push('site.recipient está vacío.')
  }

  if (!bundle.site.welcome.trim()) {
    problems.push('site.welcome está vacío.')
  }

  if (!bundle.site.locale.trim()) {
    problems.push('site.locale está vacío.')
  }

  if (!themeIds.has(bundle.site.theme.id)) {
    problems.push(`site.theme.id "${bundle.site.theme.id}" no es un tema conocido.`)
  }

  if (bundle.site.theme.wallpaper) {
    validateAsset(bundle.site.theme.wallpaper, 'site.theme.wallpaper', problems)
  }

  if (bundle.site.theme.mascot) {
    validateAsset(bundle.site.theme.mascot, 'site.theme.mascot', problems)
  }

  bundle.occasions.forEach((occasion, occasionIndex) => {
    const path = `occasions[${occasionIndex}]`

    if (!idPattern.test(occasion.id)) {
      problems.push(`${path}.id "${occasion.id}" no cumple ^[a-z0-9-]+$.`)
    }

    if (occasionIds.has(occasion.id)) {
      problems.push(`${path}.id "${occasion.id}" está duplicado en el bundle.`)
    }

    occasionIds.add(occasion.id)

    if (!isValidCalendarDate(occasion.date)) {
      problems.push(`${path}.date "${occasion.date}" no es una fecha calendario válida.`)
    }

    if (!occasion.title.trim()) {
      problems.push(`${path}.title está vacío.`)
    }

    if (occasion.welcome !== undefined && !occasion.welcome.trim()) {
      problems.push(`${path}.welcome está vacío; omítelo para usar el del sitio.`)
    }

    occasion.gifts.forEach((gift, giftIndex) => {
      validateGift(gift, `${path}.gifts[${giftIndex}]`, knownKinds, giftIds, problems)
    })
  })

  return { ok: problems.length === 0, problems }
}

export function assertValidContentBundle(
  bundle: ContentBundle,
  options: ContentValidationOptions,
): void {
  const result = validateContentBundle(bundle, options)

  if (!result.ok) {
    throw new Error(`ContentBundle inválido:\n- ${result.problems.join('\n- ')}`)
  }
}
