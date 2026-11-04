import { giftHref } from '../app/router'
import type { GiftDefinition } from '../gifts/types'

interface GiftCardProps {
  gift: GiftDefinition
}

export function GiftCard({ gift }: GiftCardProps) {
  return (
    <a className="gift-card" href={giftHref(gift.id)}>
      {gift.menuLabel}
    </a>
  )
}
