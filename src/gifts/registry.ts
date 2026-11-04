import type { ComponentType } from 'react'
import type { GiftKind, GiftViewProps } from './types'
import { AchievementView } from './views/AchievementView'
import { LetterView } from './views/LetterView'
import { PoemView } from './views/PoemView'
import { RingView } from './views/RingView'

/**
 * Registro explícito de vistas conocidas. Solo mapea `kind` a un componente
 * estático: no importa contenido ni carga código desde los datos.
 */
export const giftViewRegistry: Record<GiftKind, ComponentType<GiftViewProps>> = {
  letter: LetterView,
  poem: PoemView,
  ring: RingView,
  achievement: AchievementView,
}

export const giftKinds = Object.keys(giftViewRegistry) as GiftKind[]
