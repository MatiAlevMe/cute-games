import type { ComponentType } from 'react'
import {
  achievementContent,
  letterContent,
  poemContent,
  ringContent,
} from '../content/texts'
import type { GiftDefinition, GiftKind, GiftViewProps } from './types'
import { AchievementView } from './views/AchievementView'
import { LetterView } from './views/LetterView'
import { PoemView } from './views/PoemView'
import { RingView } from './views/RingView'

/**
 * Orden por defecto del menú. Los cuatro regalos leen textos de ejemplo desde
 * `src/content/texts/`; ninguno se considera contenido final.
 */
export const gifts: readonly GiftDefinition[] = [
  {
    id: 'carta',
    kind: 'letter',
    title: 'Carta',
    menuLabel: 'Carta',
    content: letterContent,
  },
  {
    id: 'poema',
    kind: 'poem',
    title: 'Poema',
    menuLabel: 'Poema',
    content: poemContent,
  },
  {
    id: 'anillo',
    kind: 'ring',
    title: 'Anillo',
    menuLabel: 'Anillo',
    content: ringContent,
  },
  {
    id: 'logro',
    kind: 'achievement',
    title: 'Logro',
    menuLabel: 'Logro',
    content: achievementContent,
  },
]

/**
 * Registro explícito de vistas conocidas. No se carga código desde los datos.
 * Carta, poema, anillo y logro tienen vista propia registrada.
 */
export const giftViewRegistry: Record<GiftKind, ComponentType<GiftViewProps>> = {
  letter: LetterView,
  poem: PoemView,
  ring: RingView,
  achievement: AchievementView,
}

const giftIds = new Set<string>()

for (const gift of gifts) {
  if (!/^[a-z0-9-]+$/.test(gift.id)) {
    throw new Error(`El id "${gift.id}" no es seguro para una ruta.`)
  }

  if (giftIds.has(gift.id)) {
    throw new Error(`El id "${gift.id}" está duplicado en el registro.`)
  }

  giftIds.add(gift.id)
}

export function getGift(id: string): GiftDefinition | undefined {
  return gifts.find((gift) => gift.id === id)
}
