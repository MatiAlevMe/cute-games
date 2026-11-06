export type GiftKind = 'letter' | 'poem' | 'ring' | 'achievement' | 'robot-memory'

export interface GiftAsset {
  src: string
  alt: string
  decorative?: boolean
}

interface GiftBase {
  id: string
  title: string
  menuLabel: string
  asset?: GiftAsset
  /** Posición dentro de su ocasión; si falta, se usa el orden del array. */
  order?: number
}

export type GiftDefinition =
  | (GiftBase & {
      kind: 'letter'
      content: { paragraphs: readonly string[] } | null
    })
  | (GiftBase & {
      kind: 'poem'
      content: { stanzas: readonly (readonly string[])[] } | null
    })
  | (GiftBase & {
      kind: 'ring'
      content: { message: string | null } | null
    })
  | (GiftBase & {
      kind: 'achievement'
      content: { message: string | null } | null
    })
  | (GiftBase & {
      kind: 'robot-memory'
      content: { pairs: readonly string[] } | null
    })

export interface GiftViewProps {
  gift: GiftDefinition
}
