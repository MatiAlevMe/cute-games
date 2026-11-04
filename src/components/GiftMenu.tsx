import { GiftCard } from './GiftCard'
import type { GiftDefinition } from '../gifts/types'

interface GiftMenuProps {
  gifts: readonly GiftDefinition[]
  recipient: string
  giftDate: string | null
  dateLabel: string | null
}

export function GiftMenu({ gifts, recipient, giftDate, dateLabel }: GiftMenuProps) {
  return (
    <section aria-labelledby="menu-title">
      <header className="menu-header">
        <h1 id="menu-title">Regalo para {recipient}</h1>
        {dateLabel && giftDate ? (
          <p className="gift-date">
            <time dateTime={giftDate}>{dateLabel}</time>
          </p>
        ) : null}
      </header>
      <nav aria-label="Regalos">
        <ul className="gift-grid" role="list">
          {gifts.map((gift) => (
            <li key={gift.id}>
              <GiftCard gift={gift} />
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
