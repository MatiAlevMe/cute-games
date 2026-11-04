export type GiftKind = 'letter' | 'poem' | 'ring' | 'achievement'

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

export interface GiftViewProps {
  gift: GiftDefinition
}
