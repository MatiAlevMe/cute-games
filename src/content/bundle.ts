import type { GiftDefinition } from '../gifts/types'
import type { ContentBundle, Occasion } from './types'

function compareText(left: string, right: string): number {
  if (left < right) {
    return -1
  }

  if (left > right) {
    return 1
  }

  return 0
}

/** Orden determinista: fecha ascendente y, si empatan, por `id`. */
export function sortOccasions(occasions: readonly Occasion[]): Occasion[] {
  return [...occasions].sort(
    (left, right) => compareText(left.date, right.date) || compareText(left.id, right.id),
  )
}

/**
 * Orden determinista de los regalos de una ocasión: por `order` ascendente y,
 * si empatan o falta, por el orden del array. Los regalos sin `order` quedan
 * después de los que sí lo tienen.
 */
export function sortGifts(gifts: readonly GiftDefinition[]): GiftDefinition[] {
  return gifts
    .map((gift, index) => ({ gift, index }))
    .sort((left, right) => {
      const leftOrder = left.gift.order ?? Number.POSITIVE_INFINITY
      const rightOrder = right.gift.order ?? Number.POSITIVE_INFINITY

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }

      return left.index - right.index
    })
    .map(({ gift }) => gift)
}

/** Recorre las ocasiones ordenadas y devuelve sus regalos en orden estable. */
export function collectGifts(occasions: readonly Occasion[]): GiftDefinition[] {
  return sortOccasions(occasions).flatMap((occasion) => sortGifts(occasion.gifts))
}

export function findGift(bundle: ContentBundle, id: string): GiftDefinition | undefined {
  for (const occasion of bundle.occasions) {
    const gift = occasion.gifts.find((candidate) => candidate.id === id)

    if (gift) {
      return gift
    }
  }

  return undefined
}

/** `Occasion.welcome` reemplaza a `SiteConfig.welcome` cuando existe. */
export function resolveWelcome(siteWelcome: string, occasion?: Occasion): string {
  const occasionWelcome = occasion?.welcome?.trim()

  return occasionWelcome ? occasionWelcome : siteWelcome
}
